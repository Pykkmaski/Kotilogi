/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema
    .withSchema('events')
    .createTable('cosmetic_renovation_target_type', tbl => {
      tbl
        .integer('target_id')
        .references('id')
        .inTable('events.targets')
        .onUpdate('CASCADE')
        .onDelete('CASCADE');
    })
    .then(async () => {
      const cosmetics = await knex('events.targets')
        .where(
          knex.raw(`
          label = 'Keittiö' 
          OR label = 'Makuuhuone' 
          OR label = 'WC' 
          OR label = 'Kodinhoitohuone' 
          OR label = 'Olohuone'
          OR label = 'Eteinen'`)
        )
        .select('id as target_id');

      await knex('events.cosmetic_renovation_target_type').insert(cosmetics);
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.withSchema('events').dropTable('cosmetic_renovation_target_type');
};
