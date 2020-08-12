const { Photo, User, Comment } = require('../models')
const response = require('../helpers/response')

class PhotoController {
    static async index (req, res) {
        try {
            const photos = await Photo.findAll({
                include: [
                    { model: User, as: 'user' },
                    { model: Comment, as: 'comment' }
                ]
            })
            res.status(200).json(response('success', 'photos data', photos))
        } catch (error) {
            res.status(500).json(response('fail', error))
        }
    }

    static async store (req, res) {
        req.body.url = req.file.path
        req.body.contactId = req.userId
        try {
            const photo = await Photo.create({ ...req.body })
            res.status(201).json(response('success', 'photo saved & uploaded', photo))
        } catch (error) {
            res.status(500).json(response('fail', error))
        }
    }

    static async show (req, res) {
        try {
            const photo = await Photo.findOne({
                where: {
                    id: req.params.id
                },
                include: [
                    { model: User, as: 'user' }
                ]
            })
            if (!photo) return res.status()
            res.json(response('success', 'get photo by id', photo))
        } catch (error) {
            res.json(response('fail', error))
        }
    }

    static async update (req, res) {
        const photo = await Photo.findByPk(req.params.id)
        if(!photo) return res.status(404).json(response('fail', 'photo not found'))

        if (req.file) {
            photo.url = req.file.path
        }
        photo.caption = req.body.caption
        photo.contactId = req.userId
        try {
            await photo.save()
            res.status(200).json(response('success', 'photo updated', photo))
        } catch (error) {
            res.status(500).json(response('fail', 'failed updating photo'))
        }
    }

    static async delete (req, res) {
        const photo = await Photo.findByPk(req.params.id)
        if (!photo) return res.status(404).json('fail', 'photo not found')
        try {
            await photo.destroy()
            res.status(200).json(response('success', 'photo deleted'))
        } catch (error) {
            res.status(500).json(response('fail', error))
        }
    }
}

module.exports = PhotoController
