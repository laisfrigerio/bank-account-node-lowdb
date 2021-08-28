const http = require('supertest')
const app = require('../src/app')
const { TRANSACTION_TYPE } = require('../src/const')

describe('Withdraw', () => {
  it('Withdraw from non-existing account', async () => {
    const payload = {
      origin: 100,
      amount: 100,
      type: TRANSACTION_TYPE.withdraw
    }

    await http(app)
      .post('/event')
      .send(payload)
      .then((response) => {
        expect(response.status).toEqual(404)
      })
  })

  it('Withdraw from existing account', async () => {
    const payloadDeposit = {
      destination: 100,
      amount: 100,
      type: TRANSACTION_TYPE.deposit
    }

    const payloadWithdraw = {
      origin: 100,
      amount: 50,
      type: TRANSACTION_TYPE.withdraw
    }

    await http(app)
      .post('/event')
      .send(payloadDeposit)
      .then((response) => {
        expect(response.status).toEqual(200)
      })

    await http(app)
      .post('/event')
      .send(payloadWithdraw)
      .then((response) => {
        expect(response.status).toEqual(200)
      })
  })

  it('Withdraw with insufficient funds', async () => {
    const payloadDeposit = {
      destination: 100,
      amount: 100,
      type: TRANSACTION_TYPE.deposit
    }

    const payloadWithdraw = {
      origin: 100,
      amount: 500,
      type: TRANSACTION_TYPE.withdraw
    }

    await http(app)
      .post('/event')
      .send(payloadDeposit)
      .then((response) => {
        expect(response.status).toEqual(200)
      })

    await http(app)
      .post('/event')
      .send(payloadWithdraw)
      .then((response) => {
        expect(response.status).toEqual(400)
        expect(response.body.message).toEqual('Insufficient funds')
      })
  })

  it('invalid type operation', async () => {
    const payload = {
      origin: 100,
      amount: 100,
      type: 'saque'
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
