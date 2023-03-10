<%@page import="model.MemberDAO"%>
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
		request.setCharacterEncoding("UTF-8");
		
	%>
	<jsp:useBean id="mbean" class="model.MemberBean">
		<jsp:setProperty name="mbean" property="*" />
	</jsp:useBean>
	
	<%
		MemberDAO mdao = new MemberDAO();
		//String타입으로 저장되어있는 패스워드를 가져옴(데이터베이스에서 가져온 pass 값이 저장)
		String pass = mdao.getPass(mbean.getId());
		
		//수정하기 위해서 작성한 패스워드 값과 기존 데이터베이스에서 가져온 패스워드값을 비교
		if(mbean.getPass1().equals(pass)){//기존 패스워드와 데이터베이스 패스워드가 같다면 테이블을 수정
			System.out.println(pass);
			
			//MemberDAO 클랫의 회원 수정 메소드를 호출
			mdao.deleteMember(mbean.getId());
			response.sendRedirect("MemberList.jsp");
			
		}else{	
		%>
			<script type="text/javascript">
					alert("패스워드가 맞지 않습니다. 다시 확인해 주세요");
					history.go(-1);
			</script>		
			<%
		}
		 %>
</body>
</html>