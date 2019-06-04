const mongo = require('../factories/database');

const schema = mongo.createSchema(
  {
    _id:   { type: String, required: true, trim: true },
    name:  { type: String, required: true, trim: true },
    team:  { type: String, required: true, trim: true },
    city:  { type: String, required: true, trim: true },
    state: { type: String, required: true, trim: true }
  },
  {
    versionKey: false,
    timestamps: true
  }
);

// We have to do this check because of testing. When mocking the @sharecare/mongo scoped
// package, tests fail because the schema isn't actually created and creating the index
// on the schema will fail. So we check to see if it has been created (and it will when
// the service is running) and skip the index creation when it hasn't been (during test
// stubbing). Kinda cheesy, but it's the simplest solution, and it works.
if (schema)
  schema.index({city: 1, state: 1}, {background: true});

const model = mongo.createModel('stadium', schema, 'Stadium');

module.exports = model;
