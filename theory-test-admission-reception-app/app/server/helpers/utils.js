import ConfigService from './../services/configService';

// Core dependencies
const fs = require('fs');

// NPM dependencies
const path = require('path');
const portScanner = require('portscanner');
const prompt = require('prompt');

// Find an available port to run the server on
exports.findAvailablePort = function anonFunc(app, callback) {
	let port = null;

	// When the server starts, we store the port in .port.tmp so it tries to restart
	// on the same port
	try {
		port = Number(fs.readFileSync(path.join(__dirname, '/../.port.tmp')));
	} catch (e) {
		port = ConfigService.GetPort();
	}
	port = 3000;

	// Check port is free, else offer to change
	portScanner.findAPortNotInUse(port, port + 50, '127.0.0.1', (error, availablePort) => {
		if (error) { throw error; }
		if (port === availablePort) {
			// Port is free, return it via the callback
			callback(port);
		} else {
			// Port in use - offer to change to available port
			// TODO replace with Winston console.error(`ERROR: Port ${port} in use - you may have another prototype running.\n`);
			// Set up prompt settings
			prompt.colors = false;
			prompt.start();
			prompt.message = '';
			prompt.delimiter = '';

			// Ask user if they want to change port
			prompt.get([{
				name: 'answer',
				description: 'Change to an available port? (y/n)',
				required: true,
				type: 'string',
				pattern: /y(es)?|no?/i,
				message: 'Please enter y or n'
			}], (err, result) => {
				if (err) { throw err; }
				if (result.answer.match(/y(es)?/i)) {
					// User answers yes
					port = availablePort;
					fs.writeFileSync(path.join(__dirname, '/../.port.tmp'), port);
					// TODO replace with Winston console.log(`Changed to port ${port}`);

					callback(port);
				} else {
					// User answers no - exit
					// TODO replace with Winston console.log('\nYou can set a new default port in server.js, or by running the server with PORT=XXXX');
					// TODO replace with Winston console.log("\nExit by pressing 'ctrl + c'");
					process.exit(0);
				}
			});
		}
	});
};
