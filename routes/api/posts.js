const express = require('express');
const router = express.Router();

// @route   GET apt/posts/test
// @desc    tests posts route
// @access     Public
router.get('/test', (req, res) => res.json({message: 'posts works!'}));

module.exports = router;