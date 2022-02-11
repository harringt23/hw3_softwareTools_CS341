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

// update the post function 
router.post('/', function(req, res) {
    // create a new ID
    var id = Math.floor(Math.random() * Math.floor(100));

    // initialize date as January, 25 
    var month = 'Jan';
    var day = 25;

    // extract the necessary information
    var quantity = req.body.quantity;
    var topping = req.body.topping;
    var notes = req.body.notes;
 
    // ensure the notes have a value
    if(notes == null) {
         notes = " ";
    }
 
    // insert the order values
    dbms.dbquery("INSERT INTO ORDERS VALUES ('" + id + "','" + month + "','" + day + "','" + quantity + "','" + topping + "','" + notes + "');", callBack);
    
    // error handling
    function callBack(error, result) {
        return;
    }
 });