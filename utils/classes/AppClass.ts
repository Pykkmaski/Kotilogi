export default abstract class DataClass{
    private id: string;
    private refId: string;

    constructor(id: string, refId: string){
        this.id = id;
        this.refId = refId;
    }

    getId(){
        return this.id;
    }

    getRefId(){
        return this.refId;
    }
}