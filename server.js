/**
 * Module dependencies.
 */

const app = require('./config/app');
const debug = require('debug')('init-koa:server');
const http = require('http');

class Server {
	constructor() {
		/**
		 * Get port from environment and store in Express.
		 */

		this.port = this.normalizePort(process.env.PORT || '3000');
		// app.set('port', port);

		/**
		 * Create HTTP server.
		 */

		this.server = http.createServer(app.callback());

		this.init();
	}

	init() {
		/**
		 * Listen on provided port, on all network interfaces.
		 */

		this.server.listen(this.port);
		this.server.on('error', this.onError.bind(this));
		this.server.on('listening', this.onListening.bind(this));
	}

	/**
	 * Normalize a port into a number, string, or false.
	 */

	normalizePort(val) {
		const port = parseInt(val, 10);

		if (isNaN(port)) {
			// named pipe
			return val;
		}

		if (port >= 0) {
			// port number
			return port;
		}

		return false;
	}

	/**
	 * Event listener for HTTP server "error" event.
	 */

	onError(error) {
		if (error.syscall !== 'listen') {
			throw error;
		}

		const bind = typeof port === 'string'
			? 'Pipe ' + port
			: 'Port ' + port;

		// handle specific listen errors with friendly messages
		switch (error.code) {
			case 'EACCES':
				console.error(bind + ' requires elevated privileges');
				process.exit(1);
				break;
			case 'EADDRINUSE':
				console.error(bind + ' is already in use');
				process.exit(1);
				break;
			default:
				throw error;
		}
	}

	/**
	 * Event listener for HTTP server "listening" event.
	 */

	onListening() {
		const addr = this.server.address();
		const bind = typeof addr === 'string'
			? 'pipe ' + addr
			: 'port ' + addr.port;
		debug('Listening on ' + bind);
	}
}

new Server();
