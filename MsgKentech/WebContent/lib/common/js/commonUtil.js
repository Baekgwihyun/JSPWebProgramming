function chkEnter(callback) {
	if (event.keyCode == 13) {
		callback();
	}
}
function isEmpty(str) {
	var result = false;
	if (typeof str == undefined || str == null || str == "undefined" || $.trim(str) == '') {
		result = true;
	}
	return result;
}
function nvl(str, replace) {
	var val = str;
	if (isEmpty(val)) {
		val = replace;
	}
	return val;
}
var alert = function(prop) {
	var title = prop.title;
	var text = prop.text;
	var icon = prop.icon;

	swal(title, text, icon);
}
var confirm = function(prop) {
	var title = prop.title;
	var text = prop.text;
	var icon = prop.icon;

	var callback = prop.callback;
	swal({
		title: title,
		text: text,
		icon: icon,
		dangerMode: true,
		buttons: {
			cancel: '취소',
			confirm: {
				text: '확인',
				value: true
			}
		}
	})
	.then(function(value) {
		if (callback && value) {
			callback();
		}
	});
}
function getServiceCode() {
	var url = location.href;
	var info = url.split('/');
	
	//console.log(info);
	
	return info[3];
}
function validator(str, regExp) {
	return regExp.test(str);
}
function setHandler(selector, evt, handler) {
	$(selector).off(evt).on(evt, handler);
}
function getYear(date) {
	return date.getFullYear();
}
function getMonth(date) {
	return date.getMonth();
}
function getDay(date) {
	return date.getDate();
}
function ConvertThisYearToText() {
	return (new Date().getFullYear()) + '';
}
function ConvertThisMonthToText() {
	return (new Date().getMonth() + 1) + '';
}
function ConvertTodayToText() {
	return (new Date().getDate()) + '';
}
function lpad(str, len, pad) {
	var tmp = str;
	var s = tmp.length;
	
	for (var i = s; i < len; i++) {
		tmp = pad + tmp;
	}
	return tmp;
}