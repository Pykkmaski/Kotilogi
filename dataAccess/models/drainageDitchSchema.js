const z = require('zod');

module.exports.drainageDitchSchemaVersion = 0;

module.exports.DrainageDitchImplementationMethod = {
  ISODRÄNLEVYT: 'Isodränlevyt',
  PATOLEVYT: 'Patolevyt',
};

module.exports.drainageDitchSchema = z
  .object({
    implementation_method: z.enum(Object.values(module.exports.DrainageDitchImplementationMethod)),
    gravel_thickness: z.number().optional(),
    gravel_lining: z.number().optional(),
    permafrost_insulation_thickness: z.number().optional(),
    has_inspection_wells: z.boolean().optional(),
    has_pump_well: z.boolean().optional(),
    has_filtration_cloth: z.boolean().optional(),
    has_rainwater_pipes: z.boolean().optional(),
    included_rock_construction: z.boolean().optional(),
  })
  .transform(result => {
    result._schemaVersion = module.exports.drainageDitchSchemaVersion;
    return result;
  });
