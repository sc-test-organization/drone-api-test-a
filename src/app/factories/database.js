const debug = require('debug')('sc.DroneApiTestA.Database');
const config = require('config');
const connectionService = require('./mongo-connection-service');

debug(`Building MongoDB database connection for ${config.get('mongo.database')}`);

const connectionString = config.get('mongo.url');
//debug(`Opening connection to ${connectionString.replace(/(mongodb:\/\/)?(.*?:.*?)@/, "$1<REDACTED>:<REDACTED>@")}`);
debug(`Opening connection to ${connectionString}`);

module.exports = connectionService.connect(config.get('mongo.database'), config.get('mongo.url'));
