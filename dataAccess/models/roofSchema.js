const z = require('zod');

//Increment by one when adding new fields to the schema.
module.exports.roofSchemaVersion = 0;

module.exports.RoofType = {
  AUMA: 'Aumakatto',
  TASA: 'Tasakatto',
  HARJA: 'Harjakatto',
  PULPETTI: 'Pulpettikatto',
  MANSARDI: 'Mansardikatto',
  TAITE: 'Taitekatto',
  PELTI: 'Peltikatto',
  MUU: 'Muu',
};

module.exports.RoofMaterial = {
  PELTI: 'Pelti',
  TIILI: 'Tiili',
  HUOPA: 'Huopa',
  MUU: 'Muu',
};

module.exports.EavesType = {
  AVO: 'Avo',
  UMPI: 'Umpi',
  UMPI_ILMAN_RAKOJA: 'Umpi ilman rakoja',
};

module.exports.UnderlacingType = {
  HENGITTÄVÄ: 'Hengittävä',
  NORM: 'Norm.',
};

module.exports.FasciaBoardType = {
  SUORA: 'Suora',
  VINO: 'Vino',
};

const roofBooleanSchema = z
  .boolean()
  .optional()
  .nullable()
  .transform(value => (value === null ? undefined : value));

module.exports.roofSchema = z
  .object({
    roof_type: z.string().nonempty().optional(),
    roof_material: z.string().nonempty().optional(),
    eaves_type: z.enum(Object.values(module.exports.EavesType)).optional(),
    underlacing_type: z.enum(Object.values(module.exports.UnderlacingType)).optional(),
    fascia_board_type: z.enum(Object.values(module.exports.FasciaBoardType)).optional(),
    has_gutters: roofBooleanSchema,
    has_downspout_system: roofBooleanSchema,
    has_underlacing_ventilation: roofBooleanSchema,
    has_roof_bridge: roofBooleanSchema,
    has_snow_barrier: roofBooleanSchema,
    has_chimney_plating: roofBooleanSchema,
    has_ladder: roofBooleanSchema,
    has_treated_wood: roofBooleanSchema,
    has_roof_bridge: roofBooleanSchema,
    has_security_ladder: roofBooleanSchema,
    lapetikas: roofBooleanSchema,
    area: z.number().optional(),
    incline: z.string().optional(),
    color: z.string().optional(),
  })
  .transform(result => {
    result._schemaVersion = module.exports.roofSchemaVersion;
    return result;
  });
