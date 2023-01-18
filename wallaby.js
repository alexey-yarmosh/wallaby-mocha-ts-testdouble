import * as path from 'path';
import * as url from 'url';

export default function (wallaby) {
  const __dirname = url.fileURLToPath(new URL('.', import.meta.url));
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
      type: 'node',
      // Tell Wallaby to run your tests with testdouble loader
      params: {
        runner: "--experimental-specifier-resolution=node --loader " + 
          path.join(__dirname, 'node_modules/testdouble/lib/index.mjs')
      }
    },

    // Replace file content `.ts` with `.js` because Wallaby transforms
    // compiles TypeScript files to JavaScript before running them and
    // so the filenames will be broken in mocks; this is not really safe,
    // should create a more robust way of replacing filenames in mocks.
    preprocessors: {
      '**/*.ts': file => file.content.replace(/\.ts/g, '.js')
    },
    workers: { restart: true },
  };
};
