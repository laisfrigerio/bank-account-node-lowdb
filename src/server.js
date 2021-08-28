const express = require('express')
const bodyParser = require('body-parser')
const accountRoutes = require('./requests')

const PORT = process.env.PORT || 3000

const app = express()
app.use(bodyParser.json())
app.use('/accounts', accountRoutes)
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`))
