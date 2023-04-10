$(function(){
	init();
	initEvent();
});
function init() {
	$('#userId').focus();
}
function initEvent() {
	console.log('initEvent');
	$('#userPassword').on('keyup', function(){
		chkEnter(login)
	});
	$('#btnLogin').on('click', login);
}
function login() {
	if (checkLoginForm()) {
		var userId = $('#userId').val();
		var password = $('#userPassword').val();
		
		var obj = {};
		var data = {};
		data.userId = userId;
		data.userPassword = password;
	
		obj.url = '/login/checkLogin';
		obj.data = data;
	
		console.log(data);
		ajaxCall(obj, loginHandler);
	}
}
function checkLoginForm() {
	var val = true;
	var userId = $('#userId').val();
	var password = $('#userPassword').val();

	if (!checkItem(userId, '아이디')) {
		$('userId').focus();
		val = false;
	} else if (!checkItem(password, '비밀번호')) {
		$('userPassword').focus();
		val = false;
	}

	return val;
}
function checkItem(item, itemName) {
	var chk = true;
	var title = ' 미입력';
	var message = '를 입력해주세요.';
	var type = 'error';

	if (isEmpty(item)) {
		title = itemName + title;
		message = itemName + message;

		swal(title, message, type);
		chk = false;
	}
	
	return chk;
}
function loginHandler(data) {
	var code = data.returnMessage;

	if (code == 'OK') {
		location.href = '/classgroup/';
	} else {
		var title = '인증오류';
		var message = '아이디 또는 비밀번호가 일치하지 않습니다.';
		var type = 'error';
		swal(title, message, type);
	}
}