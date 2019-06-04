const debug = require('debug')('sc.DroneApiTest1.FindStadiums');
const circularJSON = require('circular-json');

const stadiumRepository = require('../repositories/stadium-repository');
const assembler = require('../factories/stadium-assembler');
const ServiceError = require('../ServiceError');

module.exports = (req, res, next) => {

  return new Promise((resolve, reject) => {
    return stadiumRepository.find()
      .then(results => {
        debug(`Find response is ${circularJSON.stringify(results)}`);
        resolve(assembler.fromDatabase(results))
      })
      .catch(error => {
        reject(new ServiceError(error.message, error.statusCode ? error.statusCode : 500));
      });
  });

};
