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

    await http(app).post('/event').send(payloadDeposit)

    await http(app)
      .post('/event')
      .send(payloadWithdraw)
      .then((response) => {
        expect(response.status).toEqual(201)
        expect(response.body).toStrictEqual({ origin: { id: payloadWithdraw.origin, balance: 50 }})
      })
  })
})
