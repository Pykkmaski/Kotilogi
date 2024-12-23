/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.raw(`
      ALTER TABLE property.overview 
      RENAME COLUMN "streetAddress" TO street_name;

      ALTER TABLE property.overview
      RENAME COLUMN "houseNumber" TO street_number;

      ALTER TABLE property.overview
      RENAME COLUMN "zipCode" TO zip_code;

      ALTER TABLE property.overview 
      RENAME COLUMN "propertyTypeId" TO property_type_id;

      ALTER TABLE property.overview
      RENAME COLUMN "energyClassId" TO energy_class_id;

      ALTER TABLE property.overview
      RENAME COLUMN "hasGarage" TO has_garage;
    `);
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.raw(`
    ALTER TABLE property.overview 
    RENAME COLUMN street_name TO "streetAddress";

    ALTER TABLE property.overview
    RENAME COLUMN street_number TO "houseNumber";

    ALTER TABLE property.overview
    RENAME COLUMN zip_code TO "zipCode";

    ALTER TABLE property.overview
    RENAME COLUMN property_type_id TO "propertyTypeId";

    ALTER TABLE property.overview
    RENAME COLUMN energy_class_id TO "energyClassId";

    ALTER TABLE property.overview
    RENAME COLUMN has_garage TO "hasGarage";
  `);
};
