const express = require('express');
const { getGuidance, getGuidanceById } = require('../controllers/guidanceController');

const router = express.Router();

router.get('/', getGuidance);
router.get('/:id', getGuidanceById);

module.exports = router;