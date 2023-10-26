const express = require('express');
const logController = require('../controllers/logController');
const router = express.Router();

router.get('/users/:_id/logs', logController.getUserLogs);

module.exports = router;
