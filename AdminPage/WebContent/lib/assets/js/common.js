$(function(){

	// 검색어 입력시 하이라이트 표시
	$('.highlight_input').on('keyup', function(){
		var _target = $(this).attr('highlight-target-id');
		if($(this).hasClass('type_name')) {
			$('#' + _target).find('.name').unhighlight();
			$('#' + _target).find('.name').highlight($(this).val());
		}else{
			$('#' + _target).unhighlight();
			$('#' + _target).highlight($(this).val());
		}
	});
	
	// 대화방 리스트
	$('.talk_romm_list ul li').each(function(){
		if($(this).find('p.member').length != 0) {
			// 참여인원 툴팁
			// $(this).attr('data-tooltip-text', $(this).find('p').text());
			$(this).attr('title', $(this).find('p.member').text());

			// 참여인원 표시
			var WidthLi = $(this).width();
			var WidthP = $(this).find('p.member').outerWidth();
			if (WidthLi == WidthP) {
				var _length = $(this).find('p.member').text().split(',');
				$(this).append('<span class="length">(' + _length.length + ')</span>');
			}
		}
	});
	
	// 대화방 선택
	if($('.note_tab').length != 0) {
		// 쪽지 페이지 스크립트
		$('.note_tab > ul > li').on('click', function(){
			var i = $(this).index();
			$('.note_tab > ul > li').not(this).removeClass('on');
			$(this).addClass('on');
			//$('.note_list .talk_romm_list').removeClass('on');
			//$('.note_list .talk_romm_list').eq(i).addClass('on');
			$('.note_conts__head > dl > dd').text('');
			$('.note_conts__body > textarea').text('');
			$('.note_conts__body__download').text('');
			//$('.talk_romm_conts ul').removeClass('on');
			//$('.talk_romm_conts ul').eq(i).addClass('on');
			
			//noteContSelect(); // 쪽지목록 선택시 실행함수
		});
		/*
		noteContSelect(); // 쪽지목록 선택시 실행함수
		function noteContSelect() {
			$('.talk_romm_list.on ul li').on('click', function(){
				var i = $(this).index();
				$('.talk_romm_list.on ul li').not(this).removeClass('on');
				$(this).addClass('on');
				$('.talk_romm_conts ul.on li').removeClass('on');
				$('.talk_romm_conts ul.on li').eq(i).addClass('on');
			});
		}
		*/
	}else{
		// 대화 페이지 스크립트
		$('.talk_romm_list ul li').on('click', function(){
			var i = $(this).index();
			$('.talk_romm_list ul li').not(this).removeClass('on');
			$(this).addClass('on');
			$('.talk_romm_conts ul li').removeClass('on');
			$('.talk_romm_conts ul li').eq(i).addClass('on');
		});
		/*
		$('.btn_talkroom_next').on('click', function(){
			var i = $('.talk_romm_conts ul li.on').index();
			var _length = $('.talk_romm_conts ul li').length;
			if(i == _length-1) {
				$('.talk_romm_list ul li').eq(i).removeClass('on');
				$('.talk_romm_list ul li').eq(0).addClass('on');
				$('.talk_romm_conts ul li').eq(i).removeClass('on');
				$('.talk_romm_conts ul li').eq(0).addClass('on');
			}else {
				$('.talk_romm_list ul li').eq(i).removeClass('on');
				$('.talk_romm_list ul li').eq(i+1).addClass('on');
				$('.talk_romm_conts ul li').eq(i).removeClass('on');
				$('.talk_romm_conts ul li').eq(i+1).addClass('on');
			}
		});
		$('.btn_talkroom_prev').on('click', function(){
			var i = $('.talk_romm_conts ul li.on').index();
			var _length = $('.talk_romm_conts ul li').length;
			if(i == 0) {
				$('.talk_romm_list ul li').eq(i).removeClass('on');
				$('.talk_romm_list ul li').eq(length-1).addClass('on');
				$('.talk_romm_conts ul li').eq(i).removeClass('on');
				$('.talk_romm_conts ul li').eq(length-1).addClass('on');
			}else {
				$('.talk_romm_list ul li').eq(i).removeClass('on');
				$('.talk_romm_list ul li').eq(i-1).addClass('on');
				$('.talk_romm_conts ul li').eq(i).removeClass('on');
				$('.talk_romm_conts ul li').eq(i-1).addClass('on');
			}
		});*/
	}
	
	// custom scrollbar
	//if($(".over-area").length != 0) {
	//	$(".over-area:not(.type_horizontal)").mCustomScrollbar({
			//theme:"minimal"
	//	});
		/* $(".over-area.type_horizontal").mCustomScrollbar({
			axis:"x",
			advanced:{autoExpandHorizontalScroll:true}
		}); */
	//}
	
	$.datepicker.setDefaults({
	    dateFormat: 'yy-mm-dd',
	    changeYear: true,
		changeMonth: true,
	    prevText: '이전 달',
	    nextText: '다음 달',
	    monthNames: ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'],
	    monthNamesShort: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'],
	    dayNames: ['일', '월', '화', '수', '목', '금', '토'],
	    dayNamesShort: ['일', '월', '화', '수', '목', '금', '토'],
	    dayNamesMin: ['일', '월', '화', '수', '목', '금', '토'],
	    showMonthAfterYear: true,
	    showButtonPanel: true,
	    currentText: '오늘', 
	    closeText: '삭제',
	    onClose: function (dateText, inst) {
	    	if ($(window.event.srcElement).hasClass('ui-datepicker-close'))
			{
	    		var dates = $(this);
	    		dates.attr("value", "");
	    	    dates.each(function(){
	    	        $.datepicker._clearDate(this);
	    	    });
			}
	    }
	});
	
	$('#datepickerTo').datepicker({
    	onSelect: function( selectedDate ) {
    		var d = new Date(selectedDate)
    		d.setDate( d.getDate() + 31 );
			$('#datepickerFrom').datepicker( 'option', 'minDate', selectedDate );
        	$('#datepickerFrom').datepicker( 'option', 'maxDate', d );
   		}                
	});

    $('#datepickerFrom').datepicker({
    	onSelect: function( selectedDate ) {
    		console.log(selectedDate);
    		var d = new Date(selectedDate)
        	d.setDate( d.getDate() - 31 );
			$('#datepickerTo').datepicker( 'option', 'minDate', d );
            $('#datepickerTo').datepicker( 'option', 'maxDate', selectedDate );
        }                
    });

	function getDate(element) {
		var date;
		try {
			date = $.datepicker.parseDate(dateFormat, element.value);
		} catch (error) {
			date = null;
		}
		return date;
	}
	
	// 대화내용 다운로드 버튼 마우스 이벤트
	/*
	$('.btn_talk').mouseenter(function () {
		$('.talk_romm_conts ul li.on').addClass('download-area');
	}).mouseleave(function () {
		$('.talk_romm_conts ul li.on').removeClass('download-area');
	});
	*/
});

// 알림팝업 생성
function dataAlertDesign(alertTitle, alertMsg) {
	$('#container').append($('<div class="alert_design_form">\
								<div class="alert_design_form__inner">\
									<div class="alert_design_form__inner__cont">\
										<div>\
											<h2>' + alertTitle + '</h2>\
											<p>' + alertMsg +'</p>\
										</div>\
									</div>\
									<div class="alert_design_form__inner__btn">\
										<a href="javascript:clearAlert();">Cancel</a>\
									</div>\
								</div>\
							</div>').hide().fadeIn(200, function(){$(this).addClass('on');}))
}
// 알림팝업 제거
function clearAlert() {
	$('.alert_design_form').removeClass('on');
	$('.alert_design_form').fadeOut(200, function(){$(this).remove();});
}
