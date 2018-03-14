const AWS = require('../AWSConfig');
const daoUtils = require('../DAOUtils');

const logger = require('logger');

const dynamoDB = new AWS.DynamoDB({
	apiVersion: '2012-08-10',
	logger
});

class AbstractDAO {
	constructor(tableName, primaryKey) {
		this.tableName = tableName;
		this.primaryKey = primaryKey;
		this.database = new AWS.DynamoDB.DocumentClient({ params: { TableName: this.tableName }, service: dynamoDB });
	}

	static save(entity, tableName, callback) {
		const database = new AWS.DynamoDB.DocumentClient({ params: { TableName: tableName }, service: dynamoDB });
		const entityNoMethods = daoUtils.createObjectWithoutMethods(entity);
		const params = {
			Item: entityNoMethods,
			ReturnValues: 'ALL_OLD'
		};
		database.put(params, (err, retVal) => {
			if (err) {
				callback(err, retVal);
			} else {
				callback(err, entityNoMethods);
			}
		});
	}

	static update(entity, entityKeyValue, entityKeyName, primaryKeyName, primaryKeyValue, tableName, callback) {
		const database = new AWS.DynamoDB.DocumentClient({ params: { TableName: tableName }, service: dynamoDB });
		const key = {};
		if (primaryKeyName && primaryKeyValue) {
			key[primaryKeyName] = primaryKeyValue;
		}
		key[entityKeyName] = entityKeyValue;
		const entityNoMethods = daoUtils.createOjectWithoutMethods(entity);
		const updateExp = daoUtils.getUpdateExpression(entityNoMethods, primaryKeyName, entityKeyName);
		const updateVals = daoUtils.getUpdateExpressionValues(entityNoMethods, primaryKeyName, entityKeyName);
		const params = {
			Key: key,
			UpdateExpression: `${updateExp}`,
			ExpressionAttributeValues: updateVals,
			ReturnValues: 'ALL_NEW'
		};
		database.update(params, (err, retVal) => {
			if (err) {
				callback(err, retVal);
			} else {
				callback(err, retVal.Attributes);
			}
		});
	}

	static delete(deleteKeyValue, deleteKeyName, primaryKeyName, primaryKeyValue, tableName, callback) {
		const database = new AWS.DynamoDB.DocumentClient({ params: { TableName: tableName }, service: dynamoDB });
		const key = {};
		if (primaryKeyName) {
			key[primaryKeyName] = primaryKeyValue;
		}
		key[deleteKeyName] = deleteKeyValue;
		const params = {
			Key: key,
			ReturnValues: 'ALL_OLD'
		};
		database.delete(params, (err, retVal) => {
			if (err) {
				callback(err, retVal);
			} else {
				callback(err, retVal.Attributes);
			}
		});
	}
}

module.exports = AbstractDAO;
