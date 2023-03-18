<%@ page language="java" contentType="text/html; charset=utf-8"
    pageEncoding="utf-8"%>
<%@ page import="java.util.*" %>
<%@ page import="java.text.*" %>
<%@ page import="java.io.*" %>
<%@ page import="kr.co.ultari.common.StringTool" %>
<%@ page import="kr.co.ultari.db.DBController" %>
<%
	String adminId = StringTool.NullTrim(request.getParameter("adminId"));
	String password = StringTool.NullTrim(request.getParameter("adminPwd"));

	DBController db = new DBController();
	Properties prot = new Properties();
	String protPath = "/config/Config.properties";
	prot.load(getClass().getResourceAsStream(protPath));
	
	String query = prot.getProperty("LOGINQUERY").trim();
	String maxSession = prot.getProperty("MAXSESSION").trim();
	
	String[] value = {adminId};
	String[] Content = null;
	
	try
	{
		Content = db.getContent(query,value);
	}
	catch(Exception e)
	{
		e.printStackTrace();
	}
	
	String rtn = "";
	
	if(Content == null)
	{
		rtn = "NoDB";
	}
	else
	{
		if(StringTool.NullTrim(Content[0]).equals(""))
		{
			rtn = "NoUser";
		}
		else
		{
			//if(StringTool.NullTrim(Content[1]).equals(StringTool.getSHA256(password)))
				if(StringTool.NullTrim(Content[1]).equals(password))
			{
				request.getSession().setAttribute("adminId", adminId);
				session.setMaxInactiveInterval(Integer.parseInt(maxSession)); // 초단위
				rtn = "Password";
			}
			else
			{
				rtn = "NoPassword";
			}
		}
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
	var rtn = "<%=rtn%>";
		
	if(rtn == "NoUser")
	{
		alert("존재하지 않는 사용자입니다.");
		location.href="index.html";
	}
	else if(rtn == "NoPassword")
	{
		alert("패스워드를 확인해 주세요.");
		location.href="index.html";
	}
	else if(rtn == "NoDB")
	{
		alert("서버오류! 관리자에게 문의하세요.");
		location.href="index.html";
	}
	else
	{
		form.method = "post";
		form.action = "organization/index.jsp";
		form.submit();
	}
}
location.href="javascript:goPage()";
</script>
</head>