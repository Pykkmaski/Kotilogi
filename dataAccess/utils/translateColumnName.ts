/**Translates a column name for use as user-friendly input lables, if a translation is defined. Otherwise returns the column name as-is. */
export function translateColumnName(colName: string) {
  switch (colName) {
    case 'newSystemLabel':
      return 'Uusi järjestelmä';
    case 'oldSystemLabel':
      return 'Vanha järjestelmä';

    case 'workTypeLabel':
      return 'Tehty työ';

    case 'targetLabel':
      return 'Työn kohde';

    case 'mainTypeLabel':
      return 'Osasto';

    default:
      return colName;
  }
}
