package kr.co.ultari.process;

import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
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
			
			admPath = StringTool.NullTrim(prot.getProperty("ADMINPWD").trim());
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
		

		String leftStr = null;
		String rightStr = null;
		
		if(admFile.exists())
		{
			/*
			 * try(FileInputStream test = new FileInputStream(admFile); BufferedReader brr =
			 * new BufferedReader(new InputStreamReader(test))) {
			 * 
			 * } catch (Exception e1) { // TODO Auto-generated catch block
			 * e1.printStackTrace(); }
			 */
			
			try
			{
				fi = new FileInputStream(admFile);
				is = new InputStreamReader(fi);
				br = new BufferedReader(is);
				
				while((line = br.readLine()) != null)
				{
				
					
					// bgh
					rtn = StringTool.NullTrim(line.trim());
					if(line.indexOf(":") > 0)
					{
						leftStr = line.substring(0,line.indexOf(":"));
						rightStr = line.substring(line.indexOf(":") +1,line.length());
						
						if(leftStr.equals("ADMINPWD"))
						{
							rtn = rightStr.trim();
						}
					}
//				
					//System.out.println("rtb = "+ rtn);
					
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
		
		
		String leftStr = null;
		String rightStr = null;

		
		
		if(admFile.exists())
		{
			try
			{
				fo = new FileOutputStream(admFile);
				osw = new OutputStreamWriter(fo);
				bw = new BufferedWriter(osw);
				
				// bgh
				if(line.indexOf(":") > 0)
				{
					leftStr = line.substring(0,line.indexOf(":"));
					rightStr = line.substring(line.indexOf(":") +1,line.length());
					
					if(leftStr.equals("ADMINPWD"))
					{
						rtn = rightStr.trim() != null;
						System.out.println("adminmgr"+rtn);
						bw.write(pwd.trim());
						bw.flush();
					}
				}
				
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
