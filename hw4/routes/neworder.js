/* orders.js
 * Homework 5 
 * @author Brynn Harrington
 * Date Modified: 10 Feb 2022
 * 
 * Modify the way that the router 
 * posts so the order is processed correctly
 * 
 * Used: https://www.w3schools.com/js/js_json_intro.asp
 */

// require the express and get the router
var express = require('express');
var router = express.Router();

// require the database management system
var dbms = require('./dbms.js');

// initialize function to insert orders
function insert_order(orderid, month, day, quantity, topping, notes, callback) {
    dbms.dbquery("INSERT INTO ORDERS VALUES (" + orderid + ", \"" + month + "\", " + day + ", " + quantity + ", \"" + topping + "\", \"" + notes + "\");",
        function (error, results) {
            if (error == false) {
                console.log("[neworder.js] <insert_order> |  " + results);
            }
            // print the result to the server and return the error
            callback(error);
        }
    );
}

// have the router use this to call next function
router.use(function (req, res, next) {
    console.log("[orders.js] <router.use>    |  Redirecting router... ");
    next();
});

// update the post function 
// router.post('/', function(req, res) {
//     // create a new ID
//     var id = Math.floor(Math.random() * Math.floor(100));

//     // initialize date as January, 25 
//     var month = 'Jan';
//     var day = 25;

//     // extract the necessary information
//     var quantity = req.body.quantity;
//     var topping = req.body.topping;
//     var notes = req.body.notes;

//     // ensure the notes have a value
//     if(notes == null) {
//          notes = " ";
//     }

//     // insert the order values
//     dbms.dbquery("INSERT INTO ORDERS VALUES ('" + id + "','" + month + "','" + day + "','" + quantity + "','" + topping + "','" + notes + "');", callBack);

//     // error handling
//     function callBack(error, result) {
//         return;
//     }
//  });


router.post('/', function (req, res, next) {
    console.log("[neworder.js] <router.post> |  Retrieving request detail...");
    const orderid = (new Date().valueOf()) % 2147483646;
    console.log("[neworder.js] <router.post> |  ...orderid created...");
    const months = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];
    const month = months[Math.floor(Math.random() * 12)];
    console.log("[neworder.js] <router.post> |  ...month retrieved...");
    var day_set;
    if (month == "SEP" || month == "APR" || month == "JUN" || month == "NOV") {
        day_set = Math.floor(Math.random() * 29) + 1;
    } else if (month == "FEB") {
        day_set = Math.floor(Math.random() * 27) + 1;
    } else {
        day_set = Math.floor(Math.random() * 30) + 1;
    }
    const day = day_set;
    console.log("[neworder.js] <router.post> |  ...day retrieved...");
    const quantity = req.query.order.quantity;
    console.log("[neworder.js] <router.post> |  ...quantity retrieved...");
    const topping = ("" + req.query.order.topping).toUpperCase();
    console.log("[neworder.js] <router.post> |  ...topping retrieved...");
    const notes = req.query.order.notes;
    console.log("[neworder.js] <router.post> |  ...notes retrieved...");
    console.log("[neworder.js] <router.post> |  All elements properly retrieved");
    console.log("[neworder.js] <router.post> |  Formatting an INSERT operation for:");
    console.log("                            .      " + orderid + "\n                            .      ");
    console.log("                            .      " + month + "\n                            .      ");
    console.log("                            .      " + day + "\n                            .      ");
    console.log("                            .      " + quantity + "\n                            .      ");
    console.log("                            .      " + topping + "\n                            .      ");
    console.log("                            .      " + notes + "\n                            .      ");
    console.log("[neworder.js] <router.post> |  Sending INSERT request...");
    insert_order(orderid, month, day, quantity, topping, notes, function (error) {
        res.send(error);
    });
    // Enter callback hell
    // get_num_orders("CHERRY", month, function(total_cherry) {
    //     console.log("[neworder.js] <router.post> |  Returned number for cherry: " +total_cherry);
    //     get_num_orders("PLAIN", month, function(total_plain) {
    //         console.log("[neworder.js] <router.post> |  Returned number for plain: " +total_plain);
    //         get_num_orders("CHOCOLATE", month, function(total_chocolate) {
    //             console.log("[neworder.js] <router.post> |  Returned number for chocolate: " +total_chocolate);
    //             var response = {
    //                 "error":null,
    //                 "data":[
    //                         {"topping":"cherry", "quantity":total_cherry},
    //                         {"topping":"plain", "quantity":total_plain},
    //                         {"topping":"chocolate", "quantity":total_chocolate}
    //                     ]
    //             };
    //             console.log("[neworder.js] <router.post> |  Client response prepared:");
    //             console.log("                            .      " + JSON.stringify(response));
    //             res.json(response);
    //             console.log("[neworder.js] <router.post> |  JSON Response has been sent!");
    //         });
    //     });
    // });
});

module.exports = router;