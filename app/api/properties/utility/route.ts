import { deleteObject } from 'kotilogi-app/models/objectData';
import { UtilityDataType } from 'kotilogi-app/models/types';
import { createUtilityData, updateUtilityData } from 'kotilogi-app/models/utilityData';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const { data } = (await req.json()) as { data: UtilityDataType[] };
    const promises = data.map(d => createUtilityData(d));
    await Promise.all(promises);
    return new NextResponse(null, { status: 200 });
  } catch (err: any) {
    console.log(err.message);
    return new NextResponse(err.message, { status: 500 });
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const { data } = (await req.json()) as {
      data: Partial<UtilityDataType> & Required<Pick<UtilityDataType, 'id'>>;
    };
    await updateUtilityData(data);
    return new NextResponse(null, { status: 200 });
  } catch (err: any) {
    console.log(err.message);
    return new NextResponse(err.message, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const { id } = (await req.json()) as { id: string };
    await deleteObject(id);
    return new NextResponse(null, { status: 200 });
  } catch (err: any) {
    console.log(err.message);
    return new NextResponse(err.message, { status: 500 });
  }
}
