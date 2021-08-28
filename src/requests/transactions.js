const express = require('express')
const db = require('../database')
const { TRANSACTION_TYPE } = require('../const')

const router = express.Router()

const findAccount = (accountId) => {
  try {
    return db.get('accounts').find({ accountId }).value()
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

    if (!account) {
      db.get('accounts').push({ accountId: destination, amount }).write()
    } else {
      db.get('accounts').find({ accountId: destination }).assign({ amount: account.amount + amount }).write()
    }

    return res.status(201).json({ success: true })
  }

  if (type === TRANSACTION_TYPE.transfer) {
    const { destination, origin } = body
    const accountOrigin = findAccount(origin)
    const accountDestination = findAccount(destination)

    if (!accountOrigin && !accountDestination) {
      return res.status(404).json()
    }

    db.get('accounts').find({ accountId: origin }).assign({ amount: accountOrigin.amount - amount }).write()
    db.get('accounts').find({ accountId: destination }).assign({ amount: accountDestination.amount + amount }).write()

    return res.status(201).json()
  }

  if (type === TRANSACTION_TYPE.withdraw) {
    const { origin } = body
    const account = findAccount(origin)

    if (!account) {
      return res.status(404).json()
    }

    db.get('accounts').find({ accountId: origin }).assign({ amount: account.amount - amount }).write()
    return res.status(201).json({ success: true })
  }
})

module.exports = router
