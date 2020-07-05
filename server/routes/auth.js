const express = require('express')
const router = express.Router()
const passport = require('passport')
const checkAuth = require('../middlewares/checkAuth')
const logout = require('../middlewares/logout')


router.route('/logout')
  .get(logout)


router.route('/login')
  .post(
    passport.authenticate('local'),
    (req, res, next) => {
      if (req.user)
        next()
      else
        res.json({ none: '-' })
    },
    async function(req, res, next) {
      const n = req.session.views || 0
      req.session.views = n + 1
      res.end(`${n} views`)
    }
  )

router.route('/test')
  .get(
    checkAuth,
    (req, res, next) => {
      if (req.user)
        res.json(req.user)
      else
        res.status(500).json({ none: '-' })
    }
  )


module.exports = router