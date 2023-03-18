<%@ page language="java" contentType="text/html; charset=utf-8"
    pageEncoding="utf-8"%>
<%@ page import="java.util.*" %>
<%@ page import="java.text.*" %>    
<%@ page import="kr.co.ultari.common.StringTool" %>
<%
	request.setCharacterEncoding("utf-8");
	
	String userId = StringTool.NullTrim(request.getParameter("userId"));

%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
	<meta http-equiv="X-UA-Compatible" content="IE=Edge">
	<title>비번번호 관리</title>
	
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
	<link rel="stylesheet" type="text/css" href="../lib/common/css/pwd.css" />
	
	<!-- js -->
	<script type="text/javascript" src="../lib/common/js/dto.js"></script>
	<script type="text/javascript" src="../lib/common/js/common.js"></script>
	<script type="text/javascript" src="../lib/common/js/organization/app.js"></script>
	<script type="text/javascript" src="../lib/common/js/sweetalert/sweetalert.min.js"></script>
	
	<script type="text/javascript" src="../common/js/WinUtil.js"></script>
<script language="javascript" >
function resize()
{
	self.resizeTo(465,490);
}

function checkPassword()
{
	var form = document.MainForm;
	
	if(document.getElementById("userId").value == "")
	{
		alert("아이디가 존재하지 않습니다.");
	}
	else
	{
		if(document.getElementById("password").value != "" && document.getElementById("password_confirm").value != "")
		{
			if(document.getElementById("password").value.length < 9)
			{
				alert("최소 9자리 이상 입력하세요");
				document.getElementById("password").focus();
				return
			}
			
			else if(!strOk("password",document.getElementById("password").value))
			{
				alert("영문, 숫자, 특수문자를 섞어서 사용해 주세요.");
				document.getElementById("password").focus();
				return
			}
			else if(document.getElementById("password").value != document.getElementById("password_confirm").value)
			{
				alert("입력한 비밀번호가 다릅니다.");
				document.getElementById("password_confirm").value = "";
				document.getElementById("password_confirm").focus();
			}
			else
			{
				form.method = "post";
				form.action = "save.jsp?TYPE=PWD";
				form.submit();
			}
		}
		else
		{
			alert("비밀번호를 입력해 주세요.");
			return
		}
	}
}

function resetPassword()
{
	var form = document.MainForm;
	
	if(document.getElementById("resetId").value == "")
	{
		alert("사용자 아이디를 입력하세요.");
		document.getElementById("resetId").focus();
		return
	}
	else
	{
		form.method = "post";
		form.action = "save.jsp?TYPE=RESET";
		form.submit();
	}
}

function strOk(name,str)
{
	var eng = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
	var num = "0123456789";
	var etc = "`~!@#$%^&*()-_=+[]{};:,<.>/?'";

	var inEng = false;
	var inNum = false;
	var inEtc = false;

	for(var i=0; i < str.length; i++)
	{
		if(eng.indexOf(str.charAt(i)) != -1)
		{
			inEng = true;
			break;
		}
	}

	for(var i=0; i < str.length; i++)
	{
		if(num.indexOf(str.charAt(i)) != -1)
		{
			inNum = true;
			break;
		}
	}
	
	for(var i=0; i < str.length; i++)
	{
		if(etc.indexOf(str.charAt(i)) != -1)
		{
			inEtc = true;
			break;
		}
	}

	if((inEng && inNum && inEtc))
	{
		return true;
	} 
	else 
	{
		return false;
	}
}

function goClose()
{
	window.open('','_self').close();
}
</script>
</head>
<body onload="javascript:resize()">
<section id="wrap2">
		<section class="wrap_layout2">
			<section>
			
					<header class="sub_head">
						<h2><i class="ico_tit sub05"></i> <span>비빌번호 변경</span></h2>
					</header>

					<div class="conts_inner">
						<article class="conts_inner__article_pwd">
							<form name="MainForm" class="conts_inner__article jumbo_box">
							<input type="hidden" name="seqList" id="seqList" value="">
								<div id="searchArea" class="conts_body">
									<div class="pwdtable">
										<table>
											<colgroup>
												<col style="width: 160px"/>
												<col style="width: 250px"/>
											</colgroup>
											<thead>
												<tr>
													<th>- 사용자 아이디</th>
													<th><input type="text" name="userId" id="userId" value="<%=userId%>" style="width:100%;ime-mode:disabled;" readonly></th>
												</tr>
												<tr>
													<th>- 새 비밀번호</th>
													<th><input type="password" name="password" id="password" value="" style="width:100%;ime-mode:disabled;"></th>
												</tr>
												<tr>
													<th>- 새 비밀번호 재확인</th>
													<th><input type="password" name="password_confirm" id="password_confirm" value="" style="width:100%;ime-mode:disabled;"></th>
												</tr>
											</thead>
										</table>
									</div><br>
									<div class="pwdtable">
										<table>
											<tr>
												<th>
													<button class="btn_type bg_base" type="button" id="pwdsave" onClick="javascript:checkPassword();"><span>저장</span></button>&nbsp;
													<button class="btn_type bg_base" type="button" id="pwdclose" onClick="javascript:goClose();"><span>닫기</span></button>&nbsp;
												</th>
											</tr>
										</table>
										<br>
									</div>
								</div>
							</form>
						</article>
					</div>
					
			</section>
		</section>
	</section>
</body>
</html>