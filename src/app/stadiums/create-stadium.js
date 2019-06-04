const debug = require('debug')('sc.DroneApiTest1.CreateStadium');
const circularJSON = require('circular-json');

const stadiumRepository = require('../repositories/stadium-repository');
const assembler = require('../factories/stadium-assembler');

module.exports = (req, res, next) => {
  debug(`Request for stadium is ${circularJSON.stringify(req.body)}`);

  const dto = assembler.toDatabase(req.body);
  debug(`dto is ${circularJSON.stringify(dto)}`);

  return new Promise((resolve, reject) => {
    return stadiumRepository.create(dto)
      .then(results => {
        debug(`Create response is ${circularJSON.stringify(results)}`);
        resolve(assembler.fromDatabase(results))
      })
      .catch(error => {
        if (error.code && error.code === 11000) {
          const newError = new Error(`Stadium exists`);
          newError.statusCode = 409;
          reject(newError);
        } else {
          debug(`Error for service ${req.body.service} is ${circularJSON.stringify(error)}`);
          reject(error);
        }
      });
  });

};
