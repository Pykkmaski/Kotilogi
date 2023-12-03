import { serverGetDataById, serverGetDataByRefId } from "kotilogi-app/actions/serverGetData";
import serverUpdateDataById from "kotilogi-app/actions/serverUpdateDataById";

export default class PropertyEvent{
    private title: string;
    private description: string | undefined;
    private time: Date | undefined;

    constructor(title: string, description?: string, time?: number){
        this.title = title;
        this.description = description;
        this.time = time ? new Date(time) : undefined;
    }
}