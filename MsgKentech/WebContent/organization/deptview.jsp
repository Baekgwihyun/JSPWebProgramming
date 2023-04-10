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
	
	DBController db = new DBController();
	Properties prot = new Properties();
	String protPath = "/config/Config.properties";
	prot.load(getClass().getResourceAsStream(protPath));
	
	String sQuery = prot.getProperty("DEPTVIEWQUERY").trim();
	String[] val = {tabId};
	
	String[] sContent = db.getContent(sQuery,val);
	
	String deptType = StringTool.NullTrim(sContent[4]);
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
	return "deptview";
}

function goAdd()
{
	var form = document.MainForm;
	form.method = "post";
	form.action = "deptadd.jsp";
	form.submit();
}

function goSave()
{
	var form = document.MainForm;
	form.method = "post";
	form.action = "deptsave.jsp?gubun=MOD";
	form.submit();
}
function GetNowDept()
{
	document.getElementById("deptId").value = parent.document.getElementById("deptId").value;
	document.getElementById("deptNm").value = parent.document.getElementById("deptNm").value;
}

function goDel()
{
	if(confirm("삭제 하시겠습니까?"))
	{
		var form = document.MainForm;
		form.method = "post";
		form.action = "deptsave.jsp?gubun=DEL";
		form.submit();
	}
}
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
						<button class="btn_type bg_base" type="button" id="userSave" onClick="javascript:goAdd();"><span>추가</span></button>&nbsp;
						
<%
						if(deptType.equals("ADD"))
						{
%>    			
						<button class="btn_type bg_base" type="button" id="userDelete" onClick="javascript:goSave();"><span>저장</span></button>&nbsp;
						<button class="btn_type bg_base" type="button" id="userMove" onClick="javascript:goDel();"><span>삭제</span></button>
<%
						}
%>  						
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
								<th >부서코드</th>
								<th colspan="2"><input type="text" name="deptId" id="deptId" value="<%=StringTool.NullTrim(sContent[0])%>" style="width:100%;" readonly></th>
								<th></th>
							</tr>
							<tr>
								<th>상위부서코드</th>
								<th colspan="2"><input type="text" name="deptHigh" id="deptHigh" value="<%=StringTool.NullTrim(sContent[1])%>" style="width:100%;" readonly></th>
								<th></th>
							</tr>
							<tr>
								<th>부서명</th>
								<th colspan="2"><input type="text" name="deptNm" id="deptNm" value="<%=StringTool.NullTrim(sContent[2])%>" value="" style="width:100%;"></th>
								<th></th>
							</tr>
							<tr>
								<th>정렬순서</th>
								<th colspan="2"><input type="text" name="deptSort" id="deptSort" value="<%=StringTool.NullTrim(sContent[3])%>" style="width:100%;"></th>
								<th></th>
							</tr>
							<tr>
								<th>구분</th>
								<th colspan="2"><input type="text" name="deptType" id="deptType" value="<%=StringTool.NullTrim(sContent[4])%>" style="width:100%;"></th>
								<th></th>
							</tr>
							<tr>
								<th colspan="3">※ ADD 부서는 부서명 및 정렬순서 변경 가능 (ORG 부서 변경 불가)</th>
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