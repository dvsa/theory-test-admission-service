import ConfigService from '../services/configService';

const runningLocally = ConfigService.IsRunningLocally();
const assets = ConfigService.GetAssets();

export default (recordFileName) => {
	return runningLocally ?
		`public/mock-data/${recordFileName}` :
		`${assets}public/mock-data/${recordFileName}`;
};
