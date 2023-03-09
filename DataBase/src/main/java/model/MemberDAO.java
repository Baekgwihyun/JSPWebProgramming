package model;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.util.Vector;

// 오라클 데이터 베이스를 연결하고 select, insert, update, delete작업을 실행하는 클래스
public class MemberDAO {

	// 오라클에 접속하는 소스 작성
	String id = "qorrnlgus95";
	String pass = "slalwhw12";
	String url = "jdbc:oracle:thin:@localhost:1521:orcl"; // 접속 url

	Connection con; // 데이터베이스에 접근할 수 있도록 설정 멤버변수 선언
	PreparedStatement pstmt; // 데이터베이스에서 쿼리를 실행 시켜주는 객체
	ResultSet rs; // 데이터베이스의 테이블의 결과를 리턴받아 자바에 저장해주는 객체

	// 데이터 베이스에 접근할 수 있도록 도와주는 메소드
	public void getCon() {

		try {
			// 1.해당 데이터 베이스를 사용한다고 선언(클래스를 등록 = 오라클을 사용)
			Class.forName("oracle.jdbc.driver.OracleDriver");
			// 2.해당 데이터 베이스에 접속
			// Connection con = DriverManager.getConnection(id, pass, url);
			con = DriverManager.getConnection(url, id, pass);
			System.out.println("[Database 연결 성공]");

		} catch (Exception e) {
			// TODO: handle exception
		}

	}

	// 데이터 베이스에 한사람의 회워 정보를 저장해주즌 메소드

	public void insertMember(MemberBean mbean) {
		// TODO Auto-generated method stub
		try {
			getCon();

			// 3. 접속후 쿼리 준비하여 쿼리를 실행하여 쿼리를 사용하도록 설정
			String sql = "INSERT INTO MEMBER VALUES(?,?,?,?,?,?,?,?)";
			// 쿼리 사용하도록 설정
			PreparedStatement pstmt = con.prepareStatement(sql);
			// "?" 물음표에 맞게 데이터를 맵핑

			pstmt.setString(1, mbean.getId());
			pstmt.setString(2, mbean.getPass1());
			pstmt.setString(3, mbean.getEmail());
			pstmt.setString(4, mbean.getTel());
			pstmt.setString(5, mbean.getHobby());
			pstmt.setString(6, mbean.getJob());
			pstmt.setString(7, mbean.getAge());
			pstmt.setString(8, mbean.getInfo());

			// 4.오라클에서 퀴리를 실행 하시오
			pstmt.executeUpdate();// insert,update,delete 시 사용하는 메소드

			// 자원 반납
			con.close();

		} catch (Exception e) {
			e.printStackTrace();

		}
	}

//모든 회원의 정보를 리턴해 주는 매소드 호출 
public Vector<MemberBean> allSelectMember(){
	//가변길이로 데이터를 저장
	Vector<MemberBean> v = new Vector<>();
	
	//a무조건 데이터 베이스는 예외처리를 해야함
		try {
			//커넥션 연결 커넥션 함수 호출
			getCon();
			// 쿼리 준비
			String sql ="select * from member";
			//쿼리를 실행시켜주는 객체 선언
			pstmt = con.prepareStatement(sql);
			//쿼리를 실행 시킨 결과를 리턴해서 받아줌(오라클 테이블의 검색된 결과를 자바객체에 저장)
			rs = pstmt.executeQuery();
			//반복문을 사용해서 rs에 저장된 데이터를 추출해야한다.
			while (rs.next()) {
				MemberBean bean =  new MemberBean();
				bean.setId(rs.getString(1));
				bean.setPass1(rs.getString(2));
				bean.setEmail(rs.getString(3));
				bean.setTel(rs.getString(4));
				bean.setHobby(rs.getString(5));
				bean.setJob(rs.getString(6));
				bean.setAge(rs.getString(7));
				bean.setInfo(rs.getString(8));
				
				//패키징된 memberbean클래스를 백터에 저장
				v.add(bean);
			}
			//자원 반납
			con.close();
		} catch (Exception e) {
			// TODO: handle exception
		}	
	
		//저장된 백터를 리턴
		return v;
}

public MemberBean oneSelectMember(String id){
	//한사람에 대한 정보만 리턴하기에 빈클래스 객체 생성
	MemberBean bean = new MemberBean();
	//무조건 데이터 베이스는 예외 처리를 반드시 해야 합니다.
	 try{
		 //커넥션 연결 
		 getCon();
		 
		 //쿼리 준비 
		 String SQL = "SELECT *FROM MEMBER WHERE id= ?";
		 //쿼리를 실행 시켜주는 객체 선언 
		 pstmt = con.prepareStatement(SQL);		 
		 //?의 값을 맵핑 
		 pstmt.setString(1,id);
		 //쿼리 실행 
		 rs = pstmt.executeQuery();
		 if(rs.next()){//레코드가 있다면 
			 bean.setId(rs.getString(1));
			 bean.setPass1(rs.getString(2));
			 bean.setEmail(rs.getString(3));
			 bean.setTel(rs.getString(4));
			 bean.setHobby(rs.getString(5));
			 bean.setJob(rs.getString(6));
			 bean.setAge(rs.getString(7));
			 bean.setInfo(rs.getString(8));	 		 
		 }
		 
		 //자원 반납
		 con.close();
		 
	    }catch(Exception e){
	    	e.printStackTrace();
	   	}	
	 //리턴 
	return bean;	
}
}
