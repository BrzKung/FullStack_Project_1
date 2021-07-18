const express = require('express')
const { getPersonal, addPersonal, editPersonal } = require('../controllors/personal')
const { checkAuth } = require('../middleware/checkAuth')
const router = express.Router()

router.route('/:id').get(checkAuth, getPersonal)
router.route('/:id/add').post(checkAuth, addPersonal)
router.route('/:id/edit').put(checkAuth, editPersonal)

module.exports = router