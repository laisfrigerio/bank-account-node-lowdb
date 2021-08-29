const editTransaction = require('../repositories/edit-transaction')
const getBalance = require('../repositories/get-balance')

const withdraw = (data) => {
  const { amount, origin } = data
  const account = getBalance(origin)

  if (!account) {
    return null
  }

  const balance = account.balance - amount
  editTransaction(origin, { balance })

  return {
    origin: {
      id: origin,
      balance
    }
  }
}

module.exports = withdraw
