const cloudinary = require('../../config/cloudinary')
const { CloudinaryStorage } = require('multer-storage-cloudinary')
const multer = require('multer')

const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: 'samples',
        format: async (req, file) => file.mimetype.split('/')[1],
        public_id: (req, file) => `photo_${new Date().getHours()}${new Date().getMinutes()}${new Date().getSeconds()}${new Date().getMilliseconds()}`
    }
})

const upload = multer({ 
    storage: storage,
    fileFilter: (req, file, callback) => {
        if(file.mimetype === 'image/png' || file.mimetype === 'image/jpg' || file.mimetype === 'image/jpeg') callback(null, true)
        else {
            callback(null, false)
            return callback(new Error('File Bukan Gambar'))
        }
    }
})

module.exports = upload
