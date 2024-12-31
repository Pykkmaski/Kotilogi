/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema
    .raw('ALTER TABLE ?? RENAME TO ??', ['data_structureEvents', 'structure_service_event'])
    .raw('ALTER TABLE ?? SET SCHEMA ??', ['structure_service_event', 'service_events'])
    .raw('ALTER TABLE ?? RENAME TO ??', [
      'ref_structureEventTargets',
      'structure_service_target_type',
    ])
    .raw('ALTER TABLE ?? SET SCHEMA ??', ['structure_service_target_type', 'service_events'])
    .raw('ALTER TABLE service_events.?? RENAME COLUMN ?? TO ??', [
      'structure_service_event',
      'id',
      'event_id',
    ])
    .raw('ALTER TABLE service_events.?? RENAME COLUMN ?? TO ??', [
      'structure_service_event',
      'targetId',
      'service_target_id',
    ]);
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema
    .raw(
      'ALTER TABLE service_events.?? RENAME TO ??',
      ['data_structureEvents', 'structure_service_event'].reverse()
    )
    .raw('ALTER TABLE service_events.?? SET SCHEMA ??', ['data_structureEvents', 'public'])
    .raw(
      'ALTER TABLE service_events.?? RENAME TO ??',
      ['ref_structureEventTargets', 'structure_service_target_type'].reverse()
    )
    .raw('ALTER TABLE service_events.?? SET SCHEMA ??', ['ref_structureEventTargets', 'public'])
    .raw('ALTER TABLE ?? RENAME COLUMN ?? TO ??', ['data_structureEvents', 'event_id', 'id'])
    .raw('ALTER TABLE ?? RENAME COLUMN ?? TO ??', [
      'data_structureEvents',
      'service_target_id',
      'targetId',
    ]);
};
