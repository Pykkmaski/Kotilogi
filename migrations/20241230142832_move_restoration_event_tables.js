/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema
    .raw(
      'ALTER TABLE drainage_ditches.implementation_methods RENAME TO drainage_ditch_implementation_method_type'
    )
    .raw(
      'ALTER TABLE drainage_ditches.drainage_ditch_implementation_method_type SET SCHEMA restoration_events'
    )
    .raw('ALTER TABLE electricity.restoration_work RENAME TO electricity_restoration_event')
    .raw('ALTER TABLE electricity.electricity_restoration_event SET SCHEMA restoration_events')
    .raw(
      'ALTER TABLE electricity.restoration_work_target RENAME TO electricity_restoration_target_type'
    )
    .raw(
      'ALTER TABLE electricity.electricity_restoration_target_type SET SCHEMA restoration_events'
    )
    .raw('ALTER TABLE events.restorable_target_type SET SCHEMA restoration_events')
    .raw('ALTER TABLE heating.heating_restoration_work RENAME TO heating_restoration_event')
    .raw('ALTER TABLE heating.heating_restoration_event SET SCHEMA restoration_events')
    .raw(
      'ALTER TABLE heating.electric_heating_restoration_work RENAME TO electric_heating_restoration_event'
    )
    .raw('ALTER TABLE heating.electric_heating_restoration_event SET SCHEMA restoration_events')
    .raw('ALTER TABLE heating.electric_heating_method_type RENAME TO electric_heating_type')
    .raw('ALTER TABLE heating.electric_heating_type SET SCHEMA types')
    .raw('DROP TABLE heating.restoration_event')
    .raw('ALTER TABLE insulation.?? RENAME TO ??', [
      'restoration_work',
      'insulation_restoration_event',
    ])
    .raw('ALTER TABLE insulation.?? SET SCHEMA ??', [
      'insulation_restoration_event',
      'restoration_events',
    ])
    .raw('ALTER TABLE insulation.?? RENAME TO ??', [
      'targets',
      'insulation_restoration_target_type',
    ])
    .raw('ALTER TABLE insulation.insulation_restoration_target_type SET SCHEMA restoration_events')
    .raw('ALTER TABLE sewer_pipe.?? RENAME TO ??', [
      'restoration_work',
      'sewer_pipe_restoration_event',
    ])
    .raw('ALTER TABLE sewer_pipe.?? SET SCHEMA ??', [
      'sewer_pipe_restoration_event',
      'restoration_events',
    ])
    .raw('ALTER TABLE water_pipe.?? RENAME TO ??', [
      'restoration_work',
      'water_pipe_restoration_event',
    ])
    .raw('ALTER TABLE water_pipe.?? SET SCHEMA ??', [
      'water_pipe_restoration_event',
      'restoration_events',
    ]);
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return (
    knex.schema
      //Drainage ditch
      .raw(
        'ALTER TABLE restoration_events.drainage_ditch_implementation_method_type SET SCHEMA drainage_ditches'
      )
      .raw(
        'ALTER TABLE restoration_events.drainage_ditch_implementation_method_type RENAME TO implementation_methods'
      )
      //Electricity
      .raw('ALTER TABLE restoration_events.electricity_restoration_event SET SCHEMA electricity')
      .raw('ALTER TABLE electricity.electricity_restoration_event RENAME TO restoration_work')
      .raw(
        'ALTER TABLE restoration_events.electricity_restoration_target_type SET SCHEMA electricity'
      )
      .raw(
        'ALTER TABLE electricity.electricity_restoration_target_type RENAME TO restoration_work_target'
      )

      .raw('ALTER TABLE restoration_events.restorable_target_type SET SCHEMA events')
      .raw('ALTER TABLE restoration_events.heating_restoration_event SET SCHEMA heating')
      .raw('ALTER TABLE heating.heating_restoration_event RENAME TO heating_restoration_work')
      .raw('ALTER TABLE restoration_events.electric_heating_restoration_event SET SCHEMA heating')
      .raw(
        'ALTER TABLE heating.electric_heating_restoration_event RENAME TO electric_heating_restoration_work'
      )
      .raw('ALTER TABLE types.electric_heating_type SET SCHEMA heating')
      .raw('ALTER TABLE heating.electric_heating_type RENAME TO electric_heating_method_type')
      .raw(
        'ALTER TABLE restoration_events.?? RENAME TO ??',
        ['restoration_work', 'insulation_restoration_event'].reverse()
      )
      .raw(
        'ALTER TABLE restoration_events.?? SET SCHEMA ??',
        ['insulation_restoration_event', 'insulation'].reverse()
      )
      .raw(
        'ALTER TABLE restoration_events.?? RENAME TO ??',
        ['targets', 'insulation_restoration_target_type'].reverse()
      )
      .raw(
        'ALTER TABLE restoration_events.insulation_restoration_target_type SET SCHEMA insulation'
      )
      .raw(
        'ALTER TABLE restoration_events.?? RENAME TO ??',
        ['restoration_work', 'sewer_pipe_restoration_event'].reverse()
      )
      .raw('ALTER TABLE restoration_events.?? SET SCHEMA ??', ['restoration_work', 'sewer_pipe'])
      .raw(
        'ALTER TABLE restoration_events.?? RENAME TO ??',
        ['restoration_work', 'water_pipe_restoration_event'].reverse()
      )
      .raw('ALTER TABLE water_pipe.?? SET SCHEMA ??', ['restoration_work', 'water_pipe'])
  );
};
