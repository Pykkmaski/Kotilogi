import db from './dbconfig';

class Constants {
  async getPropertyTypes() {
    return await db('ref_propertyTypes');
  }

  async getbuildingTypes() {
    return await db('ref_buildingTypes');
  }
}

export const constants = new Constants();
