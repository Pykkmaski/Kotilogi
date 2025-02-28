const z = require('zod');

module.exports.propertySchema = z.object({
  id: z.string().uuid(),
  description: z.string().optional(),
  property_type_id: z.number().int(),
  street_name: z.string().max(64),
  street_number: z.number().int(),
  zip_code: z.string().max(5),
  energy_class_id: z.number().int().optional(),
  energy_class_year: z
    .number()
    .int()
    .min(2008)
    .refine(
      value => (value - 2008) % 10 === 0,
      'The energy_class_year must be 2008, or a value gotten by incrementing 2008 by n * 10!'
    )
    .optional(),
  has_garage: z.boolean().optional(),
});
