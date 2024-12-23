/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema
    .raw('CREATE SCHEMA sewer_pipe')
    .raw('ALTER TABLE "data_viemariPutketEvents" SET SCHEMA sewer_pipe')
    .raw('ALTER TABLE "ref_viemariPutketToteutusTapa" SET SCHEMA sewer_pipe');
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema
    .raw('ALTER TABLE sewer_pipe."data_viemariPutketEvents" SET SCHEMA public')
    .raw('ALTER TABLE sewer_pipe."ref_viemariPutketToteutusTapa" SET SCHEMA public')
    .raw('DROP SCHEMA sewer_pipe');
};
