<%@page import="kr.co.ultari.admin.controller.PropertyManager"%>
<%@page import="kr.co.ultari.admin.controller.AuthenticationService"%>
<%@page import="kr.co.ultari.process.AdminMgr"%>
<%@ page language="java" contentType="text/html; charset=utf-8"
    pageEncoding="utf-8"%>
<%@ page import="java.util.*" %>
<%@ page import="java.text.*" %>
<%@ page import="java.io.*" %>
<%@ page import="kr.co.ultari.common.StringTool" %>
<%@ page import="kr.co.ultari.db.DBController" %>

<%
	PropertyManager propertyManager = new PropertyManager();
	AuthenticationService authenticationService = new AuthenticationService(propertyManager);
	
	String adminId = StringTool.NullTrim(request.getParameter("adminId"));
	String password = StringTool.NullTrim(request.getParameter("adminPwd"));
	
	boolean result = authenticationService.authentication(adminId, password);
	
	String maxSession = propertyManager.getValue("MAXSESSION").trim();

	String code = "PASS";
	
	if (result) {
		request.getSession().setAttribute("adminId", adminId);
		session.setMaxInactiveInterval(Integer.parseInt(maxSession));
	} else {
		code = "NOT_MISMATCH";
	} 
%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="X-UA-Compatible" content="IE=Edge">
<form name ="MainForm">
</form>
<script type="text/javascript">
function goPage()
{
	var form = document.MainForm;
	var code = "<%=code%>";
		
	alert(code);
	if(code == "NOT_MISMATCH")
	{
		alert("아이디와 비밀번호를 확인해주세요.");
		location.href="index.html";
	}
	else
	{
		alert("인증에 성공하였습니다.");
		form.method = "post";
		form.action = "organization/index.jsp";
		form.submit();
	}
}
location.href="javascript:goPage()";
</script>
</head>