package kr.co.ultari.process;

import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.OutputStreamWriter;
import java.util.ArrayList;
import java.util.List;
import java.util.Properties;

import kr.co.ultari.common.StringTool;

public class PartProcessorFile 
{
	String filePath = "";

	Properties prot = new Properties();
    String sProtPath = "/config/Config.properties";	
    
    public PartProcessorFile()
    {
    	try 
    	{
			prot.load(getClass().getResourceAsStream(sProtPath));
			
			filePath = prot.getProperty("ORGPATH").trim();
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
    }
    
    public String[] getPart(String partId)
    {
    	String[] content = null;
		String str;
		
		File orgFile = null;
    	
		FileInputStream fi = null;
		InputStreamReader is = null;
		BufferedReader br = null;
		
		String line = null;
		
		orgFile = new File(filePath);
		
		if(orgFile.exists())
		{
			try
			{
				fi = new FileInputStream(orgFile);
				is = new InputStreamReader(fi,"UTF-8");
				br = new BufferedReader(is);
				
				while((line = br.readLine()) != null)
				{
					str = line.trim();
					String[] ar = str.split("\t");
					
					if(ar.length == 4 && StringTool.NullTrim(ar[0]).equals(partId))
					{
						content = ar;
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
		
    	return content;
    }
}
