import { totalByKey } from '../totalByKey';

const testData = [
  {
    label: 'Lämmitys',
    monetaryAmount: 10,
  },

  {
    label: 'Lämmitys',
    monetaryAmount: 10,
  },

  {
    label: 'Vesi',
    monetaryAmount: 20,
  },
];

it('Returns the correct total as the specified property', () => {
  const result = totalByKey(testData, { key: 'label', value: 'Lämmitys' }, 'monetaryAmount');
  expect(result['Lämmitys']).toBe(20);
});
