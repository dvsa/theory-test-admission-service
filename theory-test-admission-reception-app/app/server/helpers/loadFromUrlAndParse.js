import loadFromUrl from './loadFromUrl';

export default (url) => {
	return loadFromUrl(url).then((res) => {
		const parsedData = JSON.parse(res.body);
		return parsedData;
	});
};
