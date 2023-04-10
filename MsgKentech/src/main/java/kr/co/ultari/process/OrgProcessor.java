package kr.co.ultari.process;

import java.io.PrintWriter;
import java.util.ArrayList;
import java.util.Properties;

import org.json.JSONArray;

import org.json.JSONException;
import org.json.JSONObject;

import kr.co.ultari.common.StringTool;

import java.util.ArrayList;

import javax.servlet.ServletContext;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import kr.co.ultari.process.Proc;
import kr.co.ultari.db.DBController;;

public class OrgProcessor implements Proc {

	  private HttpServletRequest request = null;
	  private HttpServletResponse response = null;
	  private ServletContext Context = null;
	  
	  CommonDBHandler db = new CommonDBHandler();
	  Properties prot = new Properties();
	  String protPath = "/config/Config.properties";

	  public OrgProcessor(HttpServletRequest request, HttpServletResponse response, ServletContext Context) throws Exception
	  {
	    this.response = response;
	    this.request = request;
	    this.Context = Context;
	  }

	
	public void getChild(JSONObject jo) throws Exception
	{
		PrintWriter out;
		
		JSONObject jsonOb = new JSONObject();
		JSONArray jsonArry = null;
		ArrayList list = new ArrayList();
		
		String high = jo.getString("high");
		prot.load(getClass().getResourceAsStream(protPath));
		String query = prot.getProperty("ORGTREEDEPTQUERY").trim();
		list.add(high);
		
		jsonArry = db.getQuery2JSON(query, list);
		
		for(int i=0;i<jsonArry.length();i++)
		{
			JSONObject j = jsonArry.getJSONObject(i);
			j.put("isFolder", true);
			j.put("isLazy", true);
			j.put("key", j.get("id"));
			j.put("high", j.get("high"));
			j.put("title", j.get("name"));
			j.put("icon", false);
			j.put("order","9" + StringTool.modText(j.getString("sort"),8,"0"));
		}
		
		//jsonArry.sort();
		
		/*jsonOb.put("title", "전체 공유 폴더");
		jsonOb.put("top", "totallist");
		jsonOb.put("icon", false);
		jsonOb.put("key", "0");
		jsonOb.put("highname", "top");
		jsonOb.put("filetype", "folder");
		jsonOb.put("contexttype", "contextGroup");
		jsonOb.put("isFolder", true);
		jsonOb.put("isLazy", true);
		jsonArry.put(jsonOb);*/
		
		out = response.getWriter();
		out.print(jsonArry.toString());
		out.flush();
	}
	
	public void getData(String high)
	{
		
	}
}
