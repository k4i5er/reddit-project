module.exports = (sequelize, dataTypes) => {
	const alias = "Reddit"

	const cols = {
		_id: {
			type: dataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true
		},
		info: {
			type: dataTypes.JSON,
			// get() {
			// 	return JSON.parse(this.getDataValue('info'));
			// },
			// set (value) {
			// 	return this.setDataValue('info', JSON.stringify(value))
			// }
		},
		created: {
			type: dataTypes.INTEGER
		}
		
	}

	const config = {
		tableName: 'reddit',
		timestamps: false
	}

	const Reddit = sequelize.define(alias, cols, config);
	
	return Reddit;
}