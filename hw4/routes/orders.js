/* Brynn Harrington
    CS 341A 
    Dr. Tribelhorn
    Homework #4
    Used: https://www.w3schools.com/js/js_json_intro.asp
*/
// from users.js
var express = require('express');
var router = express.Router();

router.post('/', function (req, res, next) {
    // verify entered
    console.log('called');

    // array of JSON objects for cheesecake toppings and quantity
    var data = [{
        topping: "cherry",
        quantity: "2"
    }, {
        topping: "plain",
        quantity: "6"
    }, {
        topping: "chocolate",
        quantity: "3"
    }];

    // convert data array to a string
    var stringData = JSON.stringify(data);

    // set headers for the responses
    res.setHeader('Content-Type', 'application/json; charset=utf-8');

    // send the responses
    res.send(stringData);
});

module.exports = router;