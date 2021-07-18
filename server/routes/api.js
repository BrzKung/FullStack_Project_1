const express = require('express')
const router = express.Router()
const { register, login, changepassword, resetpassword, forgetpassword, googlelogin, facebooklogin } = require('../controllors/api')

router.route('/register').post(register)
router.route('/login').post(login)
router.route('/changepassword').put(changepassword)
router.route('/forgetpassword').post(forgetpassword)
router.route('/resetpassword/:resetToken').put(resetpassword)

router.route('/googlelogin').post(googlelogin)
router.route('/facebooklogin').post(facebooklogin)

module.exports = router