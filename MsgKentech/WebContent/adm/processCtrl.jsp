
<%@page import="kr.co.ultari.admin.controller.AdminProcessManager"%>
<%@page import="java.io.IOException"%>
<%@page import="java.io.SequenceInputStream"%>
<%@page import="java.io.InputStreamReader"%>
<%@page import="java.io.BufferedReader"%>
<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<!-- lib -->
<link rel="shortcut icon" th:href="../lib/common/img/favicon.ico">
<link rel="stylesheet" type="text/css"
	href="../lib/common/lib/fontAwesome/fontawesome.min.css" />
<link rel="stylesheet" type="text/css"
	href="../lib/common/lib/jquery-ui-datepicker/jquery-ui.min.css" />
<link rel="stylesheet" type="text/css"
	href="../lib/common/lib/jqtree/jqtree.css" />

<!-- css -->
<link rel="stylesheet" type="text/css"
	href="../lib/common/css/fonts/fonts.css" />
<link rel="stylesheet" type="text/css"
	href="../lib/common/css/style.css" />




<title>프로세스 관리</title>

</head>
<body>
<% 
//String cmd = "ls -al";
String[] cmd = {"/bin/sh","-c","netstat -na | grep 18000 | grep EST | wc -l"};
int lineCount = 0;
String line="";
Runtime rt = Runtime.getRuntime();
Process ps = null;
String result = "";
try{

  ps = rt.exec(cmd);

  BufferedReader br =
        new BufferedReader(
        new InputStreamReader(
        new SequenceInputStream(ps.getInputStream(), ps.getErrorStream())));



  while((line = br.readLine()) != null){
 result = line;
  }
  br.close();

}catch(IOException ie){
  ie.printStackTrace();
}catch(Exception e){
  e.printStackTrace();
}

String shRtn ="";

//AdminProcessManager admp = new AdminProcessManager();
%>
        <h2>현재 접속자: <%=result%><h2>
	<div class="conts_inner">
						<article class="conts_inner__article over-area">
							<form name="MainForm" class="conts_inner__article__inner jumbo_box" action="processCtrl">
							<input type="hidden" name="seqList" id="seqList" value="">
								<div id="searchArea" class="conts_body">
									<div class="toptable">
										<table>
											<button class="btn_type bg_base" type="button" id="processStop" value="processStop"><span>프로세스종료</span></button>&nbsp;
											<button class="btn_type bg_base" type="button" id="processStart" value="processStart"><span>프로세스시작</span></button>&nbsp;
										</table>
										<br>
									</div>
									<div class="depttable">
									</div>
								</div>
							</form>
						</article>
					</div>
	
</body>
</html>