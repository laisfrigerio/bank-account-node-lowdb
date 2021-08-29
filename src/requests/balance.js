const express = require('express')
const getBalance = require('../repositories/get-balance')

const router = express.Router()

router.get('/balance', async (req, res) => {
  const { account_id } = req.query

  const account = getBalance(account_id)

  if (!account) {
    return res.status(404).json(0)
  }

  return res.status(200).json(account.balance)
})

module.exports = router
