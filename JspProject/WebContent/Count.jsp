<%@ page language="java" contentType="text/html; charset=EUC-KR"
    pageEncoding="EUC-KR"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="EUC-KR">
<title>Insert title here</title>
</head>
<body>

	<%
		//콘솔창 출력
		//1~10까지의 숫자를 화면에 출력하시오 
		for(int i = 1;i<10;i++){
				System.out.println(i);
		}
	%>
	
	
	<%
		//1~10까지의 숫자를 화면에 출력하시오 
		for(int i = 1;i<10;i++){
	%>
			<%=i%><br>

	<%
		}
	%>
	
	
</body>
</html>