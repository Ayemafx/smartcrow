"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
self["webpackHotUpdate_N_E"]("app/page",{

/***/ "(app-pages-browser)/./components/popupinfo.js":
/*!*********************************!*\
  !*** ./components/popupinfo.js ***!
  \*********************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

eval(__webpack_require__.ts("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"(app-pages-browser)/./node_modules/next/dist/compiled/react/jsx-dev-runtime.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ \"(app-pages-browser)/./node_modules/next/dist/compiled/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var react_svg__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-svg */ \"(app-pages-browser)/./node_modules/react-svg/dist/react-svg.esm.js\");\n// components/Popup.js\n/* __next_internal_client_entry_do_not_use__ default auto */ \nvar _s = $RefreshSig$();\n\n\n\nconst PopupInfo = (param)=>{\n    let { text, closeModal, isOpen } = param;\n    _s();\n    const [myheader, setHeader] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(\"TBD\");\n    const [mytext, setText] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(\"TBD\");\n    const modalRef = (0,react__WEBPACK_IMPORTED_MODULE_1__.useRef)();\n    const handleClose = (e)=>{\n        if (modalRef.current === e.target) {\n            closeModal();\n        }\n    };\n    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n        className: \"fixed inset-0 z-50 flex items-center justify-center bg-gray-200 bg-opacity-50  \".concat(isOpen ? \"opacity-100\" : \"opacity-0 pointer-events-none\"),\n        onClick: handleClose,\n        ref: modalRef,\n        children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n            className: \"w-full max-w-5xl bg-white rounded-lg p-4 transform transition-all duration-300 opacity-100 scale-100\",\n            children: [\n                /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"h1\", {\n                    className: \"text-l mb-4 flex justify-center text-black font-bold\",\n                    children: \"More Information\"\n                }, void 0, false, {\n                    fileName: \"C:\\\\Users\\\\libia\\\\OneDrive\\\\Documents\\\\GitHub\\\\smartcrow\\\\components\\\\popupinfo.js\",\n                    lineNumber: 28,\n                    columnNumber: 7\n                }, undefined),\n                /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                    className: \"flex flex-row\",\n                    children: [\n                        /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                            children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(react_svg__WEBPACK_IMPORTED_MODULE_2__.ReactSVG, {\n                                src: \"/assets/images/moreinfo.svg\",\n                                className: \"m-5\",\n                                style: {\n                                    width: \"150px\",\n                                    height: \"150px\"\n                                }\n                            }, void 0, false, {\n                                fileName: \"C:\\\\Users\\\\libia\\\\OneDrive\\\\Documents\\\\GitHub\\\\smartcrow\\\\components\\\\popupinfo.js\",\n                                lineNumber: 30,\n                                columnNumber: 12\n                            }, undefined)\n                        }, void 0, false, {\n                            fileName: \"C:\\\\Users\\\\libia\\\\OneDrive\\\\Documents\\\\GitHub\\\\smartcrow\\\\components\\\\popupinfo.js\",\n                            lineNumber: 30,\n                            columnNumber: 7\n                        }, undefined),\n                        /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                            children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"h3\", {\n                                className: \"text-m text-black m-2\",\n                                children: text\n                            }, void 0, false, {\n                                fileName: \"C:\\\\Users\\\\libia\\\\OneDrive\\\\Documents\\\\GitHub\\\\smartcrow\\\\components\\\\popupinfo.js\",\n                                lineNumber: 31,\n                                columnNumber: 12\n                            }, undefined)\n                        }, void 0, false, {\n                            fileName: \"C:\\\\Users\\\\libia\\\\OneDrive\\\\Documents\\\\GitHub\\\\smartcrow\\\\components\\\\popupinfo.js\",\n                            lineNumber: 31,\n                            columnNumber: 7\n                        }, undefined)\n                    ]\n                }, void 0, true, {\n                    fileName: \"C:\\\\Users\\\\libia\\\\OneDrive\\\\Documents\\\\GitHub\\\\smartcrow\\\\components\\\\popupinfo.js\",\n                    lineNumber: 29,\n                    columnNumber: 7\n                }, undefined)\n            ]\n        }, void 0, true, {\n            fileName: \"C:\\\\Users\\\\libia\\\\OneDrive\\\\Documents\\\\GitHub\\\\smartcrow\\\\components\\\\popupinfo.js\",\n            lineNumber: 26,\n            columnNumber: 7\n        }, undefined)\n    }, void 0, false, {\n        fileName: \"C:\\\\Users\\\\libia\\\\OneDrive\\\\Documents\\\\GitHub\\\\smartcrow\\\\components\\\\popupinfo.js\",\n        lineNumber: 22,\n        columnNumber: 5\n    }, undefined);\n};\n_s(PopupInfo, \"A5JprzO5+8LUqa/KbjnIc65iiXs=\");\n_c = PopupInfo;\n/* harmony default export */ __webpack_exports__[\"default\"] = (PopupInfo);\nvar _c;\n$RefreshReg$(_c, \"PopupInfo\");\n\n\n;\n    // Wrapped in an IIFE to avoid polluting the global scope\n    ;\n    (function () {\n        var _a, _b;\n        // Legacy CSS implementations will `eval` browser code in a Node.js context\n        // to extract CSS. For backwards compatibility, we need to check we're in a\n        // browser context before continuing.\n        if (typeof self !== 'undefined' &&\n            // AMP / No-JS mode does not inject these helpers:\n            '$RefreshHelpers$' in self) {\n            // @ts-ignore __webpack_module__ is global\n            var currentExports = module.exports;\n            // @ts-ignore __webpack_module__ is global\n            var prevSignature = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevSignature) !== null && _b !== void 0 ? _b : null;\n            // This cannot happen in MainTemplate because the exports mismatch between\n            // templating and execution.\n            self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.id);\n            // A module can be accepted automatically based on its exports, e.g. when\n            // it is a Refresh Boundary.\n            if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {\n                // Save the previous exports signature on update so we can compare the boundary\n                // signatures. We avoid saving exports themselves since it causes memory leaks (https://github.com/vercel/next.js/pull/53797)\n                module.hot.dispose(function (data) {\n                    data.prevSignature =\n                        self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports);\n                });\n                // Unconditionally accept an update to this module, we'll check if it's\n                // still a Refresh Boundary later.\n                // @ts-ignore importMeta is replaced in the loader\n                module.hot.accept();\n                // This field is set when the previous version of this module was a\n                // Refresh Boundary, letting us know we need to check for invalidation or\n                // enqueue an update.\n                if (prevSignature !== null) {\n                    // A boundary can become ineligible if its exports are incompatible\n                    // with the previous exports.\n                    //\n                    // For example, if you add/remove/change exports, we'll want to\n                    // re-execute the importing modules, and force those components to\n                    // re-render. Similarly, if you convert a class component to a\n                    // function, we want to invalidate the boundary.\n                    if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevSignature, self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports))) {\n                        module.hot.invalidate();\n                    }\n                    else {\n                        self.$RefreshHelpers$.scheduleUpdate();\n                    }\n                }\n            }\n            else {\n                // Since we just executed the code for the module, it's possible that the\n                // new exports made it ineligible for being a boundary.\n                // We only care about the case when we were _previously_ a boundary,\n                // because we already accepted this update (accidental side effect).\n                var isNoLongerABoundary = prevSignature !== null;\n                if (isNoLongerABoundary) {\n                    module.hot.invalidate();\n                }\n            }\n        }\n    })();\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKGFwcC1wYWdlcy1icm93c2VyKS8uL2NvbXBvbmVudHMvcG9wdXBpbmZvLmpzIiwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsc0JBQXNCOzs7QUFFZ0I7QUFDTDtBQUNJO0FBRXJDLE1BQU1JLFlBQVk7UUFBQyxFQUFDQyxJQUFJLEVBQUVDLFVBQVUsRUFBRUMsTUFBTSxFQUFDOztJQUV6QyxNQUFNLENBQUNDLFVBQVVDLFVBQVUsR0FBR1AsK0NBQVFBLENBQUM7SUFDdkMsTUFBTSxDQUFDUSxRQUFRQyxRQUFRLEdBQUdULCtDQUFRQSxDQUFDO0lBRW5DLE1BQU1VLFdBQVdYLDZDQUFNQTtJQUV2QixNQUFNWSxjQUFjLENBQUNDO1FBQ25CLElBQUlGLFNBQVNHLE9BQU8sS0FBS0QsRUFBRUUsTUFBTSxFQUFFO1lBQ2pDVjtRQUNGO0lBQUM7SUFHTCxxQkFFRSw4REFBQ1c7UUFBSUMsV0FBVyxrRkFDMkMsT0FBekRYLFNBQVMsZ0JBQWdCO1FBQ3pCWSxTQUFTTjtRQUNUTyxLQUFLUjtrQkFDTCw0RUFBQ0s7WUFBSUMsV0FBVTs7OEJBRWYsOERBQUNHO29CQUFHSCxXQUFVOzhCQUF1RDs7Ozs7OzhCQUNyRSw4REFBQ0Q7b0JBQUlDLFdBQVU7O3NDQUNmLDhEQUFDRDtzQ0FBSSw0RUFBQ2QsK0NBQVFBO2dDQUFDbUIsS0FBSTtnQ0FBOEJKLFdBQVU7Z0NBQU1LLE9BQU87b0NBQUVDLE9BQU87b0NBQVNDLFFBQVE7Z0NBQVE7Ozs7Ozs7Ozs7O3NDQUMxRyw4REFBQ1I7c0NBQUksNEVBQUNTO2dDQUFHUixXQUFVOzBDQUF5QmI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFPbEQ7R0EvQk1EO0tBQUFBO0FBaUNOLCtEQUFlQSxTQUFTQSxFQUFDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vX05fRS8uL2NvbXBvbmVudHMvcG9wdXBpbmZvLmpzP2QzNWYiXSwic291cmNlc0NvbnRlbnQiOlsiLy8gY29tcG9uZW50cy9Qb3B1cC5qc1xyXG5cInVzZSBjbGllbnRcIjtcclxuaW1wb3J0IFJlYWN0LCB7IHVzZVJlZiB9IGZyb20gXCJyZWFjdFwiO1xyXG5pbXBvcnQgeyB1c2VTdGF0ZSB9IGZyb20gJ3JlYWN0JztcclxuaW1wb3J0IHsgUmVhY3RTVkcgfSBmcm9tICdyZWFjdC1zdmcnO1xyXG5cclxuY29uc3QgUG9wdXBJbmZvID0gKHt0ZXh0LCBjbG9zZU1vZGFsLCBpc09wZW59KSA9PiB7XHJcblxyXG4gICAgY29uc3QgW215aGVhZGVyLCBzZXRIZWFkZXJdID0gdXNlU3RhdGUoXCJUQkRcIik7XHJcbiAgICBjb25zdCBbbXl0ZXh0LCBzZXRUZXh0XSA9IHVzZVN0YXRlKFwiVEJEXCIpO1xyXG5cclxuICAgIGNvbnN0IG1vZGFsUmVmID0gdXNlUmVmKCk7XHJcblxyXG4gICAgY29uc3QgaGFuZGxlQ2xvc2UgPSAoZSkgPT4ge1xyXG4gICAgICBpZiAobW9kYWxSZWYuY3VycmVudCA9PT0gZS50YXJnZXQpIHtcclxuICAgICAgICBjbG9zZU1vZGFsKCk7XHJcbiAgICAgIH19O1xyXG4gICAgXHJcblxyXG4gIHJldHVybiAoXHJcbiAgICAgICAgICAgICAgIFxyXG4gICAgPGRpdiBjbGFzc05hbWU9e2BmaXhlZCBpbnNldC0wIHotNTAgZmxleCBpdGVtcy1jZW50ZXIganVzdGlmeS1jZW50ZXIgYmctZ3JheS0yMDAgYmctb3BhY2l0eS01MCAgJHtcclxuICAgICAgaXNPcGVuID8gJ29wYWNpdHktMTAwJyA6ICdvcGFjaXR5LTAgcG9pbnRlci1ldmVudHMtbm9uZSd9YH1cclxuICAgICAgb25DbGljaz17aGFuZGxlQ2xvc2V9XHJcbiAgICAgIHJlZj17bW9kYWxSZWZ9PlxyXG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cInctZnVsbCBtYXgtdy01eGwgYmctd2hpdGUgcm91bmRlZC1sZyBwLTQgdHJhbnNmb3JtIHRyYW5zaXRpb24tYWxsIGR1cmF0aW9uLTMwMCBvcGFjaXR5LTEwMCBzY2FsZS0xMDBcIj5cclxuICAgICAgey8qIEhlYWRlciB0ZXh0ICovfVxyXG4gICAgICA8aDEgY2xhc3NOYW1lPVwidGV4dC1sIG1iLTQgZmxleCBqdXN0aWZ5LWNlbnRlciB0ZXh0LWJsYWNrIGZvbnQtYm9sZFwiPk1vcmUgSW5mb3JtYXRpb248L2gxPlxyXG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggZmxleC1yb3dcIj5cclxuICAgICAgPGRpdj48UmVhY3RTVkcgc3JjPVwiL2Fzc2V0cy9pbWFnZXMvbW9yZWluZm8uc3ZnXCIgY2xhc3NOYW1lPVwibS01XCIgc3R5bGU9e3sgd2lkdGg6ICcxNTBweCcsIGhlaWdodDogJzE1MHB4JyB9fSAvPjwvZGl2PlxyXG4gICAgICA8ZGl2PjxoMyBjbGFzc05hbWU9XCJ0ZXh0LW0gdGV4dC1ibGFjayBtLTJcIj57dGV4dH08L2gzPjwvZGl2PlxyXG4gICAgICA8L2Rpdj5cclxuICAgIDwvZGl2PlxyXG4gIDwvZGl2PlxyXG4gICAgICBcclxuICAgIFxyXG4gICk7XHJcbn07XHJcblxyXG5leHBvcnQgZGVmYXVsdCBQb3B1cEluZm87XHJcbiJdLCJuYW1lcyI6WyJSZWFjdCIsInVzZVJlZiIsInVzZVN0YXRlIiwiUmVhY3RTVkciLCJQb3B1cEluZm8iLCJ0ZXh0IiwiY2xvc2VNb2RhbCIsImlzT3BlbiIsIm15aGVhZGVyIiwic2V0SGVhZGVyIiwibXl0ZXh0Iiwic2V0VGV4dCIsIm1vZGFsUmVmIiwiaGFuZGxlQ2xvc2UiLCJlIiwiY3VycmVudCIsInRhcmdldCIsImRpdiIsImNsYXNzTmFtZSIsIm9uQ2xpY2siLCJyZWYiLCJoMSIsInNyYyIsInN0eWxlIiwid2lkdGgiLCJoZWlnaHQiLCJoMyJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(app-pages-browser)/./components/popupinfo.js\n"));

/***/ })

});