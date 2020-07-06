module.exports = (req, res, next) => {
  req.logout()
  req.session.destroy()
  next()
  // store.destroy(sid, callback)
}