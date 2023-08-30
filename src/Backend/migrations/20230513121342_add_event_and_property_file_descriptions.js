/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.table('property_files', tbl => {
        tbl.string('description');
    })
    .table('event_files', tbl => {
        tbl.string('description');
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.table('property_files', tbl => {
        tbl.dropColumn('description');
    })
    .table('event_files', tbl => {
        tbl.dropColumn('description');
    });
};
