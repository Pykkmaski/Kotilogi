import db from 'kotilogi-app/dbconfig';

class Insulation {
  /**Returns the data associated with an insulation restoration event. */
  async get(eventId: string) {
    return await db('insulation')
      .join('types.insulation_target_type', {
        'types.insulation_target_type.id': 'insulation.insulation_target_id',
      })
      .join('types.insulation_material_type', {
        'types.insulation_material_type.id': 'insulation.insulation_material_id',
      })
      .where({ 'insulation.event_id': eventId })
      .select(
        'insulation.*',
        'types.insulation_material_type.label as insulation_material_label',
        'types.insulation_target_type.label as insulation_target_label'
      );
  }

  /**Returns the data associated with insulation service events. */
  async getServiceData(eventId: string) {
    const [data] = await db('service_events.insulation_service_event as ese')
      .join(
        db.raw('service_events.insulation_service_type as est on est.id = ese.service_work_type_id')
      )
      .where({ 'ese.event_id': eventId })
      .select('est.label as service_work_type_label');
    return data;
  }
}

export const insulation = new Insulation();
