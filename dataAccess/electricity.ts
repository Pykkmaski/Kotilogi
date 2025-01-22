import db from 'kotilogi-app/dbconfig';

class Electricity {
  /**Returns the data associated with an electricity restoration event. */
  async getRestorationData(eventId: string) {
    const [data] = await db('restoration_events.electricity_restoration_event')
      .join('restoration_events.electricity_restoration_target_type', {
        'restoration_events.electricity_restoration_target_type.id':
          'restoration_events.electricity_restoration_event.restoration_work_target_id',
      })
      .where({ 'restoration_events.electricity_restoration_event.event_id': eventId })
      .select(
        'restoration_events.electricity_restoration_target_type.label as restoration_target_label'
      );

    return data;
  }

  /**Returns the data associated with electricity service events. */
  async getServiceData(eventId: string) {
    const [data] = await db('service_events.electricity_service_event as ese')
      .join(
        db.raw(
          'service_events.electricity_service_type as est on est.id = ese.service_work_type_id'
        )
      )
      .where({ 'ese.event_id': eventId })
      .select('est.label as service_work_type_label');
    return data;
  }
}

export const electricity = new Electricity();
