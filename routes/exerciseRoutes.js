const express = require('express');
const exerciseController = require('../controllers/exerciseController');
const router = express.Router();

router.post('/users/:_id/exercises', exerciseController.createExercise);

module.exports = router;
