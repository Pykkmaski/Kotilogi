import {expect} from '@jest/globals';
import { getFileTableName } from "../getFileTableName"

it('Returns the correct file table name in reference to the properties table.', () => {
    const tbl = getFileTableName('properties');
    expect(tbl).toBe('propertyFiles');
});

it('Returns the correct file table name in reference to the propertyEvents table.', () => {
    const tbl = getFileTableName('propertyEvents');
    expect(tbl).toBe('eventFiles');
});