module.exports = (req, res, next) => {
  req.logout()
  res.json({ status: 'done' })
}