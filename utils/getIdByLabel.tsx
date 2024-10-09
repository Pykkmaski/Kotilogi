type refEntryType = {
  label: string;
  id: number;
};

export const getIdByLabel = (types: refEntryType[], label: string, labelName: string = 'label') => {
  const t = types.find(t => t[labelName] == label);
  return (t && t.id) || null;
};
