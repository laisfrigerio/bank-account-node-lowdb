const PORT = process.env.PORT || 3000

const TRANSACTION_TYPE = {
  deposit: 'deposit',
  transfer: 'transfer',
  withdraw: 'withdraw'
}

module.exports.PORT = PORT
module.exports.TRANSACTION_TYPE = TRANSACTION_TYPE
