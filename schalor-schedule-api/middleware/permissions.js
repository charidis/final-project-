const Term = require("../models/term")
const { BadRequestError, ForbiddenError } = require("../utils/errors")


const authedUserOwnsNutrition = async (req, res, next) => {
  try {
    const { user } = res.locals
    const { termId } = req.params
    const term = await Term.fetchNutritionById(nutritionId)

    if (term.email !== user.email) {
      throw new ForbiddenError("User is not allowed.")
    }

    res.locals.term = term

    return next()
  } catch (err) {
    return next(err)
  }
}

const authedUserIsNotNutrition = async (req, res, next) => {
  try {
    const { user } = res.locals
    const { nutritionId } = req.params
    const nutrition = await Nutrition.fetchNutritionById(nutritionId)

    if (nutrition.email === user.email) {
      throw new BadRequestError()
    }

    res.locals.nutrition = nutrition

    return next()
  } catch (err) {
    return next(err)
  }
}


module.exports = {
  authedUserIsNotNutrition,
  authedUserOwnsNutrition
}

