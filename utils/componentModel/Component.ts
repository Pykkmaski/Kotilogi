export enum ComponentType {
  Property = 0,
  HeatingCenter,
}

export enum EventType {
  Replacement = 0,
}

type ComponentData = {
  title?: string;
  description?: string;
  children?: number[];
  events?: TODO[];
  typeId: ComponentType;
};

/**
 * Models a basic unit that a property is composed of.
 */
export class Component<DataT extends ComponentData> {
  private events: TODO[] = [];

  protected populateData(data: DataT) {
    Object.entries(data).forEach(([key, val]) => (this[key] = val));
  }

  protected addEvent(eventData: TODO) {
    this.events.push(eventData);
  }

  constructor(data: DataT) {
    this.populateData(data);
  }

  public get title() {
    return this.title;
  }

  public get description() {
    return this.description;
  }

  public get typeId() {
    return this.typeId;
  }
}

export class ReplaceableComponent<DataT extends ComponentData> extends Component<DataT> {
  /**Creates a replacement event for the component, and changes it's data to the passed newData. */
  replace(newData: DataT, eventData: TODO) {
    const newEvent = {
      ...eventData,
      typeId: EventType.Replacement,
    };

    super.populateData(newData);
    super.addEvent(newEvent);
  }
}
