/**
 * dbms.js
 * Brynn Harrington
 * 
 * This file contains functions for the database management system including 
 * accessing the MySQL database which contains the Cheesecake order data. 
 */

exports.version = '0.0.1';

// require the MySQL and asynch
var cheesecakeSQL = require('mysql'),
    async = require('async');

// set the host the the public IP address
var host = "35.199.147.68";
var database = "CHEESECAKE";  //database name
var user = "student";         //username (change to match your db)
var password = "cheesecake";  //password (change to match your db, yes this is very poor practice)

/**
 * dbquery
 *
 * performs a given SQL query on the database and returns the results
 * to the caller
 *
 * @param query     the SQL query to perform (e.g., "SELECT * FROM ...")
 * @param callback  the callback function to call with two values
 *                   error - (or 'false' if none)
 *                   results - as given by the cheesecakeSQL client
 */
exports.dbquery = function (query_str, callback) {

    var dbclient;
    var results = null;

    async.waterfall([

        // Step 1: Connect to the database
        function (callback) {
            // log the attempted connection
            console.log("\n** creating connection.");

            // initialize database client with created connection
            dbclient = cheesecakeSQL.createConnection({
                host: host,
                user: user,
                password: password,
                database: database,
            });

            // connect the client
            dbclient.connect(callback);
        },

        // Step 2: Issue query
        function (results, callback) {
            // log the data is being retrieved 
            console.log("\n** retrieving data");

            // issue the query 
            dbclient.query(query_str, callback);
        },

        // Step 3: Collect results
        function (rows, fields, callback) {
            // log the data being collected
            console.log("\n** dumping data:");

            // set the results to the rows
            results = rows;

            // log the rows being read
            console.log("" + rows);

            // empty callback
            callback(null);
        }

    ],
        // waterfall cleanup function
        function (err, res) {
            // if an error print a message
            if (err) {
                console.log("Database query failed.");
                console.log(err);
                callback(err, null);
            }
            // otherwise, print successful query 
            else {
                console.log("Database query completed.");
                callback(false, results);
            }

            // close connection to database
            dbclient.end();

        });
}