<%@ page language="java" contentType="text/html; charset=EUC-KR"
    pageEncoding="EUC-KR"%>
<%@ page import="java.util.*" %>
<%@ page import="java.text.*" %>
<%@ page import="java.io.*"%>
<%@ page import="java.net.*"%>
<%@ page import="com.oreilly.servlet.*"%>
<%@ page import="com.oreilly.servlet.multipart.*"%>
<%@ page import="kr.co.ultari.common.StringTool" %>
<%@ page import="kr.co.ultari.db.DBController" %>
<%@ page import="jxl.*"%>
<%@ page import="jxl.write.*"%>
<%
	request.setCharacterEncoding("utf-8");
	
	String base = "D:\\Files\\up\\";
	int iMaxSize = 105000000; // ���� ������ ���� 100M
	
	File dirsrch = new File(base);
	try {
		if (!dirsrch.exists()) {
			if (dirsrch.mkdirs()) {
				System.out.println("���丮 ����");
			} else {
				System.out.println("���丮 ���� ����");
			}
		}
	}
	catch(Exception e)
	{
		System.out.println(e);
	}
	
	MultipartRequest multi = null;
	String sFileName = null;
	
	try 
	{
		multi = new MultipartRequest(request, base, iMaxSize, "euc-kr");
		Enumeration formNames = multi.getFileNames();  // ���� �̸� ��ȯ
		
		while (formNames.hasMoreElements()) 
		{ // �ڷᰡ ���� ��쿣 while ���� ���
			String formName = (String) formNames.nextElement(); 
			sFileName = multi.getFilesystemName(formName); // ������ �̸� ���
		}
	}
	catch (Exception e) 
	{
		System.out.println("���� ���ε� ����");
%>
			<script type="text/javascript">
				function goMain(){

					alert("���Ͽ뷮 �ʰ�");
					history.back();
				}
				location.href="JavaScript:goMain()";
			</Script>
<%
	return;
	}
	
	String tabId = StringTool.NullTrim(multi.getParameter("tabIdM"));
	
	//���� ���ε� �� DB ����
	DBController db = new DBController();
	Properties prot = new Properties();
	String protPath = "/config/Config.properties";
	prot.load(getClass().getResourceAsStream(protPath));
	
	String rtnstr = "";
	String insertQuery = "INSERT INTO MSG_USER_ADD "+
						"(USER_ID,USER_HIGH,USER_NAME,POS_NAME,INNER_PHONE1,INNER_PHONE2,INNER_PHONE3,MOBILE,EMAIL,JOB) "+
						"VALUES "+ 
						"(?,?,?,?,?,?,?,?,?,?)";
	
	if(!sFileName.equals("")) 
	{
		boolean inOk = false;
		int successCnt = 0;
		int failCnt = 0;
		
		try
		{			
	String sPath = base + sFileName;
	java.io.FileInputStream file = new java.io.FileInputStream(new java.io.File(sPath));
	Workbook workbook = Workbook.getWorkbook(file);
	Sheet sheet = workbook.getSheet(0);
	
	int rows = sheet.getRows();
	System.out.println("rows : " + rows );
	
	Cell idCell = null;
	String id = "";
	
	Cell highCell = null;
	String high = "";
	
	Cell nmCell = null;
	String nm = "";
	
	Cell posCell = null;
	String pos = "";
	
	Cell phone1Cell = null;
	String phone1 = "";
	
	Cell phone2Cell = null;
	String phone2 = "";
	
	Cell phone3Cell = null;
	String phone3 = "";
	
	Cell mobileCell = null;
	String mobile = "";
	
	Cell emailCell = null;
	String email = "";
	
	Cell jobCell = null;
	String job = "";
	
	if(rows > 0)
	{
		for(int i=1 ; i < rows; i++)
		{
			try
			{
				idCell = sheet.getCell(0,i);
				id = StringTool.NullTrim(idCell.getContents());
				
				highCell = sheet.getCell(1,i);
				high = StringTool.NullTrim(highCell.getContents());
				
				nmCell = sheet.getCell(2,i);
				nm = StringTool.NullTrim(nmCell.getContents());
				
				posCell = sheet.getCell(3,i);
				pos = StringTool.NullTrim(posCell.getContents());
				
				phone1Cell = sheet.getCell(4,i);
				phone1 = StringTool.NullTrim(phone1Cell.getContents());
				
				phone2Cell = sheet.getCell(5,i);
				phone2 = StringTool.NullTrim(phone2Cell.getContents());
				
				phone3Cell = sheet.getCell(6,i);
				phone3 = StringTool.NullTrim(phone3Cell.getContents());
				
				mobileCell = sheet.getCell(7,i);
				mobile = StringTool.NullTrim(mobileCell.getContents());
				
				emailCell = sheet.getCell(8,i);
				email = StringTool.NullTrim(emailCell.getContents());
				
				jobCell = sheet.getCell(9,i);
				job = StringTool.NullTrim(jobCell.getContents());
				
				String[] val = 
				{
					id,high,nm,pos,phone1,phone2,phone3,mobile,email,job
				};
				
				if(!id.equals(""))
				{
					if(db.execute(insertQuery, val))
					{
						successCnt ++;
					}
					else
					{
						failCnt ++;
					}
				}
			}
			catch(Exception ee)
			{
				failCnt ++;
				ee.printStackTrace();
			}
		}
	}
	rtnstr = "���� : " + successCnt + " / ���� : " + failCnt;
		}
		catch(Exception e)
		{ 
	e.printStackTrace(); 
		}
	}
	else
	{
		rtnstr += "���ε� ����";
	}
%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=EUC-KR">
<form name ="MainForm">
<input type="hidden" name="tabId" id="tabId" value="<%=tabId%>">
</form>
<script type="text/javascript">

function goBack()
{
	var rtn = "<%=rtnstr%>";
	
	alert(rtn);
	
	var form = document.MainForm;
	form.method = "post";
	form.action = "usrlist.jsp";
	form.submit();
}
location.href="javascript:goBack()";
</script>
</head>

	
	