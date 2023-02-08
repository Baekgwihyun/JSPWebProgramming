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
	//사용자의 정보가 저장되어 있는 객체 request의 geparameter() 사용자의 정보를 추출
	String id = request.getParameter("id");//사용자의 id 값을 읽어드려서 변수 id에 저장
	String pass= request.getParameter("pass");
%>
	<h2>
		Requestforword.jsp 페이지입니다.
		당신의 아이디는<%= id %>이고 패스워드는 <%=pass %>입니다.
	</h2> 	




</body>
</html>