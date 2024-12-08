/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return new Promise(async (resolve, reject) => {
    try {
      //First, update the foreign reference of oil vessels.

      await knex.transaction(async function (trx) {
        const stream = trx('objects.data')
          .join(knex.raw('events.data on events.data.id = objects.data.id'))
          .join(
            knex.raw('"data_baseHeatingEvents" on "data_baseHeatingEvents".id = events.data.id')
          )
          .select(
            'model',
            'brand',
            'newSystemId',
            'objects.data.parentId as property_id',
            'events.data.id as event_id'
          )
          .stream();

        const [{ result: heatingTypes }] = await trx('heating.types').select(
          knex.raw('json_object_agg(name, id) as result')
        );

        for await (const entry of stream) {
          const heating_type_id = parseInt(entry.newSystemId);

          const createHeatingData = async () => {
            const [{ id: heating_id }] = await trx('heating.data').insert(
              {
                property_id: entry.property_id,
                heating_type_id,
              },
              ['id']
            );

            return heating_id;
          };

          const createHeatingCenter = async heating_id => {
            await trx('heating.heating_center').insert({
              model: entry.model,
              brand: entry.brand,
              heating_id,
            });
          };

          switch (heating_type_id) {
            case heatingTypes['Kaukolämpö']:
            case heatingTypes['Öljy']:
              {
                const heating_id = await createHeatingData();
                await createHeatingCenter(heating_id);
              }
              break;

            default:
              await createHeatingData();
          }
        }

        await trx.commit();
      });
      resolve();
    } catch (err) {
      reject(err);
    }
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return Promise.resolve();
};
