/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
const table = 'data_properties';

const pairs = [
  {
    oldcol: 'buildingType',
    newcol: 'buildingTypeId',
    reftable: 'ref_buildingTypes',
    refname: 'FK_BUILDING_TYPE',
  },

  {
    oldcol: 'energyClass',
    newcol: 'energyClassId',
    reftable: 'ref_energyClasses',
    refname: 'FK_ENERGY_CLASS',
  },

  {
    oldcol: 'roofType',
    newcol: 'roofTypeId',
    reftable: 'ref_roofTypes',
    refname: 'FK_ROOF_TYPE',
  },

  {
    oldcol: 'roofMaterial',
    newcol: 'roofMaterialId',
    reftable: 'ref_roofMaterials',
    refname: 'FK_ROOF_MATERIAL',
  },

  {
    oldcol: 'buildingMaterial',
    newcol: 'buildingMaterialId',
    reftable: 'ref_buildingMaterials',
    refname: 'FK_BUILDING_MATERIAL',
  },
];
exports.up = function (knex) {
  return Promise.all(
    pairs.map(entry => {
      return knex.schema
        .alterTable(table, tbl => {
          tbl
            .foreign(entry.oldcol, entry.refname)
            .references('id')
            .inTable(entry.reftable)
            .onUpdate('CASCADE');
        })
        .alterTable(table, tbl => tbl.renameColumn(entry.oldcol, entry.newcol));
    })
  );
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return Promise.all(
    pairs.map(entry => {
      return knex.schema
        .alterTable(table, tbl => {
          tbl.dropForeign(entry.newcol);
        })
        .alterTable(table, tbl => tbl.renameColumn(entry.newcol, entry.oldcol));
    })
  );
};
