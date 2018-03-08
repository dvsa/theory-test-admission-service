import Json2csvStream from 'json2csv-stream';
import { createReadStream } from 'fs';
import request from 'request';

import ConfigService from '../services/configService';

const runningLocally = ConfigService.IsRunningLocally();
let fileStream;

// Returns a promise to be handled by consumer
export default (jsonFile) => {
	// Create the parsing stream with default options
	const parser = new Json2csvStream();
	// Get the file
	if (!runningLocally) {
		try {
			fileStream = request(jsonFile);
			return fileStream.pipe(parser);
		} catch (err) {
			// TODO Convert to Winston console.log(`Error fetching remote json file: ${jsonFile}, ${err}`);
		}
	}
	fileStream = createReadStream(jsonFile);
	return fileStream.pipe(parser);
};
