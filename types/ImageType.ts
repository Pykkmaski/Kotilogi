import { HasDescription } from "./HasDescription";
import { HasId } from "./HasId";
import { HasTitle } from "./HasTitle";

export type ImageType = HasId & HasDescription & HasTitle & {
    mime_type: 'image/jpeg',
}