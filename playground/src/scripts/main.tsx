import i18n, { Locale } from 'basx/i18n';
import { deepCopy, deepMerge, isPlainObject } from 'basx';

i18n();
const locale: Locale = { TEST_LABEL: 'Label test {{user}}' };

function main(): void {
  const { log } = console;
  const a = { key: 'test', arr: [1, new RegExp('')] }; // eslint-disable-line prefer-regex-literals
  const b = { key: 'new test', arr: ['ok'], other: 'test' };
  const e = (): string => 'ok';
  const c = deepCopy(a);
  const f = deepCopy(e);
  const d = deepMerge(a, b);
  log(isPlainObject(a));
  log(c, d, f, c === a, f === e);
  log(locale.TEST_LABEL);
  log(locale.TEST_LABEL.t({ user: 'John' }));
}

// Ensures DOM is fully loaded before running app's main logic.
// Loading hasn't finished yet...
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', main);
  // `DOMContentLoaded` has already fired...
} else {
  main();
}
