/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.table('property_files', tbl => {
    tbl.string('tags');
  })
  .table('event_files', tbl => {
    tbl.string('tags');
  })
  .table('property_events', tbl => {
    tbl.string('tags');
  })
  .table('properties', tbl => {
    tbl.string('tags');
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.table('property_files', tbl => {
    tbl.dropColumn('tags');
  })
  .table('event_files', tbl => {
    tbl.dropColumn('tags');
  })
  .table('property_events', tbl => {
    tbl.dropColumn('tags');
  })
  .table('properties', tbl => {
    tbl.dropColumn('tags');
  });
};
