const db = require("../data/db-config");

function find() {
  return db("schemes");
}

function findById(id) {
  return db("schemes")
    .where({ id })
    .first();
}

function findSteps(schemeid) {
  return db("steps")
    .join("schemes", "steps.scheme_id", "schemes.id")
    .where({ schemeid })
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
  update,
  remove
};
