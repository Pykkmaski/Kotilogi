/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema
    .withSchema('types')
    .createTable('insulation_target_type', tbl => {
      tbl.increments('id');
      tbl.string('label', 32).unique().notNullable();
    })
    .then(async () => {
      await knex('types.insulation_target_type').insert([
        { label: 'Seinät' },
        { label: 'Katon välipohja' },
      ]);
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.withSchema('types').dropTableIfExists('insulation_target_type');
};
