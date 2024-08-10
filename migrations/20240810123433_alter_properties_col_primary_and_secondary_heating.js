/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
const table = 'data_properties';
const reftable = 'ref_heatingTypes';

const values = [
  {
    oldcol: 'primaryHeatingSystem',
    newcol: 'primaryHeatingSystemId',
    foreignName: 'FK_PRIMARY_HEATING_SYSTEM',
  },

  {
    oldcol: 'secondaryHeatingSystem',
    newcol: 'secondaryHeatingSystemId',
    foreignName: 'FK_PRIMARY_SECONDARY_SYSTEM',
  },
];

exports.up = function (knex) {
  return Promise.all(
    values.map(val =>
      knex.schema
        .alterTable(table, tbl =>
          tbl
            .foreign(val.oldcol, val.foreignName)
            .references('id')
            .inTable(reftable)
            .onUpdate('CASCADE')
        )
        .alterTable(table, tbl => tbl.renameColumn(val.oldcol, val.newcol))
    )
  );
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return Promise.all(
    values.map(val =>
      knex.schema
        .alterTable(table, tbl => tbl.dropForeign(val.newcol))
        .alterTable(table, tbl => tbl.renameColumn(val.newcol, val.oldcol))
    )
  );
};
