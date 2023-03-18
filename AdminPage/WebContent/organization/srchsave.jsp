<%@ page language="java" contentType="text/html; charset=utf-8"
    pageEncoding="utf-8"%>
<%@ page import="java.util.*" %>
<%@ page import="java.text.*" %>
<%@ page import="kr.co.ultari.common.StringTool" %>
<%@ page import="kr.co.ultari.db.DBController" %>
<%@ page import="kr.co.ultari.http.client.HttpClient" %>
<%@ page import="org.json.*" %>
<%
	request.setCharacterEncoding("utf-8");

	String gubun = StringTool.NullTrim(request.getParameter("gubun"));
	String tabId = StringTool.NullTrim(request.getParameter("tabId"));
	String PN = StringTool.NullTrim(request.getParameter("PN"));
	String sSrchGubun = StringTool.NullTrim(request.getParameter("sSrchGubun"));
	String sSrchText = StringTool.NullTrim(request.getParameter("sSrchText"));
	
	DBController db = new DBController();
	Properties prot = new Properties();
	String protPath = "/config/Config.properties";
	prot.load(getClass().getResourceAsStream(protPath));
	
	boolean ok = false;

	// 사용자 추가
	if(gubun.equals("ADD"))
	{
		String userId = StringTool.NullTrim(request.getParameter("userId"));
		String deptId = StringTool.NullTrim(request.getParameter("deptId"));
		String userNm = StringTool.NullTrim(request.getParameter("userNm"));
		String pos = StringTool.NullTrim(request.getParameter("pos"));
		String phone = StringTool.NullTrim(request.getParameter("phone"));
		String mobile = StringTool.NullTrim(request.getParameter("mobile"));
		String email = StringTool.NullTrim(request.getParameter("email"));
		String empcode = StringTool.NullTrim(request.getParameter("empcode"));
		String job = StringTool.NullTrim(request.getParameter("job"));
		String order = StringTool.getFormatString(StringTool.NullTrim(request.getParameter("order")),6);
		
		String query = prot.getProperty("USERADDQUERY").trim();

		
		String[] value = // 인서트 값
		{
			userId,
			deptId,
			userNm,
			pos,
			phone,
			mobile,
			email,
			empcode,
			job,
			order
		};
		
		ok = db.execute(query,value);
	}
	// 사용자 수정
	if(gubun.equals("MOD"))
	{
		String userId = StringTool.NullTrim(request.getParameter("userId"));
		String userNm = StringTool.NullTrim(request.getParameter("userNm"));
		String pos = StringTool.NullTrim(request.getParameter("pos"));
		String phone = StringTool.NullTrim(request.getParameter("phone"));
		String mobile = StringTool.NullTrim(request.getParameter("mobile"));
		String email = StringTool.NullTrim(request.getParameter("email"));
		String empcode = StringTool.NullTrim(request.getParameter("empcode"));
		String job = StringTool.NullTrim(request.getParameter("job"));
		String order = StringTool.getFormatString(StringTool.NullTrim(request.getParameter("order")),6);
		
		String query = prot.getProperty("MODQUERY").trim();
		
		String[] value = 
		{
			userNm,
			pos,
			phone,
			mobile,
			email,
			empcode,
			job,
			order,
			userId
		};
		
		ok = db.execute(query,value);
	}
	
	//사용자 이동
	if(gubun.equals("MOVE"))
	{
		String newDeptId = StringTool.NullTrim(request.getParameter("deptId"));
		String idList = StringTool.NullTrim(request.getParameter("idList"));
		
		String setId = "";
		String[] tempId = idList.split(",");
		for(int i=0; i<tempId.length;i++)
		{
			setId += "'"+tempId[i]+"',";
		}
		setId = setId.substring(0,setId.length()-1);
		
		String query = prot.getProperty("MOVEQUERY").trim();
		
		query = StringTool.ReplaceAllText(query, "_where", setId);
		String[] value = {newDeptId};
		ok = db.execute(query,value);
	}
	
	//사용자 삭제
	if(gubun.equals("DEL"))
	{
		String idList = StringTool.NullTrim(request.getParameter("idList"));
		
		String setId = "";
		String[] tempId = idList.split(",");
		for(int i=0; i<tempId.length;i++)
		{
			setId += "'"+tempId[i]+"',";
		}
		setId = setId.substring(0,setId.length()-1);
		
		String query = prot.getProperty("DELQUERY").trim();
		
		query = StringTool.ReplaceAllText(query, "_where", setId);
		ok = db.execute(query);
	}
	
	//비밀번호 초기화
	if(gubun.equals("RESETPWD"))
	{
		String userId = StringTool.NullTrim(request.getParameter("userId"));
		String query = prot.getProperty("RESETPWDQUERY").trim();
		String url = prot.getProperty("PWDRESETURL").trim();
		
		String[] value = {userId};
		
		if(db.execute(query,value))
		{
			JSONObject data = new JSONObject();
			
	        try 
	        {
				data.put("M", "ChangePassword");
				data.put("id", userId);
				data.put("pwd", "null");
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
%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="X-UA-Compatible" content="IE=Edge">
<form name ="MainForm">
<input type="hidden" name="tabId" id="tabId" value="<%=tabId%>">
<input type="hidden" name="PN" id="PN" value="<%=PN%>">
<input type="hidden" name="sSrchGubun" id="sSrchGubun" value="<%=sSrchGubun%>">
<input type="hidden" name="sSrchText" id="sSrchText" value="<%=sSrchText%>">
</form>
<script type="text/javascript">
function goBack()
{
	var gubun = "<%=gubun%>";
	var ok = "<%=ok%>";
	var form = document.MainForm;
	
	if(ok == "true")
	{
		alert("처리 성공");
	}else
	{
		alert("처리 실패! 관리자에게 문의하세요.");
	}
	form.method = "post";
	form.action = "srch.jsp";
	form.submit();
}
location.href="javascript:goBack()";
</script>
</head>