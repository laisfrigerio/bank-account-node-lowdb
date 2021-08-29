const db = require('../database')

const getBalance = (id) => {
  try {
    return db.get('accounts').find({ id }).value()
  } catch (err) {
    return null
  }
}

module.exports = getBalance
