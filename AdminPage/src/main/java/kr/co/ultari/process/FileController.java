package kr.co.ultari.process;

import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.FileWriter;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.OutputStreamWriter;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Properties;

import kr.co.ultari.common.StringTool;

public class FileController 
{
	String filePath = "";

	Properties prot = new Properties();
    String sProtPath = "/config/Config.properties";	
    
    public FileController()
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
    
    
    public void backFile()
    {
    	Date dt = new Date();
    	SimpleDateFormat mf = new SimpleDateFormat("yyyyMMddHHmmss");
    	String time = mf.format(dt);
    	
    	List list = new ArrayList();
    	
		String str;
		
		File orgFile = null;
		File newFile = null;
    	
		FileInputStream fi = null;
		InputStreamReader is = null;
		BufferedReader br = null;
		
		String line = null;
		
		orgFile = new File(filePath);
		newFile = new File(filePath + ".bak." + time);
		
		if(orgFile.exists())
		{
			//read
			try
			{
				fi = new FileInputStream(orgFile);
				is = new InputStreamReader(fi,"UTF-8");
				br = new BufferedReader(is);
				
				while((line = br.readLine()) != null)
				{
					str = line.trim();
					
					list.add(str);
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
			
			//change
			FileOutputStream fo = null;
	    	OutputStreamWriter osw = null;
	    	BufferedWriter bw = null;
			
			try
			{
				fo = new FileOutputStream(newFile);
				osw = new OutputStreamWriter(fo,"UTF-8");
				bw = new BufferedWriter(osw);
				
				for(int i=0; i< list.size(); i++)
				{
					bw.write((String)list.get(i) + "\n");
				    bw.flush();
				}
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
    }
    
}
