const debug = require('debug')('sc.DroneApiTest1.GetStadium');
const circularJSON = require('circular-json');

const stadiumRepository = require('../repositories/stadium-repository');
const assembler = require('../factories/stadium-assembler');
const ServiceError = require('../ServiceError');

module.exports = (req, res, next) => {

  return new Promise((resolve, reject) => {
    return stadiumRepository.findById(req.params.id)
      .then(result => {
        if (result) {
          debug(`Get response is ${circularJSON.stringify(result)}`);
          resolve(assembler.fromDatabaseSimple(result))
        } else
          reject(new ServiceError('Stadium not found', 404));
      })
      .catch(error => {
        reject(new ServiceError(error.message, error.statusCode ? error.statusCode : 500));
      });
  });

};
