const Personal = require('../models/Personal')
const User = require('../models/User')
const { validatePersonal } = require('../util/validator')
const ObjectID = require('mongoose').Types.ObjectId

// แสดงประวัติส่วนตัว
module.exports.getPersonal = async (req, res, next) => {
    let errors = {}

    try {

        // ถ้าไม่มี id ใน url
        if (!ObjectID.isValid(req.params.id)) {
            return res.status(400).send('Error, No id!!')
        }

        // ค้นหาประวัติ โดยรับค่า id ของ user
        const personal = await Personal.findOne({ user: req.params.id })

        // ถ้าเจอ
        if (personal) {
            // ส่งไป client
            res.status(200).send(personal)
        } else {
            // ไม่เจอ
            throw new Error(errors.general = 'Personal not found')
        }

    } catch (error) {
        res.status(500).send({ errors })
    }
}

// เพิ่มประวัติส่วนตัว
module.exports.addPersonal = async (req, res, next) => {
    // รับค่าประวัติส่วนตัวจาก client
    const { head, fullname, age, address, job, favorite_food } = req.body
    // เช็คค่าประวัติส่วนตัวที่รับมา
    const { valid, errors } = validatePersonal(head, fullname, age, address, job, favorite_food)


    try {

        // ถ้าไม่มี id ใน url
        if (!ObjectID.isValid(req.params.id)) {
            return res.status(400).send('Error, No id!!')
        }

        // หากเกิด error กับค่าประวัติส่วนตัวที่่รับมา
        if (!valid) {
            // ส่งไป client
            throw new Error(errors)
        }

        // ค้นหา user เพื่อเข้าถึง id และ useranme
        const user = await User.findById(req.params.id)

        // เตรียมข้อมูลก่อนบันทึก
        const doc = {
            user: user._id,
            username: user.username,
            createdAt: new Date().toISOString(),
            head, fullname, age, address, job, favorite_food
        }

        // บันทึกประวัติส่วนตัวลง db
        const personal = await Personal.create(doc)

        // ส่งประวัติส่วนตัวไป client
        res.status(200).send({ ...personal._doc })

    } catch (error) {
        res.status(500).send({ errors })
    }
}

// แก้ไขประวัติส่วนตัว
module.exports.editPersonal = async (req, res, next) => {
    // รับค่าประวัติส่วนตัวจาก client
    const { head, fullname, age, address, job, favorite_food } = req.body
    // เช็คค่าประวัติส่วนตัวที่รับมา
    const { valid, errors } = validatePersonal(head, fullname, age, address, job, favorite_food)

    try {

        // ถ้าไม่มี id ใน url
        if (!ObjectID.isValid(req.params.id)) {
            return res.status(400).send('Error, No id!!')
        }

        // หากเกิด error กับค่าประวัติส่วนตัวที่่รับมา
        if (!valid) {
            // ส่งไป client
            throw new Error(errors)
        }

        // เตรียมข้อมูลที่ update
        var updateRecord = {
            createdAt: new Date().toISOString(),
            head, fullname, age, address, job, favorite_food
        }

        // ค้นหาประวัติใน db จาก id ของ user
        const personal = await Personal.findOneAndUpdate({ user: req.params.id }, { $set: updateRecord }, { new: true })

        // ส่งประวัติส่วนตัวไป client
        res.status(200).send({ ...personal._doc })

    } catch (error) {
        res.status(500).send({ errors })
    }

}
