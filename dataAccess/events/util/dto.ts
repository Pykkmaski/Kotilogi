/**
 * Prepares event data for insertion into the db.
 * @param data
 * @returns
 */
export const getEventInsertObject = (data: TODO) => {
  return {
    ...data,
    workTypeId: (data.workTypeId as any) == -1 ? null : data.workTypeId,
    targetId: (data.targetId as any) == -1 ? null : data.targetId,
  };
};

/**
 * Creates a data-transform-object of an event. Creates a title based on the types of an event, if an actual title is not defined.
 * @param eventData
 * @returns
 */
export const getEventDTO = (eventData: TODO) => {
  const labels = [eventData.mainTypeLabel, eventData.targetLabel, eventData.workTypeLabel].filter(
    t => t != null
  );

  const title = labels.length ? labels.join(' - ') : eventData.title || 'Ei Otsikkoa.';

  return {
    id: eventData.id,
    parentId: eventData.parentId,
    title,
    description: eventData.description,
    date: eventData.date,
    mainTypeLabel: eventData.mainTypeLabel,
    targetLabel: eventData.targetLabel,
    workTypeLabel: eventData.workTypeLabel,
    mainTypeId: eventData.mainTypeId,
    targetId: eventData.targetId,
    workTypeId: eventData.workTypeId,
  };
};
