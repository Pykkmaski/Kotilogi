import { HasId } from "./HasId";
import { HasPropertyId } from "./HasPropertyId";

export type UsageType = HasId & HasPropertyId &{
    type: string,
    price: number,
    time: number,
}