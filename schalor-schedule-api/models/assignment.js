const db = require('../db')
const {BadRequestError, NotFoundError} = require('../utils/errors')

class Assignment{

    // static async createNewAssignment({ user, termID, assignment }){
    //     const requiredFields =["course","name"]

    //     requiredFields.forEach((property) => {
    //         if (!term.hasOwnProperty(property)) {
    //             throw new BadRequestError(`Missing ${property} in request body.`)
    //     }})

    //     const result = await db.query(
    //         `INSERT INTO assignments (course, name, term_id, user_id)
    //         VALUES ($1, $2, (SELECT id FROM users WHERE email = $3), $4)
    //         RETURNING course, name, user_id AS "userId", term_id AS "termId", created_at`,
    //         [assignment.course, assignment.name, termID, user.email]
    //     );
        
    //     console.log(result.rows[0])
    //     return result.rows[0]
        
    // }
    static async createNewAssignment({ user, termID, assignment }){
        const requiredFields = ["course","name"]

        requiredFields.forEach((property) => {
            if (!assignment.hasOwnProperty(property)) {
                throw new BadRequestError(`Missing ${property} in request body.`)
        }})
        const result = await db.query(
            `INSERT INTO assignments (course, name, term_id, user_id)
                VALUES ($1,$2, $3, (SELECT id FROM users WHERE email = $4))
                RETURNING course, name, term_id AS "termId", user_id AS "userId", created_at;
            `, [assignment.course, assignment.name, termID, user.email]
        )
        
        return result.rows[0]
        
    }


    static async listAssignments({ user, termID }) {
        const results = await db.query(
            `
            SELECT
                assignments.id,
                assignments.course AS "course",
                assignments.name AS "name",
                users.email AS "userEmail"
            FROM
                assignments
            JOIN
                terms ON terms.id = assignments.term_id
            JOIN
                users ON users.id = assignments.user_id
            WHERE
                assignments.user_id = (SELECT id FROM users WHERE email = $1)
                AND assignments.term_id = (SELECT id FROM terms WHERE id = $2);
            `,
            [user.email, termID]
        );
    
        return results.rows;
    }
    
    
}

module.exports = Assignment