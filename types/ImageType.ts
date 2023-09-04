import { HasDescription } from "./HasDescription";
import { HasFileName } from "./HasFileName";
import { HasId } from "./HasId";
import { HasTitle } from "./HasTitle";

export type ImageType = HasId & HasDescription & HasTitle & HasFileName &{
    mime_type: 'image/jpeg',
}