<%@ page language="java" contentType="text/html; charset=utf-8"
    pageEncoding="utf-8"%>
<%@ page import="java.util.*" %>
<%@ page import="java.text.*" %>
<%@ page import="java.io.*" %>
<%@ page import="kr.co.ultari.common.StringTool" %>
<%@ page import="kr.co.ultari.db.DBController" %>
<%@ page import="org.json.*" %>
<%@ page import="kr.co.ultari.http.client.HttpClient" %>
<%@ page import="kr.co.ultari.process.UserProcessorFile" %>
<%
	request.setCharacterEncoding("utf-8");
	
	boolean ok = false;
	
	String type = StringTool.NullTrim(request.getParameter("TYPE"));
	String userId = StringTool.NullTrim(request.getParameter("userId"));
	
	//UserProcessorFile uf = new UserProcessorFile();
	
	DBController db = new DBController();
	
	Properties prot = new Properties();
	String protPath = "/config/Config.properties";
	prot.load(getClass().getResourceAsStream(protPath));
	
	if(type.equals("PWD"))
	{
		String delQuery = prot.getProperty("PWDDEL").trim();
		String query = prot.getProperty("PWDCHG").trim();
		String url = prot.getProperty("PWDRESETURL").trim();
		
		String password = StringTool.NullTrim(request.getParameter("password"));
		password = StringTool.getSHA256(password);
		
		String[] delVal = {userId};
		String[] val = {userId,password};
		
		if(db.execute(delQuery,delVal))
		{
			if(db.execute(query,val))
			{
				JSONObject data = new JSONObject();
				
		        try 
		        {
					data.put("M", "ChangePassword");
					data.put("id", userId);
					data.put("pwd", password);
					System.out.println(url);
					HttpClient client = new HttpClient(url);
	        		client.sendHTTP(data.toString());
	        
			        ok = true;
				} 
		        catch (JSONException e) 
		        {
					e.printStackTrace();
				}
			}
		}
		
		/*
		try
		{
			ok = uf.chgPwd(userId,password);
		}
		catch(Exception e){e.printStackTrace();}
		*/
	}
%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="X-UA-Compatible" content="IE=Edge">
<form name ="MainForm">
<input type="hidden" name="userId" id="userId" value="<%=userId%>">
</form>
<script type="text/javascript">

function goBack()
{
	if("<%=ok%>" == "true")
	{
		alert("변경 되었습니다.");
		window.open('','_self').close();
	}
	else
	{
		alert("변경 실패하였습니다.");
	}
	
	var form = document.MainForm;
	form.method = "post";
	form.action = "chgPwd.jsp";
	form.submit();
}
location.href="javascript:goBack()";
</script>
</head>