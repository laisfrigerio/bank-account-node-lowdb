const path = require('path')
const lowDb = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')

const db = lowDb(new FileSync(path.resolve(__dirname, 'db.json')))

db.defaults({ accounts: [] }).write()

module.exports = db
