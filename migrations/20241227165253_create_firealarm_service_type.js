/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema
    .withSchema('service_types')
    .createTable('firealarm_service_type', tbl => {
      tbl.increments('id');
      tbl.string('label', 32).notNullable().unique();
    })
    .then(async () => {
      await knex('service_types.firealarm_service_type').insert([
        { label: 'Paristojen vaihto' },
        { label: 'Muu' },
      ]);
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.withSchema('service_type').dropTable('firealarm_service_type');
};
