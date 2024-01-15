import db from "@/dbconfig";
import { addData } from "../addData";
import { expect, test } from '@jest/globals';

var testData = {};

beforeEach(() => {
    testData = {testId: 'test'};
});

test('Data added gets returned defined, and has an id assigned.', async () => {
    const data = await addData<any>('test' as any, testData);
    expect(data).toBeDefined();
    expect(data.id).toBeDefined();
});

afterAll(async () => {
    await db('test').del();
});