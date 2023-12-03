import { MaxProperties } from "kotilogi-app/constants";

export default class User{
    private email: string;
    private plan: Kotilogi.Plans;

    constructor(email: string, plan: Kotilogi.Plans){
        this.email = email;
        this.plan = plan;
    }

    getEmail(){
        return this.email;
    }

    getPlan(){
        return this.plan;
    }

    getMaxAllowedProperties(){
        switch(this.plan){
            case 'regular': return MaxProperties.REGULAR;
            case 'pro': return MaxProperties.PRO;

            default: return 0;
        }
    }
}