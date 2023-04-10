$(function(){
	init();
	initEvent();
});
function init() {
	$('#classGroupMemberList').chkbox();
	$('#userlist').chkbox();
	$('#classGroupCandidate').chkbox();
	$('#classGroupList').chkbox();
	$('#classGroupSearchResultsList').chkbox();
	
	searchAndMakeListOfClassGroupMember();
}
function initEvent() {
	$('#btnRegisterClassGroupForm').on('click', registerClassGroupForm);
	$('#btnRemoveClassGroupMemberList').on('click', confirmAndremoveClassGroupMemberList);
	$('#btnClassGroupMemberByKeyword').on('click', searchAndMakeListOfClassGroupMember);
	$('#search_keyword_classgroup_member').on('keyup', function(e){
		chkEnter(searchAndMakeListOfClassGroupMember);
	});
	$('#btnUsersByKeyword').on('click', searchAndMakeListOfUsers);
	$('#search_keyword_users').on('keyup', function(e){
		chkEnter(searchAndMakeListOfUsers);
	});
	$('#btnAddUserListToClassGroupCandidate').on('click', checkAndAppendUserListToClassGroupCandidate);
	
	$('#btnClassGroupByKeyword').on('click', searchAndMakeListOfClassGroupFromRegister);
	$('#search_keyword_classgroup').on('keyup', function(e){
		chkEnter(searchAndMakeListOfClassGroupFromRegister);
	});

	$('#btnAddGroupListToClassGroup').on('click', checkAndAppendGroupListToClassGroup);
	$('#btnRegistClassGroupMemberList').on('click', checkAndRegistClassGroupMemberList);
}
function registerClassGroupForm() {
	initRegisterClassGroupForm();
	contextPopup('register_class_group');
}
function initRegisterClassGroupForm() {
	initRegisterUsersArea();
	initRegisterClassGroupArea();
}
function initRegisterUsersArea() {
	$('#search_type_users option:eq(0)').prop('selected', true);
	$('#search_keyword_users').val('');
	$('#classGroupCandidate tbody').empty();
	resetCheckbox('classGroupMemberList');
}
function initRegisterClassGroupArea() {
	$('#search_keyword_classgroup').val('');
	$('#classGroupList tbody').empty();
	resetCheckbox('classGroupList');
}
function searchAndMakeListOfClassGroupMember() {
	getClassGroupMemberByKeyword(makeListOfClassGroupMember);
}
function getClassGroupMemberByKeyword(callback) {
	var type = $('#search_type_classgroup_member').val();
	var keyword = $('#search_keyword_classgroup_member').val();

	var obj = {};
	var data = {};
	data.type = type;
	data.keyword = keyword;
	
	obj.url = '/classgroup/getClassGroupMemberByKeyword';
	obj.data = data;
	
	ajaxCall(obj, callback);
}
function makeListOfClassGroupMember(data) {
	var list = data.list;
	var $body = $('#classGroupMemberList tbody');
	$body.empty();

	list.forEach(function(item){
		$body.append(makeRowDataForClassGroupMember(item));
	});

	resetCheckbox('classGroupMemberList');
}
function makeRowDataForClassGroupMember(item) {
	var keys = ['check', 'userId', 'userName', 'posName', 'deptName', 'phone', 'detail'];
	var $tr = $('<tr>');

	keys.forEach(function(key){
		var $td = $('<td>');

		if (key == 'check') {
			$td.append(makeCheckbox(item));
		} else if (key == 'detail') {
			var prop = {};
			prop.name = '상세';
			prop.cls = 'bg_base';
			var $btn = makeButton(prop, classGroupListDetails);
			$btn.data('item', item);
			$td.append($btn);
		} else {
			$td.text(item[key]);
		}
		$tr.append($td);
	});
	return $tr;
}
function makeCheckbox(item) {
	var $label = $('<label class="type_check">');
	var $checkbox = $('<input type="checkbox" class="chkItem">')
						.data('item', item)
						.prop('checked', true);
	
	var $span = $('<span class="label no_txt">');
	$label.append($checkbox).append($span);
	return $label;
}
function makeButton(prop, handler) {
	var $button = $('<button type="button" class="btn_type">')
					.addClass(prop.cls);
	var $span = $('<span>').text(prop.name);

	if (handler != undefined) {
		$button.on('click', handler);
	}

	return $button.append($span);
}
function classGroupListDetails() {
	var item = $(this).data('item');
	
	var obj = {};
	var data = {};
	data.userId = item.userId;
	data.item = item;
	
	obj.url = '/classgroup/classGroupExceptRootByUserId';
	obj.data = data;
	
	ajaxCall(obj, classGroupListDetailsHandler);
}
function classGroupListDetailsHandler(data) {
	initRegisterClassGroupForm();
	appendUserListToClassGroupCandidate([data.req.item]);
	appendClassGroupList(data.list);
	contextPopup('register_class_group');
}
function confirmAndremoveClassGroupMemberList() {
	confirmRemoveClassGroupMemberList();
}
function confirmRemoveClassGroupMemberList() {
	var isChecked = $('#classGroupMemberList').isChecked();
	var prop = {};
	prop.icon = 'warning';
	prop.title = '삭제할 항목을 리스트에서 체크해주세요.';
	prop.text = '';

	if (isChecked) {
		var keys = $('#classGroupMemberList').getChkKeywordList('userId');
		var data = {};
		data.keys = keys;
		prop.title = '선택한 항목을 삭제하시겠습니까?';
		prop.text = keys.toString();
		
		prop.callback = function() {
			removeClassGroupMemberList(data);
		}

		confirm(prop);
	} else {
		alert(prop);
	}
}
function removeClassGroupMemberList(data) {
	var obj = {};
	
	obj.url = '/classgroup/removeClassGroupMemberList';
	obj.data = data;
	
	ajaxCall(obj, removeClassGroupMemberHandler);
}
function removeClassGroupMemberHandler(data) {
	resetCheckbox('classGroupMemberList');
	searchAndMakeListOfClassGroupMember();
}
function resetCheckbox(key) {
	$('#' + key).reset();
}
function searchAndMakeListOfUsers() {
	getUsersByKeyword(makeListOfUsers);
}
function getUsersByKeyword(callback) {
	var type = $('#search_type_users').val();
	var keyword = $('#search_keyword_users').val();

	var obj = {};
	var data = {};
	data.type = type;
	data.keyword = keyword;
	
	obj.url = '/classgroup/getUsersByKeyword';
	obj.data = data;
	
	ajaxCall(obj, callback);
}
function makeListOfUsers(data) {
	var list = data.list;
	var $body = $('#userlist tbody');
	$body.empty();
	list.forEach(function(item){
		$body.append(makeRowDataForUsers(item));
	});
	$('#userlist').reset();
	contextPopup('search_users');
}
function makeRowDataForUsers(item) {
	var keys = ['check', 'userId', 'userName', 'posName', 'deptName'];
	var $tr = $('<tr>');
	keys.forEach(function(key){
		var $td = $('<td>');

		if (key == 'check') {
			$td.append(makeCheckbox(item));
		} else {
			$td.text(item[key]);
		}
		$tr.append($td);
	});
	return $tr;
}
function checkAndAppendUserListToClassGroupCandidate() {
	var isChecked = $('#userlist').isChecked();

	if (isChecked) {
		appendUserListToClassGroupCandidateFromSearchList();
	} else {
		var prop = {};
		prop.icon = 'warning';
		prop.title = '추가할 항목을 리스트에서 체크해주세요.';
		prop.text = '';

		alert(prop);
	}

}
function appendUserListToClassGroupCandidateFromSearchList() {
	var list = $('#userlist').getChkItemList();
	appendUserListToClassGroupCandidate(list);
}
function appendUserListToClassGroupCandidate(list) {
	var $body = $('#classGroupCandidate tbody');
	
	list.forEach(function(item){
		if (!isExistsCheckboxItem('classGroupCandidate', item.userId, 'userId')) {
			$body.append(makeRowDataForClassGroupCandidate(item));
		}
	});

	contextPopupClose('search_users');
}
function makeRowDataForClassGroupCandidate(item) {
	var keys = ['check', 'userId', 'userName', 'posName', 'deptName'];
	var $tr = $('<tr>');

	keys.forEach(function(key){
		var $td = $('<td>');

		if (key == 'check') {
			$td.append(makeCheckbox(item));
		} else {
			$td.text(item[key]);
		}
		$tr.append($td);
	});
	return $tr;
}
function isExistsCheckboxItem(target, key, keyword) {
	var list = $('#' + target).getItemKeywordList(keyword);
	//console.log(list, list.indexOf(key) > -1, key, keyword);
	return list.indexOf(key) > -1;
}
function searchAndMakeListOfClassGroupFromRegister() {
	var keyword = $('#search_keyword_classgroup').val();
	searchAndMakeListOfClassGroup(keyword);
}
function searchAndMakeListOfClassGroup(keyword) {
	var obj = {};
	var data = {};
	data.keyword = keyword;
	
	obj.url = '/classgroup/classGroupByKeyword';
	obj.data = data;
	
	ajaxCall(obj, searchAndMakeListOfClassGroupHandler);
}
function searchAndMakeListOfClassGroupHandler(data) {
	makeListOfClassGroup(data);
	contextPopup('search_groups');
}
function makeListOfClassGroup(data) {
	var list = data.list;

	var $body = $('#classGroupSearchResultsList tbody');
	$body.empty();
	list.forEach(function(item){
		$body.append(makeRowDataForClassGroupResult(item));
	});
	resetCheckbox('classGroupSearchResultsList');
}
function makeRowDataForClassGroupResult(item) {
	var keys = ['check', 'key', 'title'];
	var $tr = $('<tr>');

	keys.forEach(function(key){
		var $td = $('<td>');

		if (key == 'check') {
			$td.append(makeCheckbox(item));
		} else {
			$td.text(item[key]);
		}
		$tr.append($td);
	});
	return $tr;
}
function checkAndAppendGroupListToClassGroup() {
	var isChecked = $('#classGroupSearchResultsList').isChecked();

	if (isChecked) {
		appendListOfSearchedGroupsToClassGroupList();
		contextPopupClose('search_groups');
	} else {
		var prop = {};
		prop.icon = 'warning';
		prop.title = '추가할 항목을 리스트에서 체크해주세요.';
		prop.text = '';

		alert(prop);
	}
}
function appendListOfSearchedGroupsToClassGroupList() {
	var list = $('#classGroupSearchResultsList').getChkItemList();
	appendClassGroupList(list);
}
function appendClassGroupList(list) {
	var $body = $('#classGroupList tbody');

	list.forEach(function(item){
		if (!isExistsCheckboxItem('classGroupList', item.key, 'key')) {
			$body.append(makeRowDataForClassGroup(item));
		}
	});
	$('#classGroupSearchResultsList').reset();
}
function makeRowDataForClassGroup(item) {
	var keys = ['check', 'key', 'title'];
	var $tr = $('<tr>');

	keys.forEach(function(key){
		var $td = $('<td>');

		if (key == 'check') {
			$td.append(makeCheckbox(item));
		} else {
			$td.text(item[key]);
		}
		$tr.append($td);
	});
	return $tr;
}
function checkAndRegistClassGroupMemberList() {
	var sizeOfCandidate = $('#classGroupCandidate').sizeOfItem();
	var sizeOfClassGroup = $('#classGroupList').sizeOfItem();

	if (checkCandidate() && checkClassGroup()) {
		registClassGroupMemberList();
	}
}
function checkAndRegistClassGroupMemberList() {
	var sizeOfCandidate = $('#classGroupCandidate').sizeOfItem();
	var sizeOfClassGroup = $('#classGroupList').sizeOfItem();

	if (checkCandidate() && checkClassGroup()) {
		registClassGroupMemberList();
	}
}
function checkCandidate() {
	var chk = false;
	var sizeOfCandidate = $('#classGroupCandidate').sizeOfItem();

	if (sizeOfCandidate < 1) {
		var prop = {};
		prop.icon = 'warning';
		prop.text = '';
		if (sizeOfCandidate < 1) {
			prop.title = '추가할 사용자 리스트를 확인해주세요.';
		} 
		alert(prop);
	} else {
		chk = true;
	}
	
	return chk;
}
function checkClassGroup() {
	var chk = false;
	var sizeOfClassGroup = $('#classGroupList').sizeOfItem();

	if (sizeOfClassGroup < 1) {
		var prop = {};
		prop.icon = 'warning';
		prop.text = '';
		if (sizeOfClassGroup < 1) {
			prop.title = '추가할 클래스그룹 리스트를 확인해주세요.';
		} 
		alert(prop);
	} else {
		chk = true;
	}
	
	return chk;
}
function registClassGroupMemberList() {
	var userIds = $('#classGroupCandidate').getItemKeywordList('userId');
	var groupIds = $('#classGroupList').getChkKeywordList('key');

	//console.log('userIds=' + userIds);
	//console.log('groupIds=' + groupIds);

	var obj = {};
	var data = {};
	data.keys = userIds;
	data.groupIds = groupIds;
	
	obj.url = '/classgroup/registClassGroupMemberList';
	obj.data = data;
	
	ajaxCall(obj, registClassGroupMemberListHandler);
}
function registClassGroupMemberListHandler(data) {
	var code = data.code;
	var title = (code == 'ok') ? '적용완료' : '적용실패';
	var text = (code == 'ok') ? '적용되었습니다.' : '적용에 실패하였습니다. 잠시후 다시 시도해주세요.';
	var icon = (code == 'ok') ? 'success' : 'info';
	
	var prop = {};
	prop.title = title;
	prop.text = text;
	prop.icon = icon;
	alert(prop);

	contextPopupClose('register_class_group');
	searchAndMakeListOfClassGroupMember();
}