$.ajax
	(
		{
			type : "GET",
			url : "/common/include/Copyright.html",
			dataType : "html",
			async: false ,
			data : "",
			
			error: function()
			{
			        alert('Error loading JSON document');
			},
		    success: function(msg)
		    {
				document.write(msg);
		    }
		}	
	);