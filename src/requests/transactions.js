const express = require('express')

const deposit = require('../actions/deposit')
const transfer = require('../actions/transfer')
const withdraw = require('../actions/withdraw')

const { TRANSACTION_TYPE } = require('../const')

const router = express.Router()

router.post('/event', async (req, res) => {
  const { body } = req
  const { type } = body

  if (type === TRANSACTION_TYPE.deposit) {
    response = deposit(body)
    return res.status(201).json(response)
  }

  if (type === TRANSACTION_TYPE.transfer) {
    const response = transfer(body)

    if (!response) {
      return res.status(404).json(0)
    }

    return res.status(201).json(response)
  }

  if (type === TRANSACTION_TYPE.withdraw) {
    const response = withdraw(body)

    if (!response) {
      return res.status(404).json(0)
    }

    return res.status(201).json(response)
  }
})

module.exports = router
