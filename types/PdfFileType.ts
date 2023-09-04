import { FileType } from "./FileType";

export type PdfFileType = FileType & {
    mime_type: 'application/pdf',
}