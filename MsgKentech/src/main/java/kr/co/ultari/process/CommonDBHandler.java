package kr.co.ultari.process;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.ResultSetMetaData;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import kr.co.ultari.db.ConnectionMgr;

public class CommonDBHandler {
	
	ConnectionMgr cmgr = new ConnectionMgr();

	public JSONArray getQuery2JSON(String query, ArrayList list) throws Exception 
	{
		Connection conn = cmgr.getConnection();
		
		PreparedStatement ps = null;
		ResultSet rs = null;
		ResultSetMetaData rsmd = null;
		JSONArray res = new JSONArray();

		try
		{
			
			int idx = 0;
			ps = conn.prepareStatement(query);
			for(int i=0;i<list.size();i++)
			{
				ps.setString(i+1, (String) list.get(i));
			}
			rs = ps.executeQuery();
			
			rsmd = rs.getMetaData();
			int colCount = rsmd.getColumnCount();

			while(rs.next())
			{
				JSONObject al = new JSONObject();
				String pk = "";
				for (int i = 1; i <= colCount; i++) 
				{
					try 
					{
						al.put(rsmd.getColumnLabel(i).toLowerCase(),(""+rs.getObject(i)).trim());
					} catch (JSONException e) {
						e.printStackTrace();
					}
				}
				res.put(al);
			}
		}
		catch (SQLException e) 
		{
			e.printStackTrace();
		}
		finally
		{
			cmgr.close(conn,rs,ps);
		}
		return res;
	}
	
	public JSONArray getQuery2JSON(String query) throws Exception 
	{
		Connection conn = cmgr.getConnection();
		Statement stmt = null;
		ResultSet rs = null;
		ResultSetMetaData rsmd = null;
		JSONArray res = new JSONArray();

		try
		{
			stmt = conn.createStatement();
			rs = stmt.executeQuery(query);
			rsmd = rs.getMetaData();
			int colCount = rsmd.getColumnCount();
			
			while(rs.next())
			{
				JSONObject al = new JSONObject();
				for (int i = 1; i <= colCount; i++) 
				{
					try 
					{
						al.put(rsmd.getColumnLabel(i).toLowerCase(),"" + rs.getObject(i));
					} catch (JSONException e) {
						e.printStackTrace();
					}
				}
				res.put(al);
			}
		}
		catch (SQLException e)
		{
			e.printStackTrace();
		}
		finally
		{
			cmgr.close(conn,rs,stmt);
		}
		return res;
	}
}
