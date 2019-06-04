const debug = require('debug')('sc.DroneApiTestA.SwaggerValidator');

const Ajv = require('ajv');

const ajv         = new Ajv({removeAdditional : true});
const swaggerSpec = require('../factories/swagger-spec');
ajv.addSchema(swaggerSpec, 'swagger');

module.exports = {
  validate : schema => (req, res, next) => {
    debug('validate()');

    if (ajv.validate({$ref : `swagger${schema}`}, req.body)) {
      next();
    } else {
      const firstError = ajv.errors[ 0 ],
        path          = firstError.dataPath,
        message       = firstError.message,
        allowedValues = firstError.params.allowedValues,
        error         = new Error((path ? (path + ' : ') : '') + message + ` ${(allowedValues ? `(${allowedValues})` : '')}`);
      error.statusCode = 400;
      next(error);
    }
  }
};
