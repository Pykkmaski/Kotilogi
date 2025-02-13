/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */

async function getData(knex, e, trx) {
  const { target_type, id } = e;
  const getQuery = async (serviceTableName, serviceTypeTableName) => {
    const stn = `service_events.${serviceTableName}`;
    const sttn = `service_events.${serviceTypeTableName}`;
    return trx(stn)
      .join(knex.raw('?? on ??.id = ??.service_work_type_id', [sttn, sttn, stn]))
      .where({ event_id: id })
      .select(`${sttn}.label as maintenance_type`)
      .first();
  };

  switch (target_type) {
    case 'Eristys':
      return await getQuery('insulation_service_event', 'insulation_service_type');

    case 'Ikkunat':
      return await getQuery('window_service_event', 'window_service_type');

    case 'Ilmanvaihto':
      return await getQuery('ventilation_service_event', 'ventilation_service_type');

    case 'Katto':
      return await getQuery('roof_service_event', 'roof_service_type');

    case 'Käyttövesiputket':
      return await getQuery('water_pipe_service_event', 'water_pipe_service_type');

    case 'Lämmitysmuoto':
      return await getQuery('heating_service_event', 'heating_service_type');

    case 'Lämmönjako':
      return await getQuery(
        'heating_distribution_service_event',
        'heating_distribution_service_type'
      );

    case 'Palovaroittimet':
      return await getQuery('firealarm_service_event', 'firealarm_service_type');

    case 'Rakenteet':
      return await getQuery('structure_service_event', 'structure_service_type');
    case 'Salaojat':
      return await getQuery('drainage_ditch_service_event', 'drainage_ditch_service_type');

    case 'Sähköt':
      return await getQuery('electricity_service_event', 'electricity_service_type');

    case 'Viemäriputket':
      return await getQuery('sewer_pipe_service_event', 'sewer_pipe_service_type');
  }
}

exports.up = function (knex) {
  return new Promise(async (resolve, reject) => {
    const trx = await knex.transaction();
    try {
      const stream = trx('new_events')
        .where({
          event_type: 'Huoltotyö',
        })
        .andWhereNot({ target_type: null })
        .stream();

      const promises = [];
      for await (const e of stream) {
        const data = await getData(knex, e, trx);
        data && console.log(data);
        promises.push(
          trx('new_events')
            .where({ id: e.id })
            .update({
              data: data || null,
            })
        );
      }

      await Promise.all(promises);
      await trx.commit();
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
  return knex('new_events').where({ event_type: 'Huoltotyö' }).update({
    data: null,
  });
};
