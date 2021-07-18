const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { OAuth2Client } = require('google-auth-library')
const fetch = require('node-fetch')

const User = require('../models/User')
const { validateRegister, validateLogin, validateChangePassword } = require("../util/validator")
const { SECRET_KEY } = require('../../config')

// ฟังก์ชั่นสร้าง token
const generateToken = (user) => {
    return jwt.sign({
        id: user._id,
        email: user.email,
        username: user.username
    }, SECRET_KEY, { expiresIn: '1h' })
}

exports.register = async (req, res, next) => {
    const { username, email, password: plainTextPassword, confirmPassword } = req.body
    const { valid, errors } = validateRegister(username, email, plainTextPassword, confirmPassword)

    try {

        if (!valid) {
            // ถ้าเกิด error
            throw new Error(errors) //ส่ง error ไป catch
        }

        // หา email ใน db
        const user = await User.findOne({ email })

        // ถ้าเจอ
        if (user) {
            throw new Error(errors.email = 'Email is taken') //ส่ง error ไป catch
        }

        // hash password
        const password = await bcrypt.hash(plainTextPassword, 10)

        // บันทึกลง db
        const result = await User.create({ username, email, password, createdAt: new Date().toISOString() })

        // สร้าง token
        const token = generateToken(result)

        // ส่งไป client
        res.status(200).send({ success: true, id: result._id, useranme: result.username, token })
    } catch (error) {
        res.status(500).send({ success: false, errors })
    }

}

exports.login = async (req, res, next) => {
    const { email, password } = req.body
    const { valid, errors } = validateLogin(email, password)

    try {
        if (!valid) {
            // ถ้าเกิด error
            throw new Error(errors) //ส่ง error ไป catch
        }

        // หา email ใน db
        const user = await User.findOne({ email })

        if (!user) {
            // ถ้าไม่เจอ
            errors.general = 'Email not found'
            throw new Error(errors.email = 'Wrong credentials') //ส่ง error ไป catch
        }

        // เปรียบเทียบ password
        const match = await bcrypt.compare(password, user.password)

        if (!match) {
            // ถ้าไม่ตรง
            errors.general = 'Wrong credentials'
            throw new Error(errors.password = 'Wrong credentials') //ส่ง error ไป catch
        }

        // สร้าง token
        const token = generateToken(user)

        // ส่งไป client
        res.status(200).send({ success: true, id: user._id, username: user.username, token })
    } catch (error) {
        res.status(500).send({ success: false, errors })
    }


}

exports.changepassword = async (req, res, next) => {
    const { email, password: plainTextPassword, newPassword: plainTextNewPassword, confirmNewPassword } = req.body
    const { valid, errors } = validateChangePassword(email, plainTextPassword, plainTextNewPassword, confirmNewPassword)

    try {

        // ถ้าเกิด error
        if (!valid) {
            //ส่ง error ไป catch
            throw new Error(errors)
        }

        // ค้นหา user จาก email
        const user = await User.findOne({ email })

        // ถ้าเจอ
        if (!user) {
            //ส่ง error ไป catch
            throw new Error(errors.email = 'Wrong Email')
        }

        // เปรียบเทียบ password เก่า กับ db
        const match = await bcrypt.compare(plainTextPassword, user.password)

        // ถ้าไม่ตรง
        if (!match) {
            //ส่ง error ไป catch
            throw new Error(errors.password = 'Wrong Password')
        }

        // hash new password
        const newPassword = await bcrypt.hash(plainTextNewPassword, 10)

        // บันทึก password ใหม่ กับ เวลาแก้ไขล่าสุด ลง db
        user.password = newPassword
        user.createdAt = new Date().toISOString()

        // บันทึก
        await user.save()

        // ส่งไป client
        res.status(200).send({ success: true })

    } catch (error) {
        // ส่งไป client
        res.status(500).send({ success: false, errors })
    }
}

exports.forgetpassword = (req, res, next) => {
    res.send('forgetpassword')
}

exports.resetpassword = (req, res, next) => {
    res.send('resetpassword')
}

const client = new OAuth2Client('454311245670-0in22j1hu72nkl2qrvjdna4i8qhnq7oo.apps.googleusercontent.com')

exports.googlelogin = (req, res, next) => {
    const { tokenId } = req.body

    client.verifyIdToken({
        idToken: tokenId,
        audience: '454311245670-0in22j1hu72nkl2qrvjdna4i8qhnq7oo.apps.googleusercontent.com'
    }).then(async res => {
        const { email_verified, name, email } = res.payload

        if (email_verified) {
            const user = await User.findOne({ email })

            if (user) {

                const token = generateToken(user)

                res.status(200).send({ success: true, id: user._id, username: user.username, token })
            } else {
                const plainTextPassword = email + SECRET_KEY
                const password = await bcrypt.hash(plainTextPassword, 10)

                // บันทึกลง db
                const result = await User.create({ username: name, email, password, createdAt: new Date().toISOString() })

                // สร้าง token
                const token = generateToken(result)

                // ส่งไป client
                res.status(200).send({ token })
            }
        }
    })
}

exports.facebooklogin = (req, res, next) => {
    const { userID, accessToken } = req.body

    const urlGraphFacebook = `https://graph.facebook.com/v2.11/${userID}/?fields=id,name,email&access_token=${accessToken}`

    fetch(urlGraphFacebook, {
        method: 'GET'
    }).then(res => res.json())
        .then(async res => {
            const { email, name } = res
            const user = await User.findOne({ email })

            if (user) {

                const token = generateToken(user)

                res.status(200).send({ success: true, id: user._id, username: user.username, token })
            } else {
                const plainTextPassword = email + SECRET_KEY
                const password = await bcrypt.hash(plainTextPassword, 10)

                // บันทึกลง db
                const result = await User.create({ username: name, email, password, createdAt: new Date().toISOString() })

                // สร้าง token
                const token = generateToken(result)

                // ส่งไป client
                res.status(200).send({ token })
            }
        })
}