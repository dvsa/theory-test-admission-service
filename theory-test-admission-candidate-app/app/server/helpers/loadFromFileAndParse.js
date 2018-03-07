import loadFromFile from './loadFromFile';

export default (file) => {
	return loadFromFile(file).then((data) => {
		const parsedData = JSON.parse(data);
		return parsedData;
	});
};
