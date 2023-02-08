<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Insert title here</title>
</head>
<body>

	<% 
		String name = "알림이 어플 ";
	%>
	
	스크립트로 표현시<%=name %>이 화면에 출력<br />
	
	<% 
		out.println(name + "이 화면에 출력");	
	%>
	
	

</body>
</html>