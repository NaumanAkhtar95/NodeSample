const express = require('express');
const router = express.Router();

// @route GET api/profile
// @desc Test route
// @access Public
router.get('/', (req, res) => res.send('Profile route'));
router.get('/getall', (req, res) => res.send('All Profile route'));

module.exports = router;