import request from 'request';
import BbPromise from 'bluebird';

const requestPromise = BbPromise.promisify(request);

export default (url) => {
	return requestPromise(url);
};
