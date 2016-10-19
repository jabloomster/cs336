/**
 *  This js file implements a simple AJAX call.
 *
 *  @author jabloomster
 *  @date October 19, 2016
 *
 */

"use strict";

$(document).ready(function() {
	$("#data").click(
		function() {
			var txt = document.createElement("span");

			console.log('AJAX request issued...');
			$.ajax({
				url: "/fetch",
				type: "GET",
				data: {
					name: "lab07"
				}
			})
			.done(function(result){
				console.log('AJAX request succeeded...');
				txt.innerHTML = result.content;
			})
			.fail(function(xhr, status, errorThrown) {
				console.log('AJAX request failed...');
				txt.innerHTML = 'no data yet...';
			})

			$("body").append(txt);
			$("span").addClass("italic");
		}
	)
});
