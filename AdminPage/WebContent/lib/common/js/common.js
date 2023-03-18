$(function(){
	initEvent();
	initDatepicker();
});
function initEvent() {
	// login input 입력시 이벤트
	$('.login_form__input input').on("propertychange change keyup paste input", function() {
		var currentVal = $(this).val();
		if(currentVal) {
			$(this).addClass('written');
		}else {
			$(this).removeClass('written');
		}
	});
	
	// 차이니즈월 tab (그룹 관리, 차단 정책 관리, 그룹별 부서 관리)
	$('.btn_tab button[data-tab-class]').on('click', function(){
		var dataClass = $(this).attr('data-tab-class');
		
		$('.btn_tab button[data-tab-class]').not(this).removeClass('on');
		$(this).addClass('on');
		$('.tab_conts_area > div:not(.' + dataClass + ')').removeClass('on');
		$('.tab_conts_area > div.' + dataClass).addClass('on');
	});
	
	// input file
	var fileTarget = $('.filebox .upload-hidden');
	fileTarget.on('change', function(){ // 값이 변경되면
		if(window.FileReader){ // modern browser
			var filename = $(this)[0].files[0].name;
		} else { // old IE
			var filename = $(this).val().split('/').pop().split('\\').pop(); // 파일명만 추출
		}

		// 추출한 파일명 삽입
		// $(this).siblings('.upload-name').val(filename);
		$(this).parent().parent('.filebox').find('.upload-name').val(filename);
	});
	
	// popup
	$('[data-popup-id]').on('click', function(e){ // 팝업 호출
		e.preventDefault();
		var _target = $(this).attr('data-popup-id');
		$('.popup_box').css('z-index', 1);
		$('#' + _target).fadeIn(200);
		$('#' + _target).css('z-index', 2);
	});
	
	$('.btn_close_control').on('click', function(e){ // 팝업 닫기
		$(this).parents('.popup_box').fadeOut(200);
		$(this).parents('.popup_box').css('z-index', 1);
	});
	
	// 그룹별 부서 관리 - 그룹추가 팝업 select option 이동
	$('.pop_multiple').on('change', function(){
		var _selected = $(this).find('option:selected');
		var _target = $(this).parents('.pop_multiple_wrap').find('.pop_multiple').not(this);
		_target.append("<option value='" + _selected.val() +"'>" + _selected.text() +"</option>");
		_selected.remove();
	});
}
function initDatepicker() {
	// datepicker
	var dateFormat = 'yy-mm-dd',
		from = $('#datepickerFrom').datepicker({
										defaultDate: '+1w',
										changeMonth: true,
										numberOfMonths: 1,
										dateFormat: 'yy-mm-dd',
										prevText: '이전 달',
										nextText: '다음 달',
										monthNames: ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'],
										monthNamesShort: ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'],
										dayNames: ['일', '월', '화', '수', '목', '금', '토'],
										dayNamesShort: ['일', '월', '화', '수', '목', '금', '토'],
										dayNamesMin: ['일', '월', '화', '수', '목', '금', '토'],
										showMonthAfterYear: true,
										yearSuffix: '년',
										maxDate: 'today'
									})
									.on('change', function () {
										to.datepicker('option', 'minDate', getDate(this));
									}),
		to = $('#datepickerTo').datepicker({
									defaultDate: '+1w',
									changeMonth: true,
									numberOfMonths: 1,
									dateFormat: 'yy-mm-dd',
									prevText: '이전 달',
									nextText: '다음 달',
									monthNames: ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'],
									monthNamesShort: ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'],
									dayNames: ['일', '월', '화', '수', '목', '금', '토'],
									dayNamesShort: ['일', '월', '화', '수', '목', '금', '토'],
									dayNamesMin: ['일', '월', '화', '수', '목', '금', '토'],
									showMonthAfterYear: true,
									yearSuffix: '년',
									maxDate: 'today'
								})
								.on('change', function () {
									// from.datepicker('option', 'maxDate', getDate(this));
								});
}

function getDate(element) {
	var date;
	try {
		date = $.datepicker.parseDate(dateFormat, element.value);
	} catch (error) {
		date = null;
	}
	return date;
}

// 팝업호출 (파일트리의 context menu 클릭 시 팝업 호출 등 함수로 팝업제어할때 사용)
function contextPopup(id) { 
	var _target = id;
	$('.popup_box').css('z-index', 1);
	$('#' + _target).fadeIn(200);
	$('#' + _target).css('z-index', 2);
}
// 팝업닫기
function contextPopupClose(id) { 
	var _target = id;
	$('#' + _target).fadeOut(200);
	$('#' + _target).css('z-index', 1);
}
function closeContextPopup() {
	$('.popup_box').fadeOut(200);
	$('.popup_box').css('z-index', 1);
}