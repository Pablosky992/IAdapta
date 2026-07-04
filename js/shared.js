(function() {
// --- COMPONENTES COMPARTIDOS DE IADAPTA ---

const {
  useState,
  useEffect,
  useCallback,
  useRef,
  useMemo
} = React;

// --- CONFIGURACIÓN GLOBAL ---
window.AppConfig = window.AppConfig || {
  AMAZON_AFFILIATE_ID: ""
};

// --- ICONOS VECTORIALES (SVG) ---
const Icons = {
  Menu: ({
    className
  }) => /*#__PURE__*/React.createElement("svg", {
    className: className,
    xmlns: "http://www.w3.org/2000/svg",
    width: "28",
    height: "28",
    fill: "none",
    viewBox: "0 0 24 24",
    stroke: "currentColor",
    strokeWidth: "2"
  }, /*#__PURE__*/React.createElement("path", {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    d: "M4 6h16M4 12h16M4 18h16"
  })),
  Close: ({
    className
  }) => /*#__PURE__*/React.createElement("svg", {
    className: className,
    xmlns: "http://www.w3.org/2000/svg",
    width: "28",
    height: "28",
    fill: "none",
    viewBox: "0 0 24 24",
    stroke: "currentColor",
    strokeWidth: "2"
  }, /*#__PURE__*/React.createElement("path", {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    d: "M6 18L18 6M6 6l12 12"
  })),
  User: ({
    className
  }) => /*#__PURE__*/React.createElement("svg", {
    className: className,
    xmlns: "http://www.w3.org/2000/svg",
    width: "28",
    height: "28",
    fill: "none",
    viewBox: "0 0 24 24",
    stroke: "currentColor",
    strokeWidth: "1.5"
  }, /*#__PURE__*/React.createElement("path", {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    d: "M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
  })),
  Brain: ({
    className
  }) => /*#__PURE__*/React.createElement("svg", {
    className: className,
    xmlns: "http://www.w3.org/2000/svg",
    width: "28",
    height: "28",
    fill: "none",
    viewBox: "0 0 24 24",
    stroke: "currentColor",
    strokeWidth: "1.5"
  }, /*#__PURE__*/React.createElement("circle", {
    cx: "15.5",
    cy: "9.5",
    r: "4.5",
    strokeWidth: "2"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M18.5 12.5L21 15",
    strokeWidth: "2",
    strokeLinecap: "round"
  }), /*#__PURE__*/React.createElement("rect", {
    x: "3",
    y: "10",
    width: "9",
    height: "8",
    rx: "2"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M5 10V8a2 2 0 012-2h1a2 2 0 012 2v2"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "5.5",
    cy: "14",
    r: "0.8",
    fill: "currentColor"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "9.5",
    cy: "14",
    r: "0.8",
    fill: "currentColor"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M6.5 16.5c.5.5 1.5.5 2 0",
    strokeLinecap: "round"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M7.5 4V6",
    strokeLinecap: "round"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "7.5",
    cy: "3.5",
    r: "1",
    fill: "currentColor",
    stroke: "none"
  })),
  Book: ({
    className
  }) => /*#__PURE__*/React.createElement("svg", {
    className: className,
    xmlns: "http://www.w3.org/2000/svg",
    width: "28",
    height: "28",
    fill: "none",
    viewBox: "0 0 24 24",
    stroke: "currentColor",
    strokeWidth: "1.5"
  }, /*#__PURE__*/React.createElement("path", {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    d: "M4 19.5V4.5A2.5 2.5 0 016.5 2H20v20H6.5a2.5 2.5 0 01-2.5-2.5z"
  }), /*#__PURE__*/React.createElement("path", {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    d: "M8 7h8M8 11h8M8 15h5"
  }), /*#__PURE__*/React.createElement("path", {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    d: "M4 19.5c0 .828.672 1.5 1.5 1.5H20"
  })),
  Download: ({
    className
  }) => /*#__PURE__*/React.createElement("svg", {
    className: className,
    xmlns: "http://www.w3.org/2000/svg",
    width: "20",
    height: "20",
    fill: "none",
    viewBox: "0 0 24 24",
    stroke: "currentColor",
    strokeWidth: "2"
  }, /*#__PURE__*/React.createElement("path", {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    d: "M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3"
  })),
  ArrowRight: ({
    className
  }) => /*#__PURE__*/React.createElement("svg", {
    className: className,
    xmlns: "http://www.w3.org/2000/svg",
    width: "20",
    height: "20",
    fill: "none",
    viewBox: "0 0 24 24",
    stroke: "currentColor",
    strokeWidth: "2"
  }, /*#__PURE__*/React.createElement("path", {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    d: "M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
  })),
  Warning: ({
    className
  }) => /*#__PURE__*/React.createElement("svg", {
    className: className,
    xmlns: "http://www.w3.org/2000/svg",
    width: "20",
    height: "20",
    fill: "none",
    viewBox: "0 0 24 24",
    stroke: "currentColor",
    strokeWidth: "2"
  }, /*#__PURE__*/React.createElement("path", {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    d: "M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"
  })),
  Shield: ({
    className
  }) => /*#__PURE__*/React.createElement("svg", {
    className: className,
    xmlns: "http://www.w3.org/2000/svg",
    width: "22",
    height: "22",
    fill: "none",
    viewBox: "0 0 24 24",
    stroke: "currentColor",
    strokeWidth: "1.5"
  }, /*#__PURE__*/React.createElement("path", {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    d: "M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z"
  })),
  Lightbulb: ({
    className
  }) => /*#__PURE__*/React.createElement("svg", {
    className: className,
    xmlns: "http://www.w3.org/2000/svg",
    width: "22",
    height: "22",
    fill: "none",
    viewBox: "0 0 24 24",
    stroke: "currentColor",
    strokeWidth: "1.5"
  }, /*#__PURE__*/React.createElement("path", {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    d: "M12 18v-5.25m0 0a6.01 6.01 0 001.5-.189m-1.5.189a6.01 6.01 0 01-1.5-.189m3.75 7.478a12.06 12.06 0 01-4.5 0m3.75 2.383a14.406 14.406 0 01-3 0M14.25 18v-.192c0-.983.658-1.823 1.508-2.316a7.5 7.5 0 10-7.517 0c.85.493 1.509 1.333 1.509 2.316V18"
  })),
  Heart: ({
    className
  }) => /*#__PURE__*/React.createElement("svg", {
    className: className,
    xmlns: "http://www.w3.org/2000/svg",
    width: "22",
    height: "22",
    fill: "none",
    viewBox: "0 0 24 24",
    stroke: "currentColor",
    strokeWidth: "1.5"
  }, /*#__PURE__*/React.createElement("path", {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    d: "M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
  })),
  Refresh: ({
    className
  }) => /*#__PURE__*/React.createElement("svg", {
    className: className,
    xmlns: "http://www.w3.org/2000/svg",
    width: "20",
    height: "20",
    fill: "none",
    viewBox: "0 0 24 24",
    stroke: "currentColor",
    strokeWidth: "2.5"
  }, /*#__PURE__*/React.createElement("path", {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    d: "M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99"
  })),
  X: ({
    className
  }) => /*#__PURE__*/React.createElement("svg", {
    className: className,
    xmlns: "http://www.w3.org/2000/svg",
    width: "24",
    height: "24",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2"
  }, /*#__PURE__*/React.createElement("path", {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    d: "M6 18L18 6M6 6l12 12"
  })),
  Search: ({
    className
  }) => /*#__PURE__*/React.createElement("svg", {
    className: className,
    xmlns: "http://www.w3.org/2000/svg",
    width: "28",
    height: "28",
    fill: "none",
    viewBox: "0 0 24 24",
    stroke: "currentColor",
    strokeWidth: "1.5"
  }, /*#__PURE__*/React.createElement("path", {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    d: "M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
  })),
  FilePdf: ({
    className
  }) => /*#__PURE__*/React.createElement("svg", {
    className: className,
    xmlns: "http://www.w3.org/2000/svg",
    width: "24",
    height: "24",
    fill: "none",
    viewBox: "0 0 24 24",
    stroke: "currentColor",
    strokeWidth: "2"
  }, /*#__PURE__*/React.createElement("path", {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    d: "M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"
  }), /*#__PURE__*/React.createElement("polyline", {
    points: "14 2 14 8 20 8"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M9 15h3a1.5 1.5 0 0 0 0-3H9v6"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M14 12v6h1.5a2.5 2.5 0 0 0 0-5H14z"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M5 12h3"
  })),
  History: ({
    className
  }) => /*#__PURE__*/React.createElement("svg", {
    className: className,
    xmlns: "http://www.w3.org/2000/svg",
    width: "24",
    height: "24",
    fill: "none",
    viewBox: "0 0 24 24",
    stroke: "currentColor",
    strokeWidth: "2"
  }, /*#__PURE__*/React.createElement("path", {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    d: "M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z"
  })),
  Briefcase: ({
    className
  }) => /*#__PURE__*/React.createElement("svg", {
    className: className,
    xmlns: "http://www.w3.org/2000/svg",
    width: "24",
    height: "24",
    fill: "none",
    viewBox: "0 0 24 24",
    stroke: "currentColor",
    strokeWidth: "1.5"
  }, /*#__PURE__*/React.createElement("path", {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    d: "M20.25 14.15v4.25c0 .621-.504 1.125-1.125 1.125H4.875c-.621 0-1.125-.504-1.125-1.125v-4.25m16.5 0a2.25 2.25 0 00-1.883-2.212c-3.13-.51-6.947-.51-10.084 0A2.25 2.25 0 003.75 14.15m16.5 0a1.5 1.5 0 01-1.5 1.5H5.25a1.5 1.5 0 01-1.5-1.5m16.5 0v-2.625c0-1.104-.896-2-2-2H5.25c-1.104 0-2 .896-2 2v2.625m16.5 0V9a2.25 2.25 0 00-2.25-2.25H16.5m0 0V4.875c0-.621-.504-1.125-1.125-1.125H8.625c-.621 0-1.125.504-1.125 1.125V6.75m8.25 0h-8.25m8.25 0v-1.125c0-.621-.504-1.125-1.125-1.125H8.625c-.621 0-1.125.504-1.125 1.125V6.75m0 0H5.25a2.25 2.25 0 00-2.25 2.25v2.625"
  })),
  Keys: ({
    className
  }) => /*#__PURE__*/React.createElement("svg", {
    className: className,
    xmlns: "http://www.w3.org/2000/svg",
    width: "40",
    height: "40",
    fill: "none",
    viewBox: "0 0 24 24",
    stroke: "currentColor",
    strokeWidth: "1.5"
  }, /*#__PURE__*/React.createElement("path", {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    d: "M21 2l-2 2m-7.61 7.61a5.5 5.5 0 1 1-7.778 7.778 5.5 5.5 0 0 1 7.777-7.777zm0 0L15.5 7.5m0 0l3 3L22 7l-3-3L15.5 7.5z"
  })),
  Smartphone: ({
    className
  }) => /*#__PURE__*/React.createElement("svg", {
    className: className,
    xmlns: "http://www.w3.org/2000/svg",
    width: "40",
    height: "40",
    fill: "none",
    viewBox: "0 0 24 24",
    stroke: "currentColor",
    strokeWidth: "1.5"
  }, /*#__PURE__*/React.createElement("rect", {
    width: "14",
    height: "20",
    x: "5",
    y: "2",
    rx: "2",
    ry: "2"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M12 18h.01"
  })),
  Utensils: ({
    className
  }) => /*#__PURE__*/React.createElement("svg", {
    className: className,
    xmlns: "http://www.w3.org/2000/svg",
    width: "40",
    height: "40",
    fill: "none",
    viewBox: "0 0 24 24",
    stroke: "currentColor",
    strokeWidth: "1.5"
  }, /*#__PURE__*/React.createElement("path", {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    d: "M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2M7 2v20M21 15V2v0a5 5 0 0 0-5 5v6c0 1.1.9 2 2 2h3Zm0 0v7"
  })),
  Watch: ({
    className
  }) => /*#__PURE__*/React.createElement("svg", {
    className: className,
    xmlns: "http://www.w3.org/2000/svg",
    width: "40",
    height: "40",
    fill: "none",
    viewBox: "0 0 24 24",
    stroke: "currentColor",
    strokeWidth: "1.5"
  }, /*#__PURE__*/React.createElement("circle", {
    cx: "12",
    cy: "12",
    r: "7"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M12 9v3l2 2M16.51 17.35l-.35 3.83a2 2 0 0 1-2 1.82H9.84a2 2 0 0 1-2-1.82l-.35-3.83m.01-10.7l.35-3.83A2 2 0 0 1 9.83 1h4.35a2 2 0 0 1 2 1.82l.35 3.83"
  })),
  Glasses: ({
    className
  }) => /*#__PURE__*/React.createElement("svg", {
    className: className,
    xmlns: "http://www.w3.org/2000/svg",
    width: "40",
    height: "40",
    fill: "none",
    viewBox: "0 0 24 24",
    stroke: "currentColor",
    strokeWidth: "1.5"
  }, /*#__PURE__*/React.createElement("circle", {
    cx: "6",
    cy: "15",
    r: "4"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "18",
    cy: "15",
    r: "4"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M14 15a2 2 0 0 0-2-2 2 2 0 0 0-2 2M2.5 13L5 7c.7-1.3 1.4-2 3-2M21.5 13L19 7c-.7-1.3-1.4-2-3-2"
  })),
  Coffee: ({
    className
  }) => /*#__PURE__*/React.createElement("svg", {
    className: className,
    xmlns: "http://www.w3.org/2000/svg",
    width: "40",
    height: "40",
    fill: "none",
    viewBox: "0 0 24 24",
    stroke: "currentColor",
    strokeWidth: "1.5"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M17 8h1a4 4 0 1 1 0 8h-1M3 8h14v9a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4Z"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M6 2v2M10 2v2M14 2v2"
  })),
  Lamp: ({
    className
  }) => /*#__PURE__*/React.createElement("svg", {
    className: className,
    xmlns: "http://www.w3.org/2000/svg",
    width: "40",
    height: "40",
    fill: "none",
    viewBox: "0 0 24 24",
    stroke: "currentColor",
    strokeWidth: "1.5"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M12 2v2M5 22h14M9 22v-4a3 3 0 0 1 6 0v4M14 10a2 2 0 0 1-2 2 2 2 0 0 1-2-2V7a2 2 0 0 1 2-2 2 2 0 0 1 2 2v3ZM12 12v3"
  })),
  Shirt: ({
    className
  }) => /*#__PURE__*/React.createElement("svg", {
    className: className,
    xmlns: "http://www.w3.org/2000/svg",
    width: "40",
    height: "40",
    fill: "none",
    viewBox: "0 0 24 24",
    stroke: "currentColor",
    strokeWidth: "1.5"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M20.38 3.46L16 2a4 4 0 0 1-8 0L3.62 3.46a2 2 0 0 0-1.34 1.9l.58 14.33c.05 1.1.96 1.97 2.06 1.97h14.16c1.1 0 2.01-.87 2.06-1.97l.58-14.33a2 2 0 0 0-1.34-1.9ZM12 4.41V21M12 4.41l-2 1M12 4.41l2 1"
  })),
  Puzzle: ({
    className
  }) => /*#__PURE__*/React.createElement("svg", {
    className: className,
    xmlns: "http://www.w3.org/2000/svg",
    width: "28",
    height: "28",
    fill: "none",
    viewBox: "0 0 24 24",
    stroke: "currentColor",
    strokeWidth: "1.5"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M7 21v-1a4 4 0 014-4h2a4 4 0 014 4v1",
    strokeLinecap: "round"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M12 16a4 4 0 100-8 4 4 0 000 8z"
  }), /*#__PURE__*/React.createElement("g", {
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M14 2l1 1v2.5"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M19 6.5a1.2 1.2 0 011.2 1.2c0 1.2-1.2 1.2-1.2 2.4h2"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M4.5 6.5h2l-1.5 1.5h1a1 1 0 0 1 0 2h-2"
  })), /*#__PURE__*/React.createElement("circle", {
    cx: "17.5",
    cy: "4",
    r: "0.5",
    fill: "currentColor"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "6.5",
    cy: "4",
    r: "0.5",
    fill: "currentColor"
  })),
  List: ({
    className
  }) => /*#__PURE__*/React.createElement("svg", {
    className: className,
    xmlns: "http://www.w3.org/2000/svg",
    width: "24",
    height: "24",
    fill: "none",
    viewBox: "0 0 24 24",
    stroke: "currentColor",
    strokeWidth: "2"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M10 6h11M10 12h11M10 18h11M4 6h1v4M4 10h2M7 18H4v-2c0-1 1-2 2-2h1M7 14h-3"
  })),
  FileText: ({
    className
  }) => /*#__PURE__*/React.createElement("svg", {
    className: className,
    xmlns: "http://www.w3.org/2000/svg",
    width: "24",
    height: "24",
    fill: "none",
    viewBox: "0 0 24 24",
    stroke: "currentColor",
    strokeWidth: "2"
  }, /*#__PURE__*/React.createElement("path", {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    d: "M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"
  })),
  Check: ({
    className
  }) => /*#__PURE__*/React.createElement("svg", {
    className: className,
    xmlns: "http://www.w3.org/2000/svg",
    width: "20",
    height: "20",
    fill: "none",
    viewBox: "0 0 24 24",
    stroke: "currentColor",
    strokeWidth: "3"
  }, /*#__PURE__*/React.createElement("path", {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    d: "M4.5 12.75l6 6 9-13.5"
  })),
  Mail: ({
    className
  }) => /*#__PURE__*/React.createElement("svg", {
    className: className,
    xmlns: "http://www.w3.org/2000/svg",
    width: "24",
    height: "24",
    fill: "none",
    viewBox: "0 0 24 24",
    stroke: "currentColor",
    strokeWidth: "2"
  }, /*#__PURE__*/React.createElement("path", {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    d: "M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"
  })),
  Location: ({
    className
  }) => /*#__PURE__*/React.createElement("svg", {
    className: className,
    xmlns: "http://www.w3.org/2000/svg",
    width: "24",
    height: "24",
    fill: "none",
    viewBox: "0 0 24 24",
    stroke: "currentColor",
    strokeWidth: "2"
  }, /*#__PURE__*/React.createElement("path", {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    d: "M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"
  }), /*#__PURE__*/React.createElement("path", {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    d: "M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"
  })),
  Star: ({
    className
  }) => /*#__PURE__*/React.createElement("svg", {
    className: className,
    xmlns: "http://www.w3.org/2000/svg",
    width: "24",
    height: "24",
    fill: "currentColor",
    viewBox: "0 0 24 24"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"
  })),
  ChevronDown: ({
    className
  }) => /*#__PURE__*/React.createElement("svg", {
    className: className,
    xmlns: "http://www.w3.org/2000/svg",
    width: "24",
    height: "24",
    fill: "none",
    viewBox: "0 0 24 24",
    stroke: "currentColor",
    strokeWidth: "2"
  }, /*#__PURE__*/React.createElement("path", {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    d: "M19.5 8.25l-7.5 7.5-7.5-7.5"
  })),
  CheckCircle: ({
    className
  }) => /*#__PURE__*/React.createElement("svg", {
    className: className,
    xmlns: "http://www.w3.org/2000/svg",
    width: "24",
    height: "24",
    fill: "none",
    viewBox: "0 0 24 24",
    stroke: "currentColor",
    strokeWidth: "2"
  }, /*#__PURE__*/React.createElement("path", {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    d: "M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
  })),
  Facebook: ({
    className
  }) => /*#__PURE__*/React.createElement("svg", {
    className: className,
    xmlns: "http://www.w3.org/2000/svg",
    width: "24",
    height: "24",
    fill: "currentColor",
    viewBox: "0 0 24 24"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M18.77 7.46H14.5v-1.9c0-.9.6-1.1 1-1.1h3V.5h-4.33C10.24.5 9.5 3.44 9.5 5.32v2.14H7.03v3.91h2.47V23.5h5V11.37h3.36l.91-3.91z"
  })),
  Twitter: ({
    className
  }) => /*#__PURE__*/React.createElement("svg", {
    className: className,
    xmlns: "http://www.w3.org/2000/svg",
    width: "24",
    height: "24",
    fill: "currentColor",
    viewBox: "0 0 24 24"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M23.95 4.57a10 10 0 01-2.82.77 4.96 4.96 0 002.16-2.72 9.9 9.9 0 01-3.13 1.2 4.93 4.93 0 00-8.39 4.49A14 14 0 011.64 3.16 4.93 4.93 0 003.16 9.7a4.89 4.89 0 01-2.22-.61v.06a4.93 4.93 0 003.95 4.83 4.9 4.9 0 01-2.22.08 4.93 4.93 0 004.6 3.42A9.9 9.9 0 010 19.54a13.94 13.94 0 007.55 2.21c9.06 0 14-7.5 14-14 0-.21 0-.42-.01-.63a10 10 0 002.41-2.55z"
  })),
  Calculator: ({
    className
  }) => /*#__PURE__*/React.createElement("svg", {
    className: className,
    xmlns: "http://www.w3.org/2000/svg",
    width: "28",
    height: "28",
    fill: "none",
    viewBox: "0 0 24 24",
    stroke: "currentColor",
    strokeWidth: "2"
  }, /*#__PURE__*/React.createElement("rect", {
    x: "4",
    y: "2",
    width: "16",
    height: "20",
    rx: "2"
  }), /*#__PURE__*/React.createElement("line", {
    x1: "8",
    y1: "6",
    x2: "16",
    y2: "6"
  }), /*#__PURE__*/React.createElement("line", {
    x1: "8",
    y1: "10",
    x2: "8",
    y2: "10"
  }), /*#__PURE__*/React.createElement("line", {
    x1: "12",
    y1: "10",
    x2: "12",
    y2: "10"
  }), /*#__PURE__*/React.createElement("line", {
    x1: "16",
    y1: "10",
    x2: "16",
    y2: "10"
  }), /*#__PURE__*/React.createElement("line", {
    x1: "8",
    y1: "14",
    x2: "8",
    y2: "14"
  }), /*#__PURE__*/React.createElement("line", {
    x1: "12",
    y1: "14",
    x2: "12",
    y2: "14"
  }), /*#__PURE__*/React.createElement("line", {
    x1: "16",
    y1: "14",
    x2: "16",
    y2: "14"
  }), /*#__PURE__*/React.createElement("line", {
    x1: "8",
    y1: "18",
    x2: "8",
    y2: "18"
  }), /*#__PURE__*/React.createElement("line", {
    x1: "12",
    y1: "18",
    x2: "12",
    y2: "18"
  }), /*#__PURE__*/React.createElement("line", {
    x1: "16",
    y1: "18",
    x2: "16",
    y2: "18"
  })),
  ArrowLeft: ({
    className
  }) => /*#__PURE__*/React.createElement("svg", {
    className: className,
    xmlns: "http://www.w3.org/2000/svg",
    width: "24",
    height: "24",
    fill: "none",
    viewBox: "0 0 24 24",
    stroke: "currentColor",
    strokeWidth: "2.5"
  }, /*#__PURE__*/React.createElement("path", {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    d: "M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
  })),
  Calendar: ({
    className
  }) => /*#__PURE__*/React.createElement("svg", {
    className: className,
    xmlns: "http://www.w3.org/2000/svg",
    width: "24",
    height: "24",
    fill: "none",
    viewBox: "0 0 24 24",
    stroke: "currentColor",
    strokeWidth: "2"
  }, /*#__PURE__*/React.createElement("rect", {
    x: "3",
    y: "4",
    width: "18",
    height: "18",
    rx: "2",
    ry: "2"
  }), /*#__PURE__*/React.createElement("line", {
    x1: "16",
    y1: "2",
    x2: "16",
    y2: "6"
  }), /*#__PURE__*/React.createElement("line", {
    x1: "8",
    y1: "2",
    x2: "8",
    y2: "6"
  }), /*#__PURE__*/React.createElement("line", {
    x1: "3",
    y1: "10",
    x2: "21",
    y2: "10"
  })),
  Flame: ({
    className
  }) => /*#__PURE__*/React.createElement("svg", {
    className: className,
    xmlns: "http://www.w3.org/2000/svg",
    width: "24",
    height: "24",
    fill: "none",
    viewBox: "0 0 24 24",
    stroke: "currentColor",
    strokeWidth: "2"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M8.5 14.5A2.5 2.5 0 0011 12c0-1.38-.5-2-1-3 1.05.76 3 2.5 3 5.5a4.5 4.5 0 11-9 0c0-1.5.5-3 2-4.5.5 2 1.5 3 2.5 4.5z"
  })),
  WhatsApp: ({
    className
  }) => /*#__PURE__*/React.createElement("svg", {
    className: className,
    xmlns: "http://www.w3.org/2000/svg",
    width: "24",
    height: "24",
    fill: "currentColor",
    viewBox: "0 0 24 24"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.246 2.248 3.484 5.232 3.484 8.412-.003 6.557-5.338 11.892-11.893 11.892-1.997-.001-3.951-.5-5.688-1.448l-6.309 1.656zm6.29-4.139c1.52.907 3.21 1.385 4.94 1.386 5.289 0 9.591-4.301 9.593-9.592 0-2.565-1.001-4.975-2.816-6.793-1.815-1.818-4.225-2.82-6.793-2.821-5.293 0-9.596 4.301-9.598 9.592 0 1.942.585 3.835 1.691 5.433l-1.011 3.691 3.784-.992zm11.702-6.877c-.313-.156-1.854-.914-2.141-1.019-.287-.104-.497-.156-.705.156-.208.312-.806 1.019-.987 1.227-.181.209-.362.235-.675.079-.313-.156-1.32-.486-2.515-1.552-.929-.828-1.556-1.852-1.738-2.165-.181-.313-.019-.482.137-.638.141-.141.313-.365.47-.547.157-.183.209-.313.313-.522.104-.21.053-.392-.026-.548-.078-.156-.705-1.7-.966-2.324-.254-.608-.512-.525-.705-.535-.183-.01-.391-.012-.6-.012s-.547.078-.834.392c-.287.313-1.096 1.071-1.096 2.612 0 1.541 1.121 3.029 1.277 3.238.156.209 2.207 3.371 5.348 4.73.747.323 1.329.516 1.783.661.75.238 1.433.204 1.973.124.602-.089 1.854-.757 2.115-1.487.261-.73.261-1.356.183-1.487-.078-.131-.287-.209-.6-.365z"
  })),
  TrendingUp: ({
    className
  }) => /*#__PURE__*/React.createElement("svg", {
    className: className,
    xmlns: "http://www.w3.org/2000/svg",
    width: "24",
    height: "24",
    fill: "none",
    viewBox: "0 0 24 24",
    stroke: "currentColor",
    strokeWidth: "2"
  }, /*#__PURE__*/React.createElement("path", {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    d: "M2.25 18L9 11.25l4.5 4.5L21.75 7.5M21.75 7.5V12m0-4.5H17.25"
  })),
  AlertCircle: ({
    className
  }) => /*#__PURE__*/React.createElement("svg", {
    className: className,
    xmlns: "http://www.w3.org/2000/svg",
    width: "24",
    height: "24",
    fill: "none",
    viewBox: "0 0 24 24",
    stroke: "currentColor",
    strokeWidth: "2"
  }, /*#__PURE__*/React.createElement("path", {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    d: "M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z"
  })),
  ChevronLeft: ({
    className
  }) => /*#__PURE__*/React.createElement("svg", {
    className: className,
    xmlns: "http://www.w3.org/2000/svg",
    width: "24",
    height: "24",
    fill: "none",
    viewBox: "0 0 24 24",
    stroke: "currentColor",
    strokeWidth: "2"
  }, /*#__PURE__*/React.createElement("path", {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    d: "M15.75 19.5L8.25 12l7.5-7.5"
  })),
  ChevronRight: ({
    className
  }) => /*#__PURE__*/React.createElement("svg", {
    className: className,
    xmlns: "http://www.w3.org/2000/svg",
    width: "24",
    height: "24",
    fill: "none",
    viewBox: "0 0 24 24",
    stroke: "currentColor",
    strokeWidth: "2"
  }, /*#__PURE__*/React.createElement("path", {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    d: "M8.25 4.5l7.5 7.5-7.5 7.5"
  })),
  Cloud: ({
    className
  }) => /*#__PURE__*/React.createElement("svg", {
    className: className,
    xmlns: "http://www.w3.org/2000/svg",
    width: "24",
    height: "24",
    fill: "none",
    viewBox: "0 0 24 24",
    stroke: "currentColor",
    strokeWidth: "2"
  }, /*#__PURE__*/React.createElement("path", {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    d: "M2.25 15a4.5 4.5 0 0 0 4.5 4.5H18a3.75 3.75 0 0 0 1.332-7.257 3 3 0 0 0-3.758-3.848 5.25 5.25 0 0 0-10.233 2.33A4.502 4.502 0 0 0 2.25 15z"
  })),
  Circle: ({
    className
  }) => /*#__PURE__*/React.createElement("svg", {
    className: className,
    xmlns: "http://www.w3.org/2000/svg",
    width: "24",
    height: "24",
    fill: "none",
    viewBox: "0 0 24 24",
    stroke: "currentColor",
    strokeWidth: "2"
  }, /*#__PURE__*/React.createElement("circle", {
    cx: "12",
    cy: "12",
    r: "10"
  }))
};

// --- GET AMAZON LINK & PRODUCT CATALOG ---
const getAmazonLink = (query, directUrl) => {
  const affiliateId = window.AppConfig.AMAZON_AFFILIATE_ID;
  const cleanQuery = query || "ortopedia";
  if (affiliateId && affiliateId.trim() !== "") {
    return `https://www.amazon.es/s?k=${encodeURIComponent(cleanQuery)}&tag=${affiliateId}`;
  }
  return directUrl || `https://www.amazon.es/s?k=${encodeURIComponent(cleanQuery)}`;
};
const PRODUCT_CATALOG = {
  '1': {
    name: 'Tabla para bañera',
    url: 'https://amzn.to/4uLnkU5',
    img: 'tabla_banera.png',
    query: 'tabla bañera ortopedia'
  },
  '2': {
    name: 'Asiento para ducha',
    url: 'https://amzn.to/4dfjkUJ',
    img: 'asiento_ducha.png',
    query: 'asiento ducha banqueta ortopedia'
  },
  '3': {
    name: 'Barras de apoyo',
    url: 'https://amzn.to/4u4JBw3',
    img: 'barras_apoyo.png',
    query: 'asidero barra apoyo baño'
  },
  '4': {
    name: 'Alza de WC',
    url: 'https://amzn.to/42hlsWU',
    img: 'alza_wc.png',
    query: 'elevador inodoro con reposabrazos'
  },
  '5': {
    name: 'Asiento bañera giratorio',
    url: 'https://amzn.to/4d3bjlv',
    img: 'asiento_banera.png',
    query: 'asiento bañera giratorio ortopedia'
  },
  '6': {
    name: 'Barandilla cama',
    url: 'https://amzn.to/42hT9Yu',
    img: 'barandilla_cama.png',
    query: 'barandilla cama adultos'
  },
  '7': {
    name: 'Trapecio de cama',
    url: 'https://amzn.to/3PqiHj4',
    img: 'trapecio_cama.png',
    query: 'trapecio cama ortopedia incorporación'
  },
  '8': {
    name: 'Tacos elevadores cama',
    url: 'https://amzn.to/4tXN3Zo',
    img: 'tacos_cama.png',
    query: 'tacos elevadores muebles cama'
  },
  '9': {
    name: 'Cubiertos adaptados',
    url: 'https://amzn.to/4wi1BVq',
    img: 'cubiertos_adaptados.png',
    query: 'cubiertos adaptados mango grueso'
  },
  '10': {
    name: 'Cuchillo Nelson',
    url: 'https://amzn.to/3QPzqgd',
    img: 'cuchillo_nelson.png',
    query: 'cuchillo nelson una mano'
  },
  '11': {
    name: 'Tabla de corte 1 mano',
    url: 'https://amzn.to/42CtdHf',
    img: 'tabla_cortar.png',
    query: 'tabla de corte para una mano ortopedia'
  },
  '12': {
    name: 'Plato con reborde',
    url: 'https://amzn.to/4d2KwXN',
    img: 'plato_reborde.png',
    query: 'plato reborde alto ventosa adultos'
  },
  '13': {
    name: 'Vaso con escotadura',
    url: 'https://amzn.to/3R1tYXJ',
    img: 'vaso_escotadura.png',
    query: 'vaso escotadura nasal disfagia'
  },
  '14': {
    name: 'Andador interior',
    url: 'https://amzn.to/49eGadM',
    img: 'andador_interior.png',
    query: 'andador interior estrecho'
  },
  '15': {
    name: 'Andador Rollator (exterior)',
    url: 'https://amzn.to/4nioy6O',
    img: 'andador_exterior.png',
    query: 'andador rollator exterior ligero'
  },
  '16': {
    name: 'Conteras antideslizantes',
    url: 'https://amzn.to/4uw9fth',
    img: 'conteras.png',
    query: 'conteras andador antideslizantes 22mm'
  },
  '17': {
    name: 'Muletas Ergonómicas (Par)',
    url: 'https://amzn.to/4dE2H6n',
    img: 'muletas_ergonomicas.png',
    query: 'muletas ergonomicas apoyo antebrazo'
  }
};

// --- COMPONENTE ADSENSERBLOCK ---
// --- COMPONENTE NAVBAR ---
const Navbar = function Navbar({
  currentPage
}) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  const linksMain = [{
    id: 'home',
    label: 'Inicio',
    href: 'index.html'
  }, {
    id: 'analyzer',
    label: ['Valoración de', 'la estancia'],
    href: 'valoracion-estancia.html'
  }, {
    id: 'guides',
    label: ['Guías de', 'adaptación'],
    href: 'guias.html'
  }, {
    id: 'cognitive',
    label: ['Área', 'Cognitiva'],
    href: 'estimulacion-cognitiva.html'
  }, {
    id: 'resources',
    label: ['Recursos para', 'profesionales'],
    href: 'recursos.html'
  }, {
    id: 'about',
    label: 'Sobre Mí',
    href: 'index.html#about'
  }, {
    id: 'contact',
    label: 'Contacto',
    href: 'contacto.html'
  }];
  const handleLinkClick = (e, link) => {
    // Si estamos en la home y clicamos un ancla interna de la home (#about)
    if (link.href.includes('#') && currentPage === 'home') {
      const parts = link.href.split('#');
      const hash = parts[parts.length - 1];
      const targetElement = document.getElementById(hash);
      if (targetElement) {
        e.preventDefault();
        targetElement.scrollIntoView({
          behavior: 'smooth'
        });
        setMenuOpen(false);
      }
    }
  };
  const isLinkActive = linkId => {
    if (linkId === 'home' && currentPage === 'home') return true;
    if (linkId === 'analyzer' && currentPage === 'analyzer') return true;
    if (linkId === 'guides' && currentPage === 'guides') return true;
    if (linkId === 'cognitive' && currentPage === 'cognitive') return true;
    if (linkId === 'resources' && currentPage === 'resources') return true;
    if (linkId === 'contact' && currentPage === 'contact') return true;
    return false;
  };
  return /*#__PURE__*/React.createElement("header", {
    role: "banner"
  }, /*#__PURE__*/React.createElement("nav", {
    className: `fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-accent-cream/95 shadow-md backdrop-blur-md' : 'bg-accent-cream/80'}`
  }, /*#__PURE__*/React.createElement("div", {
    className: "max-w-[1400px] mx-auto px-4 sm:px-8"
  }, /*#__PURE__*/React.createElement("div", {
    className: `flex items-center justify-between transition-all duration-300 ${scrolled ? 'h-20' : 'h-24 md:h-28'}`
  }, /*#__PURE__*/React.createElement("a", {
    href: "index.html",
    className: "flex items-center rounded-xl p-1 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 transition-transform hover:scale-105 active:scale-95 flex-shrink-0"
  }, /*#__PURE__*/React.createElement("img", {
    src: "assets/iadapta_logo.png",
    alt: "IAdapta",
    className: `object-contain transition-all duration-300 flex-shrink-0 ${scrolled ? 'h-14' : 'h-16 md:h-20 lg:h-24'}`
  })), /*#__PURE__*/React.createElement("div", {
    className: "hidden xl:flex items-center gap-4"
  }, /*#__PURE__*/React.createElement("ul", {
    className: "flex items-center gap-1 list-none m-0 p-0"
  }, linksMain.map(link => /*#__PURE__*/React.createElement("li", {
    key: link.id
  }, /*#__PURE__*/React.createElement("a", {
    href: link.href,
    onClick: e => handleLinkClick(e, link),
    className: `px-3 py-1.5 rounded-xl text-sm xl:text-base font-bold transition-all duration-200 inline-block text-center ${isLinkActive(link.id) ? 'bg-brand-900 text-white shadow-sm' : 'text-brand-900/70 hover:text-brand-900 hover:bg-white/50'}`
  }, Array.isArray(link.label) ? /*#__PURE__*/React.createElement("span", {
    className: "flex flex-col items-center leading-tight"
  }, /*#__PURE__*/React.createElement("span", null, link.label[0]), /*#__PURE__*/React.createElement("span", null, link.label[1])) : link.label))), /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("a", {
    href: "cv.html",
    className: `px-4 py-2.5 rounded-xl text-sm xl:text-base font-bold transition-all duration-200 whitespace-nowrap inline-block ${currentPage === 'cv' ? 'bg-accent-coral text-white shadow-md' : 'text-accent-coral hover:bg-white/50 border-2 border-accent-coral/10 ml-2'}`
  }, "Mi CV"))), /*#__PURE__*/React.createElement("div", {
    className: "h-8 w-px bg-brand-900/10 mx-2"
  }), /*#__PURE__*/React.createElement("a", {
    href: "https://www.paypal.com/donate/?hosted_button_id=E8A34ZM4Q4YS8",
    target: "_blank",
    rel: "noopener noreferrer",
    className: "px-6 py-2.5 rounded-xl text-base font-black transition-all duration-200 bg-brand-900 text-white shadow-lg hover:bg-brand-800 flex items-center gap-2 group whitespace-nowrap"
  }, /*#__PURE__*/React.createElement(Icons.Heart, {
    className: "group-hover:fill-red-500 group-hover:text-red-500 transition-all duration-300"
  }), "Donar")), /*#__PURE__*/React.createElement("button", {
    className: "xl:hidden p-3 rounded-2xl bg-white/50 border border-brand-100 text-brand-900 shadow-sm transition-all active:scale-90",
    onClick: () => setMenuOpen(o => !o)
  }, menuOpen ? /*#__PURE__*/React.createElement(Icons.Close, {
    className: "w-7 h-7"
  }) : /*#__PURE__*/React.createElement(Icons.Menu, {
    className: "w-7 h-7"
  })))), menuOpen && /*#__PURE__*/React.createElement("div", {
    className: "xl:hidden bg-white border-t border-brand-100 px-4 py-3 space-y-1 shadow-xl"
  }, linksMain.map(link => /*#__PURE__*/React.createElement("a", {
    key: link.id,
    href: link.href,
    onClick: e => handleLinkClick(e, link),
    className: "block w-full text-left px-4 py-3.5 rounded-xl text-lg font-semibold text-gray-700 hover:bg-brand-50"
  }, Array.isArray(link.label) ? link.label.join(' ') : link.label)), /*#__PURE__*/React.createElement("a", {
    href: "https://www.paypal.com/donate/?hosted_button_id=E8A34ZM4Q4YS8",
    target: "_blank",
    rel: "noopener noreferrer",
    className: "w-full flex items-center gap-3 px-4 py-3.5 rounded-xl text-lg font-semibold text-brand-600 hover:bg-brand-50 group"
  }, /*#__PURE__*/React.createElement(Icons.Heart, {
    className: "group-hover:fill-red-500 group-hover:text-red-500 transition-all duration-300"
  }), "Donar para el proyecto"), /*#__PURE__*/React.createElement("a", {
    href: "cv.html",
    className: "block w-full text-left px-4 py-3.5 rounded-xl text-lg font-semibold text-brand-600 bg-brand-50"
  }, "Curriculum Vitae"))));
};

// --- COMPONENTE FOOTER ---
const Footer = function Footer({
  currentPage
}) {
  const year = new Date().getFullYear();
  return /*#__PURE__*/React.createElement("footer", {
    className: "bg-brand-900 text-white pt-16 pb-8 px-4"
  }, /*#__PURE__*/React.createElement("div", {
    className: "max-w-6xl mx-auto"
  }, /*#__PURE__*/React.createElement("div", {
    className: "grid sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-12"
  }, /*#__PURE__*/React.createElement("div", {
    className: "lg:col-span-2"
  }, /*#__PURE__*/React.createElement("div", {
    className: "mb-6 inline-block bg-accent-cream rounded-xl p-3 shadow-md"
  }, /*#__PURE__*/React.createElement("img", {
    src: "assets/iadapta_logo.png",
    alt: "IAdapta",
    className: "h-14 object-contain"
  })), /*#__PURE__*/React.createElement("p", {
    className: "text-brand-200 text-lg leading-relaxed max-w-sm"
  }, "Evaluaci\xF3n experta de tu entorno y asesoramiento en productos de apoyo. \"Te gu\xEDo en la adaptaci\xF3n de tu casa para que vuelvas a moverte con seguridad y total confianza.\"")), /*#__PURE__*/React.createElement("nav", null, /*#__PURE__*/React.createElement("h3", {
    className: "text-base font-bold uppercase tracking-widest text-brand-300 mb-4"
  }, "Navegaci\xF3n"), /*#__PURE__*/React.createElement("ul", {
    className: "space-y-3"
  }, [{
    label: 'Inicio',
    href: 'index.html'
  }, {
    label: 'Curriculum Vitae',
    href: 'cv.html'
  }, {
    label: 'Valoración de la estancia',
    href: 'valoracion-estancia.html'
  }, {
    label: 'Guías',
    href: 'guias.html'
  }, {
    label: 'Área Cognitiva',
    href: 'estimulacion-cognitiva.html'
  }, {
    label: 'Contacto',
    href: 'contacto.html'
  }].map((l, idx) => /*#__PURE__*/React.createElement("li", {
    key: idx
  }, /*#__PURE__*/React.createElement("a", {
    href: l.href,
    className: "text-brand-200 hover:text-white transition-colors text-lg inline-block"
  }, l.label))))), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h3", {
    className: "text-base font-bold uppercase tracking-widest text-brand-300 mb-4"
  }, "Enlaces"), /*#__PURE__*/React.createElement("ul", {
    className: "space-y-3"
  }, /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("a", {
    href: "https://www.linkedin.com/in/pablo-narciso-millan",
    target: "_blank",
    rel: "noopener noreferrer",
    className: "text-brand-200 hover:text-white transition-colors text-lg"
  }, "LinkedIn")), /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("a", {
    href: "https://www.paypal.com/donate/?hosted_button_id=E8A34ZM4Q4YS8",
    target: "_blank",
    rel: "noopener noreferrer",
    className: "text-brand-200 hover:text-white transition-colors text-lg flex items-center gap-2 group"
  }, /*#__PURE__*/React.createElement(Icons.Heart, {
    className: "group-hover:fill-red-500 group-hover:text-red-500 transition-all duration-300"
  }), "Apoyar el proyecto")), /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("a", {
    href: "aviso-legal.html",
    className: "text-brand-200 hover:text-white transition-colors text-lg inline-block"
  }, "Aviso Legal y Privacidad"))))), /*#__PURE__*/React.createElement("div", {
    className: "border-t border-brand-800 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-brand-400 text-base"
  }, /*#__PURE__*/React.createElement("p", null, "\xA9 ", year, " IAdapta \u2014 Terapia Ocupacional & Accesibilidad."), /*#__PURE__*/React.createElement("p", {
    className: "flex items-center gap-2 group cursor-default"
  }, /*#__PURE__*/React.createElement(Icons.Heart, {
    className: "group-hover:fill-red-500 group-hover:text-red-500 transition-all duration-300"
  }), "Hecho con cuidado para mejorar la autonom\xEDa"))));
};

// --- COMPONENTE COOKIEBANNER ---
const CookieBanner = function CookieBanner() {
  const [isVisible, setIsVisible] = useState(false);
  useEffect(() => {
    const consent = localStorage.getItem('cookieConsent');
    if (!consent) {
      setIsVisible(true);
    }
  }, []);
  const handleAccept = () => {
    localStorage.setItem('cookieConsent', 'true');
    setIsVisible(false);
  };
  if (!isVisible) return null;
  return /*#__PURE__*/React.createElement("div", {
    className: "fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-[0_-10px_20px_-5px_rgba(0,0,0,0.1)] p-4 sm:p-5 z-50 flex flex-col sm:flex-row items-center justify-center sm:justify-between gap-4"
  }, /*#__PURE__*/React.createElement("div", {
    className: "max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between w-full gap-4"
  }, /*#__PURE__*/React.createElement("p", {
    className: "text-gray-700 text-sm sm:text-base text-center sm:text-left leading-relaxed"
  }, "Utilizamos cookies para mejorar tu experiencia y gestionar los enlaces de afiliados. Al navegar, aceptas su uso.", ' ', /*#__PURE__*/React.createElement("a", {
    href: "aviso-legal.html",
    className: "text-brand-600 font-bold underline hover:text-brand-800 transition-colors inline-block mt-1 sm:mt-0"
  }, "Aviso Legal y Privacidad")), /*#__PURE__*/React.createElement("button", {
    onClick: handleAccept,
    className: "shrink-0 bg-brand-600 hover:bg-brand-700 text-white font-bold py-2.5 px-8 rounded-xl shadow-md transition-all focus:outline-none focus:ring-2 focus:ring-brand-500 focus:ring-offset-2 w-full sm:w-auto"
  }, "Aceptar")));
};
window.Icons = Icons;
window.getAmazonLink = getAmazonLink;
window.PRODUCT_CATALOG = PRODUCT_CATALOG;

window.Navbar = Navbar;
window.Footer = Footer;
window.CookieBanner = CookieBanner;
})();