
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
<script type="text/javascript">
function httpGetAsync(theUrl, callback)
{
	
	
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function() {
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200){
        	 callback(xmlHttp.responseText);
        	 
        }           
    }
    xmlHttp.open("GET", theUrl, true); // true for asynchronous
    xmlHttp.send(null);
}
function myCallBack(response){
        alert(response);
}


function test() {
	let processStop ="processStop" ; 
	alert(processStop);
	
}
</script>
</head>
<body>
<%
	request.setCharacterEncoding("UTF-8");
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
	
	%> 
	
	
<%-- 	<%
    String path = "/home/msger/stop.sh";
    String bashCommand[] = {"ls", "-al"}; // bash 명령어
    String scriptCommand[] = {"sh", path}; //shell script 실행

    int lineCount = 0;
    String line="";

    ProcessBuilder builder = new ProcessBuilder(bashCommand);
    Process childProcess = null;

    try{
        childProcess = builder.start();

      BufferedReader br =
            new BufferedReader(
                    new InputStreamReader(
                          new SequenceInputStream(childProcess.getInputStream(), childProcess.getErrorStream())));

      while((line = br.readLine()) != null){
%>
    <%=line%><br>
<%
      }
      br.close();

   }catch(IOException ie){
      ie.printStackTrace();
   }catch(Exception e){
      e.printStackTrace();
   }
%> --%>
	
	
	
	<h2>현재 접속자 수: <%=result%></h2>
					
	<div class="conts_inner">
		<article class="conts_inner__article over-area">
		<form name="MainForm" class="conts_inner__article__inner jumbo_box" action="processCtrl.jsp" method="post">
			<div id="searchArea" class="conts_body">
				<div class="toptable">
					<div id="contents">
						<!-- <button class="btn_type bg_base" type="button" id="processStop" onclick="httpGetAsync('/home/msger/stop.sh', myCallBack)">
							<span>프로세스 종료</span>
						</button> -->
						
						<button class="btn_type bg_base" type="button" id="processStop" onclick="httpGetAsync('./processCtrl.jsp', myCallBack) ">
							<span>프로세스 종료</span>
						</button>
						<button class="btn_type bg_base" type="button" id="processStart" onclick="httpGetAsync('/home/msger/start.sh', myCallBack)">
							<span>프로세스 실행</span>
						</button>
						<br>
						<br>
						&#32;
						<button class="btn_type bg_base" type="button" id="processStart" onclick="httpGetAsync('/home/msger/start.sh', myCallBack)">
							<span>서비스 재 시작</span>
						</button>
						<button class="btn_type bg_base" type="button" id="processStart" onclick="httpGetAsync('/home/msger/start.sh', myCallBack)">
							<span>조직도 동기화</span>
						</button>
					</div>
				</div>
			</div>
		</form>
		</article>
	</div>
</body>
</html>