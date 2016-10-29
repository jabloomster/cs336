/* Simple Javascript doc to display information regarding an employee with
 * a given id number inputted by user.
 */
$(document).ready(function() {
	$("#search").click(function() {
		$("#info").html();
		var personID = $("#idnumber").val();
		$.ajax({
			url: "/getData",
			type: "POST",
			data: {
				id: personID
			}
		})
		.done(function(result){
			console.log('AJAX request succeeded...');
			$("#info").html('Name: ' + result[0].name + 
                            '<br/> \
                             Years Worked: ' + result[0].yearsWorked);
			
		})
		.fail(function(xhr, status, errorThrown) {
			console.log('AJAX request failied...');
			$("#info").html('ID# not found');
		})

	});
});
