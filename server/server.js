const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const { PORT, MONGODB } = require('../config')

const app = express()

app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(cors())
app.use('/api', require('./routes/api'))
app.use('/personal', require('./routes/personal'))

mongoose.connect(MONGODB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
}).then(
    console.log('MongoDB Connected')
).then(
    app.listen(PORT, () => console.log(`Server start on port : ${PORT}`))
)
