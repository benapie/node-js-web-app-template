const express = require('express');
const router = express.Router();

// Home page
router.get('/', (req, res) => {
    res.render('index', {
        title: 'Home - Resource Management',
        user: req.user
    });
});

module.exports = router;