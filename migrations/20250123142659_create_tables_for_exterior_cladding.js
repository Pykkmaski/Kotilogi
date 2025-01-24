/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return new Promise(async (resolve, reject) => {
    try {
      await knex.schema.withSchema('types').createTable('exterior_cladding_material_type', tbl => {
        tbl.increments('id');
        tbl.string('label', 32).notNullable().unique();
      });

      await knex.schema
        .withSchema('public')
        .createTable('exterior_cladding', tbl => {
          tbl
            .uuid('event_id')
            .primary()
            .references('id')
            .inTable('event')
            .onUpdate('CASCADE')
            .onDelete('CASCADE');
          tbl
            .integer('exterior_cladding_material_type_id')
            .references('id')
            .inTable('types.exterior_cladding_material_type')
            .onUpdate('CASCADE');
          tbl.boolean('has_rodent_net');
        })
        .createTable('exterior_cladding_additional_insulation', tbl => {
          tbl
            .uuid('event_id')
            .primary()
            .references('event_id')
            .inTable('exterior_cladding')
            .onUpdate('CASCADE')
            .onDelete('CASCADE');
          tbl.boolean('has_wind_protection');
        })
        .createTable('exterior_cladding_wind_protection_plate', tbl => {
          tbl
            .uuid('event_id')
            .primary()
            .references('event_id')
            .inTable('exterior_cladding_additional_insulation')
            .onUpdate('CASCADE')
            .onDelete('CASCADE');
          tbl.integer('thickness').notNullable().comment('Thickness in millimeters.');
        })
        .alterTable('insulation', tbl => {
          tbl.integer('thickness').comment('Thickness in millimeters.');
          tbl.boolean('has_vapour_barrier');
          tbl.integer('insulation_material_id').nullable().alter();
        });
      resolve();
    } catch (err) {
      reject(err);
    }
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema
    .dropTableIfExists('exterior_cladding_wind_protection_plate')
    .dropTableIfExists('exterior_cladding_additional_insulation')
    .dropTableIfExists('exterior_cladding')
    .withSchema('types')
    .dropTableIfExists('exterior_cladding_material_type')
    .withSchema('public')
    .alterTable('insulation', tbl => {
      tbl.dropColumn('thickness');
      tbl.dropColumn('has_vapour_barrier');

      //This will cause migrate:down, or migrate:rollback, past this migration, to fail, if there are entries with null as the material.
      tbl.integer('insulation_material_id').notNullable().alter();
    });
};
