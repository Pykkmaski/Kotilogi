import { opendir, unlink } from 'fs/promises';
import db from 'kotilogi-app/dbconfig';
import { uploadPath } from 'kotilogi-app/uploadsConfig';
import { NextRequest } from 'next/server';
import { response } from '../../../_utils/responseUtils';

/**
 * An api route to clean up any files that don't have a database entry.
 * @param req
 */
export async function DELETE(req: NextRequest) {
  try {
    let filesDeleted = 0;
    const dir = await opendir(uploadPath);
    for await (const entry of dir) {
      const filename = entry.name;
      await db('data_files')
        .where({ name: filename })
        .then(async ([file]) => {
          if (!file) {
            await unlink(uploadPath + filename);
            filesDeleted++;
          }
        });
    }

    return response(
      'success',
      `Tiedostoja poistettu ${filesDeleted}`,
      `Tiedostoja poistettu ${filesDeleted}`
    );
  } catch (err) {
    console.log(err.message);
    response('serverError', null, err.message);
  }
}
