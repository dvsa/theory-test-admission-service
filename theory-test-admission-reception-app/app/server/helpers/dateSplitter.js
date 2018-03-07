
export default function (date) {
	if (date) {
		const dateStr = date.split('/');
		return {
			day: dateStr[0],
			month: dateStr[1],
			year: dateStr[2]
		};
	}
	return undefined;
}
