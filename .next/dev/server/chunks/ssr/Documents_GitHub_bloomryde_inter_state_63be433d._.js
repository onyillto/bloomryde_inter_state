module.exports = [
"[project]/Documents/GitHub/bloomryde_inter_state/src/components/intertravel-landing.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>TravelBookingLanding
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$bloomryde_inter_state$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/GitHub/bloomryde_inter_state/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$bloomryde_inter_state$2f$node_modules$2f$styled$2d$jsx$2f$style$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/GitHub/bloomryde_inter_state/node_modules/styled-jsx/style.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$bloomryde_inter_state$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/GitHub/bloomryde_inter_state/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
"use client";
;
;
;
function TravelBookingLanding() {
    const [tripType, setTripType] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$bloomryde_inter_state$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("one-way");
    const [fromLocation, setFromLocation] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$bloomryde_inter_state$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("Tokyo, Japan");
    const [toLocation, setToLocation] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$bloomryde_inter_state$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("Berlin, Germany");
    const [departDate, setDepartDate] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$bloomryde_inter_state$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("Oct 11, 2023");
    const [returnDate, setReturnDate] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$bloomryde_inter_state$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("Dec 15, 2023");
    const deals = [
        {
            id: 1,
            category: "OFFERD2023",
            title: "LUXURY TRAVEL AND AIRLINES",
            description: "Luxury travel and airlines offer unparalleled comfort and exclusivity for discerning travelers.",
            image: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=400&h=400&fit=crop",
            type: "travel"
        },
        {
            id: 2,
            category: "HOTEL BOOKINGS",
            title: "Premium Accommodations",
            description: "Book luxury hotels at unbeatable prices",
            image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400&h=400&fit=crop",
            type: "hotel"
        },
        {
            id: 3,
            category: "BOOK DOMESTIC",
            title: "Domestic Flights",
            description: "Quick and affordable domestic travel options",
            image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=400&h=400&fit=crop",
            type: "domestic"
        }
    ];
    const airlines = [
        {
            name: "TURKISH AIRLINES",
            image: "https://images.unsplash.com/photo-1464037866556-6812c9d1c72e?w=600&h=400&fit=crop"
        },
        {
            name: "EMIRATES",
            image: "https://images.unsplash.com/photo-1583421052927-2595f8e9c945?w=600&h=400&fit=crop"
        },
        {
            name: "QATAR AIRWAYS",
            image: "https://images.unsplash.com/photo-1540962351504-03099e0a754b?w=600&h=400&fit=crop"
        },
        {
            name: "SINGAPORE AIRLINES",
            image: "https://images.unsplash.com/photo-1569629743817-70d8db6c323b?w=600&h=400&fit=crop"
        }
    ];
    const hotels = [
        {
            name: "HOTEL TROPICAL DAISY",
            location: "123 Ian Point City Centre",
            image: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=600&h=500&fit=crop",
            favorite: false
        },
        {
            name: "HOTEL TROPICAL DAISY",
            location: "123 Ian Point City Centre",
            image: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=600&h=500&fit=crop",
            favorite: true
        },
        {
            name: "HOTEL TROPICAL DAISY",
            location: "123 Ian Point City Centre",
            image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=600&h=500&fit=crop",
            favorite: true
        }
    ];
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$bloomryde_inter_state$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "jsx-4398f64d97b6ffa9" + " " + "landing-page",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$bloomryde_inter_state$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("nav", {
                className: "jsx-4398f64d97b6ffa9" + " " + "navbar",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$bloomryde_inter_state$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "jsx-4398f64d97b6ffa9" + " " + "nav-container",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$bloomryde_inter_state$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "jsx-4398f64d97b6ffa9" + " " + "logo",
                            children: "Travel agency."
                        }, void 0, false, {
                            fileName: "[project]/Documents/GitHub/bloomryde_inter_state/src/components/intertravel-landing.tsx",
                            lineNumber: 96,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$bloomryde_inter_state$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "jsx-4398f64d97b6ffa9" + " " + "nav-links",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$bloomryde_inter_state$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                    href: "#flights",
                                    className: "jsx-4398f64d97b6ffa9" + " " + "nav-link active",
                                    children: "Flights"
                                }, void 0, false, {
                                    fileName: "[project]/Documents/GitHub/bloomryde_inter_state/src/components/intertravel-landing.tsx",
                                    lineNumber: 98,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$bloomryde_inter_state$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                    href: "#hotel",
                                    className: "jsx-4398f64d97b6ffa9" + " " + "nav-link",
                                    children: "Hotel"
                                }, void 0, false, {
                                    fileName: "[project]/Documents/GitHub/bloomryde_inter_state/src/components/intertravel-landing.tsx",
                                    lineNumber: 101,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$bloomryde_inter_state$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                    href: "#trains",
                                    className: "jsx-4398f64d97b6ffa9" + " " + "nav-link",
                                    children: "Trains"
                                }, void 0, false, {
                                    fileName: "[project]/Documents/GitHub/bloomryde_inter_state/src/components/intertravel-landing.tsx",
                                    lineNumber: 104,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$bloomryde_inter_state$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                    href: "#buses",
                                    className: "jsx-4398f64d97b6ffa9" + " " + "nav-link",
                                    children: "Buses"
                                }, void 0, false, {
                                    fileName: "[project]/Documents/GitHub/bloomryde_inter_state/src/components/intertravel-landing.tsx",
                                    lineNumber: 107,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$bloomryde_inter_state$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                    href: "#cabs",
                                    className: "jsx-4398f64d97b6ffa9" + " " + "nav-link",
                                    children: "Cabs"
                                }, void 0, false, {
                                    fileName: "[project]/Documents/GitHub/bloomryde_inter_state/src/components/intertravel-landing.tsx",
                                    lineNumber: 110,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/Documents/GitHub/bloomryde_inter_state/src/components/intertravel-landing.tsx",
                            lineNumber: 97,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$bloomryde_inter_state$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            className: "jsx-4398f64d97b6ffa9" + " " + "sign-in-btn",
                            children: "Sign In"
                        }, void 0, false, {
                            fileName: "[project]/Documents/GitHub/bloomryde_inter_state/src/components/intertravel-landing.tsx",
                            lineNumber: 114,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/Documents/GitHub/bloomryde_inter_state/src/components/intertravel-landing.tsx",
                    lineNumber: 95,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/Documents/GitHub/bloomryde_inter_state/src/components/intertravel-landing.tsx",
                lineNumber: 94,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$bloomryde_inter_state$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                className: "jsx-4398f64d97b6ffa9" + " " + "hero-section",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$bloomryde_inter_state$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "jsx-4398f64d97b6ffa9" + " " + "hero-content",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$bloomryde_inter_state$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "jsx-4398f64d97b6ffa9" + " " + "hero-subtitle",
                                children: "READY TAKE-OFF"
                            }, void 0, false, {
                                fileName: "[project]/Documents/GitHub/bloomryde_inter_state/src/components/intertravel-landing.tsx",
                                lineNumber: 121,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$bloomryde_inter_state$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                                className: "jsx-4398f64d97b6ffa9" + " " + "hero-title",
                                children: [
                                    "CONVENIENT ONLINE",
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$bloomryde_inter_state$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("br", {
                                        className: "jsx-4398f64d97b6ffa9"
                                    }, void 0, false, {
                                        fileName: "[project]/Documents/GitHub/bloomryde_inter_state/src/components/intertravel-landing.tsx",
                                        lineNumber: 124,
                                        columnNumber: 13
                                    }, this),
                                    "FLIGHT BOOKING SERVICES"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Documents/GitHub/bloomryde_inter_state/src/components/intertravel-landing.tsx",
                                lineNumber: 122,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$bloomryde_inter_state$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "jsx-4398f64d97b6ffa9" + " " + "plane-container",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$bloomryde_inter_state$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "jsx-4398f64d97b6ffa9" + " " + "plane",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$bloomryde_inter_state$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "jsx-4398f64d97b6ffa9" + " " + "plane-body"
                                        }, void 0, false, {
                                            fileName: "[project]/Documents/GitHub/bloomryde_inter_state/src/components/intertravel-landing.tsx",
                                            lineNumber: 131,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$bloomryde_inter_state$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "jsx-4398f64d97b6ffa9" + " " + "plane-wing-left"
                                        }, void 0, false, {
                                            fileName: "[project]/Documents/GitHub/bloomryde_inter_state/src/components/intertravel-landing.tsx",
                                            lineNumber: 132,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$bloomryde_inter_state$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "jsx-4398f64d97b6ffa9" + " " + "plane-wing-right"
                                        }, void 0, false, {
                                            fileName: "[project]/Documents/GitHub/bloomryde_inter_state/src/components/intertravel-landing.tsx",
                                            lineNumber: 133,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$bloomryde_inter_state$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "jsx-4398f64d97b6ffa9" + " " + "plane-tail"
                                        }, void 0, false, {
                                            fileName: "[project]/Documents/GitHub/bloomryde_inter_state/src/components/intertravel-landing.tsx",
                                            lineNumber: 134,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$bloomryde_inter_state$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "jsx-4398f64d97b6ffa9" + " " + "plane-engine engine-left"
                                        }, void 0, false, {
                                            fileName: "[project]/Documents/GitHub/bloomryde_inter_state/src/components/intertravel-landing.tsx",
                                            lineNumber: 135,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$bloomryde_inter_state$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "jsx-4398f64d97b6ffa9" + " " + "plane-engine engine-right"
                                        }, void 0, false, {
                                            fileName: "[project]/Documents/GitHub/bloomryde_inter_state/src/components/intertravel-landing.tsx",
                                            lineNumber: 136,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/Documents/GitHub/bloomryde_inter_state/src/components/intertravel-landing.tsx",
                                    lineNumber: 130,
                                    columnNumber: 13
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/Documents/GitHub/bloomryde_inter_state/src/components/intertravel-landing.tsx",
                                lineNumber: 129,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Documents/GitHub/bloomryde_inter_state/src/components/intertravel-landing.tsx",
                        lineNumber: 120,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$bloomryde_inter_state$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "jsx-4398f64d97b6ffa9" + " " + "booking-form-card",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$bloomryde_inter_state$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "jsx-4398f64d97b6ffa9" + " " + "trip-type-tabs",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$bloomryde_inter_state$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: ()=>setTripType("one-way"),
                                        className: "jsx-4398f64d97b6ffa9" + " " + `trip-tab ${tripType === "one-way" ? "active" : ""}`,
                                        children: "One Way"
                                    }, void 0, false, {
                                        fileName: "[project]/Documents/GitHub/bloomryde_inter_state/src/components/intertravel-landing.tsx",
                                        lineNumber: 144,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$bloomryde_inter_state$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: ()=>setTripType("round-trip"),
                                        className: "jsx-4398f64d97b6ffa9" + " " + `trip-tab ${tripType === "round-trip" ? "active" : ""}`,
                                        children: "Round Trip"
                                    }, void 0, false, {
                                        fileName: "[project]/Documents/GitHub/bloomryde_inter_state/src/components/intertravel-landing.tsx",
                                        lineNumber: 150,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$bloomryde_inter_state$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: ()=>setTripType("multi-city"),
                                        className: "jsx-4398f64d97b6ffa9" + " " + `trip-tab ${tripType === "multi-city" ? "active" : ""}`,
                                        children: "Multi City"
                                    }, void 0, false, {
                                        fileName: "[project]/Documents/GitHub/bloomryde_inter_state/src/components/intertravel-landing.tsx",
                                        lineNumber: 158,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Documents/GitHub/bloomryde_inter_state/src/components/intertravel-landing.tsx",
                                lineNumber: 143,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$bloomryde_inter_state$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "jsx-4398f64d97b6ffa9" + " " + "form-grid",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$bloomryde_inter_state$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "jsx-4398f64d97b6ffa9" + " " + "form-field",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$bloomryde_inter_state$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                className: "jsx-4398f64d97b6ffa9" + " " + "field-label",
                                                children: "From"
                                            }, void 0, false, {
                                                fileName: "[project]/Documents/GitHub/bloomryde_inter_state/src/components/intertravel-landing.tsx",
                                                lineNumber: 170,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$bloomryde_inter_state$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                type: "text",
                                                value: fromLocation,
                                                onChange: (e)=>setFromLocation(e.target.value),
                                                className: "jsx-4398f64d97b6ffa9" + " " + "field-input"
                                            }, void 0, false, {
                                                fileName: "[project]/Documents/GitHub/bloomryde_inter_state/src/components/intertravel-landing.tsx",
                                                lineNumber: 171,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/Documents/GitHub/bloomryde_inter_state/src/components/intertravel-landing.tsx",
                                        lineNumber: 169,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$bloomryde_inter_state$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "jsx-4398f64d97b6ffa9" + " " + "form-field",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$bloomryde_inter_state$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                className: "jsx-4398f64d97b6ffa9" + " " + "field-label",
                                                children: "To"
                                            }, void 0, false, {
                                                fileName: "[project]/Documents/GitHub/bloomryde_inter_state/src/components/intertravel-landing.tsx",
                                                lineNumber: 180,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$bloomryde_inter_state$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                type: "text",
                                                value: toLocation,
                                                onChange: (e)=>setToLocation(e.target.value),
                                                className: "jsx-4398f64d97b6ffa9" + " " + "field-input"
                                            }, void 0, false, {
                                                fileName: "[project]/Documents/GitHub/bloomryde_inter_state/src/components/intertravel-landing.tsx",
                                                lineNumber: 181,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/Documents/GitHub/bloomryde_inter_state/src/components/intertravel-landing.tsx",
                                        lineNumber: 179,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$bloomryde_inter_state$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "jsx-4398f64d97b6ffa9" + " " + "form-field",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$bloomryde_inter_state$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                className: "jsx-4398f64d97b6ffa9" + " " + "field-label",
                                                children: "Depart"
                                            }, void 0, false, {
                                                fileName: "[project]/Documents/GitHub/bloomryde_inter_state/src/components/intertravel-landing.tsx",
                                                lineNumber: 190,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$bloomryde_inter_state$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                type: "text",
                                                value: departDate,
                                                onChange: (e)=>setDepartDate(e.target.value),
                                                className: "jsx-4398f64d97b6ffa9" + " " + "field-input"
                                            }, void 0, false, {
                                                fileName: "[project]/Documents/GitHub/bloomryde_inter_state/src/components/intertravel-landing.tsx",
                                                lineNumber: 191,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/Documents/GitHub/bloomryde_inter_state/src/components/intertravel-landing.tsx",
                                        lineNumber: 189,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$bloomryde_inter_state$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "jsx-4398f64d97b6ffa9" + " " + "form-field",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$bloomryde_inter_state$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                className: "jsx-4398f64d97b6ffa9" + " " + "field-label",
                                                children: "Return"
                                            }, void 0, false, {
                                                fileName: "[project]/Documents/GitHub/bloomryde_inter_state/src/components/intertravel-landing.tsx",
                                                lineNumber: 200,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$bloomryde_inter_state$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                type: "text",
                                                value: returnDate,
                                                onChange: (e)=>setReturnDate(e.target.value),
                                                className: "jsx-4398f64d97b6ffa9" + " " + "field-input"
                                            }, void 0, false, {
                                                fileName: "[project]/Documents/GitHub/bloomryde_inter_state/src/components/intertravel-landing.tsx",
                                                lineNumber: 201,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/Documents/GitHub/bloomryde_inter_state/src/components/intertravel-landing.tsx",
                                        lineNumber: 199,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Documents/GitHub/bloomryde_inter_state/src/components/intertravel-landing.tsx",
                                lineNumber: 168,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$bloomryde_inter_state$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                className: "jsx-4398f64d97b6ffa9" + " " + "search-btn",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$bloomryde_inter_state$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                    viewBox: "0 0 24 24",
                                    fill: "none",
                                    stroke: "currentColor",
                                    strokeWidth: "2",
                                    className: "jsx-4398f64d97b6ffa9",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$bloomryde_inter_state$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("circle", {
                                            cx: "11",
                                            cy: "11",
                                            r: "8",
                                            className: "jsx-4398f64d97b6ffa9"
                                        }, void 0, false, {
                                            fileName: "[project]/Documents/GitHub/bloomryde_inter_state/src/components/intertravel-landing.tsx",
                                            lineNumber: 217,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$bloomryde_inter_state$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                            d: "m21 21-4.35-4.35",
                                            className: "jsx-4398f64d97b6ffa9"
                                        }, void 0, false, {
                                            fileName: "[project]/Documents/GitHub/bloomryde_inter_state/src/components/intertravel-landing.tsx",
                                            lineNumber: 218,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/Documents/GitHub/bloomryde_inter_state/src/components/intertravel-landing.tsx",
                                    lineNumber: 211,
                                    columnNumber: 13
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/Documents/GitHub/bloomryde_inter_state/src/components/intertravel-landing.tsx",
                                lineNumber: 210,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Documents/GitHub/bloomryde_inter_state/src/components/intertravel-landing.tsx",
                        lineNumber: 142,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/Documents/GitHub/bloomryde_inter_state/src/components/intertravel-landing.tsx",
                lineNumber: 119,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$bloomryde_inter_state$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                className: "jsx-4398f64d97b6ffa9" + " " + "deals-section",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$bloomryde_inter_state$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "jsx-4398f64d97b6ffa9" + " " + "section-header",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$bloomryde_inter_state$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                className: "jsx-4398f64d97b6ffa9" + " " + "section-title",
                                children: "TOP FLIGHT DEALS"
                            }, void 0, false, {
                                fileName: "[project]/Documents/GitHub/bloomryde_inter_state/src/components/intertravel-landing.tsx",
                                lineNumber: 227,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$bloomryde_inter_state$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "jsx-4398f64d97b6ffa9" + " " + "section-subtitle",
                                children: "Discover top flight deals for elite travel experiences at unprecedented prices."
                            }, void 0, false, {
                                fileName: "[project]/Documents/GitHub/bloomryde_inter_state/src/components/intertravel-landing.tsx",
                                lineNumber: 228,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Documents/GitHub/bloomryde_inter_state/src/components/intertravel-landing.tsx",
                        lineNumber: 226,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$bloomryde_inter_state$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "jsx-4398f64d97b6ffa9" + " " + "deals-grid",
                        children: deals.map((deal, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$bloomryde_inter_state$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    animationDelay: `${index * 0.1}s`
                                },
                                className: "jsx-4398f64d97b6ffa9" + " " + `deal-card ${index === 0 ? "deal-card-wide" : ""}`,
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$bloomryde_inter_state$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "jsx-4398f64d97b6ffa9" + " " + "deal-image-container",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$bloomryde_inter_state$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                            src: deal.image,
                                            alt: deal.title,
                                            className: "jsx-4398f64d97b6ffa9" + " " + "deal-image"
                                        }, void 0, false, {
                                            fileName: "[project]/Documents/GitHub/bloomryde_inter_state/src/components/intertravel-landing.tsx",
                                            lineNumber: 242,
                                            columnNumber: 17
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/Documents/GitHub/bloomryde_inter_state/src/components/intertravel-landing.tsx",
                                        lineNumber: 241,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$bloomryde_inter_state$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "jsx-4398f64d97b6ffa9" + " " + "deal-content",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$bloomryde_inter_state$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "jsx-4398f64d97b6ffa9" + " " + "deal-category",
                                                children: deal.category
                                            }, void 0, false, {
                                                fileName: "[project]/Documents/GitHub/bloomryde_inter_state/src/components/intertravel-landing.tsx",
                                                lineNumber: 245,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$bloomryde_inter_state$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                className: "jsx-4398f64d97b6ffa9" + " " + "deal-title",
                                                children: deal.title
                                            }, void 0, false, {
                                                fileName: "[project]/Documents/GitHub/bloomryde_inter_state/src/components/intertravel-landing.tsx",
                                                lineNumber: 246,
                                                columnNumber: 17
                                            }, this),
                                            index === 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$bloomryde_inter_state$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "jsx-4398f64d97b6ffa9" + " " + "deal-description",
                                                children: deal.description
                                            }, void 0, false, {
                                                fileName: "[project]/Documents/GitHub/bloomryde_inter_state/src/components/intertravel-landing.tsx",
                                                lineNumber: 248,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$bloomryde_inter_state$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                className: "jsx-4398f64d97b6ffa9" + " " + "deal-btn",
                                                children: [
                                                    "Learn More",
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$bloomryde_inter_state$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                                        viewBox: "0 0 24 24",
                                                        fill: "none",
                                                        stroke: "currentColor",
                                                        strokeWidth: "2",
                                                        className: "jsx-4398f64d97b6ffa9",
                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$bloomryde_inter_state$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                            d: "m9 18 6-6-6-6",
                                                            className: "jsx-4398f64d97b6ffa9"
                                                        }, void 0, false, {
                                                            fileName: "[project]/Documents/GitHub/bloomryde_inter_state/src/components/intertravel-landing.tsx",
                                                            lineNumber: 258,
                                                            columnNumber: 21
                                                        }, this)
                                                    }, void 0, false, {
                                                        fileName: "[project]/Documents/GitHub/bloomryde_inter_state/src/components/intertravel-landing.tsx",
                                                        lineNumber: 252,
                                                        columnNumber: 19
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/Documents/GitHub/bloomryde_inter_state/src/components/intertravel-landing.tsx",
                                                lineNumber: 250,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/Documents/GitHub/bloomryde_inter_state/src/components/intertravel-landing.tsx",
                                        lineNumber: 244,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, deal.id, true, {
                                fileName: "[project]/Documents/GitHub/bloomryde_inter_state/src/components/intertravel-landing.tsx",
                                lineNumber: 236,
                                columnNumber: 13
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/Documents/GitHub/bloomryde_inter_state/src/components/intertravel-landing.tsx",
                        lineNumber: 234,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/Documents/GitHub/bloomryde_inter_state/src/components/intertravel-landing.tsx",
                lineNumber: 225,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$bloomryde_inter_state$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                className: "jsx-4398f64d97b6ffa9" + " " + "airlines-section",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$bloomryde_inter_state$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "jsx-4398f64d97b6ffa9" + " " + "section-header",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$bloomryde_inter_state$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                className: "jsx-4398f64d97b6ffa9" + " " + "section-title",
                                children: "MOST POPULAR AIRLINES"
                            }, void 0, false, {
                                fileName: "[project]/Documents/GitHub/bloomryde_inter_state/src/components/intertravel-landing.tsx",
                                lineNumber: 270,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$bloomryde_inter_state$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "jsx-4398f64d97b6ffa9" + " " + "section-subtitle",
                                children: "The world's leading airlines offer top-notch service, ensuring memorable travel experiences for passengers."
                            }, void 0, false, {
                                fileName: "[project]/Documents/GitHub/bloomryde_inter_state/src/components/intertravel-landing.tsx",
                                lineNumber: 271,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Documents/GitHub/bloomryde_inter_state/src/components/intertravel-landing.tsx",
                        lineNumber: 269,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$bloomryde_inter_state$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "jsx-4398f64d97b6ffa9" + " " + "airlines-carousel",
                        children: airlines.map((airline, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$bloomryde_inter_state$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    animationDelay: `${index * 0.15}s`
                                },
                                className: "jsx-4398f64d97b6ffa9" + " " + "airline-card",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$bloomryde_inter_state$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "jsx-4398f64d97b6ffa9" + " " + "airline-image-container",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$bloomryde_inter_state$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                            src: airline.image,
                                            alt: airline.name,
                                            className: "jsx-4398f64d97b6ffa9" + " " + "airline-image"
                                        }, void 0, false, {
                                            fileName: "[project]/Documents/GitHub/bloomryde_inter_state/src/components/intertravel-landing.tsx",
                                            lineNumber: 285,
                                            columnNumber: 17
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/Documents/GitHub/bloomryde_inter_state/src/components/intertravel-landing.tsx",
                                        lineNumber: 284,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$bloomryde_inter_state$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "jsx-4398f64d97b6ffa9" + " " + "airline-name-badge",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$bloomryde_inter_state$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "jsx-4398f64d97b6ffa9",
                                            children: airline.name
                                        }, void 0, false, {
                                            fileName: "[project]/Documents/GitHub/bloomryde_inter_state/src/components/intertravel-landing.tsx",
                                            lineNumber: 292,
                                            columnNumber: 17
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/Documents/GitHub/bloomryde_inter_state/src/components/intertravel-landing.tsx",
                                        lineNumber: 291,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$bloomryde_inter_state$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        className: "jsx-4398f64d97b6ffa9" + " " + "airline-arrow-btn",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$bloomryde_inter_state$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                            viewBox: "0 0 24 24",
                                            fill: "none",
                                            stroke: "currentColor",
                                            strokeWidth: "2",
                                            className: "jsx-4398f64d97b6ffa9",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$bloomryde_inter_state$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                d: "m9 18 6-6-6-6",
                                                className: "jsx-4398f64d97b6ffa9"
                                            }, void 0, false, {
                                                fileName: "[project]/Documents/GitHub/bloomryde_inter_state/src/components/intertravel-landing.tsx",
                                                lineNumber: 301,
                                                columnNumber: 19
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/Documents/GitHub/bloomryde_inter_state/src/components/intertravel-landing.tsx",
                                            lineNumber: 295,
                                            columnNumber: 17
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/Documents/GitHub/bloomryde_inter_state/src/components/intertravel-landing.tsx",
                                        lineNumber: 294,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, index, true, {
                                fileName: "[project]/Documents/GitHub/bloomryde_inter_state/src/components/intertravel-landing.tsx",
                                lineNumber: 279,
                                columnNumber: 13
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/Documents/GitHub/bloomryde_inter_state/src/components/intertravel-landing.tsx",
                        lineNumber: 277,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/Documents/GitHub/bloomryde_inter_state/src/components/intertravel-landing.tsx",
                lineNumber: 268,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$bloomryde_inter_state$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$bloomryde_inter_state$2f$node_modules$2f$styled$2d$jsx$2f$style$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                id: "4398f64d97b6ffa9",
                children: '.landing-page.jsx-4398f64d97b6ffa9{background:linear-gradient(135deg,#e8f4f8 0%,#f0f8fb 50%,#e0f2f7 100%);min-height:100vh;font-family:DM Sans,-apple-system,BlinkMacSystemFont,Segoe UI,sans-serif}.navbar.jsx-4398f64d97b6ffa9{-webkit-backdrop-filter:blur(10px);backdrop-filter:blur(10px);z-index:1000;background:#fffffff2;padding:20px 0;position:fixed;top:0;left:0;right:0;box-shadow:0 2px 20px #0000000d}.nav-container.jsx-4398f64d97b6ffa9{justify-content:space-between;align-items:center;max-width:1400px;margin:0 auto;padding:0 40px;display:flex}.logo.jsx-4398f64d97b6ffa9{color:#1a1a1a;letter-spacing:-.5px;font-size:22px;font-weight:700}.nav-links.jsx-4398f64d97b6ffa9{gap:40px;display:flex}.nav-link.jsx-4398f64d97b6ffa9{color:#666;font-size:15px;font-weight:500;text-decoration:none;transition:color .3s;position:relative}.nav-link.active.jsx-4398f64d97b6ffa9{color:#1a1a1a}.nav-link.active.jsx-4398f64d97b6ffa9:after{content:"";background:#1a1a1a;height:2px;position:absolute;bottom:-8px;left:0;right:0}.nav-link.jsx-4398f64d97b6ffa9:hover{color:#1a1a1a}.sign-in-btn.jsx-4398f64d97b6ffa9{color:#fff;cursor:pointer;background:#1a1a1a;border:none;border-radius:30px;padding:12px 32px;font-size:14px;font-weight:600;transition:all .3s}.sign-in-btn.jsx-4398f64d97b6ffa9:hover{transform:translateY(-2px);box-shadow:0 8px 20px #0003}.hero-section.jsx-4398f64d97b6ffa9{max-width:1400px;margin:0 auto;padding:140px 40px 80px;position:relative}.hero-content.jsx-4398f64d97b6ffa9{text-align:center;margin-bottom:60px;position:relative}.hero-subtitle.jsx-4398f64d97b6ffa9{letter-spacing:3px;color:#666;margin-bottom:20px;font-size:13px;font-weight:600;animation:.8s fadeInDown}.hero-title.jsx-4398f64d97b6ffa9{color:#1a1a1a;letter-spacing:-2px;margin-bottom:40px;font-size:max(36px,min(6vw,72px));font-weight:900;line-height:1.1;animation:.8s .2s backwards fadeInUp}.plane-container.jsx-4398f64d97b6ffa9{justify-content:center;align-items:center;height:300px;margin:60px 0;animation:1s .4s backwards fadeIn;display:flex;position:relative}.plane.jsx-4398f64d97b6ffa9{filter:drop-shadow(0 20px 40px #64b4dc4d);width:500px;height:140px;animation:6s ease-in-out infinite planeFloat;position:relative}@keyframes planeFloat{0%,to{transform:translateY(0)translate(0)rotate(-2deg)}50%{transform:translateY(-20px)translate(10px)rotate(1deg)}}.plane-body.jsx-4398f64d97b6ffa9{background:linear-gradient(135deg,#f5f5f5 0%,#e0e0e0 100%);border-radius:50px 50px 20px 20px;width:360px;height:80px;position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);box-shadow:inset 0 -10px 20px #0000001a,0 10px 30px #00000026}.plane-body.jsx-4398f64d97b6ffa9:before{content:"";background:linear-gradient(#64b4dc66,#0000);border-radius:10px;height:25px;position:absolute;top:10px;left:60px;right:60px}.plane-wing-left.jsx-4398f64d97b6ffa9,.plane-wing-right.jsx-4398f64d97b6ffa9{background:linear-gradient(135deg,#d5d5d5 0%,silver 100%);border-radius:100px 10px 10px 100px;width:200px;height:60px;position:absolute;top:50%;box-shadow:0 8px 20px #0003}.plane-wing-left.jsx-4398f64d97b6ffa9{transform-origin:100%;left:0;transform:translateY(-50%)rotate(-5deg)}.plane-wing-right.jsx-4398f64d97b6ffa9{transform-origin:0;right:0;transform:translateY(-50%)rotate(5deg)scaleX(-1)}.plane-tail.jsx-4398f64d97b6ffa9{background:linear-gradient(135deg,#e0e0e0 0%,#c5c5c5 100%);border-radius:10px 10px 40px;width:80px;height:60px;position:absolute;top:0;right:10px;transform:translateY(-30px);box-shadow:0 5px 15px #00000026}.plane-engine.jsx-4398f64d97b6ffa9{background:radial-gradient(circle,#4a4a4a 30%,#2a2a2a 100%);border-radius:50%;width:50px;height:50px;position:absolute;bottom:-10px;box-shadow:inset 0 5px 10px #00000080,0 5px 15px #0000004d}.engine-left.jsx-4398f64d97b6ffa9{left:100px}.engine-right.jsx-4398f64d97b6ffa9{right:100px}.plane-engine.jsx-4398f64d97b6ffa9:after{content:"";background:radial-gradient(circle,#6a6a6a 0%,#3a3a3a 100%);border-radius:50%;position:absolute;inset:8px}.booking-form-card.jsx-4398f64d97b6ffa9{background:#fff;border-radius:20px;max-width:900px;margin:0 auto;padding:40px;animation:1s .6s backwards fadeInUp;position:relative;box-shadow:0 20px 60px #0000001a}.trip-type-tabs.jsx-4398f64d97b6ffa9{border-bottom:1px solid #f0f0f0;gap:12px;margin-bottom:30px;padding-bottom:16px;display:flex}.trip-tab.jsx-4398f64d97b6ffa9{color:#666;cursor:pointer;background:0 0;border:none;border-radius:20px;padding:10px 24px;font-size:14px;font-weight:500;transition:all .3s}.trip-tab.active.jsx-4398f64d97b6ffa9{color:#fff;background:#64b4dc}.form-grid.jsx-4398f64d97b6ffa9{grid-template-columns:repeat(4,1fr);gap:20px;margin-bottom:20px;display:grid}.form-field.jsx-4398f64d97b6ffa9{flex-direction:column;gap:8px;display:flex}.field-label.jsx-4398f64d97b6ffa9{color:#999;text-transform:uppercase;letter-spacing:1px;font-size:12px;font-weight:600}.field-input.jsx-4398f64d97b6ffa9{color:#1a1a1a;border:1px solid #e0e0e0;border-radius:10px;padding:14px 16px;font-size:14px;font-weight:500;transition:all .3s}.field-input.jsx-4398f64d97b6ffa9:focus{border-color:#64b4dc;outline:none;box-shadow:0 0 0 3px #64b4dc1a}.search-btn.jsx-4398f64d97b6ffa9{cursor:pointer;background:#64b4dc;border:none;border-radius:50%;justify-content:center;align-items:center;width:60px;height:60px;transition:all .3s;display:flex;position:absolute;bottom:30px;right:40px;box-shadow:0 8px 20px #64b4dc4d}.search-btn.jsx-4398f64d97b6ffa9:hover{transform:scale(1.1);box-shadow:0 12px 30px #64b4dc66}.search-btn.jsx-4398f64d97b6ffa9 svg.jsx-4398f64d97b6ffa9{color:#fff;width:24px;height:24px}.deals-section.jsx-4398f64d97b6ffa9,.airlines-section.jsx-4398f64d97b6ffa9,.hotels-section.jsx-4398f64d97b6ffa9{max-width:1400px;margin:0 auto;padding:80px 40px}.section-header.jsx-4398f64d97b6ffa9{text-align:center;margin-bottom:60px}.section-title.jsx-4398f64d97b6ffa9{color:#1a1a1a;letter-spacing:-1px;margin-bottom:16px;font-size:max(32px,min(4vw,48px));font-weight:900}.section-subtitle.jsx-4398f64d97b6ffa9{color:#666;max-width:600px;margin:0 auto;font-size:16px;line-height:1.6}.deals-grid.jsx-4398f64d97b6ffa9{grid-template-columns:1.5fr 1fr 1fr;gap:24px;display:grid}.deal-card.jsx-4398f64d97b6ffa9{background:#fff;border-radius:20px;transition:all .4s;animation:.6s backwards fadeInUp;overflow:hidden;box-shadow:0 10px 40px #00000014}.deal-card.jsx-4398f64d97b6ffa9:hover{transform:translateY(-8px);box-shadow:0 20px 60px #0000001f}.deal-card-wide.jsx-4398f64d97b6ffa9{grid-row:span 1}.deal-image-container.jsx-4398f64d97b6ffa9{width:100%;height:240px;position:relative;overflow:hidden}.deal-image.jsx-4398f64d97b6ffa9{object-fit:cover;width:100%;height:100%;transition:transform .6s}.deal-card.jsx-4398f64d97b6ffa9:hover .deal-image.jsx-4398f64d97b6ffa9{transform:scale(1.1)}.deal-content.jsx-4398f64d97b6ffa9{padding:24px}.deal-category.jsx-4398f64d97b6ffa9{color:#64b4dc;letter-spacing:1.5px;text-transform:uppercase;font-size:11px;font-weight:700}.deal-title.jsx-4398f64d97b6ffa9{color:#1a1a1a;margin:12px 0;font-size:20px;font-weight:800;line-height:1.3}.deal-description.jsx-4398f64d97b6ffa9{color:#666;margin-bottom:16px;font-size:14px;line-height:1.6}.deal-btn.jsx-4398f64d97b6ffa9{color:#fff;cursor:pointer;background:#64b4dc;border:none;border-radius:20px;align-items:center;gap:8px;padding:10px 20px;font-size:13px;font-weight:600;transition:all .3s;display:inline-flex}.deal-btn.jsx-4398f64d97b6ffa9:hover{background:#5aa5cc;transform:translate(4px)}.deal-btn.jsx-4398f64d97b6ffa9 svg.jsx-4398f64d97b6ffa9{width:16px;height:16px}.airlines-carousel.jsx-4398f64d97b6ffa9{grid-template-columns:repeat(4,1fr);gap:24px;display:grid}.airline-card.jsx-4398f64d97b6ffa9{background:#fff;border-radius:20px;transition:all .4s;animation:.6s backwards fadeInUp;position:relative;overflow:hidden;box-shadow:0 10px 40px #00000014}.airline-card.jsx-4398f64d97b6ffa9:hover{transform:translateY(-8px);box-shadow:0 20px 60px #0000001f}.airline-image-container.jsx-4398f64d97b6ffa9{width:100%;height:220px;overflow:hidden}.airline-image.jsx-4398f64d97b6ffa9{object-fit:cover;width:100%;height:100%;transition:transform .6s}.airline-card.jsx-4398f64d97b6ffa9:hover .airline-image.jsx-4398f64d97b6ffa9{transform:scale(1.1)}.airline-name-badge.jsx-4398f64d97b6ffa9{-webkit-backdrop-filter:blur(10px);backdrop-filter:blur(10px);color:#fff;letter-spacing:.5px;background:#000c;border-radius:10px;padding:12px 16px;font-size:14px;font-weight:700;position:absolute;bottom:60px;left:20px;right:20px}.airline-arrow-btn.jsx-4398f64d97b6ffa9{cursor:pointer;background:#64b4dc;border:none;border-radius:50%;justify-content:center;align-items:center;width:44px;height:44px;transition:all .3s;display:flex;position:absolute;bottom:20px;right:20px}.airline-arrow-btn.jsx-4398f64d97b6ffa9:hover{background:#5aa5cc;transform:scale(1.1)}.airline-arrow-btn.jsx-4398f64d97b6ffa9 svg.jsx-4398f64d97b6ffa9{color:#fff;width:20px;height:20px}.hotels-grid.jsx-4398f64d97b6ffa9{grid-template-columns:repeat(3,1fr);gap:24px;display:grid}.hotel-card.jsx-4398f64d97b6ffa9{background:#fff;border-radius:20px;transition:all .4s;animation:.6s backwards fadeInUp;overflow:hidden;box-shadow:0 10px 40px #00000014}.hotel-card.jsx-4398f64d97b6ffa9:hover{transform:translateY(-8px);box-shadow:0 20px 60px #0000001f}.hotel-image-container.jsx-4398f64d97b6ffa9{width:100%;height:280px;position:relative;overflow:hidden}.hotel-image.jsx-4398f64d97b6ffa9{object-fit:cover;width:100%;height:100%;transition:transform .6s}.hotel-card.jsx-4398f64d97b6ffa9:hover .hotel-image.jsx-4398f64d97b6ffa9{transform:scale(1.1)}.favorite-btn.jsx-4398f64d97b6ffa9{-webkit-backdrop-filter:blur(10px);backdrop-filter:blur(10px);cursor:pointer;background:#ffffffe6;border:none;border-radius:50%;justify-content:center;align-items:center;width:44px;height:44px;transition:all .3s;display:flex;position:absolute;top:16px;right:16px}.favorite-btn.jsx-4398f64d97b6ffa9:hover{background:#fff;transform:scale(1.1)}.favorite-btn.jsx-4398f64d97b6ffa9 svg.jsx-4398f64d97b6ffa9{color:#ff4757;width:20px;height:20px}.hotel-info.jsx-4398f64d97b6ffa9{padding:24px}.hotel-name.jsx-4398f64d97b6ffa9{color:#1a1a1a;margin-bottom:8px;font-size:18px;font-weight:800}.hotel-location.jsx-4398f64d97b6ffa9{color:#666;margin-bottom:20px;font-size:14px}.book-now-btn.jsx-4398f64d97b6ffa9{color:#fff;cursor:pointer;background:#1a1a1a;border:none;border-radius:30px;width:100%;padding:14px;font-size:14px;font-weight:600;transition:all .3s}.book-now-btn.jsx-4398f64d97b6ffa9:hover{background:#2a2a2a;transform:translateY(-2px);box-shadow:0 8px 20px #0003}@keyframes fadeIn{0%{opacity:0}to{opacity:1}}@keyframes fadeInDown{0%{opacity:0;transform:translateY(-20px)}to{opacity:1;transform:translateY(0)}}@keyframes fadeInUp{0%{opacity:0;transform:translateY(30px)}to{opacity:1;transform:translateY(0)}}@media (width<=1024px){.deals-grid.jsx-4398f64d97b6ffa9,.airlines-carousel.jsx-4398f64d97b6ffa9,.hotels-grid.jsx-4398f64d97b6ffa9,.form-grid.jsx-4398f64d97b6ffa9{grid-template-columns:repeat(2,1fr)}}@media (width<=640px){.nav-links.jsx-4398f64d97b6ffa9{display:none}.deals-grid.jsx-4398f64d97b6ffa9,.airlines-carousel.jsx-4398f64d97b6ffa9,.hotels-grid.jsx-4398f64d97b6ffa9,.form-grid.jsx-4398f64d97b6ffa9{grid-template-columns:1fr}.plane.jsx-4398f64d97b6ffa9{width:300px;height:80px}.booking-form-card.jsx-4398f64d97b6ffa9{padding:24px}.search-btn.jsx-4398f64d97b6ffa9{border-radius:30px;width:100%;margin-top:20px;position:static}}'
            }, void 0, false, void 0, this)
        ]
    }, void 0, true, {
        fileName: "[project]/Documents/GitHub/bloomryde_inter_state/src/components/intertravel-landing.tsx",
        lineNumber: 92,
        columnNumber: 5
    }, this);
}
}),
"[project]/Documents/GitHub/bloomryde_inter_state/src/components/experience-section.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>WhyTravelWithUs
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$bloomryde_inter_state$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/GitHub/bloomryde_inter_state/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$bloomryde_inter_state$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$shield$2d$check$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__ShieldCheck$3e$__ = __turbopack_context__.i("[project]/Documents/GitHub/bloomryde_inter_state/node_modules/lucide-react/dist/esm/icons/shield-check.js [app-ssr] (ecmascript) <export default as ShieldCheck>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$bloomryde_inter_state$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$headphones$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Headphones$3e$__ = __turbopack_context__.i("[project]/Documents/GitHub/bloomryde_inter_state/node_modules/lucide-react/dist/esm/icons/headphones.js [app-ssr] (ecmascript) <export default as Headphones>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$bloomryde_inter_state$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$credit$2d$card$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__CreditCard$3e$__ = __turbopack_context__.i("[project]/Documents/GitHub/bloomryde_inter_state/node_modules/lucide-react/dist/esm/icons/credit-card.js [app-ssr] (ecmascript) <export default as CreditCard>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$bloomryde_inter_state$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$map$2d$pinned$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__MapPinned$3e$__ = __turbopack_context__.i("[project]/Documents/GitHub/bloomryde_inter_state/node_modules/lucide-react/dist/esm/icons/map-pinned.js [app-ssr] (ecmascript) <export default as MapPinned>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$bloomryde_inter_state$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$zap$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Zap$3e$__ = __turbopack_context__.i("[project]/Documents/GitHub/bloomryde_inter_state/node_modules/lucide-react/dist/esm/icons/zap.js [app-ssr] (ecmascript) <export default as Zap>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$bloomryde_inter_state$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$award$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Award$3e$__ = __turbopack_context__.i("[project]/Documents/GitHub/bloomryde_inter_state/node_modules/lucide-react/dist/esm/icons/award.js [app-ssr] (ecmascript) <export default as Award>");
"use client";
;
;
const features = [
    {
        id: 1,
        icon: __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$bloomryde_inter_state$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$shield$2d$check$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__ShieldCheck$3e$__["ShieldCheck"],
        title: "Safety First",
        description: "Every vehicle undergoes 150-point inspection. Real-time GPS tracking for complete peace of mind.",
        highlight: "150+"
    },
    {
        id: 2,
        icon: __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$bloomryde_inter_state$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$headphones$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Headphones$3e$__["Headphones"],
        title: "24/7 Concierge",
        description: "Dedicated support team available round the clock. Average response time under 2 minutes.",
        highlight: "2min"
    },
    {
        id: 3,
        icon: __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$bloomryde_inter_state$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$credit$2d$card$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__CreditCard$3e$__["CreditCard"],
        title: "Transparent Pricing",
        description: "No surge pricing, no hidden fees. Lock in your fare at booking with our price guarantee.",
        highlight: "0%"
    },
    {
        id: 4,
        icon: __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$bloomryde_inter_state$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$map$2d$pinned$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__MapPinned$3e$__["MapPinned"],
        title: "Nationwide Coverage",
        description: "Connecting 200+ cities across the country. New routes added every month.",
        highlight: "200+"
    },
    {
        id: 5,
        icon: __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$bloomryde_inter_state$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$zap$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Zap$3e$__["Zap"],
        title: "Instant Booking",
        description: "Book your seat in under 60 seconds. Receive instant confirmation and e-tickets.",
        highlight: "60s"
    },
    {
        id: 6,
        icon: __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$bloomryde_inter_state$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$award$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Award$3e$__["Award"],
        title: "Premium Experience",
        description: "Complimentary WiFi, refreshments, and extra legroom on every journey.",
        highlight: "5★"
    }
];
function WhyTravelWithUs() {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$bloomryde_inter_state$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
        className: "relative py-24 overflow-hidden",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$bloomryde_inter_state$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "absolute inset-0 bg-white"
            }, void 0, false, {
                fileName: "[project]/Documents/GitHub/bloomryde_inter_state/src/components/experience-section.tsx",
                lineNumber: 75,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$bloomryde_inter_state$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "absolute inset-0 opacity-[0.02]",
                style: {
                    backgroundImage: `linear-gradient(#5BC0EB 1px, transparent 1px), linear-gradient(90deg, #5BC0EB 1px, transparent 1px)`,
                    backgroundSize: "60px 60px"
                }
            }, void 0, false, {
                fileName: "[project]/Documents/GitHub/bloomryde_inter_state/src/components/experience-section.tsx",
                lineNumber: 78,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$bloomryde_inter_state$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "absolute -top-40 -right-40 w-[500px] h-[500px] bg-gradient-to-br from-[#5BC0EB]/[0.08] to-[#5BC0EB]/[0.05] rounded-full blur-3xl"
            }, void 0, false, {
                fileName: "[project]/Documents/GitHub/bloomryde_inter_state/src/components/experience-section.tsx",
                lineNumber: 87,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$bloomryde_inter_state$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "absolute -bottom-40 -left-40 w-[400px] h-[400px] bg-gradient-to-tr from-[#5BC0EB]/[0.06] to-transparent rounded-full blur-3xl"
            }, void 0, false, {
                fileName: "[project]/Documents/GitHub/bloomryde_inter_state/src/components/experience-section.tsx",
                lineNumber: 88,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$bloomryde_inter_state$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "relative z-10 max-w-7xl mx-auto px-6 lg:px-8",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$bloomryde_inter_state$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "max-w-2xl mb-20",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$bloomryde_inter_state$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center gap-3 mb-6",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$bloomryde_inter_state$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "h-px w-12 bg-[#5BC0EB]"
                                    }, void 0, false, {
                                        fileName: "[project]/Documents/GitHub/bloomryde_inter_state/src/components/experience-section.tsx",
                                        lineNumber: 94,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$bloomryde_inter_state$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-[#5BC0EB] font-semibold text-sm tracking-wide uppercase",
                                        children: "Why InterTravel"
                                    }, void 0, false, {
                                        fileName: "[project]/Documents/GitHub/bloomryde_inter_state/src/components/experience-section.tsx",
                                        lineNumber: 95,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Documents/GitHub/bloomryde_inter_state/src/components/experience-section.tsx",
                                lineNumber: 93,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$bloomryde_inter_state$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                className: "text-4xl lg:text-5xl font-bold text-slate-900 leading-tight mb-6",
                                children: [
                                    "Travel should be",
                                    " ",
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$bloomryde_inter_state$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "relative",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$bloomryde_inter_state$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "relative z-10",
                                                children: "effortless"
                                            }, void 0, false, {
                                                fileName: "[project]/Documents/GitHub/bloomryde_inter_state/src/components/experience-section.tsx",
                                                lineNumber: 102,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$bloomryde_inter_state$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "absolute bottom-2 left-0 w-full h-3 bg-[#5BC0EB]/20 -z-0"
                                            }, void 0, false, {
                                                fileName: "[project]/Documents/GitHub/bloomryde_inter_state/src/components/experience-section.tsx",
                                                lineNumber: 103,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/Documents/GitHub/bloomryde_inter_state/src/components/experience-section.tsx",
                                        lineNumber: 101,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Documents/GitHub/bloomryde_inter_state/src/components/experience-section.tsx",
                                lineNumber: 99,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$bloomryde_inter_state$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-lg text-slate-500 leading-relaxed",
                                children: "We've reimagined interstate travel from the ground up. Every detail is designed around your comfort and convenience."
                            }, void 0, false, {
                                fileName: "[project]/Documents/GitHub/bloomryde_inter_state/src/components/experience-section.tsx",
                                lineNumber: 106,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Documents/GitHub/bloomryde_inter_state/src/components/experience-section.tsx",
                        lineNumber: 92,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$bloomryde_inter_state$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "grid md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12",
                        children: features.map((feature)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$bloomryde_inter_state$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "group relative",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$bloomryde_inter_state$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "relative h-full p-8 bg-white border border-slate-100 rounded-2xl transition-all duration-500 hover:border-[#5BC0EB]/20 hover:shadow-2xl hover:shadow-[#5BC0EB]/10",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$bloomryde_inter_state$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "absolute -top-4 right-8 px-3 py-1 bg-[#5BC0EB] rounded-full",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$bloomryde_inter_state$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "text-white text-xs font-bold tracking-wide",
                                                children: feature.highlight
                                            }, void 0, false, {
                                                fileName: "[project]/Documents/GitHub/bloomryde_inter_state/src/components/experience-section.tsx",
                                                lineNumber: 120,
                                                columnNumber: 19
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/Documents/GitHub/bloomryde_inter_state/src/components/experience-section.tsx",
                                            lineNumber: 119,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$bloomryde_inter_state$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "mb-6",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$bloomryde_inter_state$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "inline-flex items-center justify-center w-14 h-14 bg-gradient-to-br from-[#5BC0EB]/10 to-slate-50 border border-[#5BC0EB]/20 rounded-xl transition-all duration-500 group-hover:from-[#5BC0EB] group-hover:to-[#47a8d9] group-hover:border-[#5BC0EB] group-hover:scale-105",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$bloomryde_inter_state$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(feature.icon, {
                                                    className: "w-6 h-6 text-[#5BC0EB] transition-colors duration-500 group-hover:text-white",
                                                    strokeWidth: 1.5
                                                }, void 0, false, {
                                                    fileName: "[project]/Documents/GitHub/bloomryde_inter_state/src/components/experience-section.tsx",
                                                    lineNumber: 128,
                                                    columnNumber: 21
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/Documents/GitHub/bloomryde_inter_state/src/components/experience-section.tsx",
                                                lineNumber: 127,
                                                columnNumber: 19
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/Documents/GitHub/bloomryde_inter_state/src/components/experience-section.tsx",
                                            lineNumber: 126,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$bloomryde_inter_state$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                            className: "text-xl font-semibold text-slate-900 mb-3",
                                            children: feature.title
                                        }, void 0, false, {
                                            fileName: "[project]/Documents/GitHub/bloomryde_inter_state/src/components/experience-section.tsx",
                                            lineNumber: 136,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$bloomryde_inter_state$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "text-slate-500 leading-relaxed text-[15px]",
                                            children: feature.description
                                        }, void 0, false, {
                                            fileName: "[project]/Documents/GitHub/bloomryde_inter_state/src/components/experience-section.tsx",
                                            lineNumber: 139,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$bloomryde_inter_state$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "mt-6 flex items-center gap-2 text-[#5BC0EB] opacity-0 -translate-x-2 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$bloomryde_inter_state$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "text-sm font-medium",
                                                    children: "Learn more"
                                                }, void 0, false, {
                                                    fileName: "[project]/Documents/GitHub/bloomryde_inter_state/src/components/experience-section.tsx",
                                                    lineNumber: 145,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$bloomryde_inter_state$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                                    className: "w-4 h-4",
                                                    fill: "none",
                                                    viewBox: "0 0 24 24",
                                                    stroke: "currentColor",
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$bloomryde_inter_state$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                        strokeLinecap: "round",
                                                        strokeLinejoin: "round",
                                                        strokeWidth: 2,
                                                        d: "M17 8l4 4m0 0l-4 4m4-4H3"
                                                    }, void 0, false, {
                                                        fileName: "[project]/Documents/GitHub/bloomryde_inter_state/src/components/experience-section.tsx",
                                                        lineNumber: 152,
                                                        columnNumber: 21
                                                    }, this)
                                                }, void 0, false, {
                                                    fileName: "[project]/Documents/GitHub/bloomryde_inter_state/src/components/experience-section.tsx",
                                                    lineNumber: 146,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/Documents/GitHub/bloomryde_inter_state/src/components/experience-section.tsx",
                                            lineNumber: 144,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/Documents/GitHub/bloomryde_inter_state/src/components/experience-section.tsx",
                                    lineNumber: 117,
                                    columnNumber: 15
                                }, this)
                            }, feature.id, false, {
                                fileName: "[project]/Documents/GitHub/bloomryde_inter_state/src/components/experience-section.tsx",
                                lineNumber: 115,
                                columnNumber: 13
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/Documents/GitHub/bloomryde_inter_state/src/components/experience-section.tsx",
                        lineNumber: 113,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$bloomryde_inter_state$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "mt-20 flex flex-col sm:flex-row items-center justify-center gap-6 pt-12 border-t border-slate-100",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$bloomryde_inter_state$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-slate-500",
                                children: "Ready to experience the difference?"
                            }, void 0, false, {
                                fileName: "[project]/Documents/GitHub/bloomryde_inter_state/src/components/experience-section.tsx",
                                lineNumber: 167,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$bloomryde_inter_state$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                className: "group inline-flex items-center gap-3 px-8 py-4 bg-[#5BC0EB] hover:bg-[#47a8d9] text-white font-semibold rounded-full transition-all duration-300 shadow-lg shadow-[#5BC0EB]/25 hover:shadow-xl hover:shadow-[#5BC0EB]/30",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$bloomryde_inter_state$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        children: "Start Your Journey"
                                    }, void 0, false, {
                                        fileName: "[project]/Documents/GitHub/bloomryde_inter_state/src/components/experience-section.tsx",
                                        lineNumber: 169,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$bloomryde_inter_state$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                        className: "w-5 h-5 transition-transform duration-300 group-hover:translate-x-1",
                                        fill: "none",
                                        viewBox: "0 0 24 24",
                                        stroke: "currentColor",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$bloomryde_inter_state$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                            strokeLinecap: "round",
                                            strokeLinejoin: "round",
                                            strokeWidth: 2,
                                            d: "M17 8l4 4m0 0l-4 4m4-4H3"
                                        }, void 0, false, {
                                            fileName: "[project]/Documents/GitHub/bloomryde_inter_state/src/components/experience-section.tsx",
                                            lineNumber: 176,
                                            columnNumber: 15
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/Documents/GitHub/bloomryde_inter_state/src/components/experience-section.tsx",
                                        lineNumber: 170,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Documents/GitHub/bloomryde_inter_state/src/components/experience-section.tsx",
                                lineNumber: 168,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Documents/GitHub/bloomryde_inter_state/src/components/experience-section.tsx",
                        lineNumber: 166,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/Documents/GitHub/bloomryde_inter_state/src/components/experience-section.tsx",
                lineNumber: 90,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/Documents/GitHub/bloomryde_inter_state/src/components/experience-section.tsx",
        lineNumber: 73,
        columnNumber: 5
    }, this);
} // import React from "react";
 // import { ShieldCheck, Globe, Clock, Award, ArrowRight } from "lucide-react";
 // const features = [
 //   {
 //     title: "Curated Excellence",
 //     description:
 //       "Every destination and coach is hand-vetted by our experts to ensure it meets our strict 5-star hospitality standards.",
 //     icon: <Award className="w-6 h-6" />,
 //   },
 //   {
 //     title: "Seamless Logistics",
 //     description:
 //       "From private transfers to priority boarding, we handle the intricacies so you can focus on the journey.",
 //     icon: <Globe className="w-6 h-6" />,
 //   },
 //   {
 //     title: "24/7 Support",
 //     description:
 //       "Real-time assistance from a dedicated travel specialist who knows your itinerary as well as you do.",
 //     icon: <Clock className="w-6 h-6" />,
 //   },
 //   {
 //     title: "Secure & Private",
 //     description:
 //       "Advanced encryption for your bookings and a commitment to discretion for every journey you take.",
 //     icon: <ShieldCheck className="w-6 h-6" />,
 //   },
 // ];
 // const WhyTravelWithUs = () => {
 //   return (
 //     <section className="relative bg-[#0a0a0b] py-24 px-8 lg:px-16 overflow-hidden">
 //       {/* Subtle Blue Glow to match brand */}
 //       <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-600/10 blur-[120px] rounded-full -mr-64 -mt-64" />
 //       <div className="relative z-10 max-w-6xl mx-auto">
 //         {/* Header Section */}
 //         <div className="max-w-3xl mb-16">
 //           <h2 className="text-blue-500 font-medium tracking-[0.2em] uppercase text-xs mb-4">
 //             The InterTravel Experience
 //           </h2>
 //           <h3 className="text-4xl md:text-5xl text-white font-serif italic leading-tight">
 //             Why discerning travelers <br />
 //             <span className="text-white/60">choose our network.</span>
 //           </h3>
 //         </div>
 //         {/* Grid Layout - Modern Glass Style */}
 //         <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-white/10 border border-white/10 rounded-3xl overflow-hidden">
 //           {features.map((feature, index) => (
 //             <div
 //               key={index}
 //               className="group p-10 bg-[#0f0f11] hover:bg-white/[0.02] transition-all duration-500"
 //             >
 //               <div className="w-12 h-12 rounded-xl bg-blue-600/10 flex items-center justify-center text-blue-500 mb-8 group-hover:bg-blue-600 group-hover:text-white transition-all duration-500">
 //                 {feature.icon}
 //               </div>
 //               <h4 className="text-xl font-semibold text-white mb-4">
 //                 {feature.title}
 //               </h4>
 //               <p className="text-white/50 leading-relaxed mb-6 group-hover:text-white/70 transition-colors">
 //                 {feature.description}
 //               </p>
 //               <button className="flex items-center gap-2 text-sm font-medium text-blue-500 opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300">
 //                 Explore details <ArrowRight className="w-4 h-4" />
 //               </button>
 //             </div>
 //           ))}
 //         </div>
 //         {/* Brand Bottom Note */}
 //         <div className="mt-16 flex flex-col md:flex-row items-center justify-between gap-8 border-t border-white/5 pt-12">
 //           <p className="text-white/40 text-sm max-w-md">
 //             Joining over 50,000+ monthly travelers who trust InterTravel for
 //             their premium transit needs across the globe.
 //           </p>
 //           <button className="px-8 py-4 bg-white text-black rounded-full font-medium hover:bg-blue-500 hover:text-white transition-all duration-300">
 //             Book Your Next Trip
 //           </button>
 //         </div>
 //       </div>
 //     </section>
 //   );
 // };
 // export default WhyTravelWithUs;
}),
"[project]/Documents/GitHub/bloomryde_inter_state/node_modules/next/dist/compiled/client-only/index.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {

}),
"[project]/Documents/GitHub/bloomryde_inter_state/node_modules/styled-jsx/dist/index/index.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {

__turbopack_context__.r("[project]/Documents/GitHub/bloomryde_inter_state/node_modules/next/dist/compiled/client-only/index.js [app-ssr] (ecmascript)");
var React = __turbopack_context__.r("[project]/Documents/GitHub/bloomryde_inter_state/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
function _interopDefaultLegacy(e) {
    return e && typeof e === 'object' && 'default' in e ? e : {
        'default': e
    };
}
var React__default = /*#__PURE__*/ _interopDefaultLegacy(React);
/*
Based on Glamor's sheet
https://github.com/threepointone/glamor/blob/667b480d31b3721a905021b26e1290ce92ca2879/src/sheet.js
*/ function _defineProperties(target, props) {
    for(var i = 0; i < props.length; i++){
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor) descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
    }
}
function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties(Constructor, staticProps);
    return Constructor;
}
var isProd = typeof process !== "undefined" && process.env && ("TURBOPACK compile-time value", "development") === "production";
var isString = function(o) {
    return Object.prototype.toString.call(o) === "[object String]";
};
var StyleSheet = /*#__PURE__*/ function() {
    function StyleSheet(param) {
        var ref = param === void 0 ? {} : param, _name = ref.name, name = _name === void 0 ? "stylesheet" : _name, _optimizeForSpeed = ref.optimizeForSpeed, optimizeForSpeed = _optimizeForSpeed === void 0 ? isProd : _optimizeForSpeed;
        invariant$1(isString(name), "`name` must be a string");
        this._name = name;
        this._deletedRulePlaceholder = "#" + name + "-deleted-rule____{}";
        invariant$1(typeof optimizeForSpeed === "boolean", "`optimizeForSpeed` must be a boolean");
        this._optimizeForSpeed = optimizeForSpeed;
        this._serverSheet = undefined;
        this._tags = [];
        this._injected = false;
        this._rulesCount = 0;
        var node = ("TURBOPACK compile-time value", "undefined") !== "undefined" && document.querySelector('meta[property="csp-nonce"]');
        this._nonce = ("TURBOPACK compile-time falsy", 0) ? "TURBOPACK unreachable" : null;
    }
    var _proto = StyleSheet.prototype;
    _proto.setOptimizeForSpeed = function setOptimizeForSpeed(bool) {
        invariant$1(typeof bool === "boolean", "`setOptimizeForSpeed` accepts a boolean");
        invariant$1(this._rulesCount === 0, "optimizeForSpeed cannot be when rules have already been inserted");
        this.flush();
        this._optimizeForSpeed = bool;
        this.inject();
    };
    _proto.isOptimizeForSpeed = function isOptimizeForSpeed() {
        return this._optimizeForSpeed;
    };
    _proto.inject = function inject() {
        var _this = this;
        invariant$1(!this._injected, "sheet already injected");
        this._injected = true;
        if (("TURBOPACK compile-time value", "undefined") !== "undefined" && this._optimizeForSpeed) //TURBOPACK unreachable
        ;
        this._serverSheet = {
            cssRules: [],
            insertRule: function(rule, index) {
                if (typeof index === "number") {
                    _this._serverSheet.cssRules[index] = {
                        cssText: rule
                    };
                } else {
                    _this._serverSheet.cssRules.push({
                        cssText: rule
                    });
                }
                return index;
            },
            deleteRule: function(index) {
                _this._serverSheet.cssRules[index] = null;
            }
        };
    };
    _proto.getSheetForTag = function getSheetForTag(tag) {
        if (tag.sheet) {
            return tag.sheet;
        }
        // this weirdness brought to you by firefox
        for(var i = 0; i < document.styleSheets.length; i++){
            if (document.styleSheets[i].ownerNode === tag) {
                return document.styleSheets[i];
            }
        }
    };
    _proto.getSheet = function getSheet() {
        return this.getSheetForTag(this._tags[this._tags.length - 1]);
    };
    _proto.insertRule = function insertRule(rule, index) {
        invariant$1(isString(rule), "`insertRule` accepts only strings");
        if ("TURBOPACK compile-time truthy", 1) {
            if (typeof index !== "number") {
                index = this._serverSheet.cssRules.length;
            }
            this._serverSheet.insertRule(rule, index);
            return this._rulesCount++;
        }
        //TURBOPACK unreachable
        ;
        var sheet;
        var insertionPoint;
    };
    _proto.replaceRule = function replaceRule(index, rule) {
        if (this._optimizeForSpeed || ("TURBOPACK compile-time value", "undefined") === "undefined") {
            var sheet = ("TURBOPACK compile-time falsy", 0) ? "TURBOPACK unreachable" : this._serverSheet;
            if (!rule.trim()) {
                rule = this._deletedRulePlaceholder;
            }
            if (!sheet.cssRules[index]) {
                // @TBD Should we throw an error?
                return index;
            }
            sheet.deleteRule(index);
            try {
                sheet.insertRule(rule, index);
            } catch (error) {
                if ("TURBOPACK compile-time truthy", 1) {
                    console.warn("StyleSheet: illegal rule: \n\n" + rule + "\n\nSee https://stackoverflow.com/q/20007992 for more info");
                }
                // In order to preserve the indices we insert a deleteRulePlaceholder
                sheet.insertRule(this._deletedRulePlaceholder, index);
            }
        } else //TURBOPACK unreachable
        {
            var tag;
        }
        return index;
    };
    _proto.deleteRule = function deleteRule(index) {
        if ("TURBOPACK compile-time truthy", 1) {
            this._serverSheet.deleteRule(index);
            return;
        }
        //TURBOPACK unreachable
        ;
        var tag;
    };
    _proto.flush = function flush() {
        this._injected = false;
        this._rulesCount = 0;
        if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
        ;
        else {
            // simpler on server
            this._serverSheet.cssRules = [];
        }
    };
    _proto.cssRules = function cssRules() {
        var _this = this;
        if ("TURBOPACK compile-time truthy", 1) {
            return this._serverSheet.cssRules;
        }
        //TURBOPACK unreachable
        ;
    };
    _proto.makeStyleTag = function makeStyleTag(name, cssString, relativeToTag) {
        if (cssString) {
            invariant$1(isString(cssString), "makeStyleTag accepts only strings as second parameter");
        }
        var tag = document.createElement("style");
        if (this._nonce) tag.setAttribute("nonce", this._nonce);
        tag.type = "text/css";
        tag.setAttribute("data-" + name, "");
        if (cssString) {
            tag.appendChild(document.createTextNode(cssString));
        }
        var head = document.head || document.getElementsByTagName("head")[0];
        if (relativeToTag) {
            head.insertBefore(tag, relativeToTag);
        } else {
            head.appendChild(tag);
        }
        return tag;
    };
    _createClass(StyleSheet, [
        {
            key: "length",
            get: function get() {
                return this._rulesCount;
            }
        }
    ]);
    return StyleSheet;
}();
function invariant$1(condition, message) {
    if (!condition) {
        throw new Error("StyleSheet: " + message + ".");
    }
}
function hash(str) {
    var _$hash = 5381, i = str.length;
    while(i){
        _$hash = _$hash * 33 ^ str.charCodeAt(--i);
    }
    /* JavaScript does bitwise operations (like XOR, above) on 32-bit signed
   * integers. Since we want the results to be always positive, convert the
   * signed int to an unsigned by doing an unsigned bitshift. */ return _$hash >>> 0;
}
var stringHash = hash;
var sanitize = function(rule) {
    return rule.replace(/\/style/gi, "\\/style");
};
var cache = {};
/**
 * computeId
 *
 * Compute and memoize a jsx id from a basedId and optionally props.
 */ function computeId(baseId, props) {
    if (!props) {
        return "jsx-" + baseId;
    }
    var propsToString = String(props);
    var key = baseId + propsToString;
    if (!cache[key]) {
        cache[key] = "jsx-" + stringHash(baseId + "-" + propsToString);
    }
    return cache[key];
}
/**
 * computeSelector
 *
 * Compute and memoize dynamic selectors.
 */ function computeSelector(id, css) {
    var selectoPlaceholderRegexp = /__jsx-style-dynamic-selector/g;
    // Sanitize SSR-ed CSS.
    // Client side code doesn't need to be sanitized since we use
    // document.createTextNode (dev) and the CSSOM api sheet.insertRule (prod).
    if ("TURBOPACK compile-time truthy", 1) {
        css = sanitize(css);
    }
    var idcss = id + css;
    if (!cache[idcss]) {
        cache[idcss] = css.replace(selectoPlaceholderRegexp, id);
    }
    return cache[idcss];
}
function mapRulesToStyle(cssRules, options) {
    if (options === void 0) options = {};
    return cssRules.map(function(args) {
        var id = args[0];
        var css = args[1];
        return /*#__PURE__*/ React__default["default"].createElement("style", {
            id: "__" + id,
            // Avoid warnings upon render with a key
            key: "__" + id,
            nonce: options.nonce ? options.nonce : undefined,
            dangerouslySetInnerHTML: {
                __html: css
            }
        });
    });
}
var StyleSheetRegistry = /*#__PURE__*/ function() {
    function StyleSheetRegistry(param) {
        var ref = param === void 0 ? {} : param, _styleSheet = ref.styleSheet, styleSheet = _styleSheet === void 0 ? null : _styleSheet, _optimizeForSpeed = ref.optimizeForSpeed, optimizeForSpeed = _optimizeForSpeed === void 0 ? false : _optimizeForSpeed;
        this._sheet = styleSheet || new StyleSheet({
            name: "styled-jsx",
            optimizeForSpeed: optimizeForSpeed
        });
        this._sheet.inject();
        if (styleSheet && typeof optimizeForSpeed === "boolean") {
            this._sheet.setOptimizeForSpeed(optimizeForSpeed);
            this._optimizeForSpeed = this._sheet.isOptimizeForSpeed();
        }
        this._fromServer = undefined;
        this._indices = {};
        this._instancesCounts = {};
    }
    var _proto = StyleSheetRegistry.prototype;
    _proto.add = function add(props) {
        var _this = this;
        if (undefined === this._optimizeForSpeed) {
            this._optimizeForSpeed = Array.isArray(props.children);
            this._sheet.setOptimizeForSpeed(this._optimizeForSpeed);
            this._optimizeForSpeed = this._sheet.isOptimizeForSpeed();
        }
        if (("TURBOPACK compile-time value", "undefined") !== "undefined" && !this._fromServer) //TURBOPACK unreachable
        ;
        var ref = this.getIdAndRules(props), styleId = ref.styleId, rules = ref.rules;
        // Deduping: just increase the instances count.
        if (styleId in this._instancesCounts) {
            this._instancesCounts[styleId] += 1;
            return;
        }
        var indices = rules.map(function(rule) {
            return _this._sheet.insertRule(rule);
        }) // Filter out invalid rules
        .filter(function(index) {
            return index !== -1;
        });
        this._indices[styleId] = indices;
        this._instancesCounts[styleId] = 1;
    };
    _proto.remove = function remove(props) {
        var _this = this;
        var styleId = this.getIdAndRules(props).styleId;
        invariant(styleId in this._instancesCounts, "styleId: `" + styleId + "` not found");
        this._instancesCounts[styleId] -= 1;
        if (this._instancesCounts[styleId] < 1) {
            var tagFromServer = this._fromServer && this._fromServer[styleId];
            if (tagFromServer) {
                tagFromServer.parentNode.removeChild(tagFromServer);
                delete this._fromServer[styleId];
            } else {
                this._indices[styleId].forEach(function(index) {
                    return _this._sheet.deleteRule(index);
                });
                delete this._indices[styleId];
            }
            delete this._instancesCounts[styleId];
        }
    };
    _proto.update = function update(props, nextProps) {
        this.add(nextProps);
        this.remove(props);
    };
    _proto.flush = function flush() {
        this._sheet.flush();
        this._sheet.inject();
        this._fromServer = undefined;
        this._indices = {};
        this._instancesCounts = {};
    };
    _proto.cssRules = function cssRules() {
        var _this = this;
        var fromServer = this._fromServer ? Object.keys(this._fromServer).map(function(styleId) {
            return [
                styleId,
                _this._fromServer[styleId]
            ];
        }) : [];
        var cssRules = this._sheet.cssRules();
        return fromServer.concat(Object.keys(this._indices).map(function(styleId) {
            return [
                styleId,
                _this._indices[styleId].map(function(index) {
                    return cssRules[index].cssText;
                }).join(_this._optimizeForSpeed ? "" : "\n")
            ];
        }) // filter out empty rules
        .filter(function(rule) {
            return Boolean(rule[1]);
        }));
    };
    _proto.styles = function styles(options) {
        return mapRulesToStyle(this.cssRules(), options);
    };
    _proto.getIdAndRules = function getIdAndRules(props) {
        var css = props.children, dynamic = props.dynamic, id = props.id;
        if (dynamic) {
            var styleId = computeId(id, dynamic);
            return {
                styleId: styleId,
                rules: Array.isArray(css) ? css.map(function(rule) {
                    return computeSelector(styleId, rule);
                }) : [
                    computeSelector(styleId, css)
                ]
            };
        }
        return {
            styleId: computeId(id),
            rules: Array.isArray(css) ? css : [
                css
            ]
        };
    };
    /**
   * selectFromServer
   *
   * Collects style tags from the document with id __jsx-XXX
   */ _proto.selectFromServer = function selectFromServer() {
        var elements = Array.prototype.slice.call(document.querySelectorAll('[id^="__jsx-"]'));
        return elements.reduce(function(acc, element) {
            var id = element.id.slice(2);
            acc[id] = element;
            return acc;
        }, {});
    };
    return StyleSheetRegistry;
}();
function invariant(condition, message) {
    if (!condition) {
        throw new Error("StyleSheetRegistry: " + message + ".");
    }
}
var StyleSheetContext = /*#__PURE__*/ React.createContext(null);
StyleSheetContext.displayName = "StyleSheetContext";
function createStyleRegistry() {
    return new StyleSheetRegistry();
}
function StyleRegistry(param) {
    var configuredRegistry = param.registry, children = param.children;
    var rootRegistry = React.useContext(StyleSheetContext);
    var ref = React.useState(function() {
        return rootRegistry || configuredRegistry || createStyleRegistry();
    }), registry = ref[0];
    return /*#__PURE__*/ React__default["default"].createElement(StyleSheetContext.Provider, {
        value: registry
    }, children);
}
function useStyleRegistry() {
    return React.useContext(StyleSheetContext);
}
// Opt-into the new `useInsertionEffect` API in React 18, fallback to `useLayoutEffect`.
// https://github.com/reactwg/react-18/discussions/110
var useInsertionEffect = React__default["default"].useInsertionEffect || React__default["default"].useLayoutEffect;
var defaultRegistry = ("TURBOPACK compile-time falsy", 0) ? "TURBOPACK unreachable" : undefined;
function JSXStyle(props) {
    var registry = ("TURBOPACK compile-time falsy", 0) ? "TURBOPACK unreachable" : useStyleRegistry();
    // If `registry` does not exist, we do nothing here.
    if (!registry) {
        return null;
    }
    if ("TURBOPACK compile-time truthy", 1) {
        registry.add(props);
        return null;
    }
    //TURBOPACK unreachable
    ;
}
JSXStyle.dynamic = function(info) {
    return info.map(function(tagInfo) {
        var baseId = tagInfo[0];
        var props = tagInfo[1];
        return computeId(baseId, props);
    }).join(" ");
};
exports.StyleRegistry = StyleRegistry;
exports.createStyleRegistry = createStyleRegistry;
exports.style = JSXStyle;
exports.useStyleRegistry = useStyleRegistry;
}),
"[project]/Documents/GitHub/bloomryde_inter_state/node_modules/styled-jsx/style.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {

module.exports = __turbopack_context__.r("[project]/Documents/GitHub/bloomryde_inter_state/node_modules/styled-jsx/dist/index/index.js [app-ssr] (ecmascript)").style;
}),
"[project]/Documents/GitHub/bloomryde_inter_state/node_modules/lucide-react/dist/esm/icons/shield-check.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "__iconNode",
    ()=>__iconNode,
    "default",
    ()=>ShieldCheck
]);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$bloomryde_inter_state$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/GitHub/bloomryde_inter_state/node_modules/lucide-react/dist/esm/createLucideIcon.js [app-ssr] (ecmascript)");
;
const __iconNode = [
    [
        "path",
        {
            d: "M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z",
            key: "oel41y"
        }
    ],
    [
        "path",
        {
            d: "m9 12 2 2 4-4",
            key: "dzmm74"
        }
    ]
];
const ShieldCheck = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$bloomryde_inter_state$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"])("shield-check", __iconNode);
;
 //# sourceMappingURL=shield-check.js.map
}),
"[project]/Documents/GitHub/bloomryde_inter_state/node_modules/lucide-react/dist/esm/icons/shield-check.js [app-ssr] (ecmascript) <export default as ShieldCheck>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ShieldCheck",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$bloomryde_inter_state$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$shield$2d$check$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$bloomryde_inter_state$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$shield$2d$check$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/GitHub/bloomryde_inter_state/node_modules/lucide-react/dist/esm/icons/shield-check.js [app-ssr] (ecmascript)");
}),
"[project]/Documents/GitHub/bloomryde_inter_state/node_modules/lucide-react/dist/esm/icons/headphones.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "__iconNode",
    ()=>__iconNode,
    "default",
    ()=>Headphones
]);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$bloomryde_inter_state$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/GitHub/bloomryde_inter_state/node_modules/lucide-react/dist/esm/createLucideIcon.js [app-ssr] (ecmascript)");
;
const __iconNode = [
    [
        "path",
        {
            d: "M3 14h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-7a9 9 0 0 1 18 0v7a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3",
            key: "1xhozi"
        }
    ]
];
const Headphones = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$bloomryde_inter_state$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"])("headphones", __iconNode);
;
 //# sourceMappingURL=headphones.js.map
}),
"[project]/Documents/GitHub/bloomryde_inter_state/node_modules/lucide-react/dist/esm/icons/headphones.js [app-ssr] (ecmascript) <export default as Headphones>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Headphones",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$bloomryde_inter_state$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$headphones$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$bloomryde_inter_state$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$headphones$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/GitHub/bloomryde_inter_state/node_modules/lucide-react/dist/esm/icons/headphones.js [app-ssr] (ecmascript)");
}),
"[project]/Documents/GitHub/bloomryde_inter_state/node_modules/lucide-react/dist/esm/icons/credit-card.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "__iconNode",
    ()=>__iconNode,
    "default",
    ()=>CreditCard
]);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$bloomryde_inter_state$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/GitHub/bloomryde_inter_state/node_modules/lucide-react/dist/esm/createLucideIcon.js [app-ssr] (ecmascript)");
;
const __iconNode = [
    [
        "rect",
        {
            width: "20",
            height: "14",
            x: "2",
            y: "5",
            rx: "2",
            key: "ynyp8z"
        }
    ],
    [
        "line",
        {
            x1: "2",
            x2: "22",
            y1: "10",
            y2: "10",
            key: "1b3vmo"
        }
    ]
];
const CreditCard = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$bloomryde_inter_state$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"])("credit-card", __iconNode);
;
 //# sourceMappingURL=credit-card.js.map
}),
"[project]/Documents/GitHub/bloomryde_inter_state/node_modules/lucide-react/dist/esm/icons/credit-card.js [app-ssr] (ecmascript) <export default as CreditCard>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "CreditCard",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$bloomryde_inter_state$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$credit$2d$card$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$bloomryde_inter_state$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$credit$2d$card$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/GitHub/bloomryde_inter_state/node_modules/lucide-react/dist/esm/icons/credit-card.js [app-ssr] (ecmascript)");
}),
"[project]/Documents/GitHub/bloomryde_inter_state/node_modules/lucide-react/dist/esm/icons/map-pinned.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "__iconNode",
    ()=>__iconNode,
    "default",
    ()=>MapPinned
]);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$bloomryde_inter_state$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/GitHub/bloomryde_inter_state/node_modules/lucide-react/dist/esm/createLucideIcon.js [app-ssr] (ecmascript)");
;
const __iconNode = [
    [
        "path",
        {
            d: "M18 8c0 3.613-3.869 7.429-5.393 8.795a1 1 0 0 1-1.214 0C9.87 15.429 6 11.613 6 8a6 6 0 0 1 12 0",
            key: "11u0oz"
        }
    ],
    [
        "circle",
        {
            cx: "12",
            cy: "8",
            r: "2",
            key: "1822b1"
        }
    ],
    [
        "path",
        {
            d: "M8.714 14h-3.71a1 1 0 0 0-.948.683l-2.004 6A1 1 0 0 0 3 22h18a1 1 0 0 0 .948-1.316l-2-6a1 1 0 0 0-.949-.684h-3.712",
            key: "q8zwxj"
        }
    ]
];
const MapPinned = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$bloomryde_inter_state$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"])("map-pinned", __iconNode);
;
 //# sourceMappingURL=map-pinned.js.map
}),
"[project]/Documents/GitHub/bloomryde_inter_state/node_modules/lucide-react/dist/esm/icons/map-pinned.js [app-ssr] (ecmascript) <export default as MapPinned>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "MapPinned",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$bloomryde_inter_state$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$map$2d$pinned$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$bloomryde_inter_state$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$map$2d$pinned$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/GitHub/bloomryde_inter_state/node_modules/lucide-react/dist/esm/icons/map-pinned.js [app-ssr] (ecmascript)");
}),
"[project]/Documents/GitHub/bloomryde_inter_state/node_modules/lucide-react/dist/esm/icons/zap.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "__iconNode",
    ()=>__iconNode,
    "default",
    ()=>Zap
]);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$bloomryde_inter_state$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/GitHub/bloomryde_inter_state/node_modules/lucide-react/dist/esm/createLucideIcon.js [app-ssr] (ecmascript)");
;
const __iconNode = [
    [
        "path",
        {
            d: "M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z",
            key: "1xq2db"
        }
    ]
];
const Zap = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$bloomryde_inter_state$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"])("zap", __iconNode);
;
 //# sourceMappingURL=zap.js.map
}),
"[project]/Documents/GitHub/bloomryde_inter_state/node_modules/lucide-react/dist/esm/icons/zap.js [app-ssr] (ecmascript) <export default as Zap>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Zap",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$bloomryde_inter_state$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$zap$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$bloomryde_inter_state$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$zap$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/GitHub/bloomryde_inter_state/node_modules/lucide-react/dist/esm/icons/zap.js [app-ssr] (ecmascript)");
}),
"[project]/Documents/GitHub/bloomryde_inter_state/node_modules/lucide-react/dist/esm/icons/award.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "__iconNode",
    ()=>__iconNode,
    "default",
    ()=>Award
]);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$bloomryde_inter_state$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/GitHub/bloomryde_inter_state/node_modules/lucide-react/dist/esm/createLucideIcon.js [app-ssr] (ecmascript)");
;
const __iconNode = [
    [
        "path",
        {
            d: "m15.477 12.89 1.515 8.526a.5.5 0 0 1-.81.47l-3.58-2.687a1 1 0 0 0-1.197 0l-3.586 2.686a.5.5 0 0 1-.81-.469l1.514-8.526",
            key: "1yiouv"
        }
    ],
    [
        "circle",
        {
            cx: "12",
            cy: "8",
            r: "6",
            key: "1vp47v"
        }
    ]
];
const Award = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$bloomryde_inter_state$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"])("award", __iconNode);
;
 //# sourceMappingURL=award.js.map
}),
"[project]/Documents/GitHub/bloomryde_inter_state/node_modules/lucide-react/dist/esm/icons/award.js [app-ssr] (ecmascript) <export default as Award>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Award",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$bloomryde_inter_state$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$award$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$bloomryde_inter_state$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$award$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/GitHub/bloomryde_inter_state/node_modules/lucide-react/dist/esm/icons/award.js [app-ssr] (ecmascript)");
}),
];

//# sourceMappingURL=Documents_GitHub_bloomryde_inter_state_63be433d._.js.map