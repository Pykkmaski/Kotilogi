import { HasDescription } from "./HasDescription";
import { HasId } from "./HasId";
import { HasPropertyId } from "./HasPropertyId";
import { HasTitle } from "./HasTitle";

export type EventType = HasId & HasPropertyId & HasDescription & HasTitle;