const knex = require('knex')
const config = require('../config')

const db = knex(config.db)

module.exports = (req, res, next) => {
  req.db = db
  next()
}