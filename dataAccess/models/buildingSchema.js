const z = require('zod');
const { customStringSchema } = require('./customStringSchema');

module.exports.BuildingType = {
  OMAKOTITALO: 'Omakotitalo',
  KERROSTALO: 'Kerrostalo',
  PARITALO: 'Paritalo',
  PUUTALO_OSAKE: 'Puutalo-osake',
  RIVITALO: 'Rivitalo',
  ERILLISTALO: 'Erillistalo',
  LUHTITALO: 'Luhtitalo',
  MUU: 'Muu',
};

module.exports.BuildingMaterial = {
  PUU: 'Puu',
  BETONI: 'Betoni',
  HIRSI: 'Hirsi',
  TIILI: 'Tiili',
  MUU: 'Muu',
};

module.exports.buildingSchema = z
  .object({
    property_id: z.string().uuid(),
    build_year: z.number(),
    building_type_id: z.number(),
    building_material_id: z.number(),
    color_id: z.number(),
  })
  .strict();
