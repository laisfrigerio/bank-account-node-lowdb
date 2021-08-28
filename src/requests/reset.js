const express = require('express')
const db = require('../database')

const router = express.Router()

router.post('/reset', async (req, res) => {
  try {
    db.set('accounts', []).write()
    return res.status(200).json({ success: true })
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message })
  }
})

module.exports = router
