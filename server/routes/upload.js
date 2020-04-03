const path = require('path')
const multer = require('multer')
const uuidv4 = require('uuid/v4')
const express = require('express')
const imagemin = require('imagemin')
const imageminMozjpeg = require('imagemin-mozjpeg')
const imageminPngquant = require('imagemin-pngquant')
const sharp = require('sharp')
const router = express.Router()
const utils = require('../utils')

// https://appdividend.com/2019/02/14/node-express-image-upload-and-resize-tutorial-example/#Step_6_Create_fileupload_middleware



const storageConfig = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, '../uploads'))
    },
    filename: (req, file, cb) => {
        cb(null, `${uuidv4()}.${utils.extractFileExt(file.originalname)}`)
    }
})


const memoryStorageConfig = multer.memoryStorage()


const fileFilter = (req, file, cb) => {
    if (file.mimetype === "image/png" ||
        file.mimetype === "image/jpg" ||
        file.mimetype === "image/jpeg") {
        cb(null, true)
    } else {
        cb({
            status: 415,
            code: 'WRONG_FILE_TYPE',
            message: 'only images image/png, image/jpg, image/jpeg'
        }, false)
    }
}


const upload = multer({
    storage: memoryStorageConfig, //storageConfig,
    fileFilter
}).array('attachments', 2)


const uploadImages = (req, res, next) => {
    upload(req, res, (err) => {
        // Ошибки multer
        if (err) {
            const { status = 422, code, message } = err
            next(utils.error(status, code, message))
            return
        }

        // Остальные ошибки
        if (!req.files.length) {
            next(utils.error(500, 'NO_FILES', 'no files to download'))
            return
        }

        // нет ошибок, передаем управление слудующей middleware
        // при этом в req.files будет существовать
        next()
    })
}

const extractBufferFilesFromMulter = (req, res, next) => {
    req.processedFiles = req.files.map(file => ({
        filename: `${uuidv4()}`,
        ext: `${utils.extractFileExt(file.originalname)}`,
        buffer: file.buffer
    }))

    next()
}

const resizeImages = async (width, processedFiles, next) => {
    const files = []

    for (const file of processedFiles) {
        try {
            const buffer = await sharp(file.buffer)
                .resize({
                    width
                })
                .toBuffer()

            files.push({
                ...file,
                buffer
            })
        } catch (err) {
            next(utils.error(422, 'IMAGE_RESIZE_ERROR', err.message))
            return
        }
    }

    return files
}


const compressImages = async (processedFiles, next) => {
    const files = []

    for (const file of processedFiles) {
        try {
            const buffer = await imagemin.buffer(file.buffer, {
                plugins: [
                    imageminMozjpeg({
                        quality: 80,
                        progressive: true
                    }),
                    imageminPngquant({
                        quality: [0.8, 0.8]
                    })
                ]
            })

            files.push({
                ...file,
                buffer
            })
        } catch (err) {
            next(utils.error(422, 'UPLOADING_FILE_ERROR', err.message))
            return
        }
    }

    return files
}

const saveFiles = async (path, prefix, processedFiles, next) => {
    const files = []

    for (const file of processedFiles) {
        try {
            const filepath = `${path}${file.filename}${prefix}.${file.ext}`
            const save = await sharp(file.buffer)
                .toFile(filepath)

            files.push(filepath)
        } catch (err) {
            next(utils.error(500, 'SAVE_UPLOAD_FILE_ERROR', 'sharp save'))
        }
    }

    return files
}


const saveImages = async (req, res, next) => {
    const thumb_width = 250
    const sm_width = 400
    const lg_width = 960

    const thumb = await resizeImages(thumb_width, req.processedFiles, next)
        .then(files => compressImages(files, next))
        .then(files => saveFiles('uploads/', '_thumb', files, next))

    const sm = await resizeImages(sm_width, req.processedFiles, next)
        .then(files => compressImages(files, next))
        .then(files => saveFiles('uploads/', '_sm', files, next))

    const lg = await resizeImages(lg_width, req.processedFiles, next)
        .then(files => compressImages(files, next))
        .then(files => saveFiles('uploads/', '_lg', files, next))

    res.json({
        result: {
            thumb,
            sm,
            lg
        }
    })
}


router.post('/',
    uploadImages,
    extractBufferFilesFromMulter,
    saveImages
)


module.exports = router