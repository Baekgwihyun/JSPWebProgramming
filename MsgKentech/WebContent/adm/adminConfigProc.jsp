<%@page import="kr.co.ultari.common.StringTool"%>
<%@page import="kr.co.ultari.authentication.AuthenticationService"%>
<%@page import="kr.co.ultari.authentication.PropertyManager"%>
<%@ page import="java.io.*" %>

<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>

<%

request.setCharacterEncoding("utf-8");
String adminId = (String) request.getSession().getAttribute("adminId");
PropertyManager propertyManager = new PropertyManager();
AuthenticationService authenticationService = new AuthenticationService(propertyManager);

String mbMaxFileSize = StringTool.NullTrim(request.getParameter("fileDownDate"));
String mbProFileYN = StringTool.NullTrim(request.getParameter("maxFileSize"));
  
  
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
	var fileDownDate = document.getElementById("fileDownDate").value;
	var maxFileSize = document.getElementById("maxFileSize").value;
	
	if(fileDownDate && maxFileSize == "")
	{
		alert("변경할 정보를 입력하세요.");
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


</body>
</html>