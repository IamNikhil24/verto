const asyncHandler = require("express-async-handler")
const user = require("../models/userModel")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

const register = asyncHandler(async (req, res) => {
    const { name, email, password, role } = req.body
    const check = await user.findOne({ email })
    if (check) {
        res.status(400).json({ Message: "User already registered,Please logIn" })
    } else {
        const hashed = await bcrypt.hash(password, 10)
        const newUser = await user.create({
            name, email, password: hashed, role
        })
        if (newUser) {
            res.status(200).json({ Message: "User Created", name: newUser.name })
        }
    }
})

const login = asyncHandler(async (req, res) => {
    const { email, password } = req.body
    const check = await user.findOne({ email })
    if (!check) {
        res.status(400).json({ Message: "User Not registered,Please Register" })
    } else {
        const verify = await bcrypt.compare(password, check.password)
        if (verify) {
            const token = jwt.sign({
                email, role: check.role, id: check._id
            }, process.env.SECRET_KEY, { expiresIn: "2h" })
            res.status(200).json({ Message: "User LoggedIn", token: token })
        } else {
            res.status(400)
            throw new Error("Inavlid email or Password")
        }
    }
})

module.exports = { register, login }