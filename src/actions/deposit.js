const addTransaction = require('../repositories/add-transaction')
const editTransaction = require('../repositories/edit-transaction')
const getBalance = require('../repositories/get-balance')

const deposit = (data) => {
  const { amount, destination } = data
  const account = getBalance(destination)
  let balance = amount

  if (!account) {
    addTransaction({ id: destination, balance })
  } else {
    balance = account.balance + amount
    editTransaction(destination, { balance })
  }

  return {
    destination: {
      id: destination,
      balance
    }
  }
}

module.exports = deposit
