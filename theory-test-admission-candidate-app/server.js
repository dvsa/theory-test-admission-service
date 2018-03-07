const browserSync = require('browser-sync');

const App = require('./build/app.js');
const utils = require('./build/helpers/utils.js');

const {
	app, runningLocally, env, setupData
} = new App();

if (runningLocally) {
	// Find a free port and start the server
	utils.findAvailablePort(app, (port) => {
	// TODO replace with Winston logger
	// console.log(`Listening on port ${port}   url: http://localhost:${port}`);
		if (env === 'production') {
			app.listen(port);
			setupData();
		} else {
			app.listen(port - 50, () => {
				browserSync({
					proxy: `localhost:${port - 50}`,
					port,
					ui: false,
					files: ['public/**/*.*', 'build/views/**/*.*'],
					ghostmode: false,
					open: false,
					notify: false,
					logLevel: 'error'
				});
			});
		}
	});
}

module.exports = { app, setupData };
