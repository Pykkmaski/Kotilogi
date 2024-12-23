/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema
    .withSchema('sewer_pipe')
    .renameTable('data_viemariPutketEvents', 'restoration_work')
    .renameTable('ref_viemariPutketToteutusTapa', 'restoration_method_type');
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema
    .withSchema('sewer_pipe')
    .renameTable('restoration_work', 'data_viemariPutketEvents')
    .renameTable('restoration_method_type', 'ref_viemariPutketToteutusTapa');
};
