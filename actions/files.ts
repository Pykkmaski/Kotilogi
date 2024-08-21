'use server';

import { unlink, writeFile } from 'fs/promises';
import { fileNameTimestampSeparator } from 'kotilogi-app/constants';
import db from 'kotilogi-app/dbconfig';
import { createObject } from 'kotilogi-app/models/objectData';
import { uploadPath } from 'kotilogi-app/uploadsConfig';
import { revalidatePath } from 'next/cache';
import sharp from 'sharp';

export async function AUploadFile(fd: FormData, parentId: string) {
  const file = fd.get('file') as unknown as File;
  const filename = Date.now() + fileNameTimestampSeparator + file.name;
  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);
  const metadata = await sharp(buffer).metadata();

  //Resize image-files
  const outputBuffer =
    file.type == 'image/jpeg'
      ? metadata.width > 1000
        ? await sharp(buffer).rotate(0).resize(1000).jpeg({ quality: 80 }).toBuffer()
        : await sharp(buffer).jpeg({ quality: 80 }).toBuffer()
      : buffer;

  await writeFile(uploadPath + filename, outputBuffer);
  await createObject({ parentId }, async (obj, trx) => {
    await trx('data_files')
      .insert({
        id: obj.id,
        name: filename,
        type: file.type,
        size: outputBuffer.length,
      })
      .catch(async err => {
        console.log(err.message);
        await unlink(uploadPath + filename);
      });
  });
  revalidatePath('files');
  return 0;
}

export async function ADeleteFile(id: string) {
  const trx = await db.transaction();
  try {
    const fileId = id;
    console.log(fileId);
    const [{ name: fileName }] = (await trx('data_files').where({ id: fileId }).select('name')) || [
      {},
    ];
    console.log(fileName);
    await trx('data_objects').where({ id: fileId }).del();

    await unlink(uploadPath + fileName);
    await trx.commit();
    revalidatePath('/newDashboard/properties/[id]/');
    revalidatePath('/newDashboard/properties/[id]/events/[id]');

    return 0;
  } catch (err: any) {
    await trx.rollback();
    console.log(err.message);
    return -1;
  }
}

export async function ASetMainImage(objectId: string, imageId: string) {
  const [previousMainImage] = await db('data_mainImages').where({ objectId });

  if (previousMainImage && previousMainImage.imageId == imageId) {
    return -1;
  } else if (previousMainImage) {
    await db('data_mainImages').where({ id: previousMainImage.id }).update({
      imageId,
    });
  } else {
    await db('data_mainImages').insert({
      objectId,
      imageId,
    });
  }

  revalidatePath('/newDashboard/*');
  return 0;
}
