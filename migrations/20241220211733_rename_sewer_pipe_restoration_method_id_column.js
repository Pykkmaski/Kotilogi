/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema
    .withSchema('sewer_pipe')
    .alterTable('restoration_work', tbl =>
      tbl.renameColumn('toteutusTapaId', 'restoration_method_type_id')
    );
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema
    .withSchema('sewer_pipe')
    .alterTable('restoration_work', tbl =>
      tbl.renameColumn('restoration_method_type_id', 'toteutusTapaId')
    );
};
