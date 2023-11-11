"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
self["webpackHotUpdate_N_E"]("app/layout",{

/***/ "(app-pages-browser)/./comps/Nav.jsx":
/*!***********************!*\
  !*** ./comps/Nav.jsx ***!
  \***********************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

eval(__webpack_require__.ts("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"(app-pages-browser)/./node_modules/next/dist/compiled/react/jsx-dev-runtime.js\");\n/* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next/link */ \"(app-pages-browser)/./node_modules/next/link.js\");\n/* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(next_link__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var next_image__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! next/image */ \"(app-pages-browser)/./node_modules/next/image.js\");\n/* harmony import */ var next_image__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_image__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react */ \"(app-pages-browser)/./node_modules/next/dist/compiled/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_3__);\n/* harmony import */ var next_navigation__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! next/navigation */ \"(app-pages-browser)/./node_modules/next/navigation.js\");\n/* harmony import */ var next_navigation__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(next_navigation__WEBPACK_IMPORTED_MODULE_4__);\n/* harmony import */ var _perawallet_connect__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @perawallet/connect */ \"(app-pages-browser)/./node_modules/@perawallet/connect/dist/index.js\");\n/* harmony import */ var isomorphic_fetch__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! isomorphic-fetch */ \"(app-pages-browser)/./node_modules/isomorphic-fetch/fetch-npm-browserify.js\");\n/* harmony import */ var isomorphic_fetch__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(isomorphic_fetch__WEBPACK_IMPORTED_MODULE_6__);\n/* __next_internal_client_entry_do_not_use__ default auto */ \nvar _s = $RefreshSig$();\n\n\n\n\n\n\nconst peraWallet = new _perawallet_connect__WEBPACK_IMPORTED_MODULE_5__.PeraWalletConnect();\nconst Hometwo = ()=>{\n    _s();\n    const [accountAddress, setAccountAddress] = (0,react__WEBPACK_IMPORTED_MODULE_3__.useState)(null);\n    const isConnectedToPeraWallet = !!accountAddress;\n    const router = (0,next_navigation__WEBPACK_IMPORTED_MODULE_4__.useRouter)();\n    (0,react__WEBPACK_IMPORTED_MODULE_3__.useEffect)(()=>{\n        // Reconnect to the session when the component is mounted\n        peraWallet.reconnectSession().then((accounts)=>{\n            if (peraWallet.isConnected) {\n                setAccountAddress(accounts[0]);\n            }\n        }).catch((e)=>console.log(e));\n    }, []);\n    const disconnect = async ()=>{\n        peraWallet.disconnect();\n        setAccountAddress(null);\n    };\n    const login = async ()=>{\n        peraWallet.connect().then((newAccounts)=>{\n            peraWallet.connector.on(\"disconnect\", disconnect);\n            setAccountAddress(newAccounts[0]);\n        }).catch((error)=>{\n            var _error_data;\n            if ((error === null || error === void 0 ? void 0 : (_error_data = error.data) === null || _error_data === void 0 ? void 0 : _error_data.type) !== \"CONNECT_MODAL_CLOSED\") {\n                console.log(error);\n            }\n        });\n    };\n    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"nav\", {\n        className: \"flex-between w-full mb-16 pt-3\",\n        children: [\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)((next_link__WEBPACK_IMPORTED_MODULE_1___default()), {\n                href: \"https://www.smartcrow.info/\",\n                className: \"flex gap-2 flex-center\",\n                children: [\n                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)((next_image__WEBPACK_IMPORTED_MODULE_2___default()), {\n                        src: \"/assets/images/logosmart.png\",\n                        alt: \"logo\",\n                        width: 50,\n                        height: 50,\n                        className: \"object-contain\"\n                    }, void 0, false, {\n                        fileName: \"C:\\\\Users\\\\libia\\\\OneDrive\\\\Documents\\\\GitHub\\\\smartcrow\\\\comps\\\\Nav.jsx\",\n                        lineNumber: 54,\n                        columnNumber: 9\n                    }, undefined),\n                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"p\", {\n                        className: \"logo_text\",\n                        children: \"SmartCrow\"\n                    }, void 0, false, {\n                        fileName: \"C:\\\\Users\\\\libia\\\\OneDrive\\\\Documents\\\\GitHub\\\\smartcrow\\\\comps\\\\Nav.jsx\",\n                        lineNumber: 61,\n                        columnNumber: 9\n                    }, undefined)\n                ]\n            }, void 0, true, {\n                fileName: \"C:\\\\Users\\\\libia\\\\OneDrive\\\\Documents\\\\GitHub\\\\smartcrow\\\\comps\\\\Nav.jsx\",\n                lineNumber: 53,\n                columnNumber: 7\n            }, undefined),\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                className: \"sm:flex hidden\",\n                children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {\n                    children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"button\", {\n                        type: \"button\",\n                        className: \"black_btn\",\n                        onClick: isConnectedToPeraWallet ? disconnect : login,\n                        children: isConnectedToPeraWallet ? \"Disconnect Pera Wallet\" : \"Connect Pera Wallet\"\n                    }, void 0, false, {\n                        fileName: \"C:\\\\Users\\\\libia\\\\OneDrive\\\\Documents\\\\GitHub\\\\smartcrow\\\\comps\\\\Nav.jsx\",\n                        lineNumber: 66,\n                        columnNumber: 17\n                    }, undefined)\n                }, void 0, false)\n            }, void 0, false, {\n                fileName: \"C:\\\\Users\\\\libia\\\\OneDrive\\\\Documents\\\\GitHub\\\\smartcrow\\\\comps\\\\Nav.jsx\",\n                lineNumber: 64,\n                columnNumber: 7\n            }, undefined),\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                className: \"sm:hidden flex relative\",\n                children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {\n                    children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"button\", {\n                        type: \"button\",\n                        className: \"black_btn\",\n                        onClick: isConnectedToPeraWallet ? disconnect : login,\n                        children: isConnectedToPeraWallet ? \"Disconnect Pera Wallet\" : \"Connect Pera Wallet\"\n                    }, void 0, false, {\n                        fileName: \"C:\\\\Users\\\\libia\\\\OneDrive\\\\Documents\\\\GitHub\\\\smartcrow\\\\comps\\\\Nav.jsx\",\n                        lineNumber: 79,\n                        columnNumber: 17\n                    }, undefined)\n                }, void 0, false)\n            }, void 0, false, {\n                fileName: \"C:\\\\Users\\\\libia\\\\OneDrive\\\\Documents\\\\GitHub\\\\smartcrow\\\\comps\\\\Nav.jsx\",\n                lineNumber: 77,\n                columnNumber: 7\n            }, undefined)\n        ]\n    }, void 0, true, {\n        fileName: \"C:\\\\Users\\\\libia\\\\OneDrive\\\\Documents\\\\GitHub\\\\smartcrow\\\\comps\\\\Nav.jsx\",\n        lineNumber: 52,\n        columnNumber: 5\n    }, undefined);\n};\n_s(Hometwo, \"jbaELveYnbK5OJJUd6nIxhHKmd4=\", false, function() {\n    return [\n        next_navigation__WEBPACK_IMPORTED_MODULE_4__.useRouter\n    ];\n});\n_c = Hometwo;\n/* harmony default export */ __webpack_exports__[\"default\"] = (Hometwo);\nvar _c;\n$RefreshReg$(_c, \"Hometwo\");\n\n\n;\n    // Wrapped in an IIFE to avoid polluting the global scope\n    ;\n    (function () {\n        var _a, _b;\n        // Legacy CSS implementations will `eval` browser code in a Node.js context\n        // to extract CSS. For backwards compatibility, we need to check we're in a\n        // browser context before continuing.\n        if (typeof self !== 'undefined' &&\n            // AMP / No-JS mode does not inject these helpers:\n            '$RefreshHelpers$' in self) {\n            // @ts-ignore __webpack_module__ is global\n            var currentExports = module.exports;\n            // @ts-ignore __webpack_module__ is global\n            var prevSignature = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevSignature) !== null && _b !== void 0 ? _b : null;\n            // This cannot happen in MainTemplate because the exports mismatch between\n            // templating and execution.\n            self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.id);\n            // A module can be accepted automatically based on its exports, e.g. when\n            // it is a Refresh Boundary.\n            if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {\n                // Save the previous exports signature on update so we can compare the boundary\n                // signatures. We avoid saving exports themselves since it causes memory leaks (https://github.com/vercel/next.js/pull/53797)\n                module.hot.dispose(function (data) {\n                    data.prevSignature =\n                        self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports);\n                });\n                // Unconditionally accept an update to this module, we'll check if it's\n                // still a Refresh Boundary later.\n                // @ts-ignore importMeta is replaced in the loader\n                module.hot.accept();\n                // This field is set when the previous version of this module was a\n                // Refresh Boundary, letting us know we need to check for invalidation or\n                // enqueue an update.\n                if (prevSignature !== null) {\n                    // A boundary can become ineligible if its exports are incompatible\n                    // with the previous exports.\n                    //\n                    // For example, if you add/remove/change exports, we'll want to\n                    // re-execute the importing modules, and force those components to\n                    // re-render. Similarly, if you convert a class component to a\n                    // function, we want to invalidate the boundary.\n                    if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevSignature, self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports))) {\n                        module.hot.invalidate();\n                    }\n                    else {\n                        self.$RefreshHelpers$.scheduleUpdate();\n                    }\n                }\n            }\n            else {\n                // Since we just executed the code for the module, it's possible that the\n                // new exports made it ineligible for being a boundary.\n                // We only care about the case when we were _previously_ a boundary,\n                // because we already accepted this update (accidental side effect).\n                var isNoLongerABoundary = prevSignature !== null;\n                if (isNoLongerABoundary) {\n                    module.hot.invalidate();\n                }\n            }\n        }\n    })();\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKGFwcC1wYWdlcy1icm93c2VyKS8uL2NvbXBzL05hdi5qc3giLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7O0FBRTZCO0FBQ0U7QUFDYTtBQUNBO0FBQ1k7QUFFbEI7QUFHdEMsTUFBTU8sYUFBYSxJQUFJRixrRUFBaUJBO0FBRXhDLE1BQU1HLFVBQVU7O0lBQ2IsTUFBTSxDQUFDQyxnQkFBZ0JDLGtCQUFrQixHQUFHUCwrQ0FBUUEsQ0FBQztJQUNyRCxNQUFNUSwwQkFBMEIsQ0FBQyxDQUFDRjtJQUNsQyxNQUFNRyxTQUFTUiwwREFBU0E7SUFFMUJGLGdEQUFTQSxDQUFDO1FBQ1QseURBQXlEO1FBQ3pESyxXQUNFTSxnQkFBZ0IsR0FDaEJDLElBQUksQ0FBQyxDQUFDQztZQUNOLElBQUlSLFdBQVdTLFdBQVcsRUFBRTtnQkFDM0JOLGtCQUFrQkssUUFBUSxDQUFDLEVBQUU7WUFDOUI7UUFFRCxHQUNDRSxLQUFLLENBQUMsQ0FBQ0MsSUFBTUMsUUFBUUMsR0FBRyxDQUFDRjtJQUM1QixHQUFHLEVBQUU7SUFFTCxNQUFNRyxhQUFhO1FBQ2xCZCxXQUFXYyxVQUFVO1FBQ3JCWCxrQkFBa0I7SUFDbkI7SUFFRSxNQUFNWSxRQUFRO1FBQ2ZmLFdBQ0VnQixPQUFPLEdBQ1BULElBQUksQ0FBQyxDQUFDVTtZQUNOakIsV0FBV2tCLFNBQVMsQ0FBQ0MsRUFBRSxDQUFDLGNBQWNMO1lBQ3RDWCxrQkFBa0JjLFdBQVcsQ0FBQyxFQUFFO1FBQ2pDLEdBQ0NQLEtBQUssQ0FBQyxDQUFDVTtnQkFDSkE7WUFBSixJQUFJQSxDQUFBQSxrQkFBQUEsNkJBQUFBLGNBQUFBLE1BQU9DLElBQUksY0FBWEQsa0NBQUFBLFlBQWFFLElBQUksTUFBSyx3QkFBd0I7Z0JBQ2pEVixRQUFRQyxHQUFHLENBQUNPO1lBQ2I7UUFDRDtJQUNEO0lBRUMscUJBQ0UsOERBQUNHO1FBQUlDLFdBQVU7OzBCQUNiLDhEQUFDL0Isa0RBQUlBO2dCQUFDZ0MsTUFBSztnQkFBOEJELFdBQVU7O2tDQUNqRCw4REFBQzlCLG1EQUFLQTt3QkFDSmdDLEtBQUk7d0JBQ0pDLEtBQUk7d0JBQ0pDLE9BQU87d0JBQ1BDLFFBQVE7d0JBQ1JMLFdBQVU7Ozs7OztrQ0FFWiw4REFBQ007d0JBQUVOLFdBQVU7a0NBQVk7Ozs7Ozs7Ozs7OzswQkFHM0IsOERBQUNPO2dCQUFJUCxXQUFVOzBCQUNYOzhCQUNNLDRFQUFDUTt3QkFDQ1YsTUFBSzt3QkFDTEUsV0FBVTt3QkFDVlMsU0FBUzdCLDBCQUEwQlUsYUFBYUM7a0NBQy9DWCwwQkFBMEIsMkJBQTJCOzs7Ozs7Ozs7Ozs7MEJBT2xFLDhEQUFDMkI7Z0JBQUlQLFdBQVU7MEJBQ1g7OEJBQ00sNEVBQUNRO3dCQUNDVixNQUFLO3dCQUNMRSxXQUFVO3dCQUNWUyxTQUFTN0IsMEJBQTBCVSxhQUFhQztrQ0FFL0NYLDBCQUEwQiwyQkFBMkI7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQVF0RTtHQTlFSUg7O1FBR1lKLHNEQUFTQTs7O0tBSHJCSTtBQStFTiwrREFBZUEsT0FBT0EsRUFBQyIsInNvdXJjZXMiOlsid2VicGFjazovL19OX0UvLi9jb21wcy9OYXYuanN4P2YzNmIiXSwic291cmNlc0NvbnRlbnQiOlsiXCJ1c2UgY2xpZW50XCI7XHJcblxyXG5pbXBvcnQgTGluayBmcm9tIFwibmV4dC9saW5rXCI7XHJcbmltcG9ydCBJbWFnZSBmcm9tIFwibmV4dC9pbWFnZVwiO1xyXG5pbXBvcnQgeyB1c2VFZmZlY3QsIHVzZVN0YXRlIH0gZnJvbSBcInJlYWN0XCI7XHJcbmltcG9ydCB7IHVzZVJvdXRlciB9IGZyb20gJ25leHQvbmF2aWdhdGlvbic7XHJcbmltcG9ydCB7IFBlcmFXYWxsZXRDb25uZWN0IH0gZnJvbSBcIkBwZXJhd2FsbGV0L2Nvbm5lY3RcIjtcclxuXHJcbmltcG9ydCBfZmV0Y2ggZnJvbSAnaXNvbW9ycGhpYy1mZXRjaCc7XHJcblxyXG5cclxuY29uc3QgcGVyYVdhbGxldCA9IG5ldyBQZXJhV2FsbGV0Q29ubmVjdCgpO1xyXG5cclxuY29uc3QgSG9tZXR3byA9ICgpID0+IHtcclxuICBcdGNvbnN0IFthY2NvdW50QWRkcmVzcywgc2V0QWNjb3VudEFkZHJlc3NdID0gdXNlU3RhdGUobnVsbCk7XHJcbiAgXHRjb25zdCBpc0Nvbm5lY3RlZFRvUGVyYVdhbGxldCA9ICEhYWNjb3VudEFkZHJlc3M7XHJcbiAgXHRjb25zdCByb3V0ZXIgPSB1c2VSb3V0ZXIoKTtcclxuXHJcblx0dXNlRWZmZWN0KCgpID0+IHtcclxuXHRcdC8vIFJlY29ubmVjdCB0byB0aGUgc2Vzc2lvbiB3aGVuIHRoZSBjb21wb25lbnQgaXMgbW91bnRlZFxyXG5cdFx0cGVyYVdhbGxldFxyXG5cdFx0XHQucmVjb25uZWN0U2Vzc2lvbigpXHJcblx0XHRcdC50aGVuKChhY2NvdW50cykgPT4ge1xyXG5cdFx0XHRcdGlmIChwZXJhV2FsbGV0LmlzQ29ubmVjdGVkKSB7XHJcblx0XHRcdFx0XHRzZXRBY2NvdW50QWRkcmVzcyhhY2NvdW50c1swXSlcclxuXHRcdFx0XHR9XHJcblx0XHRcdFxyXG5cdFx0XHR9KVxyXG5cdFx0XHQuY2F0Y2goKGUpID0+IGNvbnNvbGUubG9nKGUpKTtcclxuXHR9LCBbXSk7XHJcblxyXG5cdGNvbnN0IGRpc2Nvbm5lY3QgPSBhc3luYyAoKSA9PiB7XHJcblx0XHRwZXJhV2FsbGV0LmRpc2Nvbm5lY3QoKTtcclxuXHRcdHNldEFjY291bnRBZGRyZXNzKG51bGwpO1xyXG5cdH1cclxuXHJcbiAgXHRjb25zdCBsb2dpbiA9IGFzeW5jICgpID0+IHtcclxuXHRcdHBlcmFXYWxsZXRcclxuXHRcdFx0LmNvbm5lY3QoKVxyXG5cdFx0XHQudGhlbigobmV3QWNjb3VudHMpID0+IHtcclxuXHRcdFx0XHRwZXJhV2FsbGV0LmNvbm5lY3Rvci5vbihcImRpc2Nvbm5lY3RcIiwgZGlzY29ubmVjdCk7XHJcblx0XHRcdFx0c2V0QWNjb3VudEFkZHJlc3MobmV3QWNjb3VudHNbMF0pO1xyXG5cdFx0XHR9KVxyXG5cdFx0XHQuY2F0Y2goKGVycm9yKSA9PiB7XHJcblx0XHRcdGlmIChlcnJvcj8uZGF0YT8udHlwZSAhPT0gXCJDT05ORUNUX01PREFMX0NMT1NFRFwiKSB7XHJcblx0XHRcdFx0Y29uc29sZS5sb2coZXJyb3IpO1xyXG5cdFx0XHR9XHJcblx0XHR9KTtcclxuXHR9XHJcblxyXG4gIHJldHVybiAoXHJcbiAgICA8bmF2IGNsYXNzTmFtZT0nZmxleC1iZXR3ZWVuIHctZnVsbCBtYi0xNiBwdC0zJz5cclxuICAgICAgPExpbmsgaHJlZj0naHR0cHM6Ly93d3cuc21hcnRjcm93LmluZm8vJyBjbGFzc05hbWU9J2ZsZXggZ2FwLTIgZmxleC1jZW50ZXInPlxyXG4gICAgICAgIDxJbWFnZVxyXG4gICAgICAgICAgc3JjPScvYXNzZXRzL2ltYWdlcy9sb2dvc21hcnQucG5nJ1xyXG4gICAgICAgICAgYWx0PSdsb2dvJ1xyXG4gICAgICAgICAgd2lkdGg9ezUwfVxyXG4gICAgICAgICAgaGVpZ2h0PXs1MH1cclxuICAgICAgICAgIGNsYXNzTmFtZT0nb2JqZWN0LWNvbnRhaW4nXHJcbiAgICAgICAgLz5cclxuICAgICAgICA8cCBjbGFzc05hbWU9J2xvZ29fdGV4dCc+U21hcnRDcm93PC9wPlxyXG4gICAgICA8L0xpbms+XHJcbiAgICAgIHsvKiBEZXNrdG9wIE5hdmlnYXRpb24gKi99XHJcbiAgICAgIDxkaXYgY2xhc3NOYW1lPSdzbTpmbGV4IGhpZGRlbic+XHJcbiAgICAgICAgICA8PlxyXG4gICAgICAgICAgICAgICAgPGJ1dHRvblxyXG4gICAgICAgICAgICAgICAgICB0eXBlPSdidXR0b24nXHJcbiAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT0nYmxhY2tfYnRuJ1xyXG4gICAgICAgICAgICAgICAgICBvbkNsaWNrPXtpc0Nvbm5lY3RlZFRvUGVyYVdhbGxldCA/IGRpc2Nvbm5lY3QgOiBsb2dpbn0+XHJcbiAgICAgICAgICAgICAgICAgIHtpc0Nvbm5lY3RlZFRvUGVyYVdhbGxldCA/IFwiRGlzY29ubmVjdCBQZXJhIFdhbGxldFwiIDogXCJDb25uZWN0IFBlcmEgV2FsbGV0XCJ9XHJcbiAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICA8L2J1dHRvbj5cclxuICAgICAgICAgIDwvPlxyXG4gICAgICA8L2Rpdj5cclxuXHJcbiAgICAgIHsvKiBNb2JpbGUgTmF2aWdhdGlvbiAqL31cclxuICAgICAgPGRpdiBjbGFzc05hbWU9J3NtOmhpZGRlbiBmbGV4IHJlbGF0aXZlJz5cclxuICAgICAgICAgIDw+XHJcbiAgICAgICAgICAgICAgICA8YnV0dG9uXHJcbiAgICAgICAgICAgICAgICAgIHR5cGU9J2J1dHRvbidcclxuICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPSdibGFja19idG4nXHJcbiAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9e2lzQ29ubmVjdGVkVG9QZXJhV2FsbGV0ID8gZGlzY29ubmVjdCA6IGxvZ2lufVxyXG4gICAgICAgICAgICAgICAgPlxyXG4gICAgICAgICAgICAgICAgICB7aXNDb25uZWN0ZWRUb1BlcmFXYWxsZXQgPyBcIkRpc2Nvbm5lY3QgUGVyYSBXYWxsZXRcIiA6IFwiQ29ubmVjdCBQZXJhIFdhbGxldFwifVxyXG4gICAgICAgICAgICAgICAgPC9idXR0b24+XHJcbiAgICAgICAgICA8Lz5cclxuICAgICAgICBcclxuICAgICAgPC9kaXY+XHJcbiAgICA8L25hdj5cclxuICAgIFxyXG4gICk7XHJcbiAgfTtcclxuZXhwb3J0IGRlZmF1bHQgSG9tZXR3bztcclxuIl0sIm5hbWVzIjpbIkxpbmsiLCJJbWFnZSIsInVzZUVmZmVjdCIsInVzZVN0YXRlIiwidXNlUm91dGVyIiwiUGVyYVdhbGxldENvbm5lY3QiLCJfZmV0Y2giLCJwZXJhV2FsbGV0IiwiSG9tZXR3byIsImFjY291bnRBZGRyZXNzIiwic2V0QWNjb3VudEFkZHJlc3MiLCJpc0Nvbm5lY3RlZFRvUGVyYVdhbGxldCIsInJvdXRlciIsInJlY29ubmVjdFNlc3Npb24iLCJ0aGVuIiwiYWNjb3VudHMiLCJpc0Nvbm5lY3RlZCIsImNhdGNoIiwiZSIsImNvbnNvbGUiLCJsb2ciLCJkaXNjb25uZWN0IiwibG9naW4iLCJjb25uZWN0IiwibmV3QWNjb3VudHMiLCJjb25uZWN0b3IiLCJvbiIsImVycm9yIiwiZGF0YSIsInR5cGUiLCJuYXYiLCJjbGFzc05hbWUiLCJocmVmIiwic3JjIiwiYWx0Iiwid2lkdGgiLCJoZWlnaHQiLCJwIiwiZGl2IiwiYnV0dG9uIiwib25DbGljayJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(app-pages-browser)/./comps/Nav.jsx\n"));

/***/ })

});