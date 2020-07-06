module.exports = async function(req, res, next) {
  if (req.user) return next()
  return res.send(401)
}