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

eval(__webpack_require__.ts("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"(app-pages-browser)/./node_modules/next/dist/compiled/react/jsx-dev-runtime.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ \"(app-pages-browser)/./node_modules/next/dist/compiled/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var react_svg__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-svg */ \"(app-pages-browser)/./node_modules/react-svg/dist/react-svg.esm.js\");\n// components/Popup.js\n/* __next_internal_client_entry_do_not_use__ default auto */ \nvar _s = $RefreshSig$();\n\n\n\nconst PopupInfo = (param)=>{\n    let { text, closeModal, isOpen } = param;\n    _s();\n    const [myheader, setHeader] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(\"TBD\");\n    const [mytext, setText] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(\"TBD\");\n    const modalRef = (0,react__WEBPACK_IMPORTED_MODULE_1__.useRef)();\n    const handleClose = (e)=>{\n        if (modalRef.current === e.target) {\n            closeModal();\n        }\n    };\n    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n        className: \"fixed inset-0 z-50 flex items-center justify-center bg-gray-200 bg-opacity-50  \".concat(isOpen ? \"opacity-100\" : \"opacity-0 pointer-events-none\"),\n        onClick: handleClose,\n        ref: modalRef,\n        children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n            className: \"w-full max-w-md max-h-screen bg-white rounded-lg p-4 transform transition-all duration-300 opacity-100 scale-100\",\n            children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                children: [\n                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(react_svg__WEBPACK_IMPORTED_MODULE_2__.ReactSVG, {\n                        src: \"/assets/images/moreinfo.svg\",\n                        className: \"mb-5\"\n                    }, void 0, false, {\n                        fileName: \"C:\\\\Users\\\\libia\\\\OneDrive\\\\Documents\\\\GitHub\\\\smartcrow\\\\components\\\\popupinfo.js\",\n                        lineNumber: 29,\n                        columnNumber: 7\n                    }, undefined),\n                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"h3\", {\n                        className: \"text-m text-gray-700 m-2\",\n                        children: text\n                    }, void 0, false, {\n                        fileName: \"C:\\\\Users\\\\libia\\\\OneDrive\\\\Documents\\\\GitHub\\\\smartcrow\\\\components\\\\popupinfo.js\",\n                        lineNumber: 30,\n                        columnNumber: 7\n                    }, undefined)\n                ]\n            }, void 0, true, {\n                fileName: \"C:\\\\Users\\\\libia\\\\OneDrive\\\\Documents\\\\GitHub\\\\smartcrow\\\\components\\\\popupinfo.js\",\n                lineNumber: 28,\n                columnNumber: 7\n            }, undefined)\n        }, void 0, false, {\n            fileName: \"C:\\\\Users\\\\libia\\\\OneDrive\\\\Documents\\\\GitHub\\\\smartcrow\\\\components\\\\popupinfo.js\",\n            lineNumber: 26,\n            columnNumber: 7\n        }, undefined)\n    }, void 0, false, {\n        fileName: \"C:\\\\Users\\\\libia\\\\OneDrive\\\\Documents\\\\GitHub\\\\smartcrow\\\\components\\\\popupinfo.js\",\n        lineNumber: 22,\n        columnNumber: 5\n    }, undefined);\n};\n_s(PopupInfo, \"A5JprzO5+8LUqa/KbjnIc65iiXs=\");\n_c = PopupInfo;\n/* harmony default export */ __webpack_exports__[\"default\"] = (PopupInfo);\nvar _c;\n$RefreshReg$(_c, \"PopupInfo\");\n\n\n;\n    // Wrapped in an IIFE to avoid polluting the global scope\n    ;\n    (function () {\n        var _a, _b;\n        // Legacy CSS implementations will `eval` browser code in a Node.js context\n        // to extract CSS. For backwards compatibility, we need to check we're in a\n        // browser context before continuing.\n        if (typeof self !== 'undefined' &&\n            // AMP / No-JS mode does not inject these helpers:\n            '$RefreshHelpers$' in self) {\n            // @ts-ignore __webpack_module__ is global\n            var currentExports = module.exports;\n            // @ts-ignore __webpack_module__ is global\n            var prevSignature = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevSignature) !== null && _b !== void 0 ? _b : null;\n            // This cannot happen in MainTemplate because the exports mismatch between\n            // templating and execution.\n            self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.id);\n            // A module can be accepted automatically based on its exports, e.g. when\n            // it is a Refresh Boundary.\n            if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {\n                // Save the previous exports signature on update so we can compare the boundary\n                // signatures. We avoid saving exports themselves since it causes memory leaks (https://github.com/vercel/next.js/pull/53797)\n                module.hot.dispose(function (data) {\n                    data.prevSignature =\n                        self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports);\n                });\n                // Unconditionally accept an update to this module, we'll check if it's\n                // still a Refresh Boundary later.\n                // @ts-ignore importMeta is replaced in the loader\n                module.hot.accept();\n                // This field is set when the previous version of this module was a\n                // Refresh Boundary, letting us know we need to check for invalidation or\n                // enqueue an update.\n                if (prevSignature !== null) {\n                    // A boundary can become ineligible if its exports are incompatible\n                    // with the previous exports.\n                    //\n                    // For example, if you add/remove/change exports, we'll want to\n                    // re-execute the importing modules, and force those components to\n                    // re-render. Similarly, if you convert a class component to a\n                    // function, we want to invalidate the boundary.\n                    if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevSignature, self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports))) {\n                        module.hot.invalidate();\n                    }\n                    else {\n                        self.$RefreshHelpers$.scheduleUpdate();\n                    }\n                }\n            }\n            else {\n                // Since we just executed the code for the module, it's possible that the\n                // new exports made it ineligible for being a boundary.\n                // We only care about the case when we were _previously_ a boundary,\n                // because we already accepted this update (accidental side effect).\n                var isNoLongerABoundary = prevSignature !== null;\n                if (isNoLongerABoundary) {\n                    module.hot.invalidate();\n                }\n            }\n        }\n    })();\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKGFwcC1wYWdlcy1icm93c2VyKS8uL2NvbXBvbmVudHMvcG9wdXBpbmZvLmpzIiwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsc0JBQXNCOzs7QUFFZ0I7QUFDTDtBQUNJO0FBRXJDLE1BQU1JLFlBQVk7UUFBQyxFQUFDQyxJQUFJLEVBQUVDLFVBQVUsRUFBRUMsTUFBTSxFQUFDOztJQUV6QyxNQUFNLENBQUNDLFVBQVVDLFVBQVUsR0FBR1AsK0NBQVFBLENBQUM7SUFDdkMsTUFBTSxDQUFDUSxRQUFRQyxRQUFRLEdBQUdULCtDQUFRQSxDQUFDO0lBRW5DLE1BQU1VLFdBQVdYLDZDQUFNQTtJQUV2QixNQUFNWSxjQUFjLENBQUNDO1FBQ25CLElBQUlGLFNBQVNHLE9BQU8sS0FBS0QsRUFBRUUsTUFBTSxFQUFFO1lBQ2pDVjtRQUNGO0lBQUM7SUFHTCxxQkFFRSw4REFBQ1c7UUFBSUMsV0FBVyxrRkFDMkMsT0FBekRYLFNBQVMsZ0JBQWdCO1FBQ3pCWSxTQUFTTjtRQUNUTyxLQUFLUjtrQkFDTCw0RUFBQ0s7WUFBSUMsV0FBVTtzQkFFZiw0RUFBQ0Q7O2tDQUNELDhEQUFDZCwrQ0FBUUE7d0JBQUNrQixLQUFJO3dCQUE4QkgsV0FBVTs7Ozs7O2tDQUN0RCw4REFBQ0k7d0JBQUdKLFdBQVU7a0NBQTRCYjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQU9oRDtHQTlCTUQ7S0FBQUE7QUFnQ04sK0RBQWVBLFNBQVNBLEVBQUMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9fTl9FLy4vY29tcG9uZW50cy9wb3B1cGluZm8uanM/ZDM1ZiJdLCJzb3VyY2VzQ29udGVudCI6WyIvLyBjb21wb25lbnRzL1BvcHVwLmpzXHJcblwidXNlIGNsaWVudFwiO1xyXG5pbXBvcnQgUmVhY3QsIHsgdXNlUmVmIH0gZnJvbSBcInJlYWN0XCI7XHJcbmltcG9ydCB7IHVzZVN0YXRlIH0gZnJvbSAncmVhY3QnO1xyXG5pbXBvcnQgeyBSZWFjdFNWRyB9IGZyb20gJ3JlYWN0LXN2Zyc7XHJcblxyXG5jb25zdCBQb3B1cEluZm8gPSAoe3RleHQsIGNsb3NlTW9kYWwsIGlzT3Blbn0pID0+IHtcclxuXHJcbiAgICBjb25zdCBbbXloZWFkZXIsIHNldEhlYWRlcl0gPSB1c2VTdGF0ZShcIlRCRFwiKTtcclxuICAgIGNvbnN0IFtteXRleHQsIHNldFRleHRdID0gdXNlU3RhdGUoXCJUQkRcIik7XHJcblxyXG4gICAgY29uc3QgbW9kYWxSZWYgPSB1c2VSZWYoKTtcclxuXHJcbiAgICBjb25zdCBoYW5kbGVDbG9zZSA9IChlKSA9PiB7XHJcbiAgICAgIGlmIChtb2RhbFJlZi5jdXJyZW50ID09PSBlLnRhcmdldCkge1xyXG4gICAgICAgIGNsb3NlTW9kYWwoKTtcclxuICAgICAgfX07XHJcbiAgICBcclxuXHJcbiAgcmV0dXJuIChcclxuICAgICAgICAgICAgICAgXHJcbiAgICA8ZGl2IGNsYXNzTmFtZT17YGZpeGVkIGluc2V0LTAgei01MCBmbGV4IGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWNlbnRlciBiZy1ncmF5LTIwMCBiZy1vcGFjaXR5LTUwICAke1xyXG4gICAgICBpc09wZW4gPyAnb3BhY2l0eS0xMDAnIDogJ29wYWNpdHktMCBwb2ludGVyLWV2ZW50cy1ub25lJ31gfVxyXG4gICAgICBvbkNsaWNrPXtoYW5kbGVDbG9zZX1cclxuICAgICAgcmVmPXttb2RhbFJlZn0+XHJcbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwidy1mdWxsIG1heC13LW1kIG1heC1oLXNjcmVlbiBiZy13aGl0ZSByb3VuZGVkLWxnIHAtNCB0cmFuc2Zvcm0gdHJhbnNpdGlvbi1hbGwgZHVyYXRpb24tMzAwIG9wYWNpdHktMTAwIHNjYWxlLTEwMFwiPlxyXG4gICAgICB7LyogSGVhZGVyIHRleHQgKi99XHJcbiAgICAgIDxkaXY+XHJcbiAgICAgIDxSZWFjdFNWRyBzcmM9XCIvYXNzZXRzL2ltYWdlcy9tb3JlaW5mby5zdmdcIiBjbGFzc05hbWU9XCJtYi01XCIgLz5cclxuICAgICAgPGgzIGNsYXNzTmFtZT1cInRleHQtbSB0ZXh0LWdyYXktNzAwIG0tMlwiPnt0ZXh0fTwvaDM+XHJcbiAgICAgIDwvZGl2PlxyXG4gICAgPC9kaXY+XHJcbiAgPC9kaXY+XHJcbiAgICAgIFxyXG4gICAgXHJcbiAgKTtcclxufTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IFBvcHVwSW5mbztcclxuIl0sIm5hbWVzIjpbIlJlYWN0IiwidXNlUmVmIiwidXNlU3RhdGUiLCJSZWFjdFNWRyIsIlBvcHVwSW5mbyIsInRleHQiLCJjbG9zZU1vZGFsIiwiaXNPcGVuIiwibXloZWFkZXIiLCJzZXRIZWFkZXIiLCJteXRleHQiLCJzZXRUZXh0IiwibW9kYWxSZWYiLCJoYW5kbGVDbG9zZSIsImUiLCJjdXJyZW50IiwidGFyZ2V0IiwiZGl2IiwiY2xhc3NOYW1lIiwib25DbGljayIsInJlZiIsInNyYyIsImgzIl0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(app-pages-browser)/./components/popupinfo.js\n"));

/***/ })

});