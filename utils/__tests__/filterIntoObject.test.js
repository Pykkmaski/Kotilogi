import {filterIntoObject} from '../filterIntoObject';

describe('Testing filterIntoObject', () => {
    it('Returns object with expected properties', () => {
        const array = [{type: 'heat'}, {type: 'water'}, {type: 'water'}];
        const expected = {water: [{type: 'water'}, {type: 'water'}]};
    
        const obj = filterIntoObject(array, 'type', ['water']);
        expect(obj).toEqual(expected);
    });
});
