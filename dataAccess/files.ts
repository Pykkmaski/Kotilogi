import { readFile, unlink, writeFile } from 'fs/promises';
import { fileNameTimestampSeparator } from 'kotilogi-app/constants';

import sharp from 'sharp';
import { batchCreateObjects } from './objects';
import { uploadPath } from 'kotilogi-app/uploadsConfig';
import db from 'kotilogi-app/dbconfig';
import { FileDataType } from './types';
import { Knex } from 'knex';
import axios from 'axios';
import { revalidatePath } from 'next/cache';
import { setMainImageAction } from '@/actions/files';

const createFileBuffer = async (file: File) => {
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
};

export async function uploadFiles(files: File[], parentId: string) {
  const uploadedFileNames: string[] = [];

  await batchCreateObjects(
    files.length,
    parentId,
    async (objId, currentIndex, trx) => {
      const file = files[currentIndex];
      console.log(file.type);
      const outputBuffer = await createFileBuffer(file);
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

export async function deleteFile(id: string) {
  let fileBackup = null;
  let filename = null;
  const trx = await db.transaction();

  try {
    const fileId = id;

    const [{ name: fileName }] = (await trx('data_files').where({ id: fileId }).select('name')) || [
      {},
    ];
    filename = fileName;

    await trx('data_objects').where({ id: fileId }).del();
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
export async function setDefaultMainImage(objectId: string) {
  const [currentMainImage] = await db('data_mainImages').where({ objectId }).pluck('id');
  console.log(currentMainImage);
  if (currentMainImage) return;

  const [image] = await db('data_files')
    .join('data_objects', { 'data_objects.id': 'data_files.id' })
    .where({ parentId: objectId, type: 'image/jpeg' })
    .orderBy('data_objects.timestamp', 'asc')
    .pluck('data_files.id');

  if (image) {
    await setMainImageAction(objectId, image);
    revalidatePath('/dashboard/');
  }
}
