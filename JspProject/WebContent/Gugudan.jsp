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
		for(int i=2;i<10;i++){
			
			for(int j = 1 ; j < 10;j++){
				
				System.out.println(i + "*" + j + "=" + i*j);
				
			}	
			System.out.println();
		}
	%>
	
	
	
	
	<% 
		for(int i=2;i<10;i++){	
			for(int j = 1 ; j < 10;j++){
	%>			
				<%=i %> * <%=j %> = <%=i*j%> &nbsp;&nbsp;
	<% 			
			}	
	%>
		<br>
	<% 			
		}
	%>

</body>
</html>