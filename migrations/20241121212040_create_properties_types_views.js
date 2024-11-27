/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema
    .withSchema('properties')
    .createView('get_property_types', view => {
      view.as(
        knex.raw('SELECT json_object_agg(name, id) as result FROM properties.??', [
          'ref_propertyTypes',
        ])
      );
    })
    .createView('get_building_materials', view => {
      view.as(
        knex.raw('SELECT json_object_agg(name, id) as result FROM properties.??', [
          'ref_buildingMaterials',
        ])
      );
    })
    .createView('get_roof_types', view => {
      view.as(
        knex.raw('SELECT json_object_agg(name, id) as result FROM properties.??', ['ref_roofTypes'])
      );
    })
    .createView('get_roof_materials', view => {
      view.as(
        knex.raw('SELECT json_object_agg(name, id) as result FROM properties.??', [
          'ref_roofMaterials',
        ])
      );
    })
    .createView('get_energy_classes', view => {
      view.as(
        knex.raw('SELECT json_object_agg(name, id) as result FROM properties.??', [
          'ref_energyClasses',
        ])
      );
    })
    .createView('get_yard_ownership_types', view => {
      view.as(
        knex.raw('SELECT json_object_agg(name, id) as result FROM properties.??', [
          'ref_yardOwnershipTypes',
        ])
      );
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema
    .withSchema('properties')
    .dropView('get_property_types')
    .dropView('get_building_materials')
    .dropView('get_roof_types')
    .dropView('get_roof_materials')
    .dropView('get_energy_classes')
    .dropView('get_yard_ownership_types');
};
