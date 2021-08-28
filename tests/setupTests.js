
const http = require('supertest')
const app = require('../src/app')

beforeEach(async () => {
  console.log('before each')
  await http(app).post('/reset')
})
