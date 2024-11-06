'use server';

import { ServerActionResponse } from '@/actions/lib/ServerActionResponse';
import axios from 'axios';
import { revalidatePath } from 'kotilogi-app/app/api/_utils/revalidatePath';
import { deleteFile, uploadFiles } from 'kotilogi-app/dataAccess/files';

export const deleteFileAction = async (fileId: string): Promise<ServerActionResponse> => {
  try {
    await deleteFile(fileId);
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

export const createFileAction = async (fdata: FormData) => {
  try {
    const fd = fdata.get('file') as unknown as File;
    uploadFiles([fd], fdata.get('parentId') as unknown as string);
    revalidatePath('/dashboard/');
    return {
      status: 200,
    };
  } catch (err) {
    console.error(err.message);
    return {
      status: 500,
    };
  }
};
