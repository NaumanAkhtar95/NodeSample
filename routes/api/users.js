const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const User = require("../../models/user");
const gravatar = require("gravatar");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");

// @route GET api/users
// @desc Test route
// @access Public
router.post('/', [
    check('name', 'Name is required').not().isEmpty(),
    check('email', 'Email is required').isEmail(),
    check('password', 'Please enter a password with 6 or more characters').isLength({ min: 6 })
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }
    
    const { name, email, password } = req.body;
    
    try {
        let user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ errors: [{ msg: "User already exists" }] });
        }

        const avatar = gravatar.url(email, {
            s: "200", r: "pg", d: "mm"
        });

        user = new User({
            name, email, password, avatar
        });

        const salt = await bcrypt.genSaltSync(10);
        user.password = await bcrypt.hash(password, salt);

        await user.save();

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