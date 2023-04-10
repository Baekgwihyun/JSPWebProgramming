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
	
	String idList = StringTool.NullTrim(request.getParameter("idList"));
	idList = idList.substring(0, idList.length() -1);
	String nameList = StringTool.NullTrim(request.getParameter("nameList"));
	nameList = nameList.substring(0, nameList.length() -1);
	
	String sSrchGubun = StringTool.NullTrim(request.getParameter("sSrchGubun"));
	String sSrchText = StringTool.NullTrim(request.getParameter("sSrchText"));
	
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
	return "move";
}

function SetDeptNm(id,nm)
{
	document.getElementById('deptId').value = id;
	document.getElementById('deptNm').value = nm;
}
function goBack()
{
	form = document.MainForm;
	form.method = "post";
	form.action = "srch.jsp";
	form.submit();
}

function goSave()
{
	form = document.MainForm;
	form.method = "post";
	form.action = "srchsave.jsp?gubun=MOVE";
	form.submit();
}
function GetNowDept()
{
	document.getElementById("deptId").value = parent.document.getElementById("deptId").value;
	document.getElementById("deptNm").value = parent.document.getElementById("deptNm").value;
}
</script>
</head>
<body  onload="javascript:GetNowDept();">
	<div class="conts_inner_right">
	<!-- 우측 영역 -->
		<form name="MainForm" class="conts_inner__article jumbo_box">
			<input type="hidden" name="tabId" id="tabId" value="<%=tabId%>">
			<input type="hidden" name="orgDeptId" id="orgDeptId" value="">
			<input type="hidden" name="orgDeptNm" id="orgDeptNm" value="">
			<input type="hidden" name="PN" id="PN" value="<%=PN%>">
			
			<input type="hidden" name="sSrchGubun" id="sSrchGubun" value="<%=sSrchGubun%>">
			<input type="hidden" name="sSrchText" id="sSrchText" value="<%=sSrchText%>">
			
			<iframe src="topmenu.jsp?tab=3&tabId=<%=tabId%>" name="topmenu" id="topmenu" width="100%" height="35" frameborder="0" marginwidth="0" marginheight="0" scrolling="no"></iframe>
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
								<th>사용자 이름</th>
								<input type="hidden" name="idList" id="idList" value="<%=idList%>">
								<th colspan="2"><textarea name="job" id="job" rows="5" class="formtype" style="width:100%;"><%=StringTool.NullTrim(nameList) %></textarea></th>
								<th></th>
							</tr>
							<tr>
								<th>이동 할 부서명</th>
								<th colspan="2"><input type="text" name="deptNm" id="deptNm" value="" style="width:100%;" readonly></th>
								<input type="hidden" name="deptId" id="deptId" value="">
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