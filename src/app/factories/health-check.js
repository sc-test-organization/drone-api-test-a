const debug = require('debug')('sc.DroneApiTestA.HealthCheckControllerFactory');

debug('Building HealthCheckController');

const HealthCheckController = require('@sharecare/healthcheck');

const healthCheckController = new HealthCheckController();

module.exports = healthCheckController;
