var stompClient = null;
var connectionId = uuidv4();
var nowKey = null;
var nowHostName = null;

function connect() {
    var socket = new SockJS('/ws');
    stompClient = Stomp.over(socket);
    stompClient.connect({}, function (frame) {
        console.log('Connected: ' + frame);
        stompClient.subscribe('/event/process', function (message) {
            recvEvent(message);
        });
        
        stompClient.subscribe('/response/getallprocess/' + connectionId, function (message) {
	    	recvResponse(message);
		});
        
        sendRequest("getallprocess");
    });
}

function recvResponse(message)
{
	var hostname = Object.keys(JSON.parse(message.body).dto);
	var dto = JSON.parse(message.body).dto;
	getServerDOM(dto);
}

function recvEvent(message)
{
	var body = JSON.parse(message.body);
	var dto = body.dto;
	
	if(dto.command=="onProcessStarted")
	{
		
		$(".btnProcess").each(function()
		{
			if($(this).attr("hostName")==dto.hostName&&$(this).attr("key")==dto.key)
			{
				$(this).removeClass("bg_base");
				$(this).addClass("bg_red");
				$(this).attr("data-popup-id","processStop");
				$(this).children().text("Stop");
			}
		});
	}
	else if(dto.command=="onProcessDestroyed")
	{
		console.log(dto);
		$(".btnProcess").each(function()
		{
			if($(this).attr("hostName")==dto.hostName&&$(this).attr("key")==dto.key)
			{
				$(this).removeClass("bg_red");
				$(this).addClass("bg_base");
				$(this).attr("data-popup-id","processStart");
				$(this).children().text("Start");
			}
		});
	}
}

function disconnect() {
    if (stompClient !== null) {
        stompClient.disconnect();
    }
    setConnected(false);
    console.log("Disconnected");
}

function sendRequest() {
    
	if(arguments.length>1)
	{
    	stompClient.send("/app/" + arguments[0] + "/" + connectionId,{},arguments[1]);
    }
    else
    {
    	stompClient.send("/app/" + arguments[0] + "/" + connectionId);
    }
}

function getServerDOM(dto)
{
	for(var key in dto)
	{
		var div = [];
		div[0] = $("<div/>");
		div[1] = $("<div/>");
		div[2] = $("<div/>");
		div[3] = $("<div/>");
		$(div[0]).addClass("flex_col_4");
		$(div[1]).addClass("jumbo_box");
		$(div[2]).addClass("process_body");
		
		var div_2_h5 = $("<h5/>");
		var div_2_h5_img = $("<img/>");
		
		$(div_2_h5_img).attr("src","../common/img/ico_process.png");
		$(div_2_h5_img).attr("alt","");
		
		var div_2_h5_span = $("<span/>");
		$(div_2_h5_span).text(key);
		$(div[3]).addClass("process_body__list");
		var div_3_ul = $("<ul/>");
		for(var i=0;i<dto[key].length;i++)
		{
			var ul_li = $("<li/>");
			var ul_li_span = $("<span/>");
			$(ul_li_span).text(dto[key][i].key);
			var ul_li_button = $("<button/>");
			$(ul_li_button).addClass("btn_type");
			$(ul_li_button).addClass("btnProcess");
			$(ul_li_button).attr("type","button");
			var ul_li_button_span = $("<span/>");
			$(ul_li_button).attr("hostName",key);
			$(ul_li_button).attr("key",dto[key][i].key);
			if(dto[key][i].alive)
			{
				$(ul_li_button).addClass("bg_red");
				$(ul_li_button).attr("data-popup-id","processStop");
				$(ul_li_button_span).text("Stop");
				
			}
			else
			{
				$(ul_li_button).addClass("bg_base");
				$(ul_li_button).attr("data-popup-id","processStart");
				$(ul_li_button_span).text("Start");
			}
			
			$(ul_li_button).on('click', function(e){
				e.preventDefault();
				var _target = $(this).attr('data-popup-id');
				$('.popupProcessName').text($(this).attr("hostName") + "-" + $(this).attr("key"));
				nowKey = $(this).attr("key");
				nowHostName = $(this).attr("hostName");
				$('.popup_box').css('z-index', 1);
				$('#' + _target).fadeIn(200);
				$('#' + _target).css('z-index', 2);
			});
			
			$(ul_li_button).append(ul_li_button_span);
			$(ul_li).append(ul_li_span);
			$(ul_li).append(ul_li_button);
			$(div_3_ul).append(ul_li);
		}
		$(div[3]).append(div_3_ul);
		$(div_2_h5).append(div_2_h5_img);
		$(div_2_h5).append(div_2_h5_span);
		$(div[2]).append(div_2_h5);
		$(div[2]).append(div[3]);
		$(div[1]).append(div[2]);
		$(div[0]).append(div[1]);
		$(".flex_box").append(div[0]);
	}
}

function uuidv4() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}

function startProcess(hostName, key)
{
	var obj = new Object();
	obj.param = new Object();
	obj.param.hostName = nowHostName;
	obj.param.key = nowKey;
	
	stompClient.subscribe('/response/startprocess/' + connectionId, function (message) {
	    	console.log(message);
	});
	
	sendRequest("startprocess",JSON.stringify(obj));
}

function stopProcess(hostName, key)
{
	var obj = new Object();
	obj.param = new Object();
	obj.param.hostName = nowHostName;
	obj.param.key = nowKey;
	stompClient.subscribe('/response/stopprocess/' + connectionId, function (message) {
	    	console.log(message);
	});
	sendRequest("stopprocess",JSON.stringify(obj));
}

$(document).ready(function() 
{
	connect();
	
	$("#btnProcessStart").click(function()
	{
		startProcess($(this).attr("hostName"),$(this).attr("key"));
	});
	
	$("#btnProcessStop").click(function()
	{
		stopProcess($(this).attr("hostName"),$(this).attr("key"));		
	});
});
