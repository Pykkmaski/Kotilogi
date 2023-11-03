'use server';

import db from "kotilogi-app/dbconfig";

interface DatabaseTableInterface{
    tableName: string,
}

export default class DatabaseTable implements DatabaseTableInterface{
    /**
     * A utility class for doing operations on knex tables.
     */

    tableName: string;

    constructor(tableName: Kotilogi.Table){
        this.tableName = tableName;
    }

    private getTable(){
        return db(this.tableName);
    }

    async getData(query: object, onlyFirst?: boolean): Promise<object[] | object | undefined>{
        /**
         * Gets data from the table by query, returning only the first match if onlyFirst is true.
         * @param {object} query The query object accepted by the knex where-method.
         * @param {boolean} onlyFirst If true, calls .first() after the where-method, returning only the first match to the query.
         * @returns {Promise<object | object[] | undefined>} A promise resolving to to an array, a single object or undefined, if nothing is found. 
         */

        var data: Promise<object | object[] | undefined>;
        if(onlyFirst){
            data = this.getTable().where(query).first();
        }
        else{
            data = this.getTable().where(query);
        }
        return data;
    }   

    async addData(data: object): Promise<object>{
        /**
         * Adds new data to the table.
         * @param {object} data The data to be inserted.
         * @returns {Promise<object>} The updated entry in the table.
         */

        return this.getTable().insert(data, '*');
    }

    async updateData(query: object, updatedData: object): Promise<object[]>{
        /**
         * Updates data in the table by query.
         * @param {object} query The query object accepted by the knex where-method.
         * @param {object} updatedData The updated data.
         * @returns {Promise<object[]>} A promise resolving to an array containing the updated entries.
         */

        return this.getTable().where(query).update(updatedData, '*');
    }

    async deleteData(query: object): Promise<void>{
        /**
         * Deletes data in the table by query.
         * @param {object} query The query object accepted by the knex where-method.
         * @returns {Promise<void>} 
         */

        return this.getTable().where(query).del();
    }

    async raw(): Promise<unknown>{
        /**
         * Returns the knex table itself, allowing calls on it directly.
         * @returns {Promise<unknown>} The knex table object.
         */

        return this.getTable();
    }
}