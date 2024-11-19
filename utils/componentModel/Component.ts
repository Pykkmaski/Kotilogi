import db from 'kotilogi-app/dbconfig';

type ComponentData = {
  title?: string;
  description?: string;
  typeId: number;
};

abstract class Component<DataT extends ComponentData> {
  static Type = {
    HeatDistributor: 0,
    Roof: 1,
    Room: 2,
    Property: 3,
  };

  static EventType = {
    Replacement: 0,
    Service: 1,
    Repair: 2,
    Surface: 3,
    ServicePaint: 4,
  };

  protected id: string;
  protected events: TODO[];
  protected children: Component<ComponentData>[];

  protected populateData(data) {
    Object.entries(data).forEach(([key, val]) => (this[key] = val));
  }

  constructor(data) {
    this.populateData(data);
    this.events = [];
    this.children = [];
  }

  addEvent(event) {
    this.events.push({
      ...event,
      timestamp: Date.now(),
    });
  }

  addChild(child) {
    this.children.push(child);
  }

  static async loadComponent(id: string) {
    const [data] = await db();
  }

  static async getTypes(tablename: string) {
    const types = await db(tablename);
    if (types.length == 0) {
      throw new Error('No types defined in table ' + tablename);
    }

    return types.reduce((obj, cur) => {
      const entries = Object.entries(cur) as [string, number][];
      obj[entries[0][1]] = entries[1][1];
      return obj;
    }, {}) as Record<string, number>;
  }
}
