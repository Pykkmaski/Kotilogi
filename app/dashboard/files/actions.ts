'use server';

import { ServerActionResponse } from '@/actions/lib/ServerActionResponse';
import { revalidatePath } from 'kotilogi-app/app/api/_utils/revalidatePath';
import { files } from 'kotilogi-app/dataAccess/files';

/**Deletes a file. */
export const deleteFileAction = async (fileId: string): Promise<ServerActionResponse> => {
  try {
    await files.del(fileId);
    revalidatePath('/dashboard');
    return {
      status: 200,
      statusText: 'Tiedoston poisto onnistui!',
    };
  } catch (err) {
    return {
      status: 500,
      statusText: 'Tiedoston poisto epäonnistui!',
    };
  }
};

/**Creates a new file. */
export const createFileAction = async (fdata: FormData) => {
  try {
    const fd = fdata.get('file') as unknown as File;
    await files.upload([fd], fdata.get('parent_id') as unknown as string);
    revalidatePath('/dashboard/');
    return {
      status: 200,
    };
  } catch (err) {
    const msg = err.message;
    console.error(err.message);
    if (msg.includes('Tiedostojen määrä ylittää')) {
      console.log(40999);
      return { status: 409 };
    } else {
      return {
        status: 500,
      };
    }
  }
};
