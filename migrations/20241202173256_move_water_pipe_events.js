/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.raw(`
      ALTER TABLE "data_kayttoVesiPutketEvents" SET SCHEMA water_pipe;
      ALTER TABLE water_pipe."data_kayttoVesiPutketEvents" RENAME TO restoration_work;
      ALTER TABLE water_pipe.restoration_work RENAME COLUMN "asennusTapaId" TO installation_method_id;
      ALTER TABLE water_pipe.restoration_work RENAME COLUMN id to event_id;
    `);
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.raw(`
    ALTER TABLE water_pipe.restoration_work RENAME TO "data_kayttoVesiPutketEvents";
    ALTER TABLE water_pipe."data_kayttoVesiPutketEvents" RENAME COLUMN installation_method_id TO "asennusTapaId";
    ALTER TABLE water_pipe."data_kayttoVesiPutketEvents" SET SCHEMA public;
    ALTER TABLE public."data_kayttoVesiPutketEvents" RENAME COLUMN event_id TO id;
  
   
  `);
};
