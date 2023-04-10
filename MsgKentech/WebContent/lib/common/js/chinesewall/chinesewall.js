$(function(){
	init();
	initEvent();
});
function init() {
	initAuthMatrix();
}
function initEvent() {
	$('#btnSaveAuthPolices').on('click', saveAuthPolicies);
}
function initAuthMatrix() {
	getAuthGrupsAndPoliciesAndCreateMatrix();
}
function getAuthGrupsAndPoliciesAndCreateMatrix() {
	var obj = {};
	var data = {};
	
	obj.url = '/chinesewall/getAuthGroupsAndPolicies';
	obj.data = data;
	
	ajaxCall(obj, getAuthGrupsAndPoliciesAndCreateMatrixHandler);
}
function getAuthGrupsAndPoliciesAndCreateMatrixHandler(data) {
	var authGroups = data.authGroups;
	var authPolicies = data.authPolicies;
	createMatrix(authGroups);
	setAuthPolicies(authPolicies);
}
function createMatrix(list) {
	appendMatrixHead(list);
	appendMatrixBody(list);
}
function appendMatrixHead(list) {
	var $head = $('#authMatrix thead');
	var $tr = $('<tr>').css({
							'border-top':'1px solid #e5e5e5',
							'border-bottom':'1px solid #e5e5e5'
						});
	var $th_type = $('<th>').text('구분');

	$tr.append($th_type);
	list.forEach(function(item) {
		var groupCode = item.groupCode;
		var groupName = item.groupName;
		var title = groupName + '<br>(' + groupCode + ')';
		var $th = $('<th>').html(title);
		$tr.append($th);
	});

	$head.empty();
	$head.append($tr);
}
function appendMatrixBody(list) {
	var $body = $('#authMatrix tbody');
	$body.empty();

	list.forEach(function(item) {
		var groupCode = item.groupCode;
		var groupName = item.groupName;
		var title = groupName + '<br>(' + groupCode + ')';

		var $tr = $('<tr>')
		var $td_title = $('<td>')
						.css({'background':'#f0f2f6'})
						.html(title);

		$tr.append($td_title);

		appendPolicySettingMatrix(list, groupCode, $tr);

		$body.append($tr);
	});
}
function appendPolicySettingMatrix(list, groupCode, $tr) {
	list.forEach(function(item) {
		var key = groupCode + '_' + item.groupCode;
		var $td = $('<td>');
		var $label = $('<label class="type_check">');
		var $input = $('<input type="checkbox" name="authPolicies">')
						.attr('id', key)
						.val(key)
						.data('sourceGroupCode', groupCode)
						.data('targetGroupCode', item.groupCode);

		var $span = $('<span class="label no_txt">');
		$label.append($input).append($span);
		$td.append($label);
		$tr.append($td);
	});
}
function setAuthPolicies(list) {
	list.forEach(function(item) {
		var key = item.sourceGroupCode + '_' + item.targetGroupCode;
		$('#' + key).prop('checked', true);
	});
}
function saveAuthPolicies() {
	console.log('saveAuthPolicies');
	
	var obj = {};
	var data = getAuthPoliciesByMatrix();
	
	obj.url = '/chinesewall/saveAuthPolicies';
	obj.data = data;
	
	console.log(data);
	ajaxCall(obj, saveAuthPoliciesHandler);
}
function getAuthPoliciesByMatrix() {
	var list = [];
	var listOfCheckedBoxes = $('input:checkbox[name=authPolicies]:checked');
	listOfCheckedBoxes.each(function() {
		list.push($(this).data());
	});
	return list;
}
function saveAuthPoliciesHandler(data) {
	var code = data.code;
	var title = (code == 'ok') ? '적용완료' : '적용실패';
	var text = (code == 'ok') ? '적용되었습니다.' : '적용에 실패하였습니다. 잠시후 다시 시도해주세요.';
	var icon = (code == 'ok') ? 'success' : 'info';
	
	var prop = {};
	prop.title = title;
	prop.text = text;
	prop.icon = icon;
	alert(prop);

	if (code != 'ok') {
		initAuthMatrix();
	}
}
