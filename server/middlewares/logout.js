module.exports = (req, res, next) => {
  req.logout()
  req.session.destroy()
  res.json({ status: 'done' })
  // store.destroy(sid, callback)

}