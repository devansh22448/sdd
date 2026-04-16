const express = require('express');
const router = express.Router();
const { getLogs, getLogById } = require('../controllers/logController');

router.route('/')
    .get(getLogs);

router.route('/:id')
    .get(getLogById);

module.exports = router;
