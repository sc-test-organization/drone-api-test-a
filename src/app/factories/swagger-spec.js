const config  = require('config');
const packageJson = require('../../../package.json');

const swaggerJSDoc = require('swagger-jsdoc');

const swaggerSpec = swaggerJSDoc({
  swaggerDefinition : {
    info : {
      title       : 'Drone API Test A API',
      version     : packageJson.version,
      description : packageJson.description
    },
    schemes  : [ config.get('route.scheme') ],
    host     : config.get('route.host'),
    basePath : config.get('route.path')
  },
  apis : [ `${__dirname}/../index.js` ]
});

module.exports = swaggerSpec;
