const express = require('express');
const router = express.Router();
const auth = require("../../middleware/auth");
const User = require("../../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");
const { check, validationResult } = require('express-validator');

// @route GET api/auth
// @desc Test route
// @access Public
router.get('/', auth, async (req, res) => {
    try {
        const user =  await User.findById(req.user.id).select("-password");
        res.json(user)
    } catch (error) {
        console.log(error.message);
        res.status(500).send("Server Error")
    }
});

// @route GET api/auth
// @desc Authentication route and get token
// @access Public
router.post('/', [
    check('email', 'Email is required').isEmail(),
    check('password', 'Password is required').exists()
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }

    const { email, password } = req.body;

    try {
        let user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ errors: [{ msg: "Invalid credentials" }] });
        }

        const isMatch = await bcrypt.compare(password, user.password)
        if (!isMatch) {
            return res.status(400).json({ errors: [{ msg: "Invalid credentials" }] });
        }

        const payload = {
            user: {
                id: user.id
            }
        };

        jwt.sign(payload, config.get("jwtSecret"), { expiresIn: 600000 }, (err, token) => {
            if (err) throw err;
            return res.json({ token });
        });
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Server error");
    }

    const user = new User

});

module.exports = router;