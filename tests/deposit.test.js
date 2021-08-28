const http = require('supertest')
const app = require('../src/app')
const { TRANSACTION_TYPE } = require('../src/const')

describe('Deposit', () => {
  it('deposit into non-existing account', async () => {
    const payload = {
      destination: 100,
      amount: 100,
      type: TRANSACTION_TYPE.deposit
    }

    await http(app)
      .get('/accounts')
      .then((response) => {
        expect(response.status).toEqual(200)
        expect(response.body.length).toEqual(0)
      })

    await http(app)
      .post('/event')
      .send(payload)
      .then((response) => {
        expect(response.status).toEqual(200)
        expect(response.body.success).toEqual(true)
      })
  })

  it('deposit into existing account', async () => {
    const payload = {
      destination: 101,
      amount: 100,
      type: TRANSACTION_TYPE.deposit
    }

    await http(app)
      .post('/event')
      .send(payload)
      .then((response) => {
        expect(response.status).toEqual(200)
        expect(response.body.success).toEqual(true)
      })

    await http(app)
      .post('/event')
      .send(payload)
      .then((response) => {
        expect(response.status).toEqual(200)
        expect(response.body.success).toEqual(true)
      })
  })

  it('invalid type operation', async () => {
    const payload = {
      destination: 100,
      amount: 100,
      type: 'deposito'
    }

    await http(app)
      .post('/event')
      .send(payload)
      .then((response) => {
        expect(response.status).toEqual(400)
        expect(response.body.success).toEqual(false)
        expect(response.body.message).toEqual('Type operation is invalid')
      })
  })
})