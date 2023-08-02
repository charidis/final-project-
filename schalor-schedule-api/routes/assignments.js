const express = require("express")
const router = express.Router()
const security = require("../middleware/security")
const Assignment = require("../models/assignment")

router.post("/", security.requireAuthenticatedUser, async (req, res, next) => {
  try {
    //creates new assignments
    const { user } = res.locals
    const assignment = await Assignment.createNewAssignment({ user, assignment: req.body })
    return res.status(201).json({ assignment })
  } catch (err) {
    next(err)
  }
})


router.get("/", async (req, res, next) => {
  try {
    //list all users assignments
    const assignments = await Assignment.listAssignments()
    return res.status(201).json({ assignments })
  } catch (err) {
    next(err)
  }
})

  
module.exports = router