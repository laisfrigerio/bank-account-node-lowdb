const http = require('supertest')
const app = require('../src/app')
const { TRANSACTION_TYPE } = require('../src/const')

describe('Balance', () => {
  it('Get balance for non-existing account', async () => {
    await http(app)
      .get('/balance?account_id=1234')
      .then((response) => {
        expect(response.status).toEqual(404)
      })
  })

  // it('Get balance for existing account', async () => {
  //   const payload = {
  //     destination: 1,
  //     amount: 100,
  //     type: TRANSACTION_TYPE.deposit
  //   }

  //   await http(app)
  //     .post('/event')
  //     .send(payload)
  //     .then((response) => {
  //       expect(response.status).toEqual(201)
  //     })

  //   await http(app)
  //     .get('/balance?account_id=1')
  //     .then((response) => {
  //       expect(response.status).toEqual(200)
  //       expect(response.body).toEqual(100)
  //     })
  // })
})