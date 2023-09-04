import { HasDescription } from "./HasDescription";
import { HasFileName } from "./HasFileName";
import { HasId } from "./HasId";
import { HasMimeType } from "./HasMimeType";
import { HasTitle } from "./HasTitle";

export type FileType = HasId & HasTitle & HasDescription & HasFileName & HasMimeType;