const express = require('express')
const db = require('../database')

const router = express.Router()

router.get('/balance', async (req, res) => {
  const { account_id } = req.query

  try {
    const account = db.get('accounts').find({ id: account_id }).value()

    if (!account) {
      return res.status(404).json()
    }

    return res.status(200).json(JSON.stringify(account.balance))
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message })
  }
})

module.exports = router
