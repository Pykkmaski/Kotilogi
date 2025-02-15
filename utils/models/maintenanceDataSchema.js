const z = require('zod');
module.exports.maintenanceDataSchemaVersion = 0;
module.exports.maintenanceDataSchema = z
  .object({
    maintenance_type: z.string(),
  })
  .strip()
  .transform(result => {
    result.schemaVersion = this.maintenanceDataSchemaVersion;
    return result;
  });
