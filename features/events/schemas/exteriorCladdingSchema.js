const z = require('zod');

module.exports.exteriorCladdingSchema = z.object({
  exterior_cladding_material: z.string().nonempty(),
  insulation_material: z.string().nonempty().optional(),
  insulation_thickness: z.number().nonnegative().optional(),
  wind_insulation_thickness: z.number().nonnegative().optional(),
  wind_protection_plate_thickness: z.number().nonnegative().optional(),
  ventilation_gap: z.number().optional(),
  has_vapour_barrier: z.boolean().optional(),
  has_rodent_net: z.boolean().optional(),
});
