$(function() {
	$('.favButton').on("click", function() {
		var id = $(this).attr('data-id');
		$.ajax({
			type: "PATCH",
			url: "/api/bands/"+id,
			data: { id: id }
		}).catch(function(err) {
			console.log(err);
		}).done(function(data) {
			console.log(data);
		})
	})
})