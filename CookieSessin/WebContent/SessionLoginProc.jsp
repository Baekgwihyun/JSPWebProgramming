<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Insert title here</title>
</head>
<body>
	<center>
		<h2>세션 로그인 처리1</h2>
		<%
		request.setCharacterEncoding("UTF-8");
		
		
		// 사용자로부터 데이터를 읽어드림
		String id = request.getParameter("id");
		String pass = request.getParameter("pass");
		
		//아이디와 패스워드를 저장
		session.setAttribute("id", id);
		session.setAttribute("pass", pass);
		
		//세션의 유지시간 설정
		session.setMaxInactiveInterval(60);
		
		%>

		<h2>당신의 아이디는<%=id%>입니다. 당신에 패스워드는<%=pass%> </h2>
		<a href="SessionLoginProc2.jsp">다음페이지로 이동</a>
	</center>
</body>
</html>