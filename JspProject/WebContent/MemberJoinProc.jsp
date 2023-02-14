<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Insert title here</title>
</head>
<body>

	<h2>회원 정보 보기</h2>
	<%
	request.setCharacterEncoding("UTF-8");
	%>

	<!-- request로 넘어온 데이터를 자바 빈즈랑 맵핑 시켜주는 useBean-->
	<jsp:useBean id="mbean" class="bean.MemberBean"><!-- 객체 생성 MemberBeab mbean = new MemberBean()-->

		<!-- jsp 내용을 자바빈 클래스(MemberBean의미)에 데이터를 맵핑(넣어줌) -->
		<jsp:setProperty name="mbean" property="*" /><!-- jsp:setProperty는 프로퍼티의 값을 세팅할 때 사용함 -->
	</jsp:useBean>

	<h2>
		당신의 아이디는
		<jsp:getProperty property="id" name="mbean" /></h2><!-- jsp:getProperty는 프로퍼티의 값을 언어낼 때 사용함 -->
	<h2>
		당신의 패스<jsp:getProperty property="pass1" name="mbean" /></h2>
	<h2>
		당신의 이메일
		<jsp:getProperty property="email" name="mbean" /></h2>
	<h2>
		당신의 이메일
		<%=mbean.getTel()%></h2>
</body>
</html>