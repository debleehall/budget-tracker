//create variable to hold db connection
let db;

//establish a connection to IndexedDB database called 'budget-tracker' and set it to version 1
const request = indexedDB.open("budget-tracker", 2);

// this event will emit if the database version changes (nonexistant to version 1, v1 to v2)
request.onupgradeneeded = function (event) {
    // save a reference to the database
    const db = event.target.result;
    // create an object store (table) called 'transaction', set it to have an auto incrementing primary key of sorts
    db.createObjectStore("transactions", { autoIncrement: true });
};

// successful connection
request.onsuccess = function (event) {
    // when db is successfully created with its object store (from onupgradedneeded event above) or simply established a connection, save reference to db in global variable
    db = event.target.result;

    // check if app is online, if yes run uploadPizza() function to send all local db data to api
    if (navigator.onLine) {
        uploadTransactions();
    }
};

request.onerror = function (event) {
    //log error
    console.log(event.target.errorCode);
};

function saveRecord(record) {
    //open a new transaction with database with read and write permissions
    const transaction = db.transaction(["transactions"], "readwrite");

    //access the object store for 'transactions'
    const transactionObjectStore = transaction.objectStore("transactions");

    //add record to store using add method
    transactionObjectStore.add(record);
    console.log("Transaction saved locally:", record);
    alert("Application is offline. Storing data locally.");
}

function uploadTransactions() {
    console.log("uploading all locally saved transactions!");
    //open a transaction on your db
    const transaction = db.transaction(["transactions"], "readwrite");

    //access the object store
    const transactionObjectStore = transaction.objectStore("transactions");

    //get all records from store and set to a variable
    const getAll = transactionObjectStore.getAll();

    //upon a seccessful .getAll() execution
    getAll.onsuccess = function () {
        //if there was data in db
        if (getAll.result.length > 0) {
            fetch("/api/transaction", {
                method: "POST",
                body: JSON.stringify(getAll.result),
                headers: {
                    Accept: "application/json, text/plain, */*",
                    "Content-Type": "application/json",
                },
            })
                .then((response) => {
                    return response.json();
                })
                .then((serverResonse) => {
                    if (serverResonse.message) {
                        throw new Error(serverResponse);
                    }
                    // open one more transaction
                    const transaction = db.transaction(["transactions"], "readwrite");

                    //access the object store
                    const transactionObjectStore =
                        transaction.objectStore("transactions");

                    //get all records from store and set to a variable
                    const getAll = transactionObjectStore.clear();

                    alert("All saved transactions has been submitted");
                })
                .catch((err) => {
                    console.log(err);
                });
        }
    };
}

window.addEventListener("online", uploadTransactions);