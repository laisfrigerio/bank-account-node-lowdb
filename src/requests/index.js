const express = require('express')
const db = require('../database')

const router = express.Router()

router.get('/', async (req, res) => {
  const accounts = db.get('accounts')
    .value()

  res.status(200).json([ ...accounts ])
})

router.post('/', async (req, res) => {
  const { body } = req
  db.get('accounts')
    .push(body)
    .write()

    res.status(200).json({ success: true })
})

module.exports = router
