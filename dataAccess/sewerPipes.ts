import db from 'kotilogi-app/dbconfig';

class SewerPipes {
  /**Returns the data associated with a sewer pipe restoration event. */
  async getRestorationData(eventId: string) {
    const [data] = await db('restoration_events.sewer_pipe_restoration_event')
      .join('restoration_events.sewer_pipe_restoration_method_type', {
        'restoration_events.sewer_pipe_restoration_method_type.id':
          'restoration_events.sewer_pipe_restoration_event.restoration_method_type_id',
      })
      .where({ 'restoration_events.sewer_pipe_restoration_event.event_id': eventId })
      .select(
        'restoration_events.sewer_pipe_restoration_method_type.label as restoration_method_label'
      );
    return data;
  }

  /**Returns the data associated with sewer pipe service events. */
  async getServiceData(eventId: string) {
    const [data] = await db('service_events.serwer_pipe_service_event as ese')
      .join(
        db.raw('service_events.sewer_pipe_service_type as est on est.id = ese.service_work_type_id')
      )
      .where({ 'ese.event_id': eventId })
      .select('est.label as service_work_type_label');
    return data;
  }
}

export const sewerPipes = new SewerPipes();
