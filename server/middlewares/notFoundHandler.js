const notFoundHandler = (req, res, next) => {
    const error = new Error('Not found')
    error.code = 'NOT_FOUND'
    error.status = 404
    next(error)
}

module.exports = notFoundHandler