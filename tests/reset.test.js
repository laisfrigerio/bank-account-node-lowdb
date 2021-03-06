
const http = require('supertest')
const app = require('../src/app')
const { TRANSACTION_TYPE } = require('../src/const')

describe('reset data from db.json', () => {
  it('check db.json is cleaned', async () => {
    const payload = {
      destination: 100,
      amount: 100,
      type: TRANSACTION_TYPE.deposit
    }

    await http(app)
      .post('/event')
      .send(payload)
      .then((response) => {
        expect(response.status).toEqual(201)
      })

    await http(app)
      .get('/accounts')
      .then((response) => {
        expect(response.status).toEqual(200)
        expect(response.body.length).toEqual(1)
      })

    await http(app)
      .post('/reset')
      .then((response) => {
        expect(response.status).toEqual(200)
        expect(response.body).toEqual("OK")
      })

    await http(app)
      .get('/accounts')
      .then((response) => {
        expect(response.status).toEqual(200)
        expect(response.body.length).toEqual(0)
      })
  })
})
