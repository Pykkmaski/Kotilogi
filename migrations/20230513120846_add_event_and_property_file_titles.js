/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.table('property_files', tbl => {
    tbl.string('title').defaultTo('Nimetön');
  })
  .table('event_files', tbl => {
    tbl.string('title').defaultTo('Nimetön');
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.table('property_files', tbl => {
    tbl.dropColumn('title');
  })
  .table('event_files', tbl => {
    tbl.dropColumn('title');
  });
};
