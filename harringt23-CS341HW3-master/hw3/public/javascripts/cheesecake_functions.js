/* Transfer the functions from the HTML file */
/* TODO: fix the hide functions / don't think you need to hide all of those*/
$(document).ready(function(){
	$("#order").click(function(event){
        	// Prevent default action from event to occur
        	event.preventDefault();

        	// Store the forms in variables
        	var quantity = $("#quantity").val();
        	var topping = $("#topping").val();
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
		}
                    
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
            
		// Display the drop-down for months when hovering over it
            	function monthDropDown() {
                	var len = document.getElementById("monthOptions").options.length;
                	document.getElementById("monthOptions").size = len / 4;
            	}
	});
});
