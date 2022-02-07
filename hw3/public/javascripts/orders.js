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
        {"zer" : {"topping" : "cherry", "quantity" : 2}},
        {"one" : {"topping" : "plain", "quantity" : 6}},
        {"two" : {"topping" : "chocolate", "quantity" : 3}},
    ]};

/* GET orders listing. */
router.get('/', function(req, res, next) {
    res.json(orderArray);
});

router.post('/', function(req, res, next) {
    res.json(orderArray);
});

module.exports = router;