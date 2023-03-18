<%@ page language="java" contentType="text/html; charset=utf-8"
    pageEncoding="utf-8"%>
<%@ page import="java.util.*" %>
<%@ page import="java.text.*" %>    
<%@ page import="kr.co.ultari.common.StringTool" %>
<%@ page import="kr.co.ultari.db.DBController" %>
<%
	request.setCharacterEncoding("utf-8");
	
	String PN = StringTool.NullTrim(request.getParameter("PN"));
	String tabId = StringTool.NullTrim(request.getParameter("tabId"));
	
	
	String deptType = "";
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
function checkPage()
{
	return "deptadd";
}

function goAdd()
{
	var form = document.MainForm;
	form.method = "post";
	form.action = "deptview.jsp";
	form.submit();
}

function goSave()
{
	if(document.getElementById("deptNm").value == "")
	{
		alert("부서명을 입력하세요.");
		document.getElementById("deptNm").focus();
		return
	}
	else
	{
		var form = document.MainForm;
		form.method = "post";
		form.action = "deptsave.jsp?gubun=ADD";
		form.submit();
	}
}
function GetNowDept()
{
	document.getElementById("selHigh").value = parent.document.getElementById("deptId").value;
	document.getElementById("selHighNm").value = parent.document.getElementById("deptNm").value;
}

function goBack()
{
	var form = document.MainForm;
	form.method = "post";
	form.action = "deptview.jsp";
	form.submit();
}

function SetDeptNm(id,nm)
{
	document.getElementById("selHigh").value = id;
	document.getElementById("selHighNm").value = nm;
}
//글자제한, 숫자만 입력
$(function()
{
	$(document).on("keyup", "#deptSort", function() 
	{
		if($(this).val().length > 6)
			this.value = this.value.substring(0,6);
	});
	
	$("#deptSort").keypress(function(event)
	{
		if (event.which && (event.which > 47 && event.which < 58 || event.which == 8)) {
		}
		else
		{
			event.preventDefault();
		}
	});   

	//크롬등에서 ime-mode:disabled 정상작동 되지않으므로 정규식으로 처리
    $("#deptSort").keyup(function(event)
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
			
			<iframe src="topmenu.jsp?tab=2&tabId=<%=tabId%>" name="topmenu" id="topmenu" width="100%" height="35" frameborder="0" marginwidth="0" marginheight="0" scrolling="no"></iframe>
			<!-- 컨텐츠 영역 -->
			<div id="searchArea" class="conts_body">
				<div class="toptable">
					<table>
						<button class="btn_type bg_base" type="button" id="userSave" onClick="javascript:goSave();"><span>저장</span></button>&nbsp;
						<button class="btn_type bg_base" type="button" id="userDelete" onClick="javascript:goBack();"><span>취소</span></button>&nbsp;
					</table>
					<br>
				</div>
				<div class="dtable">
					<table>
						<colgroup>
							<col style="width: 100px"/>
							<col style="width: 400px"/>
							<col style="width: 100px"/>
							<col style="width:"/>
						</colgroup>
						<thead>
							<tr>
								<th>상위부서코드</th>
								<th colspan="2"><input type="text" name="selHigh" id="selHigh" value="" style="width:100%;" readonly></th>
								<th></th>
							</tr>
							<tr>
								<th>상위부서명</th>
								<th colspan="2"><input type="text" name="selHighNm" id="selHighNm" value="" style="width:100%;"></th>
								<th></th>
							</tr>
							<tr>
								<th>부서명</th>
								<th colspan="2"><input type="text" name="deptNm" id="deptNm" value="" style="width:100%;"></th>
								<th></th>
							</tr>
							<tr>
								<th>정렬순서</th>
								<th colspan="2"><input type="text" name="deptSort" id="deptSort" value="" style="width:100%;"></th>
								<th></th>
							</tr>
							<tr>
								<th colspan="3">※ 부서코드는 자동 채번 되고, 선택된 부서의 하부로 생성됩니다.</th>
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