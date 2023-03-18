package kr.co.ultari.process;

import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.OutputStreamWriter;
import java.util.Properties;

import kr.co.ultari.common.StringTool;

public class AdminMgr 
{
	String admPath = "";

	Properties prot = new Properties();
    String sProtPath = "/config/Config.properties";	
    
    public AdminMgr()
    {
    	try 
    	{
			prot.load(getClass().getResourceAsStream(sProtPath));
			
			admPath = StringTool.NullTrim(prot.getProperty("ADMINPWDPATH").trim());
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
    }
    
    public String getAdmPwd()
    {
    	String rtn = "";
    	
    	File admFile = null;
    	
		FileInputStream fi = null;
		InputStreamReader is = null;
		BufferedReader br = null;
		
		String line = null;
		
		admFile = new File(admPath);
		
		if(admFile.exists())
		{
			try
			{
				fi = new FileInputStream(admFile);
				is = new InputStreamReader(fi);
				br = new BufferedReader(is);
				
				while((line = br.readLine()) != null)
				{
					rtn = StringTool.NullTrim(line.trim());
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
    	
    	return rtn;
    }
    
    public boolean setAdmPwd(String pwd)
    {
    	boolean rtn = false;
    	
    	File admFile = null;
    	
    	FileOutputStream fo = null;
    	OutputStreamWriter osw = null;
    	BufferedWriter bw = null;
		
		String line = null;
		
		admFile = new File(admPath);
		
		if(admFile.exists())
		{
			try
			{
				fo = new FileOutputStream(admFile);
				osw = new OutputStreamWriter(fo);
				bw = new BufferedWriter(osw);
				
				bw.write(pwd.trim());
			    bw.flush();
			    rtn = true;
			}
			catch(Exception e)
			{
				e.printStackTrace();
			}
			finally
			{
				try{if(bw != null) bw.close();}catch(Exception e){e.printStackTrace();}
				try{if(osw != null) osw.close();}catch(Exception e){e.printStackTrace();}
				try{if(fo != null) fo.close();}catch(Exception e){e.printStackTrace();}
			}
		}
    	
    	return rtn;
    }
}
