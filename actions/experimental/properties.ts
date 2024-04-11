"use server";

import { Properties } from "kotilogi-app/utils/properties";
import { revalidatePath } from "next/cache";
import { checkUserPassword } from "../util/checkUserPassword";
import db from "kotilogi-app/dbconfig";
import { Files } from "kotilogi-app/utils/files";

const PATH = "/dashboard/properties";

export async function addProperty(
  property: Kotilogi.PropertyType,
  files?: FormData[]
) {
  const properties = new Properties();
  await properties.addProperty(
    property,
    files?.map(file => file.get("file") as unknown as File) || []
  );
  revalidatePath(PATH);
}

export async function updateProperty(
  propertyId: string,
  newPropertyData: Kotilogi.PropertyType
) {
  const properties = new Properties();
  await properties.updateProperty(propertyId, newPropertyData);
  revalidatePath(PATH);
}

export async function deleteProperty(propertyId: string) {
  const properties = new Properties();
  await properties.deleteProperty(propertyId);
  revalidatePath(PATH);
}

export async function activateProperty(data: {
  customer: string;
  password: string;
  propertyId: string;
}) {
  await checkUserPassword(data.customer, data.password).then(result => {
    if (!result) throw new Error("Incorrect password!");
  });

  const properties = new Properties();
  await properties.activateProperty(data.propertyId);
  revalidatePath(PATH);
}

export async function deactivateProperty(
  property: Kotilogi.PropertyType,
  password: string
) {
  await checkUserPassword(property.refId, password).then(result => {
    if (!result) {
      throw new Error("Invalid password");
    }
  });

  const properties = new Properties();
  await properties.deactivateProperty(property.id);
  revalidatePath(PATH);
}

export async function deleteFile(id: string) {
  const trx = await db.transaction();
  const fileTable = new Files("propertyFiles", trx);

  try {
    await fileTable.deleteFile(id);
    await trx.commit();
    revalidatePath("/properties/[property_id]/");
  } catch (err) {
    await fileTable.rollbackFiles();
    await trx.rollback();
  }
}
