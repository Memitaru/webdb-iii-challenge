const knex = require('knex');
const router = require('express').Router();

const knexConfig = require('./knexfile.js');

const db = knex(knexConfig.development);

router.get('/', async(req, res)=> {
    try {
        const cohorts = await db('cohorts');
        res.status(200).json(cohorts)
    } catch (err){
        res.status(500).json(err)
    }
})

router.get('/:id', async(req, res) => {
    try {
        const cohort = await db('cohorts')
            .where({id: req.params.id})
            .first();
        if (cohort) {
            res.status(200).json(cohort)
        } else {
            res.status(400).json({message: "No cohort at that ID"})
        }
    } catch (err) {
        res.status(500).json(err)
    }
})

router.get('/:id/students', async (req, res) =>{
    try {
        const students = await db('cohorts')
            .join('students', 'students.cohort_id', 'cohorts.id')
            .select('students.id', 'students.name')
            .where('cohorts.id', req.params.id)
            .first()
        if (students){
            res.status(200).json(students)
        } else {
            res.status(404).json({message: "No students found"})
        }
    } catch(err){
        res.status(500).json(err.message)
    }
})

router.post('/', async (req, res) => {
    try {
        const postCohort = await db('cohorts')
            .insert(req.body)
        const newCohort = await db('cohorts')
            .where({id: postCohort[0]})
            .first()
        res.status(201).json(newCohort)
    } catch(err){
        res.status(500).json(err.message)
    }
})

module.exports = router;