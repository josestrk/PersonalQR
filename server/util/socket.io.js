var clients = {};


module.exports = function(http) {
	var io = require('socket.io')(http);
	io.set('transports', ['websocket',
		'flashsocket',
		'htmlfile',
		'xhr-polling',
		'jsonp-polling',
		'polling']);

	io.on('connection', function(socket) {
		clients[socket.id] = true;
		socket.on('disconnect', function() {
			delete clients[socket.id];
		});
	});

	io.emitOthers = function(event, data, ownerIdSocket) {
		if (ownerIdSocket) {
			for(var idSocket in clients) {
				if (idSocket !== ownerIdSocket) {
					var socket = io.sockets.connected[idSocket];
					socket.emit(event, data);
				}
			}
		}
	};

	return io;

};
