const fs = require('fs');
const vm = require('vm');

const globalWindow = {
  location: { href: 'http://localhost/guias.html', origin: 'http://localhost/' },
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
      console.log("ReactDOM.createRoot().render() called successfully for guias!");
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

const sharedCode = fs.readFileSync('./js/shared.js', 'utf8');
const guiasCode = fs.readFileSync('./js/guias.js', 'utf8');

try {
  vm.runInContext(sharedCode, context);
  console.log("Executed shared.js successfully!");
  vm.runInContext(guiasCode, context);
  console.log("Executed guias.js successfully!");
} catch (e) {
  console.error("Runtime error in guias:", e);
}
