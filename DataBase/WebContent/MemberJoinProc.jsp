<%@ page import="java.sql.Connection"%>
<%@ page import="java.sql.DriverManager"%>
<%@ page import="java.sql.PreparedStatement"%>
<%@ page import="java.sql.ResultSet"%>
<%@ page import="java.util.ArrayList"%>
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
	//취미 부분은 별도로 읽어드려 다시 빈클래스에 저장 
	String [] hobby = request.getParameterValues("hobby");
	
	//배열에 있는 내용알을 하나의 스트링으로 저장 
	String texthobby="";
	
	for(int i = 0 ;i < hobby.length; i++){
		texthobby += hobby[i]+" ";
	}
%>

	<!--useBean을 이용하여 한꺼번에 데이터를 받아옴  -->
	<jsp:useBean id = "mbean" class= "model.MemberBean">
		<jsp:setProperty name="mbean" property="*" /><!--맵핑 시키시오  -->
	</jsp:useBean>
<%
	mbean.setHobby(texthobby);//기존의 취미는 주소 번지가 저장되기에  위에 배열의 내용을 하나의 스트림으로 저장한 변수를 다시 입력 
%>
<%
	//오라클에 접속하는 소스 작성
				 			
	String id = "qorrnlgus95";
	String pass= "slalwhw12";
	String url = "jdbc:oracle:thin:@localhost:1522:orcl"; //접속 url
	
	try{
		//1.해당 데이터 베이스를 사용한다고 선언(클래스를 등록 = 오라클을 사용) 	
		Class.forName("oracle.jdbc.driver.OracleDriver");
		//2.해당 데이터 베이스에 접속
		//Connection con = DriverManager.getConnection(id, pass, url);
		Connection con = DriverManager.getConnection(url, id, pass);
		System.out.println("[Database 연결 성공]");
		
		//3. 접속후 쿼리 준비하여 쿼리를 실행하여 쿼리를 사용하도록 설정 
  		 String sql = "INSERT INTO MEMBER VALUES(?,?,?,?,?,?,?,?)"; 
		// 쿼리 사용하도록 설정
		PreparedStatement pstmt = con.prepareStatement(sql);
  		// "?" 물음표에 맞게 데이터를 맵핑
  		
  		pstmt.setString(1, mbean.getId());
  		pstmt.setString(2, mbean.getPass1());
  		pstmt.setString(3,mbean.getEmail());
  		pstmt.setString(4,mbean.getTel());
  		pstmt.setString(5,mbean.getHobby());
  		pstmt.setString(6,mbean.getJob());
  		pstmt.setString(7,mbean.getAge());
  		pstmt.setString(8,mbean.getInfo());
  		
  		//4.오라클에서 퀴리를 실행 하시오 
   		pstmt.executeUpdate();//insert,update,delete 시 사용하는 메소드 
  		
  		//자원 반납
  		con.close();
  		
  		
	}catch(Exception e){
			e.printStackTrace();
			
	}
	
%>
oracle 접속 완료~


	<h2> 당신의 아이디 = <%=mbean.getId()%></h2>
	<h2> 당신의 취미는 = <%=mbean.getHobby()%></h2>
</body>
</html>