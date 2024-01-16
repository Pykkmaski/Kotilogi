import 'ts-node/register';

const jestConfig = {
    preset: 'ts-jest',
    testEnvironment: 'jsdom',
    moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
    testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.(jsx?|tsx?)$',
    moduleDirectories: ["node_modules", "<rootDir>"],
    moduleNameMapper: {
      '@/(.*)': '<rootDir>/$1',
      'kotilogi-app/(.*)': '<rootDir>/$1',
      '\\.(scss|sass|css)$': 'identity-obj-proxy',
    },
  };

export default jestConfig;
  