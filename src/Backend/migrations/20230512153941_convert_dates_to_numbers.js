/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.table('property_events', tbl => {
        tbl.dropColumn('date');
    })
    .table('property_events', tbl => {
        tbl.bigInteger('date').defaultTo(new Date().getTime());
    })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.table('property_events', tbl => {
        tbl.dropColumn('date');
    })
    .table('property_events', tbl => {
        tbl.string('date').defaultTo(new Date().toLocaleDateString());
    })
};
