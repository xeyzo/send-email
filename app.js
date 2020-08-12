require('dotenv').config()
const express = require('express')
const app = express()
const port = process.env.PORT | 3000
const userRoute = require('./src/routes/users')
const photoRoute = require('./src/routes/photos')
const commentRoute = require('./src/routes/comments')
const authRoute = require('./src/routes/auth')
const auth = require('./src/middleware/auth')

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/users', auth, userRoute)
app.use('/photos', auth, photoRoute)
app.use('/comments', auth, commentRoute)
app.use('/auth', authRoute)

app.listen(port, () => console.log('Listened on port ' + port))