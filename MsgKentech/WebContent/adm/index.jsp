<%@page import="kr.co.ultari.authentication.AuthenticationService"%>
<%@page import="kr.co.ultari.authentication.PropertyManager"%>
<%@page import="kr.co.ultari.authentication.AdminConfigController"%>
<%@ page language="java" contentType="text/html; charset=utf-8"
    pageEncoding="utf-8"%>
<%@ page import="java.util.*" %>
<%@ page import="java.text.*" %>    
<%@ page import="kr.co.ultari.common.StringTool" %>
<%
	request.setCharacterEncoding("utf-8");
String adminId = (String) request.getSession().getAttribute("adminId");

PropertyManager propertyManager = new PropertyManager();
AuthenticationService authenticationService = new AuthenticationService(propertyManager);
ArrayList<String> result = authenticationService.getMobileConfig();
List<String> diskresult = authenticationService.getDiskConfig(); 

if ( adminId == null )
{
%>
<script language=javascript>
	document.onload = noId();
	function noId()
	{
		parent.document.location.href = "../index.html";
	}
	
</script>
<%
}

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


function goSave()
{
	var form = document.MainForm;
	var pwd = document.getElementById("pwd").value;
	
	if(pwd == "")
	{
		alert("변경할 패스워드를 입력하세요.");
	}
	else
	{
		form.method = "post";
		form.action = "save.jsp";
		form.submit();
	}
}
</script>
</head>
<body>
<section id="wrap">
		<section class="wrap_layout">
				<div data-include-path="../include/nav.html"></div>
			<section>
				<div data-include-path="../include/out.html"></div>
				<script>

						window.addEventListener('load', function() {
								var allElements = document.getElementsByTagName('*');
								Array.prototype.forEach.call(allElements, function(el) {
										var includePath = el.dataset.includePath;
										if (includePath) {
												var xhttp = new XMLHttpRequest();
												xhttp.onreadystatechange = function () {
														if (this.readyState == 4 && this.status == 200) {
																el.outerHTML = this.responseText;
														}
												};
												xhttp.open('GET', includePath, true);
												xhttp.send();
										}
								});
						});

				</script>

				<section id="container">
					<header class="sub_head">
						<h2><i class="ico_tit sub05"></i> <span>관리자 패스워드 변경</span></h2>
					</header>
					<div class="conts_inner">
						<article class="conts_inner__article over-area">
							<form name="MainForm" class="conts_inner__article__inner jumbo_box">
							<input type="hidden" name="seqList" id="seqList" value="">
								<div id="searchArea" class="conts_body">
									<div class="toptable">
										<table>
											<button class="btn_type bg_base" type="button" id="userSave" onClick="goSave();"><span>저장</span></button>&nbsp;
										</table>
										<br>
									</div>
									<div class="depttable">
										<table>
											<colgroup>
												<col style="width: 200px"/>
												<col style="width: 400px"/>
												<col style="width:"/>
											</colgroup>
											<thead>
												<tr>
													<th>관리자 로그인 패스워드</th>
													<th><input type="password" name="pwd" id="pwd" value="" style="width:100%;ime-mode:disabled;"></th>
													<th></th>
												</tr>
											</thead>
										</table>
									</div>
								</div>
							</form>
							
							<form name="FileCtrlForm" class="conts_inner__article__inner jumbo_box" action="adminConfigProc.jsp">
							<input type="hidden" name="seqList" id="seqList" value="">
								<div id="searchArea" class="conts_body">
									<div class="toptable">
										<table>
											<!-- <button class="btn_type bg_base" type="button" id="configSave" onClick=""><span>저장</span></button>&nbsp; -->
											<button class="btn_type bg_base" type="submit" id="configSave" onClick=""><span>저장</span></button>&nbsp;
										</table>
										<br>
									</div>
									<div class="depttable">
									<table>
											<colgroup>
												<col style="width: 200px"/>
												<col style="width: 400px"/>
												<col style="width:"/>
											</colgroup>
											<thead>
												<tr>
													<th>미수신 대화, 쪽지 보관 기간</th>
													<th><input type="text" name="chatDate" id="chatDate" value="<%= Integer.toString(Integer.parseInt(diskresult.get(0))/ 24)%> " style="width:100%;ime-mode:disabled;"></th>
													<th></th>
												</tr>
											</thead>
										</table>
										<table>
											<colgroup>
												<col style="width: 200px"/>
												<col style="width: 400px"/>
												<col style="width:"/>
											</colgroup>
											<thead>
												<tr>
													<th>첨부파일 다운로드 기간</th>
													<th><input type="text" name="fileDownDate" id="fileDownDate" value="<%=Integer.toString(Integer.parseInt(diskresult.get(1)) / 24) %>" style="width:100%;ime-mode:disabled;"></th>
													<th></th>
												</tr>
											</thead>
										</table>
										<table>
											<colgroup>
												<col style="width: 200px"/>
												<col style="width: 400px"/>
												<col style="width:"/>
											</colgroup>
											<thead>
												<tr>
													<th>첨부파일 전송 용량</th>
													<th><input type="text" name="maxFileSize" id="maxFileSize" value="<%=result.get(0)%>" style="width:100%;ime-mode:disabled;">MB</th>
													<th></th>
												</tr>
											</thead>
										</table>
										
										<table>
											<colgroup>
												<col style="width: 200px"/>
												<col style="width: 400px"/>
												<col style="width:"/>
											</colgroup>
											<thead>
												<tr>
													<th>프로필 변경</th>
													<th><input type="text" name="profileYN" id="profileYN" value="<%=result.get(1)%>" style="width:100%;ime-mode:disabled;">Y&N</th>
													<th></th>
												</tr>
											</thead>
										</table>
									</div>
								</div>
							</form>
						</article>
					</div>
				</section>
				<!-- 첨부파일 저장기간 -->
				
</body>
</html>