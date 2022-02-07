/* Main JavaScript functions for the cheesecake file
 * Brynn Harrington 
 * 
 * 
 * Transfer the functions from the HTML file 
 */

// Create a handler for when a submit event is signaled
submitHandler = function(e) {
	var notes = $.trim($("#notes").val());            
	var vegan = notes.toLowerCase().indexOf("vegan");
	var warning = "Warning, these cheesecakes contain dairy. Do you still want to order?";
	// Determine whether vegan was in the description
	if(vegan != -1){
		// Determine if they still want to order
		if(!confirm(warning)){
				// Cancel the order if decline
				alert("Order successfully canceled. Have a nice day!");
				return false;
	}
	// checking to see if notes contain the word "vegan"
	else{
		// Hide the forms
		$("h3").hide();
		$("textarea").hide();
		$("form").hide();	       
		$("ul").hide();
		$("input").hide();

		// Alert the users of what they ordered
		alert("Thank you! Your order has been placed. Here are the details:"
		+ "\nQuantity: " + quantity 
		+ "\nTopping: " + topping
		+ "\nNotes: " + notes);

		// Display the order afterwards
		$("#orders").before("<h3>Thank you! Your order has been placed. Here are the details:<\h3>"
		+ "Quantity: " + quantity
				+ "<br />Topping: " + topping
				+ "<br />Notes: " + notes + "<br />");
	}
	e.preventDefault();
}

// Create a handler for each month
monthHandler = function() {
	// create a variable for the month text
	var monthText = $(this).text();
	// get the month text
	$(#monthOptions).html(monthText);
	// load data from the server with a post request
	$.post('/orders', function(orderArray) {
		// hide the order lists of the current month
		$("#orderListCherry").hide();
		$("#orderListChocolate").hide();
		$("#orderListPlain").hide();

		// replace the data from the database
		var newCherry = "<li>" + orderArray.data[0].cherry.quantity 
			+ " " + orderArray.cherry.topping + "</li>";
		var newChocolate = "<li>" + orderArray.data[0].chocolate.quantity 
			+ " " + orderArray.chocolate.topping + "</li>";
		var newPlain = "<li>" + orderArray.data[0].plain.quantity 
			+ " " + orderArray.plain.topping + "</li>";
	});
}

// handle the rest of the document
$(document).ready(function() {
	// call the submit handler for the forms
	$("form").on("submit", submitHandler);

	// call the month handler on each month 
	//TODO: see if able to implement with class
	$(#Jan).click(monthHandler);
	$(#Feb).click(monthHandler);
	$(#Mar).click(monthHandler);
	$(#Apr).click(monthHandler);
	$(#Jun).click(monthHandler);
	$(#Jul).click(monthHandler);
	$(#Aug).click(monthHandler);
	$(#Sep).click(monthHandler);
	$(#Oct).click(monthHandler);
	$(#Nov).click(monthHandler);
	$(#Dec).click(monthHandler);
});
}
