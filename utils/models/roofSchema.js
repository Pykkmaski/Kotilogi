const z = require('zod');
module.exports.roofSchemaVersion = 0;

module.exports.RoofType = {
  AUMA: 'Auma',
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

module.exports.roofSchema = z
  .object({
    roof_type: z.enum(Object.values(module.exports.RoofType)).optional(),
    roof_material: z.enum(Object.values(module.exports.RoofMaterial)).optional(),
    eaves_type: z.enum(Object.values(module.exports.EavesType)).optional(),
    underlacing_type: z.enum(Object.values(module.exports.UnderlacingType)).optional(),
    fascia_board_type: z.enum(Object.values(module.exports.FasciaBoardType)).optional(),
    has_gutters: z.boolean().optional(),
    has_downspout_system: z.boolean().optional(),
    has_underlacing_ventilation: z.boolean().optional(),
    has_roof_bridge: z.boolean().optional(),
    has_snow_barrier: z.boolean().optional(),
    has_chimney_plating: z.boolean().optional(),
    has_ladder: z.boolean().optional(),
    has_treated_wood: z.boolean().optional(),
    has_roof_bridge: z.boolean().optional(),
    lapetikas: z.boolean().optional(),
    area: z.number().optional(),
    incline: z.string().optional(),
    color: z.string().optional(),
  })
  .strip()
  .transform(result => {
    result.schemaVersion = module.exports.roofScemaVersion;
    return result;
  });
