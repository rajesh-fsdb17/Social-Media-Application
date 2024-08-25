const zod = require("zod")

const userValidateObj = zod.object({
    user_name:zod.string(),
    user_mobileNo : zod.string().min(10, { message: "Phone number must be at least 10 digits long" }).max(15, { message: "Phone number must be at most 15 digits long" }).regex(/^\+?[1-9]\d{1,14}$/, { message: "Invalid phone number format" }),
    user_email:zod.string().email(),
    user_password:zod.string().min(6)
})

const signinValidateObj = zod.object({
    user_email:zod.string().email(),
    user_password:zod.string().min(6)
})

module.exports = {
    userValidateObj,
    signinValidateObj
}