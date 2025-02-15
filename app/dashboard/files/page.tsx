import { FilePage } from '@/components/New/Prefabs/FilePage';
import db from 'kotilogi-app/dbconfig';
import React from 'react';

export default async function FilesPage({ searchParams }) {
  const { parentId, returnUrl } = searchParams as {
    parentId: string;
    returnUrl: string;
  };
  const files = await db('data_files').where({ parent_id: parentId });

  return (
    <FilePage
      files={files}
      objectId={parentId}
      returnUrl={returnUrl}
    />
  );
}
