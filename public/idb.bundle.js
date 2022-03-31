/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./public/js/idb.js":
/*!**************************!*\
  !*** ./public/js/idb.js ***!
  \**************************/
/***/ (() => {

eval("//create variable to hold db connection\nlet db;\n\n//establish a connection to IndexedDB database called 'budget-tracker' and set it to version 1\nconst request = indexedDB.open(\"budget-tracker\", 2);\n\n// this event will emit if the database version changes (nonexistant to version 1, v1 to v2)\nrequest.onupgradeneeded = function (event) {\n    // save a reference to the database\n    const db = event.target.result;\n    // create an object store (table) called 'transaction', set it to have an auto incrementing primary key of sorts\n    db.createObjectStore(\"transactions\", { autoIncrement: true });\n};\n\n// successful connection\nrequest.onsuccess = function (event) {\n    // when db is successfully created with its object store (from onupgradedneeded event above) or simply established a connection, save reference to db in global variable\n    db = event.target.result;\n\n    // check if app is online, if yes run uploadPizza() function to send all local db data to api\n    if (navigator.onLine) {\n        uploadTransactions();\n    }\n};\n\nrequest.onerror = function (event) {\n    //log error\n    console.log(event.target.errorCode);\n};\n\nfunction saveRecord(record) {\n    //open a new transaction with database with read and write permissions\n    const transaction = db.transaction([\"transactions\"], \"readwrite\");\n\n    //access the object store for 'transactions'\n    const transactionObjectStore = transaction.objectStore(\"transactions\");\n\n    //add record to store using add method\n    transactionObjectStore.add(record);\n    console.log(\"Transaction saved locally:\", record);\n    alert(\"Application is offline. Storing data locally.\");\n}\n\nfunction uploadTransactions() {\n    console.log(\"uploading all locally saved transactions!\");\n    //open a transaction on your db\n    const transaction = db.transaction([\"transactions\"], \"readwrite\");\n\n    //access the object store\n    const transactionObjectStore = transaction.objectStore(\"transactions\");\n\n    //get all records from store and set to a variable\n    const getAll = transactionObjectStore.getAll();\n\n    //upon a seccessful .getAll() execution\n    getAll.onsuccess = function () {\n        //if there was data in db\n        if (getAll.result.length > 0) {\n            fetch(\"/api/transaction\", {\n                method: \"POST\",\n                body: JSON.stringify(getAll.result),\n                headers: {\n                    Accept: \"application/json, text/plain, */*\",\n                    \"Content-Type\": \"application/json\",\n                },\n            })\n                .then((response) => {\n                    return response.json();\n                })\n                .then((serverResonse) => {\n                    if (serverResonse.message) {\n                        throw new Error(serverResponse);\n                    }\n                    // open one more transaction\n                    const transaction = db.transaction([\"transactions\"], \"readwrite\");\n\n                    //access the object store\n                    const transactionObjectStore =\n                        transaction.objectStore(\"transactions\");\n\n                    //get all records from store and set to a variable\n                    const getAll = transactionObjectStore.clear();\n\n                    alert(\"All saved transactions has been submitted\");\n                })\n                .catch((err) => {\n                    console.log(err);\n                });\n        }\n    };\n}\n\nwindow.addEventListener(\"online\", uploadTransactions);\n\n//# sourceURL=webpack://budget-tracker/./public/js/idb.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["./public/js/idb.js"]();
/******/ 	
/******/ })()
;