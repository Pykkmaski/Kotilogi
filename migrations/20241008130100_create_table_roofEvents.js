/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */

const raystasTable = 'ref_raystastyypit';
const otsalautaTable = 'ref_otsalautatyypit';
const aluskateTable = 'ref_aluskatetyypit';
const mainTableName = 'data_roofEvents';

exports.up = function (knex) {
  return knex.schema
    .createTable(raystasTable, tbl => {
      tbl.increments('id');
      tbl.string('label', 32).unique();
    })
    .createTable(otsalautaTable, tbl => {
      tbl.increments('id');
      tbl.string('label', 32).unique();
    })
    .createTable(aluskateTable, tbl => {
      tbl.increments('id');
      tbl.string('label', 32).unique();
    })
    .createTable(mainTableName, tbl => {
      tbl
        .uuid('id')
        .notNullable()
        .primary()
        .references('id')
        .inTable('data_propertyEvents')
        .onUpdate('CASCADE')
        .onDelete('CASCADE');
      tbl
        .integer('roofMaterialId')
        .references('id')
        .inTable('ref_roofMaterials')
        .onUpdate('CASCADE');
      tbl.integer('roofTypeId').references('id').inTable('ref_roofTypes').onUpdate('CASCADE');
      tbl.integer('raystasTyyppiId').references('id').inTable('ref_raystastyypit');
      tbl.integer('otsalautaTyyppiId').references('id').inTable('ref_otsalautatyypit');
      tbl.integer('aluskateTyyppiId').references('id').inTable('ref_aluskatetyypit');
      tbl.string('kaltevuus');
      tbl.float('neliometrit');
      tbl.integer('colorId').references('id').inTable('ref_mainColors');
      tbl.boolean('harjatuuletusAluskatteella');
      tbl.boolean('suojakasiteltyPuutavara');
      tbl.boolean('piipunpellitys');
      tbl.boolean('seinatikas');
      tbl.boolean('lapetikas');
      tbl.boolean('lumieste');
      tbl.boolean('kattosilta');
      tbl.boolean('turvatikas');
      tbl.boolean('kourut');
      tbl.boolean('syoksysarja');
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema
    .dropTableIfExists(mainTableName)
    .dropTableIfExists(raystasTable)
    .dropTableIfExists(otsalautaTable)
    .dropTableIfExists(aluskateTable);
};
