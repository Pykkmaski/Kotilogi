import serverDeleteData from "kotilogi-app/actions/serverDeleteData";

type ObjectTypes = {id: Kotilogi.IdType}

export async function deleteFunction<ItemT extends ObjectTypes>(item: ItemT, tableName: Kotilogi.Table){
    return await serverDeleteData(item.id, tableName);
}