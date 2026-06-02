const fs = require('fs');

// Try loading jsdom inside a try/catch
let JSDOM;
try {
  JSDOM = require('jsdom').JSDOM;
} catch (e) {
  // Safe to ignore, we will fall back
}

if (JSDOM) {
  try {
    const dom = new JSDOM(`<!DOCTYPE html><html><body><div id="root"></div></body></html>`, {
      runScripts: "dangerously",
      resources: "usable"
    });
    const { window } = dom;
    
    // Mock React and ReactDOM
    window.React = {
      useState: () => [null, () => {}],
      useEffect: () => {},
      useRef: () => ({ current: null }),
      useMemo: (f) => f(),
      useCallback: (f) => f,
      createElement: (type, props, ...children) => ({ type, props, children }),
      Fragment: 'Fragment'
    };
    window.ReactDOM = {
      createRoot: () => ({
        render: (element) => {
          console.log("ReactDOM.createRoot().render() called successfully!");
        }
      })
    };
    
    // Run scripts
    const sharedCode = fs.readFileSync('./js/shared.js', 'utf8');
    const indexCode = fs.readFileSync('./js/index.js', 'utf8');
    
    // Execute shared.js
    const script1 = dom.window.document.createElement('script');
    script1.textContent = sharedCode;
    dom.window.document.body.appendChild(script1);
    console.log("Executed shared.js successfully!");
    
    // Execute index.js
    const script2 = dom.window.document.createElement('script');
    script2.textContent = indexCode;
    dom.window.document.body.appendChild(script2);
    console.log("Executed index.js successfully!");

  } catch (err) {
    console.error("Error with JSDOM test:", err);
  }
} else {
  // Fallback: simple global mock
  console.log("jsdom not found, falling back to simple mock...");
  const globalWindow = {
    location: { href: 'http://localhost/', origin: 'http://localhost/' },
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
        console.log("ReactDOM.createRoot().render() called successfully in fallback!");
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
  
  const vm = require('vm');
  vm.createContext(context);
  
  const sharedCode = fs.readFileSync('./js/shared.js', 'utf8');
  const indexCode = fs.readFileSync('./js/index.js', 'utf8');
  
  try {
    vm.runInContext(sharedCode, context);
    console.log("Executed shared.js in VM sandbox successfully!");
    vm.runInContext(indexCode, context);
    console.log("Executed index.js in VM sandbox successfully!");
  } catch (e) {
    console.error("Runtime error in VM sandbox:", e);
  }
}
