<%@ page language="java" contentType="text/html; charset=utf-8"
    pageEncoding="utf-8"%>
<%@ page import="java.util.*" %>
<%@ page import="java.text.*" %>    
<%@ page import="kr.co.ultari.common.StringTool" %>
<%@ page import="kr.co.ultari.db.DBController" %>
<%
	
	request.setCharacterEncoding("utf-8");
	
	String tabId = StringTool.NullTrim(request.getParameter("tabId"));
	String PN = StringTool.NullTrim(request.getParameter("PN"));
%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
	<meta http-equiv="X-UA-Compatible" content="IE=Edge">
	<title>조직관리</title>
	
	<!-- lib -->
	<link rel="shortcut icon" th:href="../lib/common/img/favicon.ico">
	<link rel="stylesheet" type="text/css" href="../lib/common/lib/fontAwesome/fontawesome.min.css" />
	<link rel="stylesheet" type="text/css" href="../lib/common/lib/jquery-ui-datepicker/jquery-ui.min.css" />
	<link rel="stylesheet" type="text/css" href="../lib/common/lib/jqtree/jqtree.css" />
	
	<script type="text/javascript" src="../lib/common/lib/jquery/jquery-3.2.1.min.js"></script>
	<script type="text/javascript" src="../lib/common/lib/jquery-ui-datepicker/jquery-ui.min.js"></script>
	<script type="text/javascript" src="../lib/common/lib/searchHighlight/SearchHighlight.js"></script>
	<script type="text/javascript" src="../lib/common/lib/jqtree/tree.jquery.js"></script>
	<script type="text/javascript" src="../lib/common/lib/jqtree/jqTreeContextMenu.js"></script>
	
	<!-- css -->
	<link rel="stylesheet" type="text/css" href="../lib/common/css/fonts/fonts.css" />
	<link rel="stylesheet" type="text/css" href="../lib/common/css/style.css" />
	
	<!-- js -->
	<script type="text/javascript" src="../lib/common/js/dto.js"></script>
	<script type="text/javascript" src="../lib/common/js/common.js"></script>
	<script type="text/javascript" src="../lib/common/js/organization/app.js"></script>
	<script type="text/javascript" src="../lib/common/js/sweetalert/sweetalert.min.js"></script>
	
	<script type="text/javascript" src="../common/js/WinUtil.js"></script>
<script language="javascript" >
var ClassLoader = "Service.jsp";
var ClassName = "kr.co.ultari.process.CheckId";
checkData.prototype.toJ = function()
{
	return JSON.stringify(this);
}

String.prototype.Enc = function()
{
	return chgEnc(this);
}
function checkData(id)
{
	this.C = "";
	this.M = "";
	this.ReqType = "JSON";
	this.id = id;
	this.setMethod = function(M)
	{
		this.C = ClassName;
		this.M = M;
		return this;	
	}
}

function checkPage()
{
	return "add";
}

function goBack()
{
	var form = document.MainForm;
	form.method = "post";
	form.action = "usrlist.jsp?gubun=ADD";
	form.submit();
}

function goSave()
{
	if(document.getElementById("checkOk").value == "ok" && document.getElementById("checkId").value == document.getElementById("userId").value)
	{
		if(document.getElementById("userId").value == "")
		{
			alert("아이디를 입력하세요.");
			document.getElementById("userId").focus();
			return
		}else if(document.getElementById("userId").value.length < 4)
		{
			 alert("최소 네글자 이상 입력하세요.");
			 document.getElementById("userId").focus();
			 return
		}else if(checkStr("userId",document.getElementById("userId").value) == false)
		{ 
			document.getElementById("userId").focus();
			return 
		}
		
		else if(document.getElementById("userNm").value == "")
		{
			alert("이름을 입력하세요.");
			document.getElementById("userNm").focus();
			return
		}else if(checkStr("userNm",document.getElementById("userNm").value) == false) 
		{ 
			document.getElementById("userNm").focus();
			return 
		}
		
		else if(document.getElementById("order").value.length > 7)
		{
			alert("정렬순서는 최대 6자리까지 입력하세요");
			document.getElementById("order").focus();
			return
		}
		
		else
		{
			var form = document.MainForm;
			form.method = "post";
			form.action = "usrsave.jsp?gubun=ADD";
			form.submit();
		}
	}
	else
	{
		alert("아이디 중복체크를 해주세요.");
		return
	}
}

function setDept(id,nm,orgHigh)
{
	//alert(id+" / " + nm + " / " + orgHigh);
	document.getElementById('selDeptId').value = id;
	document.getElementById('groupHighId').value = orgHigh;
	document.getElementById('groupHighNm').value = nm;
}

function SetDeptNm(id,nm)
{
	document.getElementById("deptId").value = id;
	document.getElementById("deptNm").value = nm;
}

function onlyNum()
{
	 var code = window.event.keyCode;  

	 if ((code > 34 && code < 41) || (code > 47 && code < 58) || (code > 95 && code < 106) || code == 8 || code == 9 || code == 13 || code == 46) 
	 { 
		window.event.returnValue = true;
		return;
	 }

	 window.event.returnValue = false;
}

function CheckDuplication()
{
	var id = document.getElementById("userId").value;
	if(id != "")
	{
		if(id.length >= 4)
		{
			$.ajax(
			{
				type : "POST",
				url : ClassLoader,
				dataType : "JSON",
				data : new checkData(id).setMethod("checkOverLap").toJ(),
				success:function (data)
				{
					if(data.status == "ok")
					{
						alert("사용할 수 있는 아이디입니다.");
						document.getElementById('checkOk').value = "ok";
						document.getElementById('checkId').value = id;
						return
					}else
					{
						alert("사용할 수 없는 아이디입니다.");
						document.getElementById('checkId').value = "";
						document.getElementById('userId').value = "";
						document.getElementById('checkOk').value = "";
						return
					}
				},
				error:function ()
				{
					alert("중복체크 에러 관리자에게 문의하세요.");
				}
			});
		}else
		{
			alert("최소 4글자 이상 입력하세요.");
			return
		}
	}else
	{
		alert("아이디를 입력하세요");
		return
	}
}

function GetNowDept()
{
	document.getElementById("deptId").value = parent.document.getElementById("deptId").value;
	document.getElementById("deptNm").value = parent.document.getElementById("deptNm").value;
}

function checkStr(name,str)
{
	var countnum = 0;
	var checkstr = "script,alert,/script,cookie,document";
	checkstr = checkstr.split(",");
	
	str = str.toLowerCase();

	for(var i=0; i < checkstr.length; i++)
	{
		if(str.match(checkstr[i]) != null)
		{
			countnum++;
		}
	}
	
	if(countnum != 0)
	{
		alert("허용되지 않는 문자열이 있습니다.");
		document.getElementById(name).value = "";
		return false
	}
}

//글자제한, 숫자만 입력
$(function()
{
	$(document).on("keyup", "#order", function() 
	{
		if($(this).val().length > 6)
			this.value = this.value.substring(0,6);
	});
	
	$("#order").keypress(function(event)
	{
		if (event.which && (event.which > 47 && event.which < 58 || event.which == 8)) {
		}
		else
		{
			event.preventDefault();
		}
	});   

	//크롬등에서 ime-mode:disabled 정상작동 되지않으므로 정규식으로 처리
    $("#order").keyup(function(event)
	{
		$(this).val($(this).val().replace(/[^0-9]/g,''));
    });
});
</script>
</head>
<body  onload="javascript:GetNowDept();">
	<div class="conts_inner_right">
	<!-- 우측 영역 -->
		<form name="MainForm" class="conts_inner__article jumbo_box">
			<input type="hidden" name="tabId" id="tabId" value="<%=tabId%>">
			<input type="hidden" name="PN" id="PN" value="<%=PN%>">
			<input type="hidden" name="checkOk" id="checkOk" value="">
			<input type="hidden" name="checkId" id="checkId" value="">
			
			<iframe src="topmenu.jsp?tab=1&tabId=<%=tabId%>" name="topmenu" id="topmenu" width="100%" height="35" frameborder="0" marginwidth="0" marginheight="0" scrolling="no"></iframe>
			<!-- 컨텐츠 영역 -->
			<div id="searchArea" class="conts_body">
				<div class="toptable">
					<table>
						<button class="btn_type bg_base" type="button" id="userSave" onClick="javascript:goSave();"><span>저장</span></button>&nbsp;
						<button class="btn_type bg_base" type="button" id="userDelete" onClick="javascript:goBack();"><span>취소</span></button>&nbsp;
					</table>
					<br>
				</div>
				<div class="depttable">
					<table>
						<colgroup>
							<col style="width: 100px"/>
							<col style="width: 400px"/>
							<col style="width: 100px"/>
							<col style="width:"/>
						</colgroup>
						<thead>
							<tr>
								<th height="35px"><span style="color:red">* </span>아이디</th>
								<th><input type="text" name="userId" id="userId" value="" style="width:100%; ime-mode:disabled;"></th>
								<th><button class="btn_type bg_base" type="button" id="userSave" onClick="javascript:CheckDuplication();"><span>중복체크</span></button></th>
								<th></th>
							</tr>
							<tr>
								<th>부서</th>
								<th colspan="2"><input type="text" name="deptNm" id="deptNm" value="" style="width:100%;" readonly></th>
								<input type="hidden" id="deptId" name="deptId" value="">
								<th></th>
							</tr>
							<tr>
								<th><span style="color:red">* </span>이름</th>
								<th colspan="2"><input type="text" name="userNm" id="userNm" value="" style="width:100%;"></th>
								<th></th>
							</tr>
							<tr>
								<th>직위/직급</th>
								<th colspan="2"><input type="text" name="pos" id="pos" value="" style="width:100%;"></th>
								<th></th>
							</tr>
							<tr>
								<th>전화번호</th>
								<th colspan="2"><input type="text" name="phone" id="phone" value="" style="width:100%; ime-mode:disabled;"></th>
								<th></th>
							</tr>
							<tr>
								<th>휴대폰</th>
								<th colspan="2"><input type="text" name="mobile" id="mobile" value="" style="width:100%; ime-mode:disabled;"></th>
								<th></th>
							</tr>
							<tr>
								<th>이메일</th>
								<th colspan="2"><input type="text" name="email" id="email" value="" style="width:100%; ime-mode:disabled;"></th>
								<th></th>
							</tr>
							<tr>
								<th>사원번호</th>
								<th colspan="2"><input type="text" name="empcode" id="empcode" value="" style="width:100%; ime-mode:disabled;"></th>
								<th></th>
							</tr>
							<tr>
								<th>담당업무</th>
								<th colspan="2"><textarea name="job" id="job" rows="5" class="formtype" style="width:100%;"></textarea></th>
								<th></th>
							</tr>
							<tr>
								<th>정렬순서</th>
								<th colspan="2"><input type="text" name="order" id="order" value="" style="width:100%;"></th>
								<th></th>
							</tr>
						</thead>
					</table>
				</div>
			</div>
			<!-- // 컨텐츠 영역 -->
		</form>
	<!-- // 우측 영역 -->
</div>
<!-- // wrap -->

</body>
</html>