const db = require('../database')

const addTransaction = (payload) => {
  db.get('accounts').push(payload).write()
}

module.exports = addTransaction
