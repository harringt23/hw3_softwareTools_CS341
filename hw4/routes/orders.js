/* Brynn Harrington
    CS 341A 
    Dr. Tribelhorn
    Homework #4
    Used: https://www.w3schools.com/js/js_json_intro.asp
*/

var express = require('express');
var router = express.Router();
var orderArray = 
    {"data" : [
        {"cher" : {"topping" : "cherry", "quantity" : 2}},
        {"choc" : {"topping" : "plain", "quantity" : 6}},
        {"pla" : {"topping" : "chocolate", "quantity" : 3}},
    ]};

/* GET orders listing. */
router.get('/', function(req, res, next) {
    res.json(orderArray);
});

router.post('/', function(req, res, next) {
    res.json(orderArray);
});

module.exports = router;