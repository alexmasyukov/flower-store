module.exports = async function(req, res, next) {
  if (req.user) return next()
  res.send(401)
}