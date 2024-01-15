import {expect} from '@jest/globals';
import db from 'kotilogi-app/dbconfig';
import { isAllowedToAddProperty } from '../addProperty';

describe('Testing the permission verifying function for property additions to regular-plan accounts.', () => {
    const testUser = {
        email: 'test@user.email',
        password: 'pass',
        plan: 'regular',
    }

    beforeEach(async () => {
        const user = await db('users').insert(testUser, '*');
        expect(user).toBeDefined();
    });

    it('Allows addition of a property, if none have been added yet.', async () => {
        const [{count}] = await db('properties').where({refId: testUser.email}).count('*', {as: 'count'});
        expect(count).toBe(0);

        const isOk = await isAllowedToAddProperty(testUser.email);
        expect(isOk).toBeTruthy();
    });

    it('Prevents adding of a property if the account already has one.', async () => {
        await db('properties').insert({
            refId: testUser.email,
            title: 'testaddress',
        });

        const isOk = await isAllowedToAddProperty(testUser.email);
        expect(isOk).toBeFalsy();

        await db('properties').where({refId: testUser.email}).del();
    });

    afterEach(async () => {
        await db('users').where({email: testUser.email}).del();
    });
});

describe('Testing the permission verification function for property addition to an account with a pro-plan.', () => {
    const testUser = {
        email: 'test@user.com',
        password: 'pass',
        plan: 'pro',
    }

    beforeEach(async () => {
        await db('users').insert(testUser);
    });

    it('Allows adding of a property if none have been added yet.', async () => {
        const [{count}] = await db('properties').where({refId: testUser.email}).count('*', {as: 'count'});
        expect(count).toBe(0);

        const isOk = await isAllowedToAddProperty(testUser.email);
        expect(isOk).toBeTruthy();
    });

    it('Allows adding of a property even when one already exists.', async () => {
        await db('properties').insert({
            refId: testUser.email,
            title: 'testProperty',
        });

        const [{count}] = await db('properties').where({refId: testUser.email}).count('*', {as: 'count'});
        expect(count).toBe(1);

        const isOk = await isAllowedToAddProperty(testUser.email);
        expect(isOk).toBeTruthy();

        await db('properties').where({refId: testUser.email}).del();
    });

    afterEach(async () => {
        await db('users').where({email: testUser.email}).del();
    });
})