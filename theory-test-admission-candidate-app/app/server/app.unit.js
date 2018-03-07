import expect from 'expect';
import sinon from 'sinon';

import App from './app';

// set APP_SECRET to remove dependency on .env file
process.env.APPSECRET = 1234567;

describe('App class', () => {

	describe('when initialised', () => {
		it('should run all the right methods', (done) => {
			sinon.spy(App.prototype, 'setupConfig');
			sinon.spy(App.prototype, 'setupTemplating');
			sinon.spy(App.prototype, 'setupMiddleware');
			sinon.spy(App.prototype, 'setupStaticAssets');
			sinon.spy(App.prototype, 'setupRouter');
			const app = new App();
			expect(app.setupConfig.calledOnce).toBe(true);
			expect(app.setupTemplating.calledOnce).toBe(true);
			expect(app.setupMiddleware.calledOnce).toBe(true);
			expect(app.setupStaticAssets.calledOnce).toBe(true);
			expect(app.setupRouter.calledOnce).toBe(true);
			done();
		});
	});

});
