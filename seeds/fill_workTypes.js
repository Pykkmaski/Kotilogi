/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
const table = 'ref_eventWorkTypes';

exports.seed = async function (knex) {
  await knex(table).del();
  const fillMaintenanceWorkTypes = async () => {
    const [maintenanceTypeId] = await knex('ref_mainEventTypes')
      .where({ label: 'Huoltotyö' })
      .pluck('id');
    const targets = {
      Hormi: ['Nuohous', 'Pellitys', 'Pinnoitus'],
    };

    for (const t of Object.entries(targets)) {
      const [label, types] = t;
      const [targetId] = await knex('ref_eventTargets').where({ label });
      for (const type of types) {
        try {
          await knex(table).insert({
            targetId,
            label: type,
            eventMainTypeId: maintenanceTypeId,
          });
        } catch (err) {
          continue;
        }
      }
    }
  };
};
