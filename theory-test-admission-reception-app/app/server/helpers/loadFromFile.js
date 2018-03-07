import { readFile } from 'fs';
import BbPromise from 'bluebird';

const readFilePromise = BbPromise.promisify(readFile);

export default (fileName) => {
	return readFilePromise(fileName);
};
