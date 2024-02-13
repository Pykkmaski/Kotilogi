import { UserType } from "kotilogi-app/types/UserType";
import { Database } from "./database";

class Users extends Database<Partial<UserType>>{
    constructor(){
        super('users');
    }
}

export const users = new Users();