const db = require('../db')
const {BadRequestError, NotFoundError} = require('../utils/errors')

class Term{

    static async createNewTerm({ user, term }){
        const requiredFields =["title"]

        requiredFields.forEach((property) => {
            if (!term.hasOwnProperty(property)) {
                throw new BadRequestError(`Missing ${property} in request body.`)
        }})

        const result = await db.query(
            `INSERT INTO terms (title, user_id)
                VALUES ($1, (SELECT id FROM users WHERE email = $2))
                RETURNING id, title, user_id AS "userId", created_at;
            `, [term.title, user.email]
        )
        
        return result.rows[0]
        
    }


    static async listTerms({ user }){
        const results = await db.query(
            `
            SELECT
                terms.id,
                terms.title,
                users.email AS "userEmail"
            FROM
                terms
            JOIN
                users ON users.id = terms.user_id
            WHERE
                terms.user_id = (SELECT id FROM users WHERE email = $1);
            `, [user.email]
        )

        return results.rows
        
        
    }
    static async editTerms({ update, postID }){
        const results = await db.query(
            `
            UPDATE terms 
            SET title = $1
            WHERE id = $2
            RETURNING id, title, created_at;
            `, [update, postID]
        )

        return results.rows[0]
        
        
    }
    
}

module.exports = Term