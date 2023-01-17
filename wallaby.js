export default function (wallaby) {
  return {
    testFramework: 'mocha',
    files: [
      'package.json',
      'src/**/*.ts',
    ],
    tests: [
      'tests/**/*.ts'
    ],
    env: {
      type: 'node'
    },
    workers: { restart: true },
  };
};
