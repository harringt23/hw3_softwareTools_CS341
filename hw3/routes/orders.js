/* HW4 Addition 
 * Brynn Harrington
 * 
 * Handles the request for the new orders route
 * Returns a JSON object.In particular, it should 
 * be an array of objects. Each object in the array 
 * should have two properties: topping and quantity.
 */

var express = require('express');
var router = express.Router();
var orderArray = 
    {"data" : [
        {"cherry" : {"topping" : "cherry", "quantity" : 11}},
        {"chocolate" : {"topping" : "chocolate", "quantity" : 17}},
        {"plain" : {"topping" : "plain", "quantity" : 31}},
    ]};

/* GET orders listing. */
router.get('/', function(req, res, next) {
    res.json(orderArray);
});

router.post('/', function(req, res, next) {
    res.json(orderArray);
});

module.exports = router;