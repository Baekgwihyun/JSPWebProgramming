$(function() {
	init();
	initEvent();
});
function init() {
	initProperties();
}
function initEvent() {
	setHandler('#btnSaveMessengerLoginType', 'click', saveMessengerLoginType);
	setHandler('#btnSaveRetentionPeriodForUnreceivedData', 'click', saveRetentionPeriodForUnreceivedData);
	setHandler('#btnSaveMaxFileTransferCapacityInChat', 'click', saveMaxFileTransferCapacityInChat);
	setHandler('#btnSaveMaxFileTransferCapacityInMessage', 'click', saveMaxFileTransferCapacityInMessage);
	setHandler('#btnSaveRetentionPeriodForUnreceivedAttachs', 'click', saveRetentionPeriodForUnreceivedAttachs);
	setHandler('#btnAddTransferRestrictionAttachmentsExtensionsForm', 'click', addTransferRestrictionAttachmentsExtensionsForm);
	setHandler('#btnAddTransferRestrictionAttachmentsExtensions', 'click', addTransferRestrictionAttachmentsExtensions);
	setHandler('.closeAddTransferRestrictionAttachmentsExtensionsForm', 'click', closeAddTransferRestrictionAttachmentsExtensionsForm);
	
	setHandler('#btnDelTransferRestrictionAttachmentsExtensions', 'click', delTransferRestrictionAttachmentsExtensions);
	
}
function initProperties() {
	var obj = {};
	var data = {};
	
	obj.url = '/preferences/getProperties';
	obj.data = data;
	
	ajaxCall(obj, initPropertiesHandler);
}
function initPropertiesHandler(data) {
	console.log(data);
	var code = data.code;
	var login_type = data.login_type;
	var block_extension_default_list = data.block_extension_default_list;
	var block_extension_list = data.block_extension_list;
	var maxFileTransferCapacityInChat = data.max_file_transfer_capacity_chat;
	var maxFileTransferCapacityInMessage = data.max_file_transfer_capacity_message;
	var chat_expiration_date = data.chat_expiration_date;
	var attachments_expiration_date = data.attachments_expiration_date;
	
	setBlockExtensionDefaultList(block_extension_default_list);
	setBlockExtensionList(block_extension_list);
	setMessengerLoginType(login_type);
	setMaxFileTransferCapacityInChat(maxFileTransferCapacityInChat);
	setMaxFileTransferCapacityInMessage(maxFileTransferCapacityInMessage);
	setChatExpirationDate(chat_expiration_date);
	setAttachmentsExpirationDate(attachments_expiration_date);
}
function setBlockExtensionDefaultList(extensions) {
	block_extension_default = extensions;
}
function setBlockExtensionList(list) {
	$(".extension_limit").empty();
	
	list.forEach(function(item){
		makeAndAppendBlockExtension(item);
	});
}
function makeAndAppendBlockExtension(item) {
	var $el = makeBlockExtensionElement(item);
	$(".extension_limit").append($el);
}
function makeBlockExtensionElement(item) {
	var imageFileName = item;
	if (!isDefaultImageExtension(item)) {
		imageFileName = 'addfile';
	};
	
	var img_path = '/common/img/preferences/icon_file_on_' + imageFileName + '.png';
	
	var $el = $('<div class="setting_icon radius_5 el_block_extension">')
					.css({
						'background-image':'url(' + img_path + ')',
						'width':'70px',
						'height':'80px',
						'margin':'1px'
					})
					.on('click', selectionToggle)
					.data('extension', item)
					.data('isChecked', false);
	
	var $label = $('<label class="type_check">');
	var $span_label = $('<span class="extender extenderTxt">')
						.text(item);
	$label.append($span_label);
	$el.append($label);
	
	return $el;
}
function selectionToggle() {
	var $el = $(this);
	var isChecked = ($el.data('isChecked') == true) ? false : true;
	
	$el.data('isChecked', isChecked);
	
	var border = '1px solid ';
	border += (isChecked == true) ? '#810000' : '#e9e9f3';
	$el.css('border', border);
}
function setMessengerLoginType(type) {
	$('#loginType').val(type);
}
function setMaxFileTransferCapacityInChat(size) {
	$('#maxFileTransferCapacityInChat').val(size);
}
function setMaxFileTransferCapacityInMessage(size) {
	$('#maxFileTransferCapacityInMessage').val(size);
}
function setChatExpirationDate(date) {
	$('#chat_expiration_date').val(date);
}
function setAttachmentsExpirationDate(date) {
	$('#attachments_expiration_date').val(date);
}
function getAndSetBlockExtensionList() {
	var obj = {};
	var data = {};
	
	obj.url = '/preferences/getBlockExtensionList';
	obj.data = data;
	
	ajaxCall(obj, getAndSetBlockExtensionListHandler);
}
function getAndSetBlockExtensionListHandler(data) {
	console.log(data);
	var list = data.list;
	setBlockExtensionList(list);
}
function getBlockExtensionDefaultList() {
	var obj = {};
	var data = {};
	
	obj.url = '/preferences/getBlockExtensionDefaultList';
	obj.data = data;
	
	ajaxCall(obj, getBlockExtensionDefaultListHandler);
}
function getBlockExtensionDefaultListHandler(data) {
	var code = data.code;
	if (code == 'ok') {
		setBlockExtensionList(data.list);
	}
}
function isDefaultImageExtension(extension) {
	var result = false;
	if (block_extension_default) {
		var len = block_extension_default.length;
		for (var i = 0; i < len; i++) {
			var ext = $.trim(block_extension_default[i]);
			if (extension == ext) {
				result = true;
				break;
			}
		}
	}
	
	return result;
}
function getMessengerLoginType(callback) {
	var obj = {};
	var data = {};
	
	obj.url = '/preferences/getMessengerLoginType';
	obj.data = data;
	
	ajaxCall(obj, callback);
}
function getMessengerLoginTypeHandler(data) {
	var code = data.code;
	if (code == 'ok') {
		var type = data.type;
		setMessengerLoginType(type);
	}
}
function saveMessengerLoginType() {
	var obj = {};
	var data = {};
	data.value = $('#loginType option:selected').val();
	
	obj.url = '/preferences/saveMessengerLoginType';
	obj.data = data;
	
	ajaxCall(obj, savePropertiesHandler);
}
function savePropertiesHandler(data) {
	var code = data.code;
	var prop;
	
	if (code == 'ok') {
		prop = getAlertProp('적용완료', '적용되었습니다', 'info');
	} else {
		prop = getAlertProp('적용실패', '적용에 실패하였습니다. 잠시후 다시 시도해주세요.', 'error');
	}
	
	alert(prop);
}
function saveRetentionPeriodForUnreceivedData() {
	var date = $('#chat_expiration_date').val();
	
	if (validateNumber(date)) {
		var obj = {};
		var data = {};
		data.date = date;
		
		obj.url = '/preferences/saveRetentionPeriodForUnreceivedData';
		obj.data = data;
		
		ajaxCall(obj, savePropertiesHandler);
	} else {
		alert(getAlertProp('입력오류', '숫자(양수)만 입력 가능합니다.', 'error'));
	}
}
function saveRetentionPeriodForUnreceivedAttachs() {
	var date = $('#attachments_expiration_date').val();
	
	if (validateNumber(date)) {
		var obj = {};
		var data = {};
		data.date = date;
		
		obj.url = '/preferences/saveRetentionPeriodForUnreceivedAttachs';
		obj.data = data;
		
		ajaxCall(obj, savePropertiesHandler);
	} else {
		alert(getAlertProp('입력오류', '숫자(양수)만 입력 가능합니다.', 'error'));
	}
}
function saveRetentionPeriodForUnreceivedAttachsHandler(data) {
	console.log(data);
}
function saveMaxFileTransferCapacityInChat() {
	var size = $('#maxFileTransferCapacityInChat').val();
	if (validateNumber(size)) {
		var obj = {};
		var data = {};
		data.size = size;
		
		obj.url = '/preferences/saveMaxFileTransferCapacityInChat';
		obj.data = data;
		
		ajaxCall(obj, savePropertiesHandler);
	} else {
		alert(getAlertProp('입력오류', '숫자(양수)만 입력 가능합니다.', 'error'));
	}
}
function validateNumber(value) {
	var regEx= /^[0-9]/g;
	return validator(value, regEx);
}
function getAlertProp(title, text, icon) {
	var prop = {};
	prop.title = title;
	prop.text = text;
	prop.icon = icon;
	return prop;
}
function saveMaxFileTransferCapacityInMessage() {
	var size = $('#maxFileTransferCapacityInMessage').val();
	if (validateNumber(size)) {
		var obj = {};
		var data = {};
		data.size = size;
		
		obj.url = '/preferences/saveMaxFileTransferCapacityInMessage';
		obj.data = data;
		
		ajaxCall(obj, savePropertiesHandler);
	} else {
		alert(getAlertProp('입력오류', '숫자(양수)만 입력 가능합니다.', 'error'));
	}
}
function addTransferRestrictionAttachmentsExtensionsForm() {
	$('#blockExtension').val('');
	contextPopup('add_block_extension_form');
}
function addTransferRestrictionAttachmentsExtensions() {
	var blockExtension = $('#blockExtension').val();
	if (validateExtension(blockExtension)) {
		var list = getTransferRestrictionAttachmentsExtensions();
		if (!hasTransferRestrictionAttachmentsExtensions(blockExtension)) {
			list += ',' + blockExtension;
		}
		console.log(list);
		saveTransferRestrictionAttachmentsExtensions(list);
	} else {
		alert(getAlertProp('입력오류', '영문과 숫자만 입력 가능합니다.', 'error'));
	}
}
function validateExtension(value) {
	var regEx = /^[A-Za-z0-9]+$/;
	return validator(value, regEx);
}
function closeAddTransferRestrictionAttachmentsExtensionsForm() {
	contextPopupClose('add_block_extension_form');
}
function delTransferRestrictionAttachmentsExtensions() {
	var value = getTransferRestrictionAttachmentsExtensions();
	saveTransferRestrictionAttachmentsExtensions(value);
}
function saveTransferRestrictionAttachmentsExtensions(value) {
	var obj = {};
	var data = {};
	data.value = value;
	
	obj.url = '/preferences/saveTransferRestrictionAttachmentsExtensions';
	obj.data = data;
	
	ajaxCall(obj, saveTransferRestrictionAttachmentsExtensionsHandler);
}
function saveTransferRestrictionAttachmentsExtensionsHandler(data) {
	var code = data.code;
	var prop;
	
	if (code == 'ok') {
		prop = getAlertProp('적용완료', '적용되었습니다', 'info');
		var value = data.req.value;
		var list = value.split(',');
		setBlockExtensionList(list);
		contextPopupClose('add_block_extension_form');
	} else {
		prop = getAlertProp('적용실패', '적용에 실패하였습니다. 잠시후 다시 시도해주세요.', 'error');
	}
	
	alert(prop);
}
function getTransferRestrictionAttachmentsExtensions() {
	var list = $('.el_block_extension');
	var len = list.length;
	var extensions = [];
	for (var i = 0; i < len; i++) {
		var $el = $(list[i]);
		var isChecked = $el.data('isChecked');
		var extension = $el.data('extension')
		if (!isChecked) {
			extensions.push(extension);
		}
	}
	return extensions.join(',');
}
function hasTransferRestrictionAttachmentsExtensions(target) {
	var list = $('.el_block_extension');
	var len = list.length;
	var has = false;
	for (var i = 0; i < len; i++) {
		var $el = $(list[i]);
		var extension = $el.data('extension')
		if (target == extension) {
			has = true;
			break;
		}
	}
	return has;
}