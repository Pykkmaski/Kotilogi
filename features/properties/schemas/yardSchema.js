const z = require('zod');

module.exports.yardSchema = z.object({
  //property_id: z.string().uuid(),
  yardArea: z.number().optional(),
  yardOwnershipTypeId: z.number().int(),
});
