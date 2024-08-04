import { readdir } from 'fs/promises';
import { uploadPath } from 'kotilogi-app/uploadsConfig';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  try {
    const filenames = await readdir(uploadPath);
    return new NextResponse(JSON.stringify(filenames), {
      status: 200,
    });
  } catch (err: any) {
    console.log(err.message);
    return new NextResponse(null, {
      status: 500,
    });
  }
}
