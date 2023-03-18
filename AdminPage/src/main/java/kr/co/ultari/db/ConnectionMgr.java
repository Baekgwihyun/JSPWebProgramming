package kr.co.ultari.db;

import java.io.FileWriter;
import java.sql.*;
import java.util.Properties;

import javax.sql.*;
import javax.naming.*;

public class ConnectionMgr{
	public Connection getConnection() throws Exception{
		Connection conn = null;
		try{
				Properties prot = new Properties();
				String sProtPath = "/config/Config.properties";
				prot.load(getClass().getResourceAsStream(sProtPath));
				
				String driver = prot.getProperty("DBDRIVER").trim();
				String type = prot.getProperty("DBTYPE").trim();
				String url = prot.getProperty("DBURL").trim();
				String id = prot.getProperty("DBID").trim();
				String passwd = prot.getProperty("DBPASSWD").trim();
			
				Class.forName(driver);
				 
	            Properties p = new Properties();
	            p.put("user", id);
	            p.put("password", passwd);
	            conn = DriverManager.getConnection(url,p);
             
             //System.out.println("success");
            
             /* jeus connection pool setting
			Context ctx = new InitialContext();
			DataSource ds = (DataSource)ctx.lookup("newmsgpool");
			conn = ds.getConnection();
			*/
             
			/*FileWriter fw = new FileWriter("/home/naskms/newmsg/conn_log.txt", false);
			fw.write("ConnectionPool = "+conn+"\n");
			fw.flush();
			fw.close();*/
		}
		catch(Exception e){
			System.out.print("fail");
			e.printStackTrace();
		}
		return conn;
	}
	
	public void close(Connection conn, PreparedStatement ps){
		try {	if(ps != null) ps.close();} catch (Exception e){ e.printStackTrace();}
		try {	if(conn != null) conn.close();} catch (Exception e){e.printStackTrace();}
	}
	public void close(Connection conn, ResultSet rs, Statement st){
		try { if(rs != null) rs.close();} catch (Exception e){e.printStackTrace();}
		try { if(st != null) st.close();} catch (Exception e){e.printStackTrace();}
		try { if(conn != null) conn.close();} catch (Exception e){e.printStackTrace();}	
	}
	public void close(Connection conn, ResultSet rs, PreparedStatement ps){
		try { if(rs != null) rs.close();} catch (Exception e){e.printStackTrace();}
		try { if(ps != null) ps.close();} catch (Exception e){e.printStackTrace();}
		try { if(conn != null) conn.close();} catch (Exception e){e.printStackTrace();}
	}
	public void close(Connection conn, ResultSet rs, Statement st, PreparedStatement ps){
		try { if(rs != null) rs.close();} catch (Exception e){e.printStackTrace();}
		try { if(st != null) st.close();} catch (Exception e){e.printStackTrace();}
		try { if(ps != null) ps.close();} catch (Exception e){e.printStackTrace();}
		try { if(conn != null) conn.close();} catch (Exception e){e.printStackTrace();}
	}
}

