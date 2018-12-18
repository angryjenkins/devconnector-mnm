const express = require('express');
const router = express.Router();

// @route   GET apt/users/test
// @desc    tests users route
// @access     Public
router.get('/test', (req, res) => res.json({message: 'users works!'}));

module.exports = router;