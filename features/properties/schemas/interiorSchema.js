const z = require('zod');

module.exports.interiorSchema = z.object({
  property_id: z.string().uuid(),
  floor_count: z.number().int(),
  room_count: z.number().int(),
  bathroom_count: z.number().int(),
  living_area: z.number(),
  other_area: z.number(),
});
