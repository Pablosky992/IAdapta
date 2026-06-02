const fs = require('fs');
const vm = require('vm');

const globalWindow = {
  location: { href: 'http://localhost/recursos.html', origin: 'http://localhost/' },
  localStorage: { getItem: () => null, setItem: () => {} },
  addEventListener: () => {},
  removeEventListener: () => {},
  adsbygoogle: []
};
globalWindow.window = globalWindow;

const ReactMock = {
  useState: (initial) => [initial, () => {}],
  useEffect: () => {},
  useRef: (val) => ({ current: val }),
  useMemo: (f) => f(),
  useCallback: (f) => f,
  createElement: (type, props, ...children) => ({ type, props, children }),
  Fragment: 'Fragment'
};

const ReactDOMMock = {
  createRoot: () => ({
    render: (element) => {
      console.log("ReactDOM.createRoot().render() called successfully for recursos!");
    }
  })
};

const context = {
  window: globalWindow,
  React: ReactMock,
  ReactDOM: ReactDOMMock,
  document: {
    getElementById: () => ({}),
    addEventListener: () => {},
    removeEventListener: () => {}
  },
  navigator: { serviceWorker: { register: () => Promise.resolve() } },
  localStorage: globalWindow.localStorage,
  console: console,
  setTimeout: setTimeout,
  setInterval: setInterval
};

vm.createContext(context);

const catalogCode = fs.readFileSync('./catalogData.js', 'utf8');
const sharedCode = fs.readFileSync('./js/shared.js', 'utf8');
const recursosCode = fs.readFileSync('./js/recursos.js', 'utf8');

try {
  vm.runInContext(catalogCode, context);
  console.log("Executed catalogData.js successfully!");
  vm.runInContext(sharedCode, context);
  console.log("Executed shared.js successfully!");
  vm.runInContext(recursosCode, context);
  console.log("Executed recursos.js successfully!");
} catch (e) {
  console.error("Runtime error in resources with catalog:", e);
}
