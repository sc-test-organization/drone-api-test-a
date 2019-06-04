const debug = require('debug')('sc.DroneApiTestA.MongoDBConnectionService');

debug('Build MongoDBConnectionService');

const MongoDBConnectionService = require('@sharecare/mongo');

module.exports = MongoDBConnectionService();
