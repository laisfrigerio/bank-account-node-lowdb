const express = require('express')

const addTransaction = require('../repositories/add-transaction')
const editTransaction = require('../repositories/edit-transaction')
const getBalance = require('../repositories/get-balance')

const { TRANSACTION_TYPE } = require('../const')

const router = express.Router()

router.post('/event', async (req, res) => {
  const { body } = req
  const { type, amount } = body

  if (type === TRANSACTION_TYPE.deposit) {
    const { destination } = body
    const account = getBalance(destination)
    let balance = amount

    if (!account) {
      addTransaction({ id: destination, balance })
    } else {
      balance = account.balance + amount
      editTransaction(destination, { balance })
    }

    return res.status(201).json({
      destination: {
        id: destination,
        balance
      }
    })
  }

  if (type === TRANSACTION_TYPE.transfer) {
    const { destination, origin } = body
    const accountOrigin = getBalance(origin)
    const accountDestination = getBalance(destination)

    if (!accountOrigin || !accountDestination) {
      return res.status(404).json(0)
    }

    const balanceOrigin = accountOrigin.balance - amount
    const balanceDestination = accountDestination.balance + amount

    editTransaction(origin, { balance: balanceOrigin })
    editTransaction(destination, { balance: balanceDestination })

    return res.status(201).json({
      destination: {
        id: destination,
        balance: balanceDestination
      },
      origin: {
        id: origin,
        balance: balanceOrigin
      }
    })
  }

  if (type === TRANSACTION_TYPE.withdraw) {
    const { origin } = body
    const account = getBalance(origin)

    if (!account) {
      return res.status(404).json(0)
    }

    const balance = account.balance - amount
    editTransaction(origin, { balance })

    return res.status(201).json({
      origin: {
        id: origin,
        balance
      }
    })
  }
})

module.exports = router
