/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */

const table = 'propertyData';

exports.up = function (knex) {
  return knex.schema.createTable(table, tbl => {
    tbl
      .uuid('id')
      .notNullable()
      .unique()
      .primary()
      .references('id')
      .inTable('objectData')
      .onUpdate('CASCADE')
      .onDelete('CASCADE');

    tbl.string('streetAddress');
    tbl.string('zipCode');
    tbl.integer('buildYear');
    tbl.integer('color');
    tbl.integer('primaryHeatingSystem');
    tbl.integer('secondaryHeatingSystem');
    tbl.integer('propertyType');
    tbl.integer('houseNumber');
    tbl.integer('buildingType');
    tbl.integer('buildingMaterial');
    tbl.integer('roofType');
    tbl.integer('roofMaterial');
    tbl.integer('roomCount');
    tbl.integer('floorCount');
    tbl.integer('wcCount');
    tbl.integer('livingArea');
    tbl.integer('otherArea');
    tbl.integer('energyClass');
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTableIfExists(table);
};
