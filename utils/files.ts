import { readFile, readdir, unlink, writeFile } from 'fs/promises';
import { Knex } from 'knex';
import { fileNameTimestampSeparator } from 'kotilogi-app/constants';
import db from 'kotilogi-app/dbconfig';
import { limit, uploadPath } from 'kotilogi-app/uploadsConfig';
import { DatabaseTable } from './databaseTable';

type ModeType = 'save' | 'delete';

export class Files extends DatabaseTable {
  private backups: {
    fileName: string;
    buffer?: Buffer;
    mode: ModeType;
  }[] = [];

  private success: boolean = false;

  private validate(file: File) {
    const size = file.size;
    const type = file.type;

    if (type !== 'application/pdf' && type !== 'image/jpeg') {
      throw new Error('Received file of invalid type! ' + type);
    } else if (size > limit) {
      throw new Error('Received file of invalid size! ' + size);
    }
  }

  private reset() {
    this.backups = [];
    this.success = false;
  }

  async rollbackFiles() {
    if (this.success) {
      const promises = this.backups.map(backup => {
        if (backup.mode === 'save') {
          return unlink(uploadPath + backup.fileName);
        } else if (backup.mode === 'delete') {
          return writeFile(uploadPath + backup.fileName, backup.buffer);
        }
      });

      await Promise.all(promises)
        .then(() => this.reset())
        .catch(err => console.log('File rollback failed to complete!'));
    }
  }

  private async upload(file: File) {
    this.validate(file);
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const fileName = Date.now() + fileNameTimestampSeparator + file.name;

    await writeFile(uploadPath + fileName, buffer).then(() => {
      this.backups.push({
        buffer,
        fileName,
        mode: 'save',
      });

      this.success = true;
    });

    return {
      title: fileName,
      fileName,
      mimeType: file.type,
    };
  }

  async addFile(file: File, refId: string) {
    const data = await this.upload(file);
    await this.add({
      ...data,
      refId,
    });
  }

  async deleteFile(id: string) {
    const [{ fileName }] = await this.select('fileName', { id });
    const backup = await readFile(uploadPath + fileName);

    await unlink(uploadPath + fileName).then(() => {
      this.success = true;
      this.backups.push({
        buffer: backup,
        fileName,
        mode: 'delete',
      });
    });

    await this.del({ id });
  }

  /**Will delete all files from disk that do not have a database entry. */
  static async removeUnpaired() {
    const checkFileInTable = async (fileTableName: string, fileName: string) => {
      return (await db(fileTableName).where({ fileName })).length;
    };

    const files = await readdir(uploadPath);
    const unlinkPromises = files.map(fileName => {
      if (!checkFileInTable('propertyFiles', fileName) || !checkFileInTable('eventFiles', fileName)) {
        return unlink(uploadPath + fileName);
      }
    });

    await Promise.all(unlinkPromises);
  }
}
