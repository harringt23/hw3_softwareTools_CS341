/* Brynn Harrington
    CS 341A 
    Dr. Tribelhorn
    Homework #4
    Used: https://www.w3schools.com/js/js_json_intro.asp
*/

// per the users route example 
var express = require('express');
var router = express.Router();

// initialize the order array with the example data
var orderArray = 
    {"data" : [
        {"cher" : {"topping" : "cherry", "quantity" : 2}},
        {"choc" : {"topping" : "plain", "quantity" : 6}},
        {"pla" : {"topping" : "chocolate", "quantity" : 3}},
    ]};

// get orders listing 
router.get('/', function(req, res, next) {
    res.json(orderArray);
});

// post the order array
router.post('/', function(req, res, next) {
    res.json(orderArray);
});

// export the module's router
module.exports = router;