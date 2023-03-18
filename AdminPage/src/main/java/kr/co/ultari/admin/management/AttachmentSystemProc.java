package kr.co.ultari.admin.management;

import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.OutputStreamWriter;

import kr.co.ultari.File.FileController;

public class AttachmentSystemProc {

	public AttachmentSystemProc()
	{		
	}

	public boolean ModFile(String FilePath, String FindString, String ModString)
	{
		File OrgFile = null;
		File TmpFile = null;
		FileInputStream fi = null;
		FileOutputStream fo = null;
		BufferedReader br = null;
		BufferedWriter bw = null;
		String line = null;
		String leftStr = null;
		String rightStr = null;
		
		boolean rtn = false;
		
		OrgFile = new File(FilePath);
		
		if(OrgFile.exists())
		{
			TmpFile = new File(FilePath+".tmp");
			try
			{
				fi = new FileInputStream(OrgFile);
				br = new BufferedReader(new InputStreamReader(fi,"UTF-8"));
				
				fo = new FileOutputStream(TmpFile);
				bw = new BufferedWriter(new OutputStreamWriter(fo,"UTF-8"));
				
				while((line = br.readLine()) != null)
				{
					if(line.indexOf(":") > 0)
					{
						leftStr = line.substring(0,line.indexOf(":"));
						rightStr = line.substring(line.indexOf(":") +1,line.length());
						
						if(leftStr.equals(FindString))
						{
							line = leftStr + ":" + ModString;
						}
					}
					
					//System.out.println(line);
					bw.write(line+"\r\n");
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
				try
				{
					br.close();
					bw.close();
				}
				catch(Exception ce)
				{
					ce.printStackTrace();
				}
			}
			
			if(rtn)
			{
				 try
				 {
					 OrgFile.delete();
					 TmpFile.renameTo(new File(FilePath));
			     }
				 catch(Exception ee)
				 {
					 ee.printStackTrace();
				 }
			}
		}
		
		return rtn;
	}
	
	public String getConfigList(String FilePath,String FindStr)
	{
		String str = "";
		File OrgFile = null;
		FileInputStream fi = null;
		BufferedReader br = null;
		String line = null;
		
		String leftStr = null;
		String rightStr = null;
		
		OrgFile = new File(FilePath);
		
		if(OrgFile.exists())
		{
			try
			{
				fi = new FileInputStream(OrgFile);
				br = new BufferedReader(new InputStreamReader(fi,"UTF-8"));
				
				while((line = br.readLine()) != null)
				{
					//System.out.println(line);
					if(line.indexOf(":") > 0)
					{
						leftStr = line.substring(0,line.indexOf(":"));
						rightStr = line.substring(line.indexOf(":") +1,line.length());
						
						if(leftStr.equals(FindStr))
						{
							str = rightStr.trim();
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
				try
				{
					br.close();
				}
				catch(Exception ce)
				{
					ce.printStackTrace();
				}
			}
		}
		else
		{
			str = "파일이 존재하지 않습니다.";
		}
		
		return str;
	}
	
	
	
	
	public static void main(String[] args) throws FileNotFoundException {
		
		 byte[] b = new byte[1024];
		String path = "D:\\5.Java_workspase\\PC\\AtMessenger7_Server_212\\AtMessenger7_Server\\DiskCleanService\\Config.dat";
		
		FileInputStream input = new FileInputStream(path);

		System.out.println("path : = "+ path);
		try {
			input.read(b);
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
       
        try {
			input.close();
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
		
		
		
	}

}
