/* eslint-env mocha */
const request = require('supertest');
const { app } = require('../../server.js');
const path = require('path');
const fs = require('fs');
const assert = require('assert');

/**
 * Basic sanity checks on the dev server
 */
describe('The prototype kit', () => {

	it('should generate assets into the /public folder', () => {
		assert.doesNotThrow(() => {
			fs.accessSync(path.resolve(__dirname, '../../public/javascripts/application.js'));
			fs.accessSync(path.resolve(__dirname, '../../public/images/unbranded.ico'));
			fs.accessSync(path.resolve(__dirname, '../../public/stylesheets/application.css'));
		});
	});

	it('should send with a well formed response for the index page', (done) => {
		request(app)
			.get('/')
			.expect('Content-Type', /text\/html/)
			.expect(200)
			.end((err) => {
				if (err) {
					done(err);
				} else {
					done();
				}
			});
	});

	// TODO login integration tests with 404

});
