const errorHandler = (error, req, res, next) => {
    const {
        code = 'ERROR',
        status = 500,
        message = '',
        description,
        errors
    } = error

    res.status(status).json({
        status: code,
        message,
        description,
        errors
    })
}

module.exports = errorHandler