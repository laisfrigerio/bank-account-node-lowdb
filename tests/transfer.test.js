const http = require('supertest')
const app = require('../src/app')
const { TRANSACTION_TYPE } = require('../src/const')

describe('Deposit', () => {
  it('Transfer from non-existing account', async () => {
    const payload = {
      origin: 101,
      destination: 100,
      amount: 15,
      type: TRANSACTION_TYPE.transfer
    }

    await http(app)
      .post('/event')
      .send(payload)
      .then((response) => {
        expect(response.status).toEqual(404)
        expect(response.body).toEqual(0)
      })
  })

  it('Transfer from existing account', async () => {
    const accountOrigin = {
      destination: 100,
      amount: 100,
      type: TRANSACTION_TYPE.deposit
    }

    const accountDestination = {
      destination: 200,
      amount: 200,
      type: TRANSACTION_TYPE.deposit
    }

    const payloadTranfer = {
      origin: 100,
      destination: 200,
      amount: 50,
      type: TRANSACTION_TYPE.transfer
    }

    await http(app).post('/event').send(accountOrigin)
    await http(app).post('/event').send(accountDestination)

    await http(app)
      .post('/event')
      .send(payloadTranfer)
      .then((response) => {
        expect(response.status).toEqual(201)
        expect(response.body).toStrictEqual({ origin: { id: 100, balance: 50 }, destination: { id: 200, balance: 250 }})
      })
  })
})