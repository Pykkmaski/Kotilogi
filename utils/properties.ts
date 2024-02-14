import { WithFiles } from "./database";
import { users } from "./users";
import { UserType } from "kotilogi-app/types/UserType";
import { revalidatePath } from "next/cache";

type T = Kotilogi.PropertyType;

class Properties extends WithFiles<T>{
    private path: string = '/dashboard/properties';
    
    constructor(){
        super('properties', 'propertyFiles');
    }

    private async validateAdd(data: T){
        return new Promise<boolean>(async (resolve, reject) => {
            try{
                const {refId: email} = data;
                const [user] = await users.get({email}) as unknown as UserType[];
                const {count: propertyCount} = await this.getPropertyCountByUser(user.email);
                resolve(user.plan === 'regular' && propertyCount !== 1 || user.plan === 'pro');
            }
            catch(err){
                console.log(err.message);
                reject(err);
            }
        });
    }

    private async getPropertyCountByUser(email: string){
        return super.count({refId: email});
    }

    async add(data: T, files?: FormData[]){
        return new Promise<T[]>(async (resolve, reject) => {
            try{
                const isOk = await this.validateAdd(data);
                if(!isOk) return reject('not_allowed');

                const addedData = await super.add(data, files);

                revalidatePath(this.path);
                resolve(addedData);
            }
            catch(err){
                reject(err);
            }
        });
    }
}

export const properties = new Properties();