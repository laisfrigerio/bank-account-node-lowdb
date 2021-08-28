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

  if (!Object.keys(TRANSACTION_TYPE).includes(type)) {
    return res.status(400).json({ success: false, message: 'Type operation is invalid' })
  }

  if (type === TRANSACTION_TYPE.deposit) {
    const { destination } = body
    const account = findAccount(destination)

    if (!account) {
      db.get('accounts').push({ accountId: destination, amount }).write()
    } else {
      db.get('accounts').find({ accountId: destination }).assign({ amount: account.amount + amount }).write()
    }

    return res.status(200).json({ success: true })
  }

  if (type === TRANSACTION_TYPE.transfer) {
    return
  }

  if (type === TRANSACTION_TYPE.withdraw) {
    const { origin } = body
    const account = findAccount(origin)

    if (!account) {
      return res.status(404).json()
    }

    if (account.amount < amount ) {
      return res.status(400).json({ success: false, message: 'Insufficient funds' })
    }

    db.get('accounts').find({ accountId: origin }).assign({ amount: account.amount - amount }).write()
    return res.status(200).json({ success: true })
  }
})

module.exports = router
