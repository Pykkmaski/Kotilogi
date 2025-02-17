const z = require('zod');
module.exports.maintenanceDataSchemaVersion = 0;
module.exports.maintenanceDataSchema = z
  .object({
    maintenance_type: z.string().nonempty(),
  })
  .strict()
  .transform(result => {
    result._schemaVersion = this.maintenanceDataSchemaVersion;
    result.maintenance_type;
    return result;
  });
