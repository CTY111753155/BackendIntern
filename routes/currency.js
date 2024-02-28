const path = require('path');

const express = require('express');

const router = express.Router();

const currencyController = require('../controllers/currency');

router.get('/',currencyController.getIndex);

router.get('/exchange',currencyController.getCurrency);

module.exports = router;