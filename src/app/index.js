const debug = require('debug')('sc.DroneApiTestA.Router');

const app = require('./factories/express-app');
const config = require('config');

const request = require('./factories/request');
const swaggerSpec = require('./factories/swagger-spec');
const MaestroAuthorization = require('@sharecare/maestro-authorization');
const authService = new MaestroAuthorization(config.maestro.orchestration.scope, config.maestro.orchestration.host, request);
const swaggerValidator = require('./validators/swagger-validator');

const createStadium = require('./stadiums/create-stadium');
const getStadium = require('./stadiums/get-stadium');
const findStadiums = require('./stadiums/find-stadiums');

const prometheus = require('@sharecare/prometheus-client');
app.use(prometheus.middleware()); // defaults to serving at '/metrics'

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

const details = {
  username: process.env.MAESTRO_MONGO_DRONEAPITEST1_USERNAME,
  password: process.env.MAESTRO_MONGO_DRONEAPITEST1_PASSWORD,
  connectionString: process.env.MAESTRO_MONGO_DRONEAPITEST1_CONNSTR
};

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
 *   Stadium:
 *     type: object
 *     required:
 *      - name
 *      - team
 *      - city
 *      - state
 *     properties:
 *       name:
 *         type: string
 *         description: |
 *             The full name of the stadium, such as "Yankee Stadium".
 *       team:
 *         type: string
 *         description: |
 *             The full name of the team that plays in the stadium, such as "New York Yankees".
 *       city:
 *         type: string
 *         description: |
 *             The city where the stadium is located, such as "Log Angeles".
 *       state:
 *         type: string
 *         description: |
 *             The two-letter abbreviation for the state where the stadium is located, such as "GA".
 *   BasicStadiumResponse:
 *     type: object
 *     required:
 *      - name
 *      - team
 *      - city
 *      - state
 *     properties:
 *       name:
 *         type: string
 *         description: |
 *             The full name of the stadium, such as "Yankee Stadium".
 *       team:
 *         type: string
 *         description: |
 *             The full name of the team that plays in the stadium, such as "New York Yankees".
 *       city:
 *         type: string
 *         description: |
 *             The city where the stadium is located, such as "Log Angeles".
 *       state:
 *         type: string
 *         description: |
 *             The two-letter abbreviation for the state where the stadium is located, such as "GA".
 *   StadiumResponse:
 *     type: object
 *     required:
 *      - id
 *      - name
 *      - team
 *      - city
 *      - state
 *     properties:
 *       id:
 *         type: string
 *         description: |
 *             The Id of the stadium
 *       name:
 *         type: string
 *         description: |
 *             The full name of the stadium, such as "Yankee Stadium".
 *       team:
 *         type: string
 *         description: |
 *             The full name of the team that plays in the stadium, such as "New York Yankees".
 *       city:
 *         type: string
 *         description: |
 *             The city where the stadium is located, such as "Log Angeles".
 *       state:
 *         type: string
 *         description: |
 *             The two-letter abbreviation for the state where the stadium is located, such as "GA".
 */

/**
 * @swagger
 * /{id}:
 *   get:
 *     summary: Gets a specific stadium
 *     operationId: getStadium
 *     tags:
 *       - Stadiums
 *     description: |
 *         Retrieves a single stadium by its unique Id
 *     produces:
 *       - application/json
 *     security:
 *       - bearer: []
 *     parameters:
 *       - name: stadiumId
 *         in: path
 *         required: true
 *         description: |
 *             The Id of the stadium to retrieve
 *     responses:
 *       '200':
 *         description: Request successfully processed
 *         type: array
 *         schema:
 *           $ref: '#/definitions/BasicStadiumResponse'
 *           description: The stadium corresponding to the Id
 *       '401':
 *         description: Unauthorized request, review request and try again
 *         schema:
 *           $ref: '#/definitions/ErrorResponse'
 *       '403':
 *         description: Access to resource forbidden, review request and try again
 *         schema:
 *           $ref: '#/definitions/ErrorResponse'
 *       '404':
 *         description: Database Does not exist
 *         schema:
 *           $ref: '#/definitions/ErrorResponse'
 *       '500':
 *         description: Unexpected error while processing request, try again later
 *         schema:
 *           $ref: '#/definitions/ErrorResponse'
 *       '503':
 *         description: Cannot reach service, try again later
 *         schema:
 *           $ref: '#/definitions/ErrorResponse'
 */
app.get('/:id',
  trace('GET /:id'),
  (req, res, next) => {
    getStadium(req, res, next)
      .then(response => res.status(200).json(response))
      .catch(handleError(next));
  });

/**
 * @swagger
 * /:
 *   get:
 *     summary: Searches for stadiums
 *     operationId: findStadiums
 *     tags:
 *       - Stadiums
 *     description: |
 *         Search for the list of stadiums matching the search criteria
 *     produces:
 *       - application/json
 *     security:
 *       - bearer: []
 *     responses:
 *       '200':
 *         description: Request successfully processed
 *         type: array
 *         items:
 *           $ref: '#/definitions/StadiumResponse'
 *           description: Response list of stadiums matching the search criteria
 *       '401':
 *         description: Unauthorized request, review request and try again
 *         schema:
 *           $ref: '#/definitions/ErrorResponse'
 *       '403':
 *         description: Access to resource forbidden, review request and try again
 *         schema:
 *           $ref: '#/definitions/ErrorResponse'
 *       '404':
 *         description: Database Does not exist
 *         schema:
 *           $ref: '#/definitions/ErrorResponse'
 *       '500':
 *         description: Unexpected error while processing request, try again later
 *         schema:
 *           $ref: '#/definitions/ErrorResponse'
 *       '503':
 *         description: Cannot reach service, try again later
 *         schema:
 *           $ref: '#/definitions/ErrorResponse'
 */
app.get('/',
  trace('GET /'),
  (req, res, next) => {
    findStadiums(req, res, next)
      .then(response => res.status(200).json(response))
      .catch(handleError(next));
  });

/**
 * @swagger
 * /:
 *   put:
 *     summary: Create a new stadium
 *     operationId: createStadium
 *     tags:
 *       - Stadiums
 *     description: |
 *         Creates a new stadium
 *     produces:
 *       - application/json
 *     security:
 *       - bearer: []
 *     parameters:
 *       - name: body
 *         in: body
 *         required: true
 *         schema:
 *           $ref: '#/definitions/Stadium'
 *         description: |
 *             Payload to create a new stadium
 *     responses:
 *       '200':
 *         description: Database successfully provisioned
 *         schema:
 *           $ref: '#/definitions/StadiumResponse'
 *           description: Response object for the provisioned database
 *       '400':
 *         description: Improperly formatted request, review request and try again
 *         schema:
 *           $ref: '#/definitions/ErrorResponse'
 *       '401':
 *         description: Unauthorized request, review request and try again
 *         schema:
 *           $ref: '#/definitions/ErrorResponse'
 *       '403':
 *         description: Access to resource forbidden, review request and try again
 *         schema:
 *           $ref: '#/definitions/ErrorResponse'
 *       '500':
 *         description: Unexpected error while processing request, try again later
 *         schema:
 *           $ref: '#/definitions/ErrorResponse'
 *       '503':
 *         description: Cannot reach service, try again later
 *         schema:
 *           $ref: '#/definitions/ErrorResponse'
 */
app.put('/',
  trace('PUT /'),
  swaggerValidator.validate('#/definitions/Stadium'),
  authService.authorize(req => {
    return {
      'service': 'drone-api-test-1',
      'environment': config.env === "local" ? "QA" : config.env.toUpperCase()
    }
  }),
  (req, res, next) => {
    createStadium(req, res, next)
      .then(response => res.status(200).json(response))
      .catch(handleError(next));
  });

module.exports = app;
