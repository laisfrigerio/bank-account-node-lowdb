
const http = require('supertest')
const app = require('../src/app')

beforeEach(async () => {
  await http(app).post('/reset')
})
