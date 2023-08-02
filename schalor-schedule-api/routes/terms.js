const express = require("express")
const security = require("../middleware/security")
const Term = require("../models/term")
const Assignment = require("../models/assignment")
const router = express.Router()

router.post("/", security.requireAuthenticatedUser, async (req, res, next) => {
  try {
    //creates new term
    const { user } = res.locals
    const term = await Term.createNewTerm({ user, term: req.body })
    return res.status(201).json({ term })
  } catch (err) {
    next(err)
  }
})

router.get("/", security.requireAuthenticatedUser, async (req, res, next) => {
  try {
    //list all users semesters
    const { user } = res.locals
    const terms = await Term.listTerms({ user })
    return res.status(201).json({ terms })
  } catch (err) {
    next(err)
  }
})
router.patch("/", security.requireAuthenticatedUser, async (req, res, next) => {
  try {
  const {termID} = req.params
  const terms = await Term.editTerm({ update: req.body , termID}) 
    return res.status(201).json({ terms })
  } catch (err) {
    next(err)
  }
})
router.get("/:termID", security.requireAuthenticatedUser, async (req, res, next) => {
  try {
    const { termID } = req.params
    
    const { user } = res.locals
    //list all assignments for a term
    const assignments = await Assignment.listAssignments({ user, termID })
    return res.status(201).json({ assignments })
  } catch (err) {
    next(err)
  }

})

router.post("/:termID/assignments", async (req, res, next) => {
  try {
    //creates new assignment for a term
    const { termID } = req.params
    
    const { user } = res.locals
    
    const assignment = await Assignment.createNewAssignment({ user, termID, assignment: req.body })
    return res.status(201).json({ assignment })
  } catch (err) {
    next(err)
  }
})

module.exports = router