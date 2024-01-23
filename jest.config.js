module.exports = {
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
    transform: {
      // '^.+\\.[tj]sx?$' to process js/ts with `ts-jest`
      // '^.+\\.m?[tj]sx?$' to process js/ts/mjs/mts with `ts-jest`
      '^.+\\.tsx?$': [
        'ts-jest',
        {
          tsconfig: 'tsconfig.json',
        },
      ],
    },
  };
  