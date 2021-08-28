const express = require('express')
const db = require('../database')

const router = express.Router()

router.get('/', async (req, res) => {
  const accounts = db.get('accounts')
    .value()

  res.status(200).json([ ...accounts ])
})

module.exports = router
