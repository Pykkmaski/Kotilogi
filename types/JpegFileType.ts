import { FileType } from "./FileType";

export type JpegFileType = FileType & {
    mime_type: 'image/jpeg',
}