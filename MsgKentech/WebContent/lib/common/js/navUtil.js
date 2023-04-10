$(function(){
	initNav();
});
function initNav() {
	var code = getServiceCode();
	if (code != 'login') {
		navByAuth();
		markNav();
	}
}
function navByAuth() {
	console.log('role=' + role);
	var navs = $('nav ul li a');

	if (role == 'CHINESEWALL') {
		var len = navs.length;
		//console.log('len=' + len);
		for (var i = 0; i < len; i++) {
			var $el = navs[i];
			var id = $($el).attr('class');
			if (id != 'chinesewall') {
				var $nav = $($el).parent();
				$nav.remove();
			}
		}
	}
}
function markNav() {
	var code = getServiceCode();
	$('.' + code).addClass('on');
}