/* orders.js
 * Homework 5 
 * @author Brynn Harrington
 * Date Modified: 10 Feb 2022
 * 
 * Create a new route to access the orders data for the 
 * given month from the database and return that data to 
 * the client.
 * 
 * Used: https://www.w3schools.com/js/js_json_intro.asp
 */

// require the express and get the router
var express = require('express');
var router = express.Router();

// require the database management system
var dbms = require('./dbms.js');

// create an initial order array
var orderArray = 
    {
        // set data to dummy variables
        data : [
            {topping : "cherry",    quantity : 2},
            {topping : "chocolate", quantity : 6},
            {topping : "plain",     quantity : 3},
        ]
    };

// create a new order object
var orderObj = 
    {
        // initialize error to null 
        error : null,

        // initialize the order object to default values of zero
        data : [
            {TOPPING : "cherry",    QUANTITY : 0},
            {TOPPING : "chocolate", QUANTITY : 0},
            {TOPPING : "plain",     QUANTITY : 0},
        ]
    };

/**** Topping Functions ****/
// cherry topping
function cherryFunction(error, results) {
    // set the objects values
    orderObj.data = results;
    orderObj.error = error;

    // log the data received for testing
    console.log(orderObj.data);

    // set the quantity to the cherry count
    orderArray.data[0].quantity = orderObj.data[0].count;
}

// chocolate topping
function chocolateFunction(error, results) {
    // set the objects values
    orderObj.data = results;
    orderObj.error = error;

    // log the data received for testing
    console.log(orderObj.data);

    // set the quantity to the chocolate count
    orderArray.data[1].quantity = orderObj.data[0].count;
}

// chocolate topping
function plainFunction(error, results) {
    // set the objects values
    orderObj.data = results;
    orderObj.error = error;

    // log the data received for testing
    console.log(orderObj.data);

    // set the quantity to the count
    orderArray.data[2].quantity = orderObj.data[0].count;
}

// // get orders listing 
// router.get('/', function(req, res, next) {
//     res.json(orderArray);
// }); 
//TODO - determine if needed

// post the order array
router.post('/', function(req, res, next) {
    // cherry data
    dbms.dbquery("SELECT SUM(QUANTITY) AS count FROM ORDERS WHERE MONTH='" + req.body.month + "' AND TOPPING='cherry';", function(error, results) {
        cherryFunction(error, results);

        // chocolate data
        dbms.dbquery("SELECT SUM(QUANTITY) AS count FROM ORDERS WHERE MONTH='" + req.body.month + "' AND TOPPING='chocolate';", function(error, results) {
            chocolateFunction(error, results);

            // plain data 
            dbms.dbquery("SELECT SUM(QUANTITY) AS count FROM ORDERS WHERE MONTH='" + req.body.month + "' AND TOPPING='plain';", function(error, results) {
                plainFunction(error, results);

                // put the response into the order array
                res.json(orderArray);
            });
        });
    });

    // TESTING 
    console.log(orderObj.data[0].count);
    console.log(req.body.month);
});

// export the module's router
module.exports = router;