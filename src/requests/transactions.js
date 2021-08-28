const express = require('express')
const db = require('../database')
const { TRANSACTION_TYPE } = require('../const')

const router = express.Router()

const findAccount = (id) => {
  try {
    return db.get('accounts').find({ id }).value()
  } catch (err) {
    return null
  }
}

router.post('/event', async (req, res) => {
  const { body } = req
  const { type, amount } = body

  if (type === TRANSACTION_TYPE.deposit) {
    const { destination } = body
    const account = findAccount(destination)
    let balance = amount

    if (!account) {
      db.get('accounts').push({ id: destination, balance }).write()
    } else {
      balance = account.balance + amount
      db.get('accounts').find({ id: destination }).assign({ balance }).write()
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
    const accountOrigin = findAccount(origin)
    const accountDestination = findAccount(destination)

    if (!accountOrigin && !accountDestination) {
      return res.status(404).json()
    }

    const balanceOrigin = accountOrigin.balance - amount
    const balanceDestination = accountDestination.balance + amount

    db.get('accounts').find({ id: origin }).assign({ balance: balanceOrigin }).write()
    db.get('accounts').find({ id: destination }).assign({ balance: balanceDestination }).write()

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
    const account = findAccount(origin)

    if (!account) {
      return res.status(404).json()
    }

    const balance = account.balance - amount
    db.get('accounts').find({ id: origin }).assign({ balance }).write()

    return res.status(201).json({
      origin: {
        id: origin,
        balance
      }
    })
  }
})

module.exports = router
