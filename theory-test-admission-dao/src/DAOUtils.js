const getAllPropertiesNotMethods = (object) => {
	return Object.getOwnPropertyNames(object).sort().filter((prop, index, arr) => {
		return (prop !== arr[index + 1] && typeof object[prop] !== 'function');
	});
};

const createObjectWithoutMethods = (entity) => {
	const objectWithoutMethods = {};
	getAllPropertiesNotMethods(entity).forEach((prop) => {
		objectWithoutMethods[prop] = entity[prop];
	});
	return objectWithoutMethods;
};

const getUpdateExpression = (entity, primaryKey, sortKey) => {
	let UpdateExpression = 'set ';
	const props = Object.getOwnPropertyNames(entity);
	props
		.filter((prop) => {
			return prop !== primaryKey;
		})
		.filter((prop) => {
			return sortKey !== undefined && prop !== sortKey;
		})
		.forEach((prop) => {
			if (entity[`${prop}`] !== undefined) {
				UpdateExpression += `${prop}= :${prop}, `;
			}
		});
	return UpdateExpression.slice(0, -2);
};

const getUpdateExpressionValues = (entity, primaryKey, sortKey) => {
	const UpdateValues = {};
	const props = Object.getOwnPropertyNames(entity);
	props
		.filter((prop) => {
			return prop !== primaryKey;
		})
		.filter((prop) => {
			return sortKey !== undefined && prop !== sortKey;
		})
		.forEach((prop) => {
			if (entity[`${prop}`] !== undefined) {
				UpdateValues[`:${prop}`] = entity[prop];
			}
		});
	return UpdateValues;
};

module.exports = {
	getAllPropertiesNotMethods, createObjectWithoutMethods, getUpdateExpression, getUpdateExpressionValues
};

