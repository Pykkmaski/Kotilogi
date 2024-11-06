import { readFile, unlink, writeFile } from 'fs/promises';
import { fileNameTimestampSeparator } from 'kotilogi-app/constants';

import sharp from 'sharp';
import { batchCreateObjects } from './objects';
import { uploadPath } from 'kotilogi-app/uploadsConfig';
import db from 'kotilogi-app/dbconfig';
import { FileDataType } from './types';
import { Knex } from 'knex';

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
