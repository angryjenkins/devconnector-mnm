const express = require('express');
const router = express.Router();
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs')

// load User model
const User = require('../../models/User');

// @route   GET apt/users/test
// @desc    tests users route
// @access     Public
router.get('/test', (req, res) => res.json({message: 'users works!'}));

// @route   GET apt/users/register
// @desc    register a user
// @access     Public
router.post('/register', (req, res) => {
    User.findOne({ email: req.body.email })
    .then(user => {
        if (user) {
            return res.status(400).json({ email: 'email already exists'})
        } else {
            const avatar = gravatar.url(req.body.email, {
                s: '200',
                r: 'pg',
                d: 'mm'
            });

            const newUser = new User({
                name: req.body.name,
                email: req.body.email,
                avatar,
                password: req.body.password
            })

            bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(newUser.password, salt, (err, hash) => {
                    if (err) throw err;
                    newUser.password = hash;
                    newUser
                        .save()
                        .then(user => res.json(user))
                        .catch(err => console.log(err));
                })
            })
        }
    });
});

// @route   GET apt/users/login
// @desc    login user - return JWT
// @access  Public
router.post('/login', (req, res) => {
    const email = req.body.email;
    const password = req.body.password;

    // find user by email
    User.findOne({email})
        .then(user => {
            if(!user) {
                return res.status(404).json({email: 'user not found'})
            }

            bcrypt.compare(password, user.password)
                .then(isMatch => {
                    if(isMatch) {
                        res.json({message: 'login success!'})
                    } else {
                        return res.status(400).json({password: 'incorrect password.'})
                    }
                })
        })
});

module.exports = router;