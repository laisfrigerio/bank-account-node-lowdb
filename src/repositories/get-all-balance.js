const db = require('../database')

const getAllBalance = () => {
  return db.get('accounts').value()
}

module.exports = getAllBalance
