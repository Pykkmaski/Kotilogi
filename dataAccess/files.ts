import { readFile, unlink, writeFile } from 'fs/promises';
import { fileNameTimestampSeparator } from 'kotilogi-app/constants';
import sharp from 'sharp';
import { uploadPath } from 'kotilogi-app/uploadsConfig';
import db from 'kotilogi-app/dbconfig';
import { revalidatePath } from 'next/cache';
import { setMainImageAction } from '@/actions/files';
import { verifySession } from 'kotilogi-app/utils/verifySession';
import { objects } from './objects';

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

  async upload(files: File[], parentId: string) {
    //TODO: prevent uploading more files if the user already has uploaded a certain amount.

    const session = await verifySession();

    const [{ totalFileSizeUploaded }] = await db('object')
      .join('data_files', { 'data_files.id': 'object.id' })
      .where({ authorId: session.user.id })
      .sum('data_files.size', { as: 'totalFileSizeUploaded' });

    const fileBuffers: Buffer[] = [];
    for (const file of files) {
      fileBuffers.push(await this.createFileBuffer(file));
    }

    const sizeOfFilesToBeUploaded = fileBuffers.reduce((acc, cur) => (acc += cur.length), 0);
    const nextFileSizeUploaded = sizeOfFilesToBeUploaded + parseInt(totalFileSizeUploaded);

    if (nextFileSizeUploaded > 2e7) {
      throw new Error(
        'Tiedostoja ei voida lähettää, koska yhteenlaskettu ladattujen tiedostojen koko ylittää suurimman sallitun rajan!'
      );
    }

    const uploadedFileNames: string[] = [];

    await objects.batchCreate(
      files.length,
      parentId,
      async (objId, currentIndex, trx) => {
        const outputBuffer = fileBuffers[currentIndex];
        const file = files[currentIndex];
        const filename = Date.now() + fileNameTimestampSeparator + file.name;

        await trx('data_files').insert({
          name: filename,
          type: file.type,
          size: outputBuffer.length,
          id: objId,
        });

        await writeFile(uploadPath + filename, outputBuffer as any);
        uploadedFileNames.push(filename);
      },
      async err => {
        console.error(err.message);
        for (const fn of uploadedFileNames) {
          await unlink(uploadPath + fn);
        }
      }
    );
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

      await trx('object').where({ id: fileId }).del();
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
      .join('object', { 'object.id': 'data_files.id' })
      .where({ parentId: objectId, type: 'image/jpeg' })
      .orderBy('object.timestamp', 'asc')
      .pluck('data_files.id');

    if (image) {
      await setMainImageAction(objectId, image);
      revalidatePath('/dashboard/');
    }
  }

  async get(query: TODO, limit?: number) {
    return db('object')
      .join('data_files', { 'data_files.id': 'object.id' })
      .where(query)
      .select('object.*', 'data_files.name', 'data_files.size', 'data_files.type')
      .limit(limit);
  }
}

export const files = new Files();
