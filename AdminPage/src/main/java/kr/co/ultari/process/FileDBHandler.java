package kr.co.ultari.process;


import java.util.ArrayList;
import java.util.Properties;

import org.json.JSONArray;
import org.json.JSONObject;

import java.util.Properties;
import org.json.JSONArray;
import org.json.JSONObject;
import java.util.ArrayList;

import kr.co.ultari.common.StringTool;
import kr.co.ultari.process.CommonDBHandler;


public class FileDBHandler extends CommonDBHandler 
{
	private Properties configprot;
	private Properties queryprot;

	public  FileDBHandler() throws Exception
	{
		configprot = new Properties();
		String configprotPath = "/config/Config.properties";
		configprot.load(getClass().getResourceAsStream(configprotPath));
		
		queryprot = new Properties();
		
		String queryprotPath = "/config/Config.properties";

		queryprot.load(getClass().getResourceAsStream(queryprotPath));
	}
	
	public JSONArray getChildTotal(JSONObject jo) throws Exception
	{
		JSONArray jsonArray = null;
		ArrayList list = new ArrayList();
		
		String query = queryprot.getProperty("TOTALFOLDERQUERY").trim();
		
		String  high = jo.getString("high");
		String addquery = "";
		
		if(high.equals("0"))
		{
			high = configprot.getProperty("FILEBOXTOP").trim();
			addquery = " AND A.FB_CODE= ? ";
		}else
		{
			addquery = " AND A.P_FB_CODE = ? ";
		}
		
		query = StringTool.ReplaceAllText(query, "_where", addquery);
		//System.out.println(query);
		//System.out.println(high);
		list.add(high);
		jsonArray = getQuery2JSON(query, list);
		
		if(jsonArray.length() !=0 )
		{
			for(int i=0;i<jsonArray.length();i++)
			{
				JSONObject j = jsonArray.getJSONObject(i);

				j.put("isFolder", true);
				j.put("isLazy", true);
				j.put("top", "totallist");
				j.put("filetype", "folder");
				j.put("contexttype", "contextGroup");
			}
		}
		return jsonArray;
	}
	
	public JSONArray getChildDept(JSONObject jo) throws Exception
	{
		JSONArray jsonArray = null;
		ArrayList list = new ArrayList();
		
		String query = queryprot.getProperty("DEPTFOLDERQUERY").trim();
		
		String  high = jo.getString("high");
		String addquery = "";
		String topcode = configprot.getProperty("FILEBOXTOP").trim();
		
		addquery = " AND A.FB_CODE != '"+topcode+"' AND A.P_FB_CODE= ? ";

		query = StringTool.ReplaceAllText(query, "_where", addquery);
		
		list.add(high);
		jsonArray = getQuery2JSON(query, list);
		
		if(jsonArray.length() !=0 )
		{
			for(int i=0;i<jsonArray.length();i++)
			{
				JSONObject j = jsonArray.getJSONObject(i);

				j.put("isFolder", true);
				j.put("isLazy", true);
				j.put("top", "totallist");
				j.put("filetype", "folder");
				j.put("contexttype", "contextGroup");
			}
		}
		return jsonArray;
	}

	public JSONArray getChildUser(JSONObject jo) throws Exception
	{
		JSONArray jsonArray = null;
		ArrayList list = new ArrayList();
		
		String query = queryprot.getProperty("USERFOLDERQUERY").trim();
		
		String  high = jo.getString("high");

		String addquery = "";
		String topcode = configprot.getProperty("FILEBOXTOP").trim();
		
		addquery = " AND A.P_FB_CODE = ? ";

		query = StringTool.ReplaceAllText(query, "_where", addquery);
		
		list.add(high);
		jsonArray = getQuery2JSON(query, list);
		
		if(jsonArray.length() !=0 )
		{
			for(int i=0;i<jsonArray.length();i++)
			{
				JSONObject j = jsonArray.getJSONObject(i);

				j.put("isFolder", true);
				j.put("isLazy", true);
				j.put("top", "totallist");
				j.put("filetype", "folder");
				j.put("contexttype", "contextGroup");
			}
		}
		return jsonArray;
	}
}
