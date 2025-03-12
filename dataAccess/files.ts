import { readFile, unlink, writeFile } from 'fs/promises';
import { fileNameTimestampSeparator } from 'kotilogi-app/constants';
import sharp from 'sharp';
import { uploadPath } from 'kotilogi-app/uploadsConfig';
import db from 'kotilogi-app/dbconfig';
import { revalidatePath } from 'next/cache';
import { setMainImageAction } from '@/actions/files';
import { verifySession } from 'kotilogi-app/utils/verifySession';
import { objects } from './objects';
import { Knex } from 'knex';
import { uploadToGoogleDrive } from 'kotilogi-app/utils/uploadToGoogleDrive';

class Files {
  private async createFileBuffer(file: File) {
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    let outputBuffer: Buffer;
    if (file.type === 'image/jpeg') {
      const metadata = await sharp(buffer).metadata();
      outputBuffer =
        metadata.width > 1000
          ? await sharp(buffer).rotate(0).resize(1000).jpeg({ quality: 80 }).toBuffer()
          : //Leave images narrower than 1000px as they are. Just lower the quality.
            await sharp(buffer).jpeg({ quality: 80 }).toBuffer();
    } else {
      outputBuffer = buffer;
    }

    return outputBuffer;
  }

  async countFiles(query: TODO, ctx: Knex | Knex.Transaction) {
    const [{ count }] = await ctx('data_files').where(query).count('*', { as: 'count' });
    return typeof count == 'string' ? parseInt(count) : count;
  }

  async upload(files: File[], parentId: string) {
    //TODO: prevent uploading more files if the user already has uploaded a certain amount.
    const fileCount = await this.countFiles({ parent_id: parentId }, db);
    if (fileCount >= 10 || files.length + fileCount >= 10) {
      throw new Error('Tiedostojen määrä ylittää suurimman sallitun rajan!');
    }
    const fileBuffers: Buffer[] = [];
    for (const file of files) {
      fileBuffers.push(await this.createFileBuffer(file));
    }

    const trx = await db.transaction();
    const uploadedFileNames: string[] = [];
    try {
      for (let i = 0; i < fileBuffers.length; ++i) {
        const outputBuffer = fileBuffers[i];
        const file = files[i];
        const filename = Date.now() + fileNameTimestampSeparator + file.name;

        //Save the file into google drive.
        const googleDriveId = await uploadToGoogleDrive(outputBuffer, filename, file.type);

        //TODO: Get the address of where in google drive the file resides, and save that into the database as well.
        await trx('data_files').insert({
          name: filename,
          type: file.type,
          size: outputBuffer.length,
          parent_id: parentId,
          //google_drive_id: googleDriveId,
        });

        //await writeFile(uploadPath + filename, outputBuffer as any);
        uploadedFileNames.push(filename);
      }
      await trx.commit();
    } catch (err) {
      console.log(err.message);
      for (const fn of uploadedFileNames) {
        await unlink(uploadPath + fn);
      }
      await trx.rollback();
    }
  }

  async del(id: string) {
    let fileBackup = null;
    let filename = null;
    const trx = await db.transaction();

    try {
      const fileId = id;

      const [{ name: fileName }] = (await trx('data_files')
        .where({ id: fileId })
        .select('name')) || [{}];
      filename = fileName;

      await trx('data_files').where({ id: fileId }).del();
      fileBackup = await readFile(uploadPath + filename);

      await unlink(uploadPath + filename);
      await trx.commit();
      return 0;
    } catch (err: any) {
      console.log(err.message);
      await trx.rollback();
      await writeFile(uploadPath + filename, fileBackup);

      return -1;
    }
  }

  /**Sets the most recent uploaded image as the default image of an object, if it doesn't have one defined already. */
  async setDefaultMainImage(objectId: string) {
    const [currentMainImage] = await db('data_mainImages').where({ objectId }).pluck('id');

    if (currentMainImage) return;

    const [image] = await db('data_files')
      .where({ parent_id: objectId, type: 'image/jpeg' })
      .orderBy('name', 'desc')
      .pluck('id');

    if (image) {
      await setMainImageAction(objectId, image);
      revalidatePath('/dashboard/');
    }
  }

  async get(query: TODO, limit?: number) {
    return db('data_files').where(query).limit(limit);
  }
}

export const files = new Files();
