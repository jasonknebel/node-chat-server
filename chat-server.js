var redis = require("redis").createClient();
// This assumes the default redis port and localhost
// of course in production this code needs configuration.
redis.subscribe('/messages/new');

var io = require('socket.io').listen(process.env.PORT || 5001);
io.on('connection', function(socket){
  console.log('connected socket')
    socket.on('disconnect', function(){
    console.log('client disconnected')
    socket.disconnect();
  });
});

redis.on('message', function(channel, message){
  io.sockets.emit(channel, message);
  console.log('emit '+ channel);
});
