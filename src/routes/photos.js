const router = require('express').Router()
const PhotoController = require('../controllers/PhotoController')
const uploadCloudinary = require('../middleware/upload-cloudinary')

router.get('/', PhotoController.index)
    .post('/', uploadCloudinary.single('photo'), PhotoController.store)

router.put('/:id', uploadCloudinary.single('photo'), PhotoController.update)
    .delete('/:id', PhotoController.delete)
    .get('/:id', PhotoController.show)

module.exports = router