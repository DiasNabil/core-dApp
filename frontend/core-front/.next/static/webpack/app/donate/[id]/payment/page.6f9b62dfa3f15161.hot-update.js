"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
self["webpackHotUpdate_N_E"]("app/donate/[id]/payment/page",{

/***/ "(app-pages-browser)/./components/donate/modals/paymentModal.js":
/*!**************************************************!*\
  !*** ./components/donate/modals/paymentModal.js ***!
  \**************************************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

eval(__webpack_require__.ts("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": function() { return /* binding */ PaymentModal; }\n/* harmony export */ });\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"(app-pages-browser)/./node_modules/next/dist/compiled/react/jsx-dev-runtime.js\");\n/* harmony import */ var _helpers_faucet__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @/helpers/faucet */ \"(app-pages-browser)/./helpers/faucet.js\");\n/* harmony import */ var _chakra_ui_button__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @chakra-ui/button */ \"(app-pages-browser)/./node_modules/@chakra-ui/button/dist/chunk-UVUR7MCU.mjs\");\n/* harmony import */ var _chakra_ui_modal__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @chakra-ui/modal */ \"(app-pages-browser)/./node_modules/@chakra-ui/modal/dist/chunk-MSA2NPQT.mjs\");\n/* harmony import */ var _chakra_ui_modal__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @chakra-ui/modal */ \"(app-pages-browser)/./node_modules/@chakra-ui/modal/dist/chunk-JQMJHPZH.mjs\");\n/* harmony import */ var _chakra_ui_modal__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @chakra-ui/modal */ \"(app-pages-browser)/./node_modules/@chakra-ui/modal/dist/chunk-EL2VKIZQ.mjs\");\n/* harmony import */ var _chakra_ui_modal__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @chakra-ui/modal */ \"(app-pages-browser)/./node_modules/@chakra-ui/modal/dist/chunk-5FG5SY5K.mjs\");\n/* harmony import */ var _chakra_ui_modal__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @chakra-ui/modal */ \"(app-pages-browser)/./node_modules/@chakra-ui/modal/dist/chunk-4FCEGNGT.mjs\");\n/* harmony import */ var _chakra_ui_modal__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @chakra-ui/modal */ \"(app-pages-browser)/./node_modules/@chakra-ui/modal/dist/chunk-OFOVX77R.mjs\");\n/* harmony import */ var _chakra_ui_modal__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @chakra-ui/modal */ \"(app-pages-browser)/./node_modules/@chakra-ui/modal/dist/chunk-RAWN7VJ3.mjs\");\n/* harmony import */ var _chakra_ui_toast__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @chakra-ui/toast */ \"(app-pages-browser)/./node_modules/@chakra-ui/toast/dist/chunk-6RSEZNRH.mjs\");\n/* harmony import */ var _wagmi_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @wagmi/core */ \"(app-pages-browser)/./node_modules/@wagmi/core/dist/chunk-TSH6VVF4.js\");\n/* harmony import */ var wagmi__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! wagmi */ \"(app-pages-browser)/./node_modules/wagmi/dist/index.js\");\n/* __next_internal_client_entry_do_not_use__ default auto */ \nvar _s = $RefreshSig$();\n\n\n\n\n\n\n\nfunction PaymentModal(param) {\n    let { isOpen, onClose, data } = param;\n    _s();\n    const toast = (0,_chakra_ui_toast__WEBPACK_IMPORTED_MODULE_2__.useToast)();\n    const account = (0,_wagmi_core__WEBPACK_IMPORTED_MODULE_3__.getAccount)();\n    console.log(data);\n    if (isOpen) {\n        const { config: donate } = (0,wagmi__WEBPACK_IMPORTED_MODULE_4__.usePrepareContractWrite)({\n            address: data.token.contract,\n            abi: data.token.abi,\n            account,\n            functionName: \"safeTransfert\",\n            args: [\n                data.token.contract,\n                data.takerAdress,\n                data.amount\n            ]\n        });\n        const { data: receipt1, isLoading, isSuccess, write: write1 } = (0,wagmi__WEBPACK_IMPORTED_MODULE_4__.useContractWrite)(donate);\n        const { config: tips } = (0,wagmi__WEBPACK_IMPORTED_MODULE_4__.usePrepareContractWrite)({\n            address: data.token.contract,\n            abi: data.token.abi,\n            account,\n            functionName: \"safeTransfert\",\n            args: [\n                data.token.contract,\n                _helpers_faucet__WEBPACK_IMPORTED_MODULE_1__.faucetAddress,\n                data.tips\n            ]\n        });\n        const { data: tipsReceipt1, write: tipsWrite1 } = (0,wagmi__WEBPACK_IMPORTED_MODULE_4__.useContractWrite)(tips);\n    }\n    function handleClick() {\n        write();\n        tipsWrite();\n        console.log(receipt, tipsReceipt);\n    }\n    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_chakra_ui_modal__WEBPACK_IMPORTED_MODULE_5__.Modal, {\n        isOpen: isOpen,\n        onClose: onClose,\n        children: [\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_chakra_ui_modal__WEBPACK_IMPORTED_MODULE_6__.ModalOverlay, {}, void 0, false, {\n                fileName: \"/home/roadman/alyra/core/frontend/core-front/components/donate/modals/paymentModal.js\",\n                lineNumber: 50,\n                columnNumber: 9\n            }, this),\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_chakra_ui_modal__WEBPACK_IMPORTED_MODULE_7__.ModalContent, {\n                children: [\n                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_chakra_ui_modal__WEBPACK_IMPORTED_MODULE_8__.ModalHeader, {\n                        children: \"Confirmer le paiment\"\n                    }, void 0, false, {\n                        fileName: \"/home/roadman/alyra/core/frontend/core-front/components/donate/modals/paymentModal.js\",\n                        lineNumber: 52,\n                        columnNumber: 11\n                    }, this),\n                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_chakra_ui_modal__WEBPACK_IMPORTED_MODULE_9__.ModalCloseButton, {}, void 0, false, {\n                        fileName: \"/home/roadman/alyra/core/frontend/core-front/components/donate/modals/paymentModal.js\",\n                        lineNumber: 53,\n                        columnNumber: 11\n                    }, this),\n                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_chakra_ui_modal__WEBPACK_IMPORTED_MODULE_10__.ModalBody, {\n                        children: \"Une fois le paiement confirmer vous receverez un NFT CORE, il sert a attest\\xe9 de votre don et vous remerciez de votre soutien.\"\n                    }, void 0, false, {\n                        fileName: \"/home/roadman/alyra/core/frontend/core-front/components/donate/modals/paymentModal.js\",\n                        lineNumber: 54,\n                        columnNumber: 11\n                    }, this),\n                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_chakra_ui_modal__WEBPACK_IMPORTED_MODULE_11__.ModalFooter, {\n                        children: [\n                            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_chakra_ui_button__WEBPACK_IMPORTED_MODULE_12__.Button, {\n                                colorScheme: \"blue\",\n                                mr: 3,\n                                onClick: onClose,\n                                children: \"Fermer\"\n                            }, void 0, false, {\n                                fileName: \"/home/roadman/alyra/core/frontend/core-front/components/donate/modals/paymentModal.js\",\n                                lineNumber: 59,\n                                columnNumber: 13\n                            }, this),\n                            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_chakra_ui_button__WEBPACK_IMPORTED_MODULE_12__.Button, {\n                                variant: \"ghost\",\n                                loadingText: \"En cours\",\n                                onClick: ()=>{\n                                    const examplePromise = new Promise((resolve, reject)=>{\n                                        setTimeout(()=>resolve(200), 5000);\n                                    });\n                                    toast.promise(examplePromise, {\n                                        success: {\n                                            title: \"Transaction effectu\\xe9e !\",\n                                            description: \"La somme a bien \\xe9t\\xe9 envoy\\xe9\"\n                                        },\n                                        error: {\n                                            title: \"Erreur lors de la transaction\",\n                                            description: \"La somme n'a pas pu etre envoy\\xe9, veuillez r\\xe9essay\\xe9\"\n                                        },\n                                        loading: {\n                                            title: \"Transaction en cours\",\n                                            description: \"Le transaction est en cours, cela prend generalement du temps\"\n                                        }\n                                    });\n                                },\n                                children: \"Valider\"\n                            }, void 0, false, {\n                                fileName: \"/home/roadman/alyra/core/frontend/core-front/components/donate/modals/paymentModal.js\",\n                                lineNumber: 62,\n                                columnNumber: 13\n                            }, this)\n                        ]\n                    }, void 0, true, {\n                        fileName: \"/home/roadman/alyra/core/frontend/core-front/components/donate/modals/paymentModal.js\",\n                        lineNumber: 58,\n                        columnNumber: 11\n                    }, this)\n                ]\n            }, void 0, true, {\n                fileName: \"/home/roadman/alyra/core/frontend/core-front/components/donate/modals/paymentModal.js\",\n                lineNumber: 51,\n                columnNumber: 9\n            }, this)\n        ]\n    }, void 0, true, {\n        fileName: \"/home/roadman/alyra/core/frontend/core-front/components/donate/modals/paymentModal.js\",\n        lineNumber: 49,\n        columnNumber: 9\n    }, this);\n}\n_s(PaymentModal, \"WUU7e0p6AiTpvVrXhi50JBdcu+0=\", false, function() {\n    return [\n        _chakra_ui_toast__WEBPACK_IMPORTED_MODULE_2__.useToast\n    ];\n});\n_c = PaymentModal;\nvar _c;\n$RefreshReg$(_c, \"PaymentModal\");\n\n\n;\n    // Wrapped in an IIFE to avoid polluting the global scope\n    ;\n    (function () {\n        var _a, _b;\n        // Legacy CSS implementations will `eval` browser code in a Node.js context\n        // to extract CSS. For backwards compatibility, we need to check we're in a\n        // browser context before continuing.\n        if (typeof self !== 'undefined' &&\n            // AMP / No-JS mode does not inject these helpers:\n            '$RefreshHelpers$' in self) {\n            // @ts-ignore __webpack_module__ is global\n            var currentExports = module.exports;\n            // @ts-ignore __webpack_module__ is global\n            var prevSignature = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevSignature) !== null && _b !== void 0 ? _b : null;\n            // This cannot happen in MainTemplate because the exports mismatch between\n            // templating and execution.\n            self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.id);\n            // A module can be accepted automatically based on its exports, e.g. when\n            // it is a Refresh Boundary.\n            if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {\n                // Save the previous exports signature on update so we can compare the boundary\n                // signatures. We avoid saving exports themselves since it causes memory leaks (https://github.com/vercel/next.js/pull/53797)\n                module.hot.dispose(function (data) {\n                    data.prevSignature =\n                        self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports);\n                });\n                // Unconditionally accept an update to this module, we'll check if it's\n                // still a Refresh Boundary later.\n                // @ts-ignore importMeta is replaced in the loader\n                module.hot.accept();\n                // This field is set when the previous version of this module was a\n                // Refresh Boundary, letting us know we need to check for invalidation or\n                // enqueue an update.\n                if (prevSignature !== null) {\n                    // A boundary can become ineligible if its exports are incompatible\n                    // with the previous exports.\n                    //\n                    // For example, if you add/remove/change exports, we'll want to\n                    // re-execute the importing modules, and force those components to\n                    // re-render. Similarly, if you convert a class component to a\n                    // function, we want to invalidate the boundary.\n                    if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevSignature, self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports))) {\n                        module.hot.invalidate();\n                    }\n                    else {\n                        self.$RefreshHelpers$.scheduleUpdate();\n                    }\n                }\n            }\n            else {\n                // Since we just executed the code for the module, it's possible that the\n                // new exports made it ineligible for being a boundary.\n                // We only care about the case when we were _previously_ a boundary,\n                // because we already accepted this update (accidental side effect).\n                var isNoLongerABoundary = prevSignature !== null;\n                if (isNoLongerABoundary) {\n                    module.hot.invalidate();\n                }\n            }\n        }\n    })();\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKGFwcC1wYWdlcy1icm93c2VyKS8uL2NvbXBvbmVudHMvZG9uYXRlL21vZGFscy9wYXltZW50TW9kYWwuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUNpRDtBQUNOO0FBQ0Y7QUFDbUY7QUFDaEY7QUFDSDtBQUN5QjtBQUduRCxTQUFTYyxhQUFhLEtBQXVCO1FBQXZCLEVBQUNDLE1BQU0sRUFBRUMsT0FBTyxFQUFFQyxJQUFJLEVBQUMsR0FBdkI7O0lBRWpDLE1BQU1DLFFBQVFSLDBEQUFRQTtJQUN0QixNQUFNUyxVQUFVUix1REFBVUE7SUFDMUJTLFFBQVFDLEdBQUcsQ0FBQ0o7SUFFWixJQUFHRixRQUFPO1FBQ1IsTUFBTSxFQUFFTyxRQUFRQyxNQUFNLEVBQUUsR0FBR1YsOERBQXVCQSxDQUFDO1lBQ2pEVyxTQUFTUCxLQUFLUSxLQUFLLENBQUNDLFFBQVE7WUFDNUJDLEtBQUtWLEtBQUtRLEtBQUssQ0FBQ0UsR0FBRztZQUNuQlI7WUFDQVMsY0FBYztZQUNkQyxNQUFNO2dCQUFDWixLQUFLUSxLQUFLLENBQUNDLFFBQVE7Z0JBQUVULEtBQUthLFdBQVc7Z0JBQUViLEtBQUtjLE1BQU07YUFBQztRQUM1RDtRQUVBLE1BQU0sRUFBRWQsTUFBTWUsUUFBTyxFQUFFQyxTQUFTLEVBQUVDLFNBQVMsRUFBRUMsT0FBQUEsTUFBSyxFQUFFLEdBQUd2Qix1REFBZ0JBLENBQUNXO1FBRXhFLE1BQU0sRUFBRUQsUUFBUWMsSUFBSSxFQUFFLEdBQUd2Qiw4REFBdUJBLENBQUM7WUFDL0NXLFNBQVNQLEtBQUtRLEtBQUssQ0FBQ0MsUUFBUTtZQUM1QkMsS0FBS1YsS0FBS1EsS0FBSyxDQUFDRSxHQUFHO1lBQ25CUjtZQUNBUyxjQUFjO1lBQ2RDLE1BQU07Z0JBQUNaLEtBQUtRLEtBQUssQ0FBQ0MsUUFBUTtnQkFBRTFCLDBEQUFhQTtnQkFBRWlCLEtBQUttQixJQUFJO2FBQUM7UUFDdkQ7UUFFQSxNQUFNLEVBQUNuQixNQUFNb0IsWUFBVyxFQUFFRixPQUFPRyxVQUFTLEVBQUMsR0FBRzFCLHVEQUFnQkEsQ0FBQ3dCO0lBQ2pFO0lBR0EsU0FBU0c7UUFDUEo7UUFDQUc7UUFFQWxCLFFBQVFDLEdBQUcsQ0FBQ1csU0FBU0s7SUFDdkI7SUFHQSxxQkFDSSw4REFBQ2xDLG1EQUFLQTtRQUFDWSxRQUFRQTtRQUFRQyxTQUFTQTs7MEJBQ2hDLDhEQUFDUCwwREFBWUE7Ozs7OzBCQUNiLDhEQUFDSCwwREFBWUE7O2tDQUNYLDhEQUFDRSx5REFBV0E7a0NBQUM7Ozs7OztrQ0FDYiw4REFBQ0gsOERBQWdCQTs7Ozs7a0NBQ2pCLDhEQUFDRCx3REFBU0E7a0NBQUM7Ozs7OztrQ0FJWCw4REFBQ0csMERBQVdBOzswQ0FDViw4REFBQ04sc0RBQU1BO2dDQUFDdUMsYUFBWTtnQ0FBT0MsSUFBSTtnQ0FBR0MsU0FBUzFCOzBDQUFTOzs7Ozs7MENBR3BELDhEQUFDZixzREFBTUE7Z0NBQUMwQyxTQUFRO2dDQUFRQyxhQUFZO2dDQUFXRixTQUFTO29DQUNwRCxNQUFNRyxpQkFBaUIsSUFBSUMsUUFBUSxDQUFDQyxTQUFTQzt3Q0FDekNDLFdBQVcsSUFBS0YsUUFBUSxNQUFNO29DQUNsQztvQ0FFQTdCLE1BQU1nQyxPQUFPLENBQUNMLGdCQUFnQjt3Q0FDMUJNLFNBQVM7NENBQUVDLE9BQU87NENBQTJCQyxhQUFhO3dDQUE2Qjt3Q0FDdkZDLE9BQU87NENBQUVGLE9BQU87NENBQWlDQyxhQUFhO3dDQUFxRDt3Q0FDbkhFLFNBQVM7NENBQUVILE9BQU87NENBQXdCQyxhQUFhO3dDQUFnRTtvQ0FDekg7Z0NBQ047MENBQUk7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQU9oQjtHQXBFd0J2Qzs7UUFFTkosc0RBQVFBOzs7S0FGRkkiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9fTl9FLy4vY29tcG9uZW50cy9kb25hdGUvbW9kYWxzL3BheW1lbnRNb2RhbC5qcz8wM2JiIl0sInNvdXJjZXNDb250ZW50IjpbIid1c2UgY2xpZW50J1xuaW1wb3J0IHsgZmF1Y2V0QWRkcmVzcyB9IGZyb20gXCJAL2hlbHBlcnMvZmF1Y2V0XCI7XG5pbXBvcnQgeyBCdXR0b24gfSBmcm9tIFwiQGNoYWtyYS11aS9idXR0b25cIjtcbmltcG9ydCB7IElucHV0IH0gZnJvbSBcIkBjaGFrcmEtdWkvaW5wdXRcIjtcbmltcG9ydCB7IE1vZGFsLCBNb2RhbEJvZHksIE1vZGFsQ2xvc2VCdXR0b24sIE1vZGFsQ29udGVudCwgTW9kYWxGb290ZXIsIE1vZGFsSGVhZGVyLCBNb2RhbE92ZXJsYXkgfSBmcm9tIFwiQGNoYWtyYS11aS9tb2RhbFwiO1xuaW1wb3J0IHsgdXNlVG9hc3QgfSBmcm9tIFwiQGNoYWtyYS11aS90b2FzdFwiO1xuaW1wb3J0IHsgZ2V0QWNjb3VudCB9IGZyb20gXCJAd2FnbWkvY29yZVwiO1xuaW1wb3J0IHsgdXNlQ29udHJhY3RXcml0ZSwgdXNlUHJlcGFyZUNvbnRyYWN0V3JpdGUgfSBmcm9tIFwid2FnbWlcIjtcblxuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBQYXltZW50TW9kYWwoe2lzT3Blbiwgb25DbG9zZSwgZGF0YX0pe1xuXG4gICAgY29uc3QgdG9hc3QgPSB1c2VUb2FzdCgpXG4gICAgY29uc3QgYWNjb3VudCA9IGdldEFjY291bnQoKVxuICAgIGNvbnNvbGUubG9nKGRhdGEpXG5cbiAgICBpZihpc09wZW4pe1xuICAgICAgY29uc3QgeyBjb25maWc6IGRvbmF0ZSB9ID0gdXNlUHJlcGFyZUNvbnRyYWN0V3JpdGUoe1xuICAgICAgICBhZGRyZXNzOiBkYXRhLnRva2VuLmNvbnRyYWN0LFxuICAgICAgICBhYmk6IGRhdGEudG9rZW4uYWJpLFxuICAgICAgICBhY2NvdW50LFxuICAgICAgICBmdW5jdGlvbk5hbWU6ICdzYWZlVHJhbnNmZXJ0JyxcbiAgICAgICAgYXJnczogW2RhdGEudG9rZW4uY29udHJhY3QsIGRhdGEudGFrZXJBZHJlc3MsIGRhdGEuYW1vdW50XVxuICAgICAgfSlcblxuICAgICAgY29uc3QgeyBkYXRhOiByZWNlaXB0LCBpc0xvYWRpbmcsIGlzU3VjY2Vzcywgd3JpdGUgfSA9IHVzZUNvbnRyYWN0V3JpdGUoZG9uYXRlKVxuXG4gICAgICBjb25zdCB7IGNvbmZpZzogdGlwcyB9ID0gdXNlUHJlcGFyZUNvbnRyYWN0V3JpdGUoe1xuICAgICAgICBhZGRyZXNzOiBkYXRhLnRva2VuLmNvbnRyYWN0LFxuICAgICAgICBhYmk6IGRhdGEudG9rZW4uYWJpLFxuICAgICAgICBhY2NvdW50LFxuICAgICAgICBmdW5jdGlvbk5hbWU6ICdzYWZlVHJhbnNmZXJ0JyxcbiAgICAgICAgYXJnczogW2RhdGEudG9rZW4uY29udHJhY3QsIGZhdWNldEFkZHJlc3MsIGRhdGEudGlwc11cbiAgICAgIH0pXG4gICAgICBcbiAgICAgIGNvbnN0IHtkYXRhOiB0aXBzUmVjZWlwdCwgd3JpdGU6IHRpcHNXcml0ZX0gPSB1c2VDb250cmFjdFdyaXRlKHRpcHMpXG4gICAgfVxuXG5cbiAgICBmdW5jdGlvbiBoYW5kbGVDbGljaygpe1xuICAgICAgd3JpdGUoKVxuICAgICAgdGlwc1dyaXRlKClcblxuICAgICAgY29uc29sZS5sb2cocmVjZWlwdCwgdGlwc1JlY2VpcHQpXG4gICAgfVxuXG5cbiAgICByZXR1cm4gKFxuICAgICAgICA8TW9kYWwgaXNPcGVuPXtpc09wZW59IG9uQ2xvc2U9e29uQ2xvc2V9PlxuICAgICAgICA8TW9kYWxPdmVybGF5IC8+XG4gICAgICAgIDxNb2RhbENvbnRlbnQ+XG4gICAgICAgICAgPE1vZGFsSGVhZGVyPkNvbmZpcm1lciBsZSBwYWltZW50PC9Nb2RhbEhlYWRlcj5cbiAgICAgICAgICA8TW9kYWxDbG9zZUJ1dHRvbiAvPlxuICAgICAgICAgIDxNb2RhbEJvZHk+IFxuICAgICAgICAgICAgVW5lIGZvaXMgbGUgcGFpZW1lbnQgY29uZmlybWVyIHZvdXMgcmVjZXZlcmV6IHVuIE5GVCBDT1JFLCBpbCBzZXJ0IGEgYXR0ZXN0w6kgZGUgdm90cmUgZG9uIGV0IHZvdXMgcmVtZXJjaWV6IGRlIHZvdHJlIHNvdXRpZW4uICBcbiAgICAgICAgICA8L01vZGFsQm9keT5cblxuICAgICAgICAgIDxNb2RhbEZvb3Rlcj5cbiAgICAgICAgICAgIDxCdXR0b24gY29sb3JTY2hlbWU9J2JsdWUnIG1yPXszfSBvbkNsaWNrPXtvbkNsb3NlfT5cbiAgICAgICAgICAgICAgRmVybWVyXG4gICAgICAgICAgICA8L0J1dHRvbj5cbiAgICAgICAgICAgIDxCdXR0b24gdmFyaWFudD0nZ2hvc3QnIGxvYWRpbmdUZXh0PSdFbiBjb3Vycycgb25DbGljaz17KCk9PntcbiAgICAgICAgICAgICAgICBjb25zdCBleGFtcGxlUHJvbWlzZSA9IG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgc2V0VGltZW91dCgoKT0+IHJlc29sdmUoMjAwKSwgNTAwMClcbiAgICAgICAgICAgICAgICB9KVxuXG4gICAgICAgICAgICAgICAgdG9hc3QucHJvbWlzZShleGFtcGxlUHJvbWlzZSwge1xuICAgICAgICAgICAgICAgICAgICBzdWNjZXNzOiB7IHRpdGxlOiAnVHJhbnNhY3Rpb24gZWZmZWN0dcOpZSAhJywgZGVzY3JpcHRpb246ICdMYSBzb21tZSBhIGJpZW4gw6l0w6kgZW52b3nDqScgfSxcbiAgICAgICAgICAgICAgICAgICAgZXJyb3I6IHsgdGl0bGU6ICdFcnJldXIgbG9ycyBkZSBsYSB0cmFuc2FjdGlvbicsIGRlc2NyaXB0aW9uOiBcIkxhIHNvbW1lIG4nYSBwYXMgcHUgZXRyZSBlbnZvecOpLCB2ZXVpbGxleiByw6llc3NhecOpXCIgfSxcbiAgICAgICAgICAgICAgICAgICAgbG9hZGluZzogeyB0aXRsZTogJ1RyYW5zYWN0aW9uIGVuIGNvdXJzJywgZGVzY3JpcHRpb246ICdMZSB0cmFuc2FjdGlvbiBlc3QgZW4gY291cnMsIGNlbGEgcHJlbmQgZ2VuZXJhbGVtZW50IGR1IHRlbXBzJyB9LFxuICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIH19ID5cbiAgICAgICAgICAgICAgICBWYWxpZGVyXG4gICAgICAgICAgICA8L0J1dHRvbj5cbiAgICAgICAgICA8L01vZGFsRm9vdGVyPlxuICAgICAgICA8L01vZGFsQ29udGVudD5cbiAgICAgIDwvTW9kYWw+XG4gICAgKVxufSJdLCJuYW1lcyI6WyJmYXVjZXRBZGRyZXNzIiwiQnV0dG9uIiwiSW5wdXQiLCJNb2RhbCIsIk1vZGFsQm9keSIsIk1vZGFsQ2xvc2VCdXR0b24iLCJNb2RhbENvbnRlbnQiLCJNb2RhbEZvb3RlciIsIk1vZGFsSGVhZGVyIiwiTW9kYWxPdmVybGF5IiwidXNlVG9hc3QiLCJnZXRBY2NvdW50IiwidXNlQ29udHJhY3RXcml0ZSIsInVzZVByZXBhcmVDb250cmFjdFdyaXRlIiwiUGF5bWVudE1vZGFsIiwiaXNPcGVuIiwib25DbG9zZSIsImRhdGEiLCJ0b2FzdCIsImFjY291bnQiLCJjb25zb2xlIiwibG9nIiwiY29uZmlnIiwiZG9uYXRlIiwiYWRkcmVzcyIsInRva2VuIiwiY29udHJhY3QiLCJhYmkiLCJmdW5jdGlvbk5hbWUiLCJhcmdzIiwidGFrZXJBZHJlc3MiLCJhbW91bnQiLCJyZWNlaXB0IiwiaXNMb2FkaW5nIiwiaXNTdWNjZXNzIiwid3JpdGUiLCJ0aXBzIiwidGlwc1JlY2VpcHQiLCJ0aXBzV3JpdGUiLCJoYW5kbGVDbGljayIsImNvbG9yU2NoZW1lIiwibXIiLCJvbkNsaWNrIiwidmFyaWFudCIsImxvYWRpbmdUZXh0IiwiZXhhbXBsZVByb21pc2UiLCJQcm9taXNlIiwicmVzb2x2ZSIsInJlamVjdCIsInNldFRpbWVvdXQiLCJwcm9taXNlIiwic3VjY2VzcyIsInRpdGxlIiwiZGVzY3JpcHRpb24iLCJlcnJvciIsImxvYWRpbmciXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(app-pages-browser)/./components/donate/modals/paymentModal.js\n"));

/***/ })

});