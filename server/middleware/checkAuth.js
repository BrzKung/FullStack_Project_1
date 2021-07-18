const jwt = require('jsonwebtoken')
const { SECRET_KEY } = require('../../config')
const User = require('../models/User')

// ตรวจสอบโทเค่นก่อนเข้าสู่หน้าหลัก
module.exports.checkAuth = async (req, res, next) => {
    let token

    // ถ้ามี req.headers.authorization และขึ้นตต้นด้วย BrzKung
    if (req.headers.authorization && req.headers.authorization.startsWith('BrzKung')) {
        // แยกโทเค่น แล้วเอาส่วนด้าานหลัง
        token = req.headers.authorization.split(' ')[1]
    }

    // ถ้าไม่มี token
    if (!token) {
        return next(new Error('Not authorized, Not found the Token'))
    }

    try {

        // ตรวจสอบโทเค่น
        const decoded = jwt.verify(token, SECRET_KEY)

        // ค้นหาว่า user ที่ login อยู่ในระบบหรือไม่
        const user = await User.findById(decoded.id)

        // ถ้าไม่มี
        if (!user) {
            return next(new Error('No user found'))
        }

        // req.user = user

        next()

    } catch (error) {
        return next(new Error('Not authorized, Error!!'))
    }
}