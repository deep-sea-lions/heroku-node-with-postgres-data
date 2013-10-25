var http = require('http')
  , JSONStream = require('JSONStream')
  , db  = require('./db')

var server = http.createServer(function(req, res){
  db.readQuery('select * from notes')
    .pipe(JSONStream.stringify())
    .pipe(res)
})

server.listen(process.env.PORT || 5001, function(){
  console.log('server running')
})

