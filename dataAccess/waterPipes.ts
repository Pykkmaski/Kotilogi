import db from 'kotilogi-app/dbconfig';

class WaterPipes {
  /**Returns the data associated with a water pipe restoration event. */
  async getRestorationData(eventId: string) {
    const [data] = await db('restoration_events.water_pipe_restoration_event')
      .join('restoration_events.water_pipe_installation_method_type', {
        'restoration_events.water_pipe_installation_method_type.id':
          'restoration_events.water_pipe_restoration_event.installation_method_id',
      })
      .where({ 'restoration_events.sewer_pipe_restoration_event.event_id': eventId })
      .select(
        'restoration_events.water_pipe_installation_method_type.label as installation_method_label'
      );

    return data;
  }

  /**Returns the data associated with water pipe service events. */
  async getServiceData(eventId: string) {
    const [data] = await db('service_events.water_pipe_service_event as ese')
      .join(
        db.raw('service_events.water_pipe_service_type as est on est.id = ese.service_work_type_id')
      )
      .where({ 'ese.event_id': eventId })
      .select('est.label as service_work_type_label');
    return data;
  }
}

export const waterPipes = new WaterPipes();
