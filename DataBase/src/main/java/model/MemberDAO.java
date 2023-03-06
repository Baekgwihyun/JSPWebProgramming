package model;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;

// 오라클 데이터 베이스를 연결하고 select, insert, update, delete작업을 실행하는 클래스
public class MemberDAO {

	

	//오라클에 접속하는 소스 작성
		String id = "qorrnlgus95";
		String pass= "slalwhw12";
		String url = "jdbc:oracle:thin:@localhost:1522:orcl"; //접속 url
		
		Connection con; // 데이터베이스에 접근할 수 있도록 설정 멤버변수 선언
		PreparedStatement pstmt; // 데이터베이스에서 쿼리를 실행 시켜주는 객체
		ResultSet rs; // 데이터베이스의 테이블의 결과를 리턴받아 자바에 저장해주는 객체
		
		
	//데이터 베이스에 접근할 수 있도록 도와주는 메소드
	public void getCon() {
		
		try {
			//1.해당 데이터 베이스를 사용한다고 선언(클래스를 등록 = 오라클을 사용) 	
			Class.forName("oracle.jdbc.driver.OracleDriver");
			//2.해당 데이터 베이스에 접속
			//Connection con = DriverManager.getConnection(id, pass, url);
			con = DriverManager.getConnection(url, id, pass);
			System.out.println("[Database 연결 성공]");
			
		} catch (Exception e) {
			// TODO: handle exception
		}
		
	}
	
	//데이터 베이스에 한사람의 회워 정보를 저장해주즌 메소드
	
	public void insertMember(MemberBean mbean) {
		// TODO Auto-generated method stub
		try{
			getCon();
			
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

	}
}
