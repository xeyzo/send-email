require('dotenv').config()
const { User, Photo } = require('../models')
const response = require('../helpers/response')
const jwt = require('jsonwebtoken')
const jwtSecret = process.env.JWT_SECRET
const bcrypt = require('bcrypt')

class AuthController {
    static async signup (req, res) {
        try {
            req.body.password = await bcrypt.hash(req.body.password, 12)
            const user = await User.create({...req.body})
            res.status(201).json(response('success', 'signup success', user))
        } catch (error) {
            res.status(500).json(response('fail', error.message))
        }
    }

    static async login (req, res) {
        const { username, password } = req.body
        try {
            const user = await User.findOne({
                where: {
                    username: username
                }
            })

            if (!user) return res.status(422).json(response('fail', 'username not found'))

            const compare = await bcrypt.compare(password, user.password)

            if (!compare) return res.status(422).json(response('fail', 'wrong password'))

            const token = jwt.sign(user.id, jwtSecret)

            res.status(200).json(response('success', 'login success', { token }))
        } catch (error) {
            res.status(500).json(response('fail', error.message))
        }
    }

    static async currentUser (req, res) {        
        try {
            const user = await User.findOne({
                where: {
                    id: req.userId
                },
                attributes: [
                    "username", "email", "fullname"
                ],
                include: [
                    { model: Photo },
                    // { model: Comment }
                ]
            })

            res.status(200).json(response('success', 'current user', user))
        } catch (error) {
            res.status(404).json(response('fail', error.message))
        }
    }
}

module.exports = AuthController
