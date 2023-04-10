function ajaxCall(obj, callback) {
	contentType = 'application/json; charset=UTF-8';
	
	$.ajax({
		type: 'POST',
		url: obj.url,
		dataType: 'JSON',
		contentType: contentType,
		data: JSON.stringify(obj.data),
		error: function(req, status, e) {
			var status = req.status;
			var message = req.responseText;
			var error = e;
			
			var msg = '[_initAjax] status: ' + status + ', ';
			msg += 'message: ' + message + '\n';
			msg += 'error: ' + error;
			console.log(msg);
			
			if (status == 400) {
				alert('세션이 만료되었습니다.');
				location.href = '/invalid';
			}
		},
		success: function(data) {
			data.req = obj.data;
			callback(data);
		},
		complete: function(data) {
		}
	});
}