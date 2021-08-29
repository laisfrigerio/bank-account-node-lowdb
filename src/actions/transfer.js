const editTransaction = require('../repositories/edit-transaction')
const getBalance = require('../repositories/get-balance')

const transfer = (data) => {
  const { amount, destination, origin } = data

  const accountOrigin = getBalance(origin)
  const accountDestination = getBalance(destination)

  if (!accountOrigin || !accountDestination) {
    return null
  }

  const balanceOrigin = accountOrigin.balance - amount
  const balanceDestination = accountDestination.balance + amount

  editTransaction(origin, { balance: balanceOrigin })
  editTransaction(destination, { balance: balanceDestination })

  return {
    destination: {
      id: destination,
      balance: balanceDestination
    },
    origin: {
      id: origin,
      balance: balanceOrigin
    }
  }
}

module.exports = transfer
