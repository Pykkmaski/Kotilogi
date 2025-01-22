import db from 'kotilogi-app/dbconfig';

class Ventilation {
  /**Returns the data associated with insulation service events. */
  async getServiceData(eventId: string) {
    const [data] = await db('service_events.ventilation_service_event as ese')
      .join(
        db.raw(
          'service_events.ventilation_service_type as est on est.id = ese.service_work_type_id'
        )
      )
      .where({ 'ese.event_id': eventId })
      .select('est.label as service_work_type_label');
    return data;
  }
}

export const ventilation = new Ventilation();
