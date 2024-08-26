import { response } from 'kotilogi-app/app/api/_utils/responseUtils';
import { revalidatePath } from 'kotilogi-app/app/api/_utils/revalidatePath';
import { deleteObject } from 'kotilogi-app/models/objectData';
import { UtilityDataType } from 'kotilogi-app/models/types';
import {
  createUtilityData,
  getUtilityData,
  updateUtilityData,
} from 'kotilogi-app/models/utilityData';
import { searchParamsToObject } from 'kotilogi-app/utils/searchParamsToObject';

import { NextRequest } from 'next/server';
import z from 'zod';

const revalidationPath = '/dashboard/properties/[propertyId]/';

export async function GET(req: NextRequest) {
  try {
    const query = searchParamsToObject(req.nextUrl.searchParams);
    const data = await getUtilityData(query);
    return response('success', JSON.stringify(data));
  } catch (err: any) {
    console.log(err.message);
    return response('serverError', null, err.message);
  }
}

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();

    z.array(
      z.object({
        parentId: z.string(),
        monetaryAmount: z.number(),
        unitAmount: z.number(),
        time: z.string(),
      })
    ).parse(data);

    const promises = data.map(d => createUtilityData(d));

    const uploadResults = await Promise.allSettled(promises);

    await revalidatePath(revalidationPath);

    if (uploadResults.find(ur => ur.status === 'rejected')) {
      return response('partial_success', null, 'Osaa tiedoista ei lisätty!');
    } else {
      return response('success', null, 'Tietojen lisäys onnistui!');
    }
  } catch (err: any) {
    console.log(err.message);
    return response('serverError', null, err.message);
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const data = await req.json();
    z.object({
      id: z.string(),
    }).parse(data);

    await updateUtilityData(data);
    await revalidatePath(revalidationPath);
    return response('success', null, 'Tiedon päivitys onnistui!');
  } catch (err: any) {
    console.log(err.message);
    return response('serverError', null, err.message);
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const { id } = (await req.json()) as { id: string };
    await deleteObject(id);
    await revalidatePath(revalidationPath);
    return response('success', null, 'Tiedon poisto onnistui!');
  } catch (err: any) {
    console.log(err.message);
    return response('serverError', null, err.message);
  }
}
