/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.withSchema('heating').alterTable('service_work', tbl => {
    tbl.renameColumn('service_work_type', 'service_work_type_id');
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.withSchema('heating').alterTable('service_work', tbl => {
    tbl.renameColumn('service_work_type_id', 'service_work_type');
  });
};
