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
    var specialInstructions = document.getElementById('notes').value;
    var veg = 'vegan';

    // checking to see if notes contain the word "vegan"
    if (specialInstructions.indexOf(veg) != -1) {
        alert("Warning, these cheesecakes contain dairy. Do you still want to order?"); // alerts if word is found
    }
    // otherwise submit the entries and hide the elements no longer needing to be used
    else { 
        $("#table").hide();
        $("#notes").hide();
        $("#specialInstruct").hide();
        $("#order").hide();

        var topping = $("input[name='topping']:checked").val();
        var quantity = $('#quantity :selected').text();
        var thankyou = "<h3>Thank you! Your order has been placed</h3>";

        var toppingsAlert = "<p>Topping: " + topping + "</p>"
        var quantityAlert = "<p>Quantity: " + quantity + "</p>"
        var notesAlert = "<p>Notes: " + specialInstructions + "</p>"

        // alert the users of what they ordered
        alert("Thank you! Your order has been placed. Here are the details:"
		+ "\nQuantity: " + quantity 
		+ "\nTopping: " + topping
		+ "\nNotes: " + specialInstructions);

        $.post("https://localhost:3000/neworders",
            {
                quantity: $("quantity :selected").val(),
                topping: $("input[name='topping']:checked").val(),
                notes: $("#notes").val(),
            });
        $("body").append(thankyou, toppingsAlert, quantityAlert, notesAlert);
    }
    e.preventDefault();
}

// handler for each month
monthHandler = function () {
    var buttonText = $(this).text();
    $("#month").html(buttonText);
    $.post('/orders',
        {
            month: buttonText,
        },
        function (orderArray) {
            var newOrderList0 = orderArray.data[0].quantity + " " + orderArray.data[0].topping;
            var newOrderList1 = orderArray.data[1].quantity + " " + orderArray.data[1].topping;
            var newOrderList2 = orderArray.data[2].quantity + " " + orderArray.data[2].topping;
            $("#orderListCherry").html(newOrderList0);
            $("#orderListChocolate").html(newOrderList1);
            $("#orderListPlain").html(newOrderList2);
        });
}

// read in and handle the events from the main document
$(document).ready(function () {
    // call submit on the form
    $("form").on("submit", submitHandler);

    // call month handler on selected month
    $("#jan").click(monthHandler);
    $("#feb").click(monthHandler);
    $("#mar").click(monthHandler);
    $("#apr").click(monthHandler);
    $("#may").click(monthHandler);
    $("#jun").click(monthHandler);
    $("#jul").click(monthHandler);
    $("#aug").click(monthHandler);
    $("#sep").click(monthHandler);
    $("#oct").click(monthHandler);
    $("#nov").click(monthHandler);
    $("#dec").click(monthHandler);
});