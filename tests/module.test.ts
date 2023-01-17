import assert from 'node:assert';
import * as td from 'testdouble';

describe('test', () => {
  let module: any = null;

  before(async function() {
    await td.replaceEsm('../src/dependencyA.ts', null, () => 2);
    await td.replaceEsm('../src/dependencyB.ts', {
      dependency: () => 2
    });
    await td.replaceEsm('lodash', null, {
      first: () => 2
    });
    module = await import('../src/module');
  });

  it('should mock src modules', () => {
    const result = module.default();
    assert.equal(result, 4);
  });

  it('should mock npm modules', () => {
    const result = module.first();
    assert.equal(result, 4);
  });

  it('should update mock on the run', async () => {
     await td.replaceEsm('../src/dependencyB.ts', {
      dependency: () => 3
    });
    const module = await import('../src/module');
    const result = module.default();
    assert.equal(result, 5);
    td.reset();
  })
});
