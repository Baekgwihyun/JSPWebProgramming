<%@ page language="java" contentType="text/html; charset=utf-8"
    pageEncoding="utf-8"%>
<%@ page import="java.util.*" %>
<%@ page import="java.text.*" %>    
<%@ page import="kr.co.ultari.common.StringTool" %>
<%@ page import="kr.co.ultari.db.DBController" %>  
<%
   	request.setCharacterEncoding("utf-8");

   	String gubun = StringTool.NullTrim(request.getParameter("gubun"));
   	String tabId = StringTool.NullTrim(request.getParameter("tabId"));
   	String PN = StringTool.NullTrim(request.getParameter("PN"));
   	String deptId = "";
   	
   	DBController db = new DBController();
	Properties prot = new Properties();
	String protPath = "/config/Config.properties";
	prot.load(getClass().getResourceAsStream(protPath));
	
	//String sQuery = prot.getProperty("DEPTVIEWQUERY").trim();
	
   	String topId = prot.getProperty("TOPID").trim();
   	
   	boolean ok = false;
   	
   	// 부서 추가
   	if(gubun.equals("ADD"))
   	{
   		String deptNm = StringTool.NullTrim(request.getParameter("deptNm"));
   		String selHigh = StringTool.NullTrim(request.getParameter("selHigh"));
   		String deptSort = StringTool.NullTrim(request.getParameter("deptSort"));
   		
   		if(deptSort.equals(""))
   			deptSort = "999999";
   		
   		String seqIn = prot.getProperty("PARTIDINSERT").trim();
   		String seqSel = prot.getProperty("PARTIDSEQSELECT").trim();
		String query = prot.getProperty("DEPTADDQUERY").trim();
   		
   		String[] idAr;
   		String insertId = "";
   		
   		db.execute(seqIn);
   		idAr = db.getContent(seqSel);
   		insertId = StringTool.NullTrim(idAr[0]);
   		
   		insertId = "part" + StringTool.getFormatString(insertId,10);
   		
   		String[] value = // 인서트 값
   		{
		   	insertId,
		   	selHigh,
		   	deptNm,
		   	deptSort
   		};
   		
   		ok = db.execute(query,value);
   		
   	}
   	// 부서 수정
   	if(gubun.equals("MOD"))
   	{
   		deptId = StringTool.NullTrim(request.getParameter("deptId"));
   		String deptNm = StringTool.NullTrim(request.getParameter("deptNm"));
   		String deptSort = StringTool.NullTrim(request.getParameter("deptSort"));

   		String query = prot.getProperty("DEPTMODQUERY").trim();
   		String[] value =
   		{
		   	deptNm,
		   	deptSort,
		   	deptId
   		};
   		
   		ok = db.execute(query,value);
   	}
   	
   	// 부서 삭제
   	if(gubun.equals("DEL"))
   	{
   		deptId = StringTool.NullTrim(request.getParameter("deptId"));

   		String delQuery = prot.getProperty("DEPTDELQUERY").trim();
   		
   		String[] value =
   		{
   			deptId
   		};
   		
   		boolean chk = true;
   		
   		String deptCountQuery = prot.getProperty("DEPTCOUNT").trim();
   		String[] deptCountContent = db.getContent(deptCountQuery, value);

   		if(Integer.parseInt(StringTool.NullTrim(deptCountContent[0])) != 0)
   		{
   			chk = false;
   		}

   		String userCountQuery = prot.getProperty("USERCOUNT").trim();
   		String[] userCountContent = db.getContent(userCountQuery, value);

   		if(Integer.parseInt(StringTool.NullTrim(userCountContent[0])) != 0)
   		{
   			chk = false;
   		}
   		
   		if(chk)
   		{
   			ok = db.execute(delQuery,value);
   			tabId = topId;
   		}
   	}
   %>    
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=EUC-KR">
<title>Insert title here</title>
</head>
<body>
<form name ="MainForm">
<input type="hidden" name="tabId" id="tabId" value="<%=tabId%>">
<input type="hidden" name="PN" id="PN" value="<%=PN%>">
</form>
<script type="text/javascript">
function goBack()
{
	var gubun = "<%=gubun%>";
	var ok = "<%=ok%>";
	var deptId = "<%=deptId%>";
	var form = document.MainForm;
	
	if(ok == "true")
	{
		alert("처리 성공");
		parent.reLoad("dept",deptId);
	}else
	{
		if(gubun == "MOVE")
		{
			alert("처리 실패! 자신의 하부로 이동할 수 없습니다.");
		}
		else if(gubun == "DEL")
		{
			alert("처리 실패! 하부에 부서나 구성원이 있습니다.");
		}
		else
		{
			alert("처리 실패! 관리자에게 문의하세요.");
		}
	}
	form.method = "post";
	form.action = "deptview.jsp";
	form.submit();
}
location.href="javascript:goBack()";
</script>
</body>
</html>