const express = require("express")
const { signUpValidation, loginValidation } = require("../middlewares/validateRequest")
const { login, register } = require("../controllers/authController")
const router = express.Router()

router.post('/login', loginValidation, login)
router.post('/register', signUpValidation, register)

module.exports = router