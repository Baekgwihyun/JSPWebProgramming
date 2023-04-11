
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
request.setCharacterEncoding("UTF-8");

String cmd = "";
int lineCount = 0;
String line="";
Runtime rt = Runtime.getRuntime();
Process ps = null;



cmd = (String) request.getParameter("cmd");
System.out.println(cmd);



try{
	
  ps = rt.exec(cmd);

  BufferedReader br =
        new BufferedReader(
        new InputStreamReader(
        new SequenceInputStream(ps.getInputStream(), ps.getErrorStream())));

        

  while((line = br.readLine()) != null){
%>
<%=line%><br> <!-- 결과 화면에 뿌리기... -->
<%
  }
  br.close();

}catch(IOException ie){
  ie.printStackTrace();
}catch(Exception e){
  e.printStackTrace();
}
	
%>
	<h2>프로세스관리 페이지</h2>

	<div class="conts_inner">
		<article class="conts_inner__article over-area">
		<form name="MainForm" class="conts_inner__article__inner jumbo_box"
			action="processCtrl.jsp" method="post">
			<div id="searchArea" class="conts_body">
				<div class="toptable">
					<div id="contents">
						<button type="submit" name="cmd" value="ProcessStop" id="stop">
							프로세스종료</button>
						<br>
						<button type="submit" name="cmd" value="ProcessStart" id="start">
							프로세스 실행</button>

					</div>
				</div>
				</div>
				</form>
			</article>
			</div>
</body>
</html>