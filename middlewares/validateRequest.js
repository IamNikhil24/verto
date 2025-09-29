const joi = require("joi")

const signUpValidation = async (req, res, next) => {
    const schema = joi.object({
        name: joi.string().min(3).max(100).required(),
        email: joi.string().email(),
        password: joi.string().min(4).max(50).required(),
        role: joi.string().valid("User", "Admin").default("User")
    })
    const { error } = schema.validate(req.body)
    if (error) {
        return res.status(400).json({ Message: "Bad Request", error })
    }
    next()
}

const loginValidation = async (req, res, next) => {
    const schema = joi.object({
        email: joi.string().email(),
        password: joi.string().min(4).max(50).required()
    })

    const { error } = schema.validate(req.body)
    if (error) {
        return res.status(400).json({ Message: "Bad Request", error })
    }
    next()
}

module.exports = { signUpValidation, loginValidation }