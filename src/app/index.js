const debug = require('debug')('sc.DroneApiTestA.Router');

const app = require('./factories/express-app');
//const config = require('config');

//const request = require('./factories/request');
const swaggerSpec = require('./factories/swagger-spec');
//const MaestroAuthorization = require('@sharecare/maestro-authorization');
// const authService = new MaestroAuthorization(config.maestro.orchestration.scope, config.maestro.orchestration.host, request);
// const swaggerValidator = require('./validators/swagger-validator');
//
// const createStadium = require('./stadiums/create-stadium');
// const getStadium = require('./stadiums/get-stadium');
// const findStadiums = require('./stadiums/find-stadiums');

// const prometheus = require('@sharecare/prometheus-client');
// app.use(prometheus.middleware()); // defaults to serving at '/metrics'

const trace = message => (req, res, next) => {
  debug(message);
  next();
};

const handleError = next => (err) => {
  debug('%O', err);
  next(err);
};

app.get('/swagger.json', (req, res) => {
  res.set('Content-Type', 'application/json');
  res.send(swaggerSpec);
});

/**
 * @swagger
 * securityDefinitions:
 *   bearer:
 *     type: apiKey
 *     name: authorization
 *     in: header
 * definitions:
 *   ErrorResponse:
 *     type: object
 *     properties:
 *       message:
 *         type: string
 */

app.get('/',
  trace('GET /'),
  (req, res, next) => {
    res.status(200).json({ text: 'Hello world!' });
  });

module.exports = app;
