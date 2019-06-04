const config = require('config');

const ExpressRest = require('@sharecare/express-rest');

const expressConfig     = new ExpressRest.Config(config.get('bind.port'), config.get('route.path'));
expressConfig.jsonLimit = '500kb';

const requestLocalContext = require('./request-local-context');

const healthCheck       = require('./health-check');
const healthCheckFilter = router => healthCheck.build(router);

const swaggerUi     = require('swagger-ui-express');
const swaggerSpec   = require('./swagger-spec');
const swaggerFilter = router => router.use('/api', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

module.exports = ExpressRest(expressConfig, requestLocalContext, [ healthCheckFilter, swaggerFilter ]);
