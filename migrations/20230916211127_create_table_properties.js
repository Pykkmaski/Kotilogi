/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */

const tableName = 'properties';
const primaryHeatingSystems = [
  'Kaukolämpö',
  'Sähkö',
  'Maalämpö',
  'Vesi-Ilmalämpöpumppu',
  'Muu'
];
const secondaryHeatingSystems= [
  'Takka',
  'Ilmalämpöpumppu',
  'Muu',
  'Ei Mitään'
];
const energyClasses = ['A', 'B', 'C', 'D', 'E', 'F', 'Ei Määritelty'];
const buildingTypes = [
  'Kerrostalo',
  'Omakotitalo',
  'Rivitalo',
  'Luhtitalo',
  'Erillistalo',
  'Paritalo',
  'Puutalo-osake',
  'Muu'
];
const buildingMaterials = [
  'Betoni',
  'Tiili',
  'Puu',
  'Hirsi',
  'Muu'
];
const roofTypes = [
  'Harjakatto',
  'Pulpettikatto',
  'Tasakatto',
  'Muu'
];
const roofMaterials = [
  'Pelti',
  'Huopa',
  'Tiili',
  'Muu'
];
const colors = [
  'Valkoinen',
  'Keltainen',
  'Sininen',
  'Punainen',
  'Ruskea',
  'Musta',
  'Muu'
];
const yardOwnerships = [
  'Oma', 'Vuokra', 'Ei Mitään'
];

exports.up = function(knex) {
  /**
   * Create a properties table containing columns for
   * id                     - The unique uuid for the property, string.
   * refId                  - The reference to the email of the user owning the property, string.
   * title                  - The address of the property, string.
   * zipCode                - The zip code, string.
   * description            - Description for the property.
   * color                  - The color of the property, string.
   * roofType               - The type of the roof, string.
   * roofMaterial           - The Material of the roof, string.
   * primaryHeatingSystem   - The primary heating system, string.
   * secondaryHeatingSystem - The secondary heating system, string.
   * roomCount              - The number of rooms, integer.
   * wcCount                - The number of restrooms, integer.
   * floorCount             - The number of floors, integer.
   * buildYear              - The year the property was built, integer.
   * buildingMaterial       - The material used to build the property, string.
   * buildingType           - The type of the property, string.
   * yardOwnership          - The ownership type of the yard, string.
   * yardArea               - The area of the yard, float.
   * livingArea             - The area of the inside of the property, float.
   * otherArea              - Additional area of the property, float.
   * mainImageId            - The id of the main image for the property, string.
   * createdAt              - The date in milliseconds, when the property was created, integer.
   * updatedAt              - The date in milliseconds, when the property was updated, integer.
   */

    return knex.schema.createTable(tableName, tbl => {
        tbl.string('id').unique().primary('PK_PROPERTIES_ID').notNullable().defaultTo(knex.fn.uuid());
        tbl.string('refId').notNullable().comment('The owner of the property');
        tbl.foreign('refId', 'FK_PROPERTIES_OWNER').references('email').inTable('users').onDelete('CASCADE').onUpdate('CASCADE');
        tbl.string('title', 50).comment('The address of the property.');
        tbl.string('zipCode', 10);
        tbl.text('description');
        tbl.string('color').checkIn(colors).defaultTo(colors.at(-1));
        tbl.string('roofType').checkIn(roofTypes).defaultTo(roofTypes.at(-1));
        tbl.string('roofMaterial').checkIn(roofMaterials).defaultTo(roofMaterials.at(-1));
        tbl.string('buildingType').checkIn(buildingTypes).defaultTo(buildingTypes.at(-1));
        tbl.string('buildingMaterial').checkIn(buildingMaterials).defaultTo(buildingMaterials.at(-1));
        tbl.string('yardOwnerhip').checkIn(yardOwnerships).defaultTo(yardOwnerships.at(-1));
        tbl.string('mainImageId');
        tbl.string('primaryHeatingSystem').checkIn(primaryHeatingSystems).defaultTo(primaryHeatingSystems.at(-1));
        tbl.string('secondaryHeatingSystem').checkIn(secondaryHeatingSystems).defaultTo(secondaryHeatingSystems.at(-1));
        tbl.string('energyClass').checkIn(energyClasses).defaultTo(energyClasses.at(-1));
        tbl.float('yardArea');
        tbl.float('livingArea');
        tbl.float('otherArea');
        tbl.integer('buildYear');
        tbl.integer('roomCount');
        tbl.integer('floorCount');
        tbl.integer('wcCount');
        tbl.timestamps(true, true, true);
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.dropTableIfExists(tableName);
};
