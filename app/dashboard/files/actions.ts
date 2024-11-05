import { ServerActionResponse } from '@/actions/lib/ServerActionResponse';
import axios from 'axios';
import { revalidatePath } from 'kotilogi-app/app/api/_utils/revalidatePath';

export const deleteFileAction = async (fileId: string): Promise<ServerActionResponse> => {
  try {
    const res = await axios.delete(`/api/protected/files?id=${fileId}`);
    revalidatePath('/dashboard');
    return {
      status: 200,
      statusText: res.statusText,
    };
  } catch (err) {
    return {
      status: 500,
      statusText: err.response.statusText,
    };
  }
};

export const createFileAction = async (fdata: FormData) => {
  try {
    const res = await axios.post('/api/protected/files', fdata);
    revalidatePath('/dashboard/');
    return {
      status: res.status,
    };
  } catch (err) {
    console.error(err.message);
    return {
      status: 500,
    };
  }
};
