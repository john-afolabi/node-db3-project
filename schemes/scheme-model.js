const db = require("../data/db-config");

function find() {
  return db("schemes");
}

function findById(id) {
  return db("schemes")
    .where({ id })
    .first();
}

function findSteps(scheme_id) {
  return db("steps")
    .join("schemes", "steps.scheme_id", "schemes.id")
    .where({ scheme_id })
    .select(
      "steps.id",
      "schemes.scheme_name",
      "steps.step_number",
      "steps.instructions"
    )
    .orderBy("steps.step_number");
}

function add(scheme) {
  return db("schemes")
    .insert(scheme)
    .then(([id]) => findById(id));
}

function addStep(step, scheme_id) {
  return db("steps")
    .insert(step, scheme_id)
    .then(([id]) => findSteps(scheme_id));
}

function update(changes, id) {
  return db("schemes")
    .where({ id })
    .update(changes)
    .then(count => (count > 0 ? findById(id) : null));
}

function remove(id) {
  return db("schemes")
    .where({ id })
    .del();
}

module.exports = {
  find,
  findById,
  findSteps,
  add,
  addStep,
  update,
  remove
};
