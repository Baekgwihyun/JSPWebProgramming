package kr.co.ultari.process;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileInputStream;
import java.io.InputStreamReader;
import java.io.PrintWriter;
import java.util.ArrayList;
import java.util.List;
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

public class OrgProcessorFile implements Proc {

	  private HttpServletRequest request = null;
	  private HttpServletResponse response = null;
	  private ServletContext Context = null;
	  
	  CommonDBHandler db = new CommonDBHandler();
	  Properties prot = new Properties();
	  String protPath = "/config/Config.properties";

	  public OrgProcessorFile(HttpServletRequest request, HttpServletResponse response, ServletContext Context) throws Exception
	  {
	    this.response = response;
	    this.request = request;
	    this.Context = Context;
	    
	    prot.load(getClass().getResourceAsStream(protPath));
	  }

	
	public void getChild(JSONObject jo) throws Exception
	{
		PrintWriter out;
		
		JSONArray jsonArry = new JSONArray();
		ArrayList list = new ArrayList();
		
		String high = jo.getString("high");
		
		List flist = getFileList();
		
		for(int i=0;i<flist.size();i++)
		{
			String[] content = (String[])flist.get(i);
			
			if(StringTool.NullTrim(content[1]).equals(high))
			{
				JSONObject j = new JSONObject();
				j.put("isFolder", true);
				j.put("isLazy", true);
				j.put("key", StringTool.NullTrim(content[0]));
				j.put("high", StringTool.NullTrim(content[1]));
				j.put("title", StringTool.NullTrim(content[2]));
				j.put("icon", false);
				j.put("order","9" + StringTool.modText(StringTool.NullTrim(content[3]),8,"0"));
				jsonArry.put(j);
			}
		}
		
		out = response.getWriter();
		out.print(jsonArry.toString());
		out.flush();
	}
	
	public List getFileList()
	{
		List list = null;
		String str;
		
		String filePath = prot.getProperty("ORGPATH").trim();
		
		File orgFile = null;
    	
		FileInputStream fi = null;
		InputStreamReader is = null;
		BufferedReader br = null;
		
		String line = null;
		
		orgFile = new File(filePath);
		
		if(orgFile.exists())
		{
			list = new ArrayList();
			
			try
			{
				fi = new FileInputStream(orgFile);
				is = new InputStreamReader(fi,"UTF-8");
				br = new BufferedReader(is);
				
				while((line = br.readLine()) != null)
				{
					str = line.trim();
					String[] ar = str.split("\t");
					
					if(ar.length == 4)
					{
						list.add(ar);
					}
				}
			}
			catch(Exception e)
			{
				e.printStackTrace();
			}
			finally
			{
				try{if(br != null) br.close();}catch(Exception e){e.printStackTrace();}
				try{if(is != null) is.close();}catch(Exception e){e.printStackTrace();}
				try{if(fi != null) fi.close();}catch(Exception e){e.printStackTrace();}
			}
		}
		
		return list;
	}
}
