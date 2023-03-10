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
	//로그아웃 클릭시 파라미터를 통해서 로그아웃인지여부 파악
	String logout = request.getParameter("logout");

	if (logout != null) {
		//id에  null 값을 부여 
		session.setAttribute("id", null);

		//세션 유지 시간을 죽이시오
		session.setMaxInactiveInterval(0);
	}

	//세션을 통하여 id를 읽어드림
	String id = (String) session.getAttribute("id");

	//로그인이 되어 있지 않다면 session값이 null 처리 해줌 
	if (id == null) {
		id = "손님";
	}
	%>

	<!--Top  -->
	<table width="800">
		<tr height="100">
			<!--로고 이미지  -->
			<td colspan="2" align="center" width="260"><img alt=""
				src="images/1.png" width="200" height="70"></td>

			<td colspan="4" align="center"><font size="10">낭만 캠핑 </font></td>
		</tr>
		<tr height="50">
			<td width="100" align="center">텐트</td>
			<td width="100" align="center">의자</td>
			<td width="100" align="center">식기류</td>
			<td width="100" align="center">침낭</td>
			<td width="100" align="center">테이블</td>
			<td width="100" align="center"><%=id%>님</td>

			</td>
		</tr>
	</table>

</body>
</html>