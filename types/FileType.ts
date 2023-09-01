import { HasDescription } from "./HasDescription";
import { HasId } from "./HasId";
import { HasTitle } from "./HasTitle";

export type FileType = HasId & HasTitle & HasDescription & {
    mime_type: 'application/json',
}