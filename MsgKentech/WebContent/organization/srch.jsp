<%@ page language="java" contentType="text/html; charset=utf-8"
    pageEncoding="utf-8"%>
<%@ page import="java.util.*" %>
<%@ page import="java.text.*" %>    
<%@ page import="kr.co.ultari.common.StringTool" %>
<%@ page import="kr.co.ultari.db.DBController" %>
<%
	request.setCharacterEncoding("utf-8");
	
	String tabId = StringTool.NullTrim(request.getParameter("tabId"));
	String sSrchGubun = StringTool.NullTrim(request.getParameter("sSrchGubun"));
	String sSrchText = StringTool.NullTrim(request.getParameter("sSrchText"));
	
	String queryId = "'"+tabId+"'";
	String sAddQuery = "";
	
	DBController db = new DBController();
	Properties prot = new Properties();
	String protPath = "/config/Config.properties";
	prot.load(getClass().getResourceAsStream(protPath));
	
	String sListQuery = prot.getProperty("ORGUSERSRCHQUERY").trim();
	String sCountQuery = prot.getProperty("ORGUSERSRCHCOUNT").trim();
	
	List sList = null;
	String[] sContent = null;
	int nListSize = 18;
	int nPageNo = request.getParameter("PN") == null? 1:Integer.parseInt(request.getParameter("PN"));
	
	int listSize = 0;
	String sCount = "0";
	
	if(!sSrchGubun.equals(""))
	{
		sAddQuery = " AND " + sSrchGubun+" LIKE '%"+sSrchText+"%'";
		sListQuery = StringTool.ReplaceAllText(sListQuery, "_where", sAddQuery);
		sCountQuery = StringTool.ReplaceAllText(sCountQuery, "_where", sAddQuery);
		HashMap hm = db.listOptimizer(sCountQuery,sListQuery,"",nPageNo,nListSize);
		sCount = (String)hm.get("COUNT");
		sList = (List)hm.get("LIST");
		listSize = sList.size();
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
function checkPage()
{
	return "srch";
}

function OnPageMove(PageNo)
{
    var form = document.MainForm;
    form.method = "post";
	form.action = "srch.jsp?&PN="+PageNo;
	form.submit();
}

function goAdd()
{
	var PageNo = "<%=nPageNo%>";
	var form = document.MainForm;
    form.method = "post";
	form.action = "usradd.jsp?PN="+PageNo;
	form.submit();
}

function checkAllOrNot()
{
	var form = document.MainForm;

	if(form.CheckAll.checked == false)
	{
		uncheckAll('MainForm','ChkItem');
	}
	else if(form.CheckAll.checked == true)
	{
		checkAll('MainForm','ChkItem');
	}
}

function goMove()
{
	var listSize = "<%=listSize%>";
	if(listSize == "0")
	{
		return;
	}	
	
	var PageNo = "<%=nPageNo%>";
	var form = document.MainForm;
	
	var temp = "";
	var id = "";
	var name = "";
	
	var idList = "";
	var nameList = "";
	
	var loop = 0;

	if(form.ChkItem.length > 1)
	{
		for(i=0 ; i<form.ChkItem.length;i++)
		{
		   if(form.ChkItem[i].checked == true)
		   {
			   temp = form.ChkItem[i].value;
			   id = temp.substring(0, temp.indexOf("|"));
			   name = temp.substring(temp.indexOf("|") +1,temp.length);
			   
			   idList += id + ",";
			   nameList += name + ",";
			   
			   loop++;
		   }
		}
	}
	else
	{
		if(form.ChkItem.checked == true)
		{
			temp = form.ChkItem.value;
			id = temp.substring(0, temp.indexOf("|"));
			name = temp.substring(temp.indexOf("|") +1,temp.length);
			
			idList += id + ",";
			nameList += name + ",";
			loop++;
		}
		else
		{
			document.getElementById("idList").value = idList;
			document.getElementById("nameList").value = nameList;
			form.method = "post";
			form.action = "srchmove.jsp?PN="+PageNo;
			form.submit();
		}
	}

	if(loop == 0)
	{
		alert("이동할 사용자를 선택해 주세요.");

	}
	else
	{
		document.getElementById("idList").value = idList;
		document.getElementById("nameList").value = nameList;
		form.method = "post";
		form.action = "srchmove.jsp?PN="+PageNo;
		form.submit();
	}
}

function goDel()
{
	var listSize = "<%=listSize%>";
	if(listSize == "0")
	{
		return;
	}	
	var PageNo = "<%=nPageNo%>";
	var form = document.MainForm;
	
	var temp = "";
	var id = "";
	
	var idList = "";
	
	var loop = 0;

	if(form.ChkItem.length > 1)
	{
		for(i=0 ; i<form.ChkItem.length;i++)
		{
		   if(form.ChkItem[i].checked == true)
		   {
			   temp = form.ChkItem[i].value;
			   id = temp.substring(0, temp.indexOf("|"));
			   
			   idList += id + ",";
			   
			   loop++;
		   }
		}
	}
	else
	{
		if(form.ChkItem.checked == true)
		{
			temp = form.ChkItem.value;
			id = temp.substring(0, temp.indexOf("|"));
			
			idList += id + ",";
			loop++;
		}
		else
		{

		}
	}

	if(loop == 0)
	{
		alert("삭제할 사용자를 선택해 주세요.");

	}
	else
	{
		if(confirm("삭제 하시겠습니까?"))
		{
			document.getElementById("idList").value = idList;
			form.method = "post";
			form.action = "srchsave.jsp?gubun=DEL&PN="+PageNo;
			form.submit();
		}
	}
}

function goMod(userId)
{
	var PageNo = "<%=nPageNo%>";
	var form = document.MainForm;
	form.method = "post";
	form.action = "srchmod.jsp?userId="+userId+"&PN="+PageNo;
	form.submit();
}

function viewOrgan()
{
	var title = "orgview";
	var status = "width=850,height=500,scrollbars=no,resizable=no";
	window.open('organ.jsp',title,status);
	
	/*
	var form = document.MainForm;
	var url = "organ.jsp";
	var title = "orgview";
	var status = "width=720,height=640,scrollbars=no,resizable=no";
	var win = window.open('about:blank',title,status);
	form.target = title;
	form.action = url;
	form.method = "post";
	form.submit();*/
}

function goSave(idList)
{
	document.getElementById("idList").value = idList;
	var form = document.MainForm;
	form.method = "post";
	form.action = "deptsave.jsp?gubun=ADD";
	form.submit();
	
}

function sample()
{
	location.href="../sample/usersample.xls";
}

function checkXls() 
{
	var form=document.ExcelForm;
	var objfile = document.getElementById("excelFile").value;
	
	if(objfile != "")
	{
		var delRoute  =  objfile.lastIndexOf("\\");
		var nm = objfile.substring(delRoute+1,objfile.length); //경로를 뺀 파일이름
		var checkstr = str.substring(str.lastIndexOf(".") +1);
		var checkvalue = checkStr(checkstr); //확장자 검색(xls,xlsx 만 등록가능)
	}
}

function checkStr(str)
{
	var countnum = 0;
	var checkstr = "xls";
	checkstr = checkstr.split(",");
	
	str = str.toLowerCase();

	if(str != checkstr)
	{
		alert("xls 엑셀파일만 업로드됩니다.");
		filedel(); //file 초기화
		return false
	}
}

function filedel()
{
	var name = "#excelFile";
	
	if($.browser.msie)
	{
		$(name).replaceWith($(name).clone(true));
	}
	else
	{
		$(name).val("");
	}
}

function goSaveExcel()
{
	if(document.getElementById("excelFile").value == "")
	{
		alert("파일을 첨부하세요.");
		return
	}
	else
	{
		var form = document.ExcelForm;
		form.method = "post";
		form.action = "excelsave.jsp";
		form.submit();
	}
}

function goSrch()
{
	var form = document.MainForm;
	
	var sSrchGubun = document.getElementById("sSrchGubun").value;
	var sSrchText = document.getElementById("sSrchText").value;
	
	if(sSrchGubun == "" )
	{
		alert("검색 조건을 선택해주세요.");
		document.getElementById("sSrchGubun").focus();
		return
	}
	else if(sSrchText < 2)
	{
		alert("두글자 이상 입력하세요.");
		document.getElementById("sSrchText").focus();
		return
	}
	else
	{
		if(sSrchText == "" && sSrchGubun)
		{
			alert("검색 내용을 입력해주세요.");
			document.getElementById("sSrchText").focus();
			return
		}
		else
		{
			form.method = "post";
			form.action = "srch.jsp";
			form.submit();
		}
	}
}

function checkEnter()
{
	var code = window.event.keyCode; 
	if(code ==13)
	{
		goSrch();
	}else
	{
		return
	}
}
</script>
</head>
<body>
	<div class="conts_inner_right">
	<!-- 우측 영역 -->
		<form name="MainForm" class="conts_inner__article jumbo_box">
			<input type="hidden" name="tabId" id="tabId" value="<%=tabId%>">
			<input type="hidden" name="idList" id="idList" value="">
			<input type="hidden" name="nameList" id="nameList" value="">
			
			<iframe src="topmenu.jsp?tab=3&tabId=<%=tabId%>" name="topmenu" id="topmenu" width="100%" height="35" frameborder="0" marginwidth="0" marginheight="0" scrolling="no"></iframe>
			<!-- 컨텐츠 영역 -->
			<div id="searchArea" class="conts_body">
				<div class="toptable">
					<table>
						<tr>
						
						<td>
						<button class="btn_type bg_base" type="button" id="userDelete" onClick="javascript:goDel();"><span>삭제</span></button>&nbsp;
						<button class="btn_type bg_base" type="button" id="userMove" onClick="javascript:goMove();"><span>사용자 이동</span></button>
						</td>
						
						<td align="right">
						<select name="sSrchGubun" id="sSrchGubun">
							<option value="USER_NAME" <%=sSrchGubun.equals("USER_NAME") ? "selected" : "" %>>이름</option>
							<option value="USER_ID" <%=sSrchGubun.equals("USER_ID") ? "selected" : "" %>>아이디</option>
				          	<option value="PART_NAME" <%=sSrchGubun.equals("PART_NAME") ? "selected" : "" %>>부서명</option>
				          	<option value="POS_NAME" <%=sSrchGubun.equals("POS_NAME") ? "selected" : "" %>>직위/직급</option>
				          	<option value="PHONE" <%=sSrchGubun.equals("PHONE") ? "selected" : "" %>>전화번호</option>
				          	<option value="MOBILE" <%=sSrchGubun.equals("MOBILE") ? "selected" : "" %>>휴대폰</option>
				          	<option value="EMAIL" <%=sSrchGubun.equals("EMAIL") ? "selected" : "" %>>이메일</option>
				          	<option value="EMPCODE" <%=sSrchGubun.equals("EMPCODE") ? "selected" : "" %>>사원번호</option>
						</select>
						<input type="text" id="sSrchText" name="sSrchText" value="<%=StringTool.NullTrim(sSrchText)%>" placeholder="" class="highlight_input type_search" highlight-target-id="searchArea" onkeydown="javascript:checkEnter();" />
						<span style="display:none"><input type="text" id="tmp" name="tmp"></span>
						<button align="right" class="btn_type bg_base" type="button" id="userSrch" onClick="javascript:goSrch();"><span>검색</span></button>
						</td>
						
						</tr>
					</table>
					<br>
				</div>
				<div class="dtable">
					<table>
						<colgroup>
							<col style="width: 50px"/>
							<col style="width: 150px"/>
							<col style="width: 100px"/>
							<col style="width: 200px"/>
							<col style="width: "/>
							<col style="width: 130px"/>
							<col style="width: 130px"/>
							<col style="width: "/>
							<col style="width: 80px"/>
							<col style="width: 20px"/>
						</colgroup>
						<thead>
							<tr>
								<th height="35px"><input type="checkbox" name="CheckAll" id="CheckAll" onClick="javascript:checkAllOrNot();"></th>
								<th>아이디</th>
								<th>이름</th>
								<th>직위/직급</th>
								<th>부서명</th>
								<th>전화번호</th>
								<th>휴대폰</th>
								<th>이메일</th>
								<th>구분</th>
								<th></th>
							</tr>
						</thead>
						<tbody id="userListBody">
						<!-- 목록 -->
<%
	if(listSize == 0)
	{
%>
						<tr>
							<th colspan="10">&nbsp;</th>
						</tr>
<%
	}
	else
	{
		for(int i=0;i<sList.size();i++)
		{
			sContent = (String[])sList.get(i);
%> 	
						<tr onmouseover="this.style.backgroundColor='#C4DEFF';style.cursor='pointer';" onmouseout="this.style.backgroundColor='';">
							<%
							if(StringTool.NullTrim(sContent[8]).equals("ADD"))
							{
%>						
							<th height="25px"><input type="checkbox" name="ChkItem" id="ChkItem" value="<%=StringTool.NullTrim(sContent[0])%>|<%=StringTool.NullTrim(sContent[2])%>"></th>
<%
							}
							else
							{
%>							
							<th height="25px">&nbsp;</th>
<%
							}
%>				
							<th onclick="javascript:goMod('<%=StringTool.NullTrim(sContent[0])%>');"><%=StringTool.NullTrim(sContent[0])%></th>
					        <th onclick="javascript:goMod('<%=StringTool.NullTrim(sContent[0])%>');"><%=StringTool.NullTrim(sContent[2])%></th>
					        <th onclick="javascript:goMod('<%=StringTool.NullTrim(sContent[0])%>');"><%=StringTool.NullTrim(sContent[3])%></th>
					        <th onclick="javascript:goMod('<%=StringTool.NullTrim(sContent[0])%>');"><%=StringTool.NullTrim(sContent[4])%></th>
					        <th onclick="javascript:goMod('<%=StringTool.NullTrim(sContent[0])%>');"><%=StringTool.NullTrim(sContent[5])%></th>
					        <th onclick="javascript:goMod('<%=StringTool.NullTrim(sContent[0])%>');"><%=StringTool.NullTrim(sContent[6])%></th>
					        <th onclick="javascript:goMod('<%=StringTool.NullTrim(sContent[0])%>');"><%=StringTool.NullTrim(sContent[7])%></th>
					        <th onclick="javascript:goMod('<%=StringTool.NullTrim(sContent[0])%>');"><%=StringTool.NullTrim(sContent[8])%></th>
						</tr>
<%
		}
	}
%>						
						</tbody>
					</table>
				</div>
			</div>
<!-- 페이징 시작 -->
		<table width="100%" height="10px" cellpadding="0" cellspacing="0" border="0" >
		<br>	
		<tr>
			<td align="center">
<%
				request.setAttribute("PN",Integer.toString(nPageNo));
				request.setAttribute("RC",sCount);
				request.setAttribute("LS",Integer.toString(nListSize));
%>
			<jsp:include page = "ListMovePage.jsp"/>									
			<td align="center">&nbsp;&nbsp;</td>					
		</tr>
	</table>
<!-- 페이징 끝 -->			
			<!-- // 컨텐츠 영역 -->
		</form>
	<!-- // 우측 영역 -->
</div>
<!-- // wrap -->

</body>
</html>