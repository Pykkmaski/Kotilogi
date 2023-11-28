import { serverGetDataById, serverGetDataByRefId } from "kotilogi-app/actions/serverGetData";
import serverUpdateDataById from "kotilogi-app/actions/serverUpdateDataById";

export default class PropertyEvent{
    private files: any;
    private eventData: any;
    private loading: boolean = true;
    private error: boolean = false;

    constructor(eventId: Kotilogi.IdType){
        const eventPromise = serverGetDataById(eventId, 'propertyEvents');
        const filesPromise = serverGetDataByRefId(eventId, 'files');

        Promise.all([eventPromise, filesPromise])
        .then(values => {

            const eventData = values[0];
            const files = values[1];

            if(!eventData || !files) throw new Error('Event failed to load!');

            this.eventData  = eventData
            this.files      = files;
        })
        .catch(err => {
            console.log(err.message);
            this.error = true;
        })
        .finally(() => this.loading = false);
    }

    get(){
        return this.eventData;
    }

}