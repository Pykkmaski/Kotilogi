/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.raw(
    `ALTER TABLE ?? SET SCHEMA water_pipe;
    ALTER TABLE water_pipe.?? RENAME TO installation_method;`,
    ['ref_kayttovesiPutketAsennusTavat', 'ref_kayttovesiPutketAsennusTavat']
  );
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.raw(
    `
      ALTER TABLE water_pipe.installation_method RENAME TO ??
      ALTER TABLE water_pipe.?? SET SCHEMA public;
    `,
    ['ref_kayttovesiPutketAsennusTavat', 'ref_kayttovesiPutketAsennusTavat']
  );
};
