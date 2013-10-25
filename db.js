var pg = require('pg')
  , ReadableStream = require('stream').Readable
  , WritableStream = require('stream').Writable

var db = {}

module.exports = db

db.url = process.env.HEROKU_POSTGRESQL_PINK_URL ||
  "postgres://localhost/herokupg"

db.readQuery = function(query) {
  var rs = new ReadableStream({objectMode:true})
  rs._read = function(){}

  pg.connect(this.url, function(err, client, done){
    if (err) { rs.emit('error', err) ; return }

    client.query(query)
      .on('error', function(err) { rs.emit('error', err) })
      .on('row', function(row) { rs.push(row) })
      .on('end', function(row) { rs.push(null) })
      .on('end', done)
  })

  return rs
}
