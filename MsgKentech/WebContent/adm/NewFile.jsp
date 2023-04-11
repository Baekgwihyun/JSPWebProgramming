<%@ page import="java.io.*" %>

<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>Insert title here</title>
</head>
<body>
<%

    String command = "/home/msger.stop.sh";  // <---- 실행할 쉘명령어
    int lineCount = 0;
    String line="";

    Runtime rt = Runtime.getRuntime();
    Process ps = null;

    try{
    	if(command.equals("ProcessStop"))
    	{
    		ps = rt.exec(command);	
    	}
    	if(command.equals("ProcessStart"))
    	{
    		ps = rt.exec(command);	
    	}
    	

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

</body>
</html>