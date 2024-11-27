/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema
    .createView('roofs.get_types', view => {
      view.as(knex.raw('SELECT json_object_agg(name, id) as result from roofs.types'));
    })
    .createView('roofs.get_materials', view => {
      view.as(knex.raw('SELECT json_object_agg(name, id) as result from roofs.materials'));
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropView('roofs.get_types').dropView('roofs.get_materials');
};
