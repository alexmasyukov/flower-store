const errorHandler = (error, req, res, next) => {
    console.log('ERROR HANDLER')
    const {
        code = 'ERROR',
        status = 500,
        message = '',
        description,
        errors
    } = error

    res.status(status).json({
        code,
        message,
        description,
        errors
    })
}

module.exports = errorHandler