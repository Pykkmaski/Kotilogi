/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema
    .withSchema('service_types')
    .createTable('heating_distribution_service_type', tbl => {
      tbl.increments('id');
      tbl.string('label', 32).notNullable().unique();
    })
    .then(async () => {
      await knex('service_types.heating_distribution_service_type').insert([
        { label: 'Termostaatin vaihto' },
        { label: 'Ilmaus' },
        { label: 'Muu' },
      ]);
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.withSchema('service_types').dropTable('heating_distribution_service_type');
};
