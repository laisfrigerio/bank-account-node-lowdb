const express = require('express')
const bodyParser = require('body-parser')
const accountRoutes = require('./requests')
const balanceRoutes = require('./requests/balance')
const transactionRoutes = require('./requests/transactions')
const resetRoute = require('./requests/reset')

const app = express()
app.use(bodyParser.json())
app.use('/accounts', accountRoutes)
app.use(balanceRoutes)
app.use(transactionRoutes)
app.use(resetRoute)

module.exports = app
