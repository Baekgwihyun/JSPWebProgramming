package kr.co.ultari.process;

import java.io.IOException;
import java.io.PrintWriter;
import java.util.Properties;

import javax.servlet.ServletContext;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.json.JSONException;
import org.json.JSONObject;
import org.json.JSONArray;

import kr.co.ultari.db.DBController;
import kr.co.ultari.process.Proc;

public class CheckId implements Proc{

	private HttpServletRequest request = null;
	private HttpServletResponse response = null;
	private ServletContext Context = null;

	DBController mo = new DBController();
    Properties prot = new Properties();
    String sProtPath = "/config/Config.properties";	
    
	public CheckId(HttpServletRequest request, HttpServletResponse response, ServletContext Context) throws Exception
	{
		this.response = response;
	    this.request = request;
	    this.Context = Context;
	    
	}
	public void checkOverLap(JSONObject jo) throws Exception
	{
		PrintWriter out;
		
		String id = jo.getString("id");
		String status = "no";

		JSONObject j = new JSONObject();
		
		prot.load(getClass().getResourceAsStream(sProtPath));
		String query = prot.getProperty("CHECKIDQUERY").trim();
		String[] value = {id};
		
		String[] Content = mo.getContent(query,value);
		
		if(Content[0].equals("0"))
		{
			status = "ok";
		}
		j.put("status", status);

		out = response.getWriter();
		out.print(j);
		out.flush();
	}
	
	public void checkOverLapDept(JSONObject jo) throws Exception
	{
		PrintWriter out;
		
		String id = jo.getString("id");
		String status = "no";

		JSONObject j = new JSONObject();
		
		prot.load(getClass().getResourceAsStream(sProtPath));
		String query = prot.getProperty("CHECKDEPTQUERY").trim();
		String[] value = {id};
		
		String[] Content = mo.getContent(query,value);
		
		if(Content[0].equals("0"))
		{
			status = "ok";
		}
		j.put("status", status);

		out = response.getWriter();
		out.print(j);
		out.flush();
	}
	
	public void test()
	{
		System.out.println("test");
	}
}
