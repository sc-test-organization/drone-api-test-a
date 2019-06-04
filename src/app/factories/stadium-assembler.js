const dashify = require('dashify');

const toDatabase = (stadium) => {
  return {
    _id:   dashify(stadium.name),
    name:  stadium.name,
    team:  stadium.team,
    city:  stadium.city,
    state: stadium.state,
  };
};

const fromDatabase = (database) => {

  if (Array.isArray(database))
    return database.map(db => fromDatabase(db));
  else {
    return {
      id: database._id,
      name: database.name,
      team: database.team,
      city: database.city,
      state: database.state,
    };
  }

};

const fromDatabaseSimple = (database) => {
  return {
    name: database.name,
    team: database.team,
    city: database.city,
    state: database.state,
  };
};

module.exports = {
  toDatabase,
  fromDatabase,
  fromDatabaseSimple
};
