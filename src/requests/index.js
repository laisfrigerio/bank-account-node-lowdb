const express = require('express')
const getAllBalance = require('../repositories/get-all-balance')

const router = express.Router()

router.get('/', async (req, res) => {
  const accounts = getAllBalance()
  res.status(200).json([ ...accounts ])
})

module.exports = router
