const debug = require('debug')('sc.DroneApiTestA.HealthCheckControllerFactory');

debug('Building HealthCheckController');

const HealthCheckController = require('@sharecare/healthcheck');

const MongoDBConnectionService = require('@sharecare/mongo');
const connectionService        = require('./mongo-connection-service');

const healthCheckController = new HealthCheckController();

healthCheckController.registerHealthCheck(new MongoDBConnectionService.MongoDBHealthCheck(connectionService));

module.exports = healthCheckController;
