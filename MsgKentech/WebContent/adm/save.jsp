<%@page import="kr.co.ultari.process.AdminMgr"%>
<%@ page language="java" contentType="text/html; charset=utf-8"
    pageEncoding="utf-8"%>
    <%@page import="kr.co.ultari.admin.controller.PropertyManager"%>
<%@page import="kr.co.ultari.admin.controller.AuthenticationService"%>
<%@ page import="java.util.*" %>
<%@ page import="java.text.*" %>
<%@ page import="java.io.*" %>
<%@ page import="kr.co.ultari.common.StringTool" %>
<%@ page import="kr.co.ultari.db.DBController" %>
<%
	String adminId = (String) request.getSession().getAttribute("adminId");

	String passwd = StringTool.NullTrim(request.getParameter("pwd"));
	
	PropertyManager propertyManager = new PropertyManager();
	AuthenticationService authenticationService = new AuthenticationService(propertyManager);
	
	boolean mgrPwMod = authenticationService.changePwd(passwd);
	System.out.println("mgrPwMod" + mgrPwMod);
	
	//String encPwd = StringTool.getSHA256(passwd);
	
/* 	Properties prot = new Properties();
	String protPath = "/config/Config.properties";
	prot.load(getClass().getResourceAsStream(protPath));
	//DBController mo = new DBController();
	
	//String query = prot.getProperty("PWDMODQUERY").trim();
	//String[] val = {encPwd,adminId};
	
	
	
	//boolean ok = mo.execute(query,val);
	
	AdminMgr amgr = new AdminMgr(); // AdminMgr 객체 선언
	String mgrPw = amgr.getAdmPwd();
	
	boolean mgrPwMod = amgr.setAdmPwd(passwd);
	
	//String encPwd = StringTool.getSHA256(passwd);
	System.out.println("mgrpw="+ mgrPw);
 */	
	
%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="X-UA-Compatible" content="IE=Edge">
<form name ="MainForm">
</form>
<script type="text/javascript">

function goBack()
{
	if("<%=mgrPwMod%>" == "true")
	{
		alert("변경 되었습니다.");	
	}
	else
	{
		alert("변경 실패하였습니다.");
	}
	
	var form = document.MainForm;
	form.method = "post";
	form.action = "index.jsp";
	form.submit();
}
location.href="javascript:goBack()";
</script>
</head>