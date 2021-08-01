import {
  generateId, deepCopy, deepMerge, isPlainObject,
} from 'basx';

// Webpack HMR interface.
interface ExtendedNodeModule extends NodeModule {
  hot: { accept: () => void };
}

function main(): void {
  const { log } = console;
  const a = { key: 'test', arr: [1, new RegExp('')] };
  const b = { key: 'new test', arr: ['ok'], other: 'test' };
  const e = (): string => 'ok';
  const c = deepCopy(a);
  const f = deepCopy(e);
  const d = deepMerge(a, b);
  log(generateId());
  log(isPlainObject(a));
  log(c, d, f, c === a, f === e);
}

// Ensures DOM is fully loaded before running app's main logic.
// Loading hasn't finished yet...
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', main);
  // `DOMContentLoaded` has already fired...
} else {
  main();
}

// Enables Hot Module Rendering.
if ((module as ExtendedNodeModule).hot) {
  (module as ExtendedNodeModule).hot.accept();
}
