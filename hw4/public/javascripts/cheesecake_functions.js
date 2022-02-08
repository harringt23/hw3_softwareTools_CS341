/***
 * Brynn Harrington
 * CS 341A 
 * Dr. Tribelhorn
 * Homework #4
 * This CSS file acts as a style sheet for a cheesecake order form website 
 * to increase the aesthetic of the website.
 *
 * NOTES
 * learned the javascript from the following website/tutorial: 
 *  https://www.w3schools.com/js/default.asp
 *
 ***/

// handler to help with the tasks needed to use the submit event
submitHandler = function (e) {
    var notesText = document.getElementById('notes').value;
    var veg = 'vegan';

    // checking to see if notes contain the word "vegan"
    if (notesText.indexOf(veg) != -1) {
        alert("Warning, these cheesecakes contain dairy. Do you still want to order?"); // alerts if word is found
    }
    // otherwise submit the entries and hide the elements no longer needing to be used
    else {
        $("#table").hide();
        $("#notes").hide();
        $("#notesText").hide();
        $("#order").hide();

        var topping = $("input[name='topping']:checked").val();
        var quantity = $('#quantity :selected').text();
        var thankyou = "<h3>Thank you! Your order has been placed</h3>";

        var toppingsAlert = "<p>Topping: " + topping + "</p>"
        var quantityAlert = "<p>Quantity: " + quantity + "</p>"
        var notesAlert = "<p>Notes: " + notesText + "</p>"

        // alert the users of what they ordered
        alert("Thank you! Your order has been placed. Here are the details:"
            + "\nQuantity: " + quantity
            + "\nTopping: " + topping
            + "\nNotes: " + notesText);

        $("body").append(thankyou, toppingsAlert, quantityAlert, notesAlert);
    }
    e.preventDefault();
}

// handler for each month
monthHandler = function () {
    var monthText = $(this).text();
    $("#monthText").html(monthText);

    // $.post('http://localhost:3000/orders', monthText, function () {
    //     $('#orderListCherry').text(data[0].quantity + " " + orderArray.data[0].topping);
    //     $('#orderListPlain').text(data[1].quantity + " " + orderArray.data[1].topping);
    //     $('#orderListChocolate').text(data[2].quantity + " " + orderArray.data[2].topping);
    // });
    $.post('\orders', function(orderArray) {
        $("#cherryOrders").hide();
        $("#chocolateOrders").hide();
        $("#orderList2").hide();
        var newCherryOrders = "<li>" + orderArray.data[0].cher.quantity + " " + orderArray.data[0].cher.topping + "</li>";
        var newChocolateOrders = "<li>" + orderArray.data[1].choc.quantity + " " + orderArray.data[1].choc.topping + "</li>";
        var newPlainOrders = "<li>" + orderArray.data[2].pla.quantity + " " + orderArray.data[2].pla.topping + "</li>";
        $("#orderList").append(newCherryOrders, newChocolateOrders, newPlainOrders);
    });
    alert("success"); // TESTING
}

// read in and handle the events from the main document
$(document).ready(function () {
    // call submit on the form
    $("form").on("submit", submitHandler);

    // call month handler on selected month
    // var buttonText = $(this).text();
    // $("#month").html(buttonText);

    $(".monthClick").click(function () {
        let month = $(this).text();
        $(".monthDropdown").text(month);
        $.post('http://localhost:3000/orders', month, function (data) {
            // update orders page to match returned object 
            $('#cherryOrders').text(data[0].quantity + " " + data[0].topping);
            $('#plainOrders').text(data[1].quantity + " " + data[1].topping);
            $('#chocolateOrders').text(data[2].quantity + " " + data[2].topping);
        });
    });

    // alert("success");
    // let month = $(this).text();
    // $(".monthDropdown").text(month);
    // $(month).click(monthHandler);
    // // $("#feb").click(monthHandler);
    // $("#mar").click(monthHandler);
    // $("#apr").click(monthHandler);
    // $("#may").click(monthHandler);
    // $("#jun").click(monthHandler);
    // $("#jul").click(monthHandler);
    // $("#aug").click(monthHandler);
    // $("#sep").click(monthHandler);
    // $("#oct").click(monthHandler);
    // $("#nov").click(monthHandler);
    // $("#dec").click(monthHandler);
});
