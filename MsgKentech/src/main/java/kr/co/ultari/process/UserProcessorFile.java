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
import java.util.ArrayList;
import java.util.List;
import java.util.Properties;

import kr.co.ultari.common.StringTool;

public class UserProcessorFile 
{
	String filePath = "";
	String modStr = "####0#0#1##1#u001#ORG##CSTAUCClient#0#1#1";

	Properties prot = new Properties();
    String sProtPath = "/config/Config.properties";	
    
    public UserProcessorFile()
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
    
    public List getUserList(String high)
    {
    	List list = null;
		String str;
		
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
					
					if(ar.length == 5 && StringTool.NullTrim(ar[1]).equals(high))
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
    
    public String[] getUser(String userId)
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
					
					if(ar.length == 5 && StringTool.NullTrim(ar[0]).equals(userId))
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
    
    public boolean modUser(String userId, String pos, String name,String dept, String sort)
    {
    	boolean rtn = false;
    	
    	List list = new ArrayList();
    	
		String str;
		
		File orgFile = null;
    	
		FileInputStream fi = null;
		InputStreamReader is = null;
		BufferedReader br = null;
		
		String line = null;
		
		orgFile = new File(filePath);
		
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
					String[] ar = str.split("\t");
					
					if(ar.length == 5 && StringTool.NullTrim(ar[0]).equals(userId))
					{
						String chgStr = "";
						
						chgStr = StringTool.NullTrim(ar[0]) + "\t" + StringTool.NullTrim(ar[1]) + "\t" + name + "#" + pos + "#" + dept + modStr + "\t" + StringTool.NullTrim(ar[3]) + "\t" + sort;
						list.add(chgStr);
					}
					else
					{
						list.add(str);
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
			
			//change
			FileOutputStream fo = null;
	    	OutputStreamWriter osw = null;
	    	BufferedWriter bw = null;
			
			try
			{
				fo = new FileOutputStream(orgFile);
				osw = new OutputStreamWriter(fo,"UTF-8");
				bw = new BufferedWriter(osw);
				
				for(int i=0; i< list.size(); i++)
				{
					bw.write((String)list.get(i) + "\n");
				    bw.flush();
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
    
    public boolean delUser(String idList)
    {
    	boolean rtn = false;
    	
    	List list = new ArrayList();
    	
		String str;
		
		File orgFile = null;
    	
		FileInputStream fi = null;
		InputStreamReader is = null;
		BufferedReader br = null;
		
		String line = null;
		
		orgFile = new File(filePath);
		
		String[] idAr = idList.split(",");
		
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
					String[] ar = str.split("\t");
					
					if(ar.length == 4)
					{
						list.add(str);
					}
					else
					{
						boolean check = true;
						
						for(int i=0; i<idAr.length; i++)
						{
							if(ar[0].equals(idAr[i]))
							{
								check = false;
								break;
							}
						}
						
						if(check)
							list.add(str);
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
			
			//change
			FileOutputStream fo = null;
	    	OutputStreamWriter osw = null;
	    	BufferedWriter bw = null;
			
			try
			{
				fo = new FileOutputStream(orgFile);
				osw = new OutputStreamWriter(fo,"UTF-8");
				bw = new BufferedWriter(osw);
				
				for(int i=0; i< list.size(); i++)
				{
					bw.write((String)list.get(i) + "\n");
				    bw.flush();
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
    
    public int getLastId()
    {
    	String idPath = prot.getProperty("UIDPATH").trim();
    	
    	int rtn = 0;
    	
    	List list = new ArrayList();
    	
		String str;
		
		File idFile = null;
    	
		FileInputStream fi = null;
		InputStreamReader is = null;
		BufferedReader br = null;
		
		String line = null;
		
		idFile = new File(idPath);
		
		if(idFile.exists())
		{
			//read
			try
			{
				fi = new FileInputStream(idFile);
				is = new InputStreamReader(fi,"UTF-8");
				br = new BufferedReader(is);
				
				while((line = br.readLine()) != null)
				{
					str = StringTool.NullTrim(line.trim());
					rtn = Integer.parseInt(str) + 1;
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
			FileWriter fw = null;
			try
			{
				fw = new FileWriter(idFile);
				
				fw.write(Integer.toString(rtn));
				fw.flush();
			}
			catch(Exception e)
			{
				e.printStackTrace();
			}
			finally
			{
				try{if(fw != null) fw.close();}catch(Exception e){e.printStackTrace();}
			}
		}
		return rtn;
    }
    
    public boolean addUser(String userId, String deptId, String pos, String name,String dept, String sort)
    {
    	boolean rtn = false;
    	
    	List list = new ArrayList();
    	
		String str;
		
		File orgFile = null;
    	
		FileInputStream fi = null;
		InputStreamReader is = null;
		BufferedReader br = null;
		
		String line = null;
		
		orgFile = new File(filePath);
		
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
				fo = new FileOutputStream(orgFile);
				osw = new OutputStreamWriter(fo,"UTF-8");
				bw = new BufferedWriter(osw);
				
				for(int i=0; i< list.size(); i++)
				{
					bw.write((String)list.get(i) + "\n");
				    bw.flush();
				}
				bw.write(str = userId + "\t" + deptId + "\t" + name + "#" + pos + "#" + dept + modStr + "\t" + "1234" + "\t" + sort + "\n");
				
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
    
    public boolean moveUser(String idList, String deptId, String deptNm)
    {
    	boolean rtn = false;
    	
    	List list = new ArrayList();
    	
		String str;
		
		File orgFile = null;
    	
		FileInputStream fi = null;
		InputStreamReader is = null;
		BufferedReader br = null;
		
		String line = null;
		
		orgFile = new File(filePath);
		String[] idAr = idList.split(",");
		
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
					String[] ar = str.split("\t");
					
					if(ar.length == 4)
					{
						list.add(str);
					}
					else
					{
						boolean check = false;
						
						for(int i=0; i<idAr.length; i++)
						{
							if(ar[0].equals(idAr[i]))
							{
								check = true; 
								break;
							}
						}
						
						if(check)
						{
							String[] nmIdx = ar[2].split("#");
							String chgStr = ar[0] + "\t" + deptId + "\t" + nmIdx[0] + "#" + nmIdx[1] + "#" + deptNm + modStr + "\t" + ar[3] + "\t" + ar[4] + "\n";
							
							list.add(chgStr);
						}
						else
						{
							list.add(str);
						}
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
			
			//change
			FileOutputStream fo = null;
	    	OutputStreamWriter osw = null;
	    	BufferedWriter bw = null;
			
			try
			{
				fo = new FileOutputStream(orgFile);
				osw = new OutputStreamWriter(fo,"UTF-8");
				bw = new BufferedWriter(osw);
				
				for(int i=0; i< list.size(); i++)
				{
					bw.write((String)list.get(i) + "\n");
				    bw.flush();
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
    
    public boolean chgPwd(String userId, String pwd)
    {
    	boolean rtn = false;
    	
    	List list = new ArrayList();
    	
		String str;
		
		File orgFile = null;
    	
		FileInputStream fi = null;
		InputStreamReader is = null;
		BufferedReader br = null;
		
		String line = null;
		
		orgFile = new File(filePath);
		
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
					String[] ar = str.split("\t");
					
					if(ar.length == 5 && StringTool.NullTrim(ar[0]).equals(userId))
					{
						String chgStr = "";
						
						chgStr = StringTool.NullTrim(ar[0]) + "\t" + StringTool.NullTrim(ar[1]) + "\t" + StringTool.NullTrim(ar[2]) + "\t" + pwd + "\t" + StringTool.NullTrim(ar[4]);
						list.add(chgStr);
					}
					else
					{
						list.add(str);
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
			
			//change
			FileOutputStream fo = null;
	    	OutputStreamWriter osw = null;
	    	BufferedWriter bw = null;
			
			try
			{
				fo = new FileOutputStream(orgFile);
				osw = new OutputStreamWriter(fo,"UTF-8");
				bw = new BufferedWriter(osw);
				
				for(int i=0; i< list.size(); i++)
				{
					bw.write((String)list.get(i) + "\n");
				    bw.flush();
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
