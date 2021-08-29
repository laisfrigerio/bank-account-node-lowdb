const db = require('../database')

const editTransaction = (id, payload) => {
  db.get('accounts').find({ id }).assign(payload).write()
}

module.exports = editTransaction
