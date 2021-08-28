
const http = require('supertest')
const app = require('../src/app')

describe('reset data from db.json', () => {
  it('check db.json is clean', async () => {
    const payload = {
      destination: 100,
      amount: 100,
      type: 'deposit'
    }

    await http(app)
      .post('/event')
      .send(payload)
      .then((response) => {
        expect(response.status).toEqual(200)
        expect(response.body.success).toEqual(true)
      })

    await http(app)
      .get('/accounts')
      .then((response) => {
        expect(response.status).toEqual(200)
        console.log(response.body)
        expect(response.body.length).toEqual(1)
      })

    await http(app)
      .post('/reset')
      .then((response) => {
        expect(response.status).toEqual(200)
        expect(response.body.success).toEqual(true)
      })

    await http(app)
      .get('/accounts')
      .then((response) => {
        expect(response.status).toEqual(200)
        console.log(response.body)
        expect(response.body.length).toEqual(0)
      })
  })
})
