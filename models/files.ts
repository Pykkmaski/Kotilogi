import { readFile, unlink, writeFile } from 'fs/promises';
import { fileNameTimestampSeparator } from 'kotilogi-app/constants';

import sharp from 'sharp';
import { createObject } from './objectData';
import { uploadPath } from 'kotilogi-app/uploadsConfig';
import db from 'kotilogi-app/dbconfig';

export async function uploadFiles(files: File[], parentId: string) {
  const uploadedFiles = [];
  try {
    for (const file of files) {
      const filename = Date.now() + fileNameTimestampSeparator + file.name;
      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);
      const metadata = await sharp(buffer).metadata();

      //Resize image-files
      const outputBuffer =
        file.type == 'image/jpeg'
          ? metadata.width > 1000
            ? await sharp(buffer).rotate(0).resize(1000).jpeg({ quality: 80 }).toBuffer()
            : //Leave images narrower than 1000px as they are. Just lower the quality.
              await sharp(buffer).jpeg({ quality: 80 }).toBuffer()
          : buffer;

      await writeFile(uploadPath + filename, outputBuffer);

      await createObject({ parentId }, async (obj, trx) => {
        await trx('data_files').insert({
          id: obj.id,
          name: filename,
          type: file.type,
          size: outputBuffer.length,
        });
      });

      uploadedFiles.push(filename);
    }
  } catch (err) {
    console.log(err.message);
    for (const fn of uploadedFiles) {
      await unlink(uploadPath + fn);
    }
    throw err;
  }
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
