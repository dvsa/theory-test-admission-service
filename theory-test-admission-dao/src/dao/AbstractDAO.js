const AWS = require('../AWSConfig');
const daoUtils = require('../DAOUtils');

const dynamoDB = new AWS.DynamoDB({
	apiVersion: '2012-08-10'
});

class AbstractDAO {
	constructor(tableName, primaryKey, DB) {
		this.tableName = tableName;
		this.primaryKey = primaryKey;
		console.log(DB);
		this.database = DB || new AWS.DynamoDB.DocumentClient({ params: { TableName: this.tableName }, service: dynamoDB });
		console.log('the database being used is: ', this.database);
	}

	save(entity, callback) {
		const entityNoMethods = daoUtils.createObjectWithoutMethods(entity);
		const params = {
			Item: entityNoMethods,
			ReturnValues: 'ALL_OLD'
		};
		this.database.put(params, (err, retVal) => {
			if (err) {
				callback(err, retVal);
			} else {
				callback(err, entityNoMethods);
			}
		});
	}

	update(entity, entityKeyValue, entityKeyName, primaryKeyName, primaryKeyValue, callback) {
		const key = {};
		if (primaryKeyName && primaryKeyValue) {
			key[primaryKeyName] = primaryKeyValue;
		}
		key[entityKeyName] = entityKeyValue;
		const updateExp = daoUtils.getUpdateExpression(entity, primaryKeyName, entityKeyName);
		const updateVals = daoUtils.getUpdateExpressionValues(entity, primaryKeyName, entityKeyName);
		const params = {
			Key: key,
			UpdateExpression: `${updateExp}`,
			ExpressionAttributeValues: updateVals,
			ReturnValues: 'ALL_NEW'
		};
		this.database.update(params, (err, retVal) => {
			if (err) {
				callback(err, retVal);
			} else {
				callback(err, retVal.Attributes);
			}
		});
	}

	delete(deleteKeyValue, deleteKeyName, primaryKeyName, primaryKeyValue, callback) {
		const key = {};
		if (primaryKeyName) {
			key[primaryKeyName] = primaryKeyValue;
		}
		key[deleteKeyName] = deleteKeyValue;
		const params = {
			Key: key,
			ReturnValues: 'ALL_OLD'
		};
		this.database.delete(params, (err, retVal) => {
			if (err) {
				callback(err, retVal);
			} else {
				callback(err, retVal.Attributes);
			}
		});
	}
}

module.exports = AbstractDAO;
