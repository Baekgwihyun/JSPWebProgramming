package kr.co.ultari.admin.controller;

import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.FileReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.ArrayList;
import java.util.List;

import kr.co.ultari.File.FileController;
import kr.co.ultari.process.AdminMgr;

public class AdminProcessManager {

	PropertyManager propertyManager;
	//FileController fctl = new FileController();

	
	public AdminProcessManager(PropertyManager propertyManager) {
		// TODO Auto-generated constructor stub
		this.propertyManager = propertyManager;
	}
	
	public String getMobileConfigPath() throws IOException {
		return propertyManager.getValue("ADMIN_MOBILE_CONFPATH").trim(); 
	}
	public String getDiskConfigPath() throws IOException {
		return propertyManager.getValue("ADMIN_DISK_CONFPATH").trim(); 
	}
	
	
	public ArrayList<String> MobileConfCtr() throws IOException {
		String patn = getMobileConfigPath();
		File confFile = new File(patn);
		FileReader cf = null;
		BufferedReader br = null;
		String maxdisk ="";
		
		List<String> confresuelt = new ArrayList<>();
		
		try {
			cf = new FileReader(confFile);
			br = new BufferedReader(cf);

			String line = "";

			while ((line = br.readLine()) != null) {
				line.trim();
				if (line.length() > 0 && line.indexOf(":") > 0 && line.charAt(0) != '#') {
					String field = line.substring(0, line.indexOf(":"));

					String value = line.substring(line.indexOf(":") + 1);

					if (field.indexOf(":") == 0 && field.length() > 0) 
					{
					}

					if (field.equals("4CLIENT_MAX_FILE")) 
					{
						 maxdisk = value;
						 confresuelt.add(maxdisk);
						//System.out.println(maxdisk);
					}
					if(field.equals("4CLIENT_USE_EDIT_PICTURE"))
					{
						String pictureYN = value;
						confresuelt.add(pictureYN);
					}
				}
			}
		} catch (Exception e) {
			e.printStackTrace();
		} finally {
			try {
				cf.close();
				cf = null;
			} catch (Exception ee) {
			}
			try {
				br.close();
				br = null;
			} catch (Exception ee) {
			}
		}
		return (ArrayList<String>) confresuelt;
	}
	
	
	
	
	public ArrayList<String> DiskConfCtr() throws IOException {
	
	String patn = getDiskConfigPath();
	File confFile = new File(patn);
	FileReader cf = null;
	BufferedReader br = null;
	String result ="";
	
	List<String> confresuelt = new ArrayList<>();
	
	try {
		cf = new FileReader(confFile);
		br = new BufferedReader(cf);

		String line = "";

		while ((line = br.readLine()) != null) {
			line.trim();
			if (line.length() > 0 && line.indexOf(":") > 0 && line.charAt(0) != '#') {
				String field = line.substring(0, line.indexOf(":"));

				String value = line.substring(line.indexOf(":") + 1);

			
				if (field.indexOf(":") == 0 && field.length() > 0) 
				{
				}

			}
		}
	} catch (Exception e) {
		e.printStackTrace();
	} finally {
		try {
			cf.close();
			cf = null;
		} catch (Exception ee) {
		}
		try {
			br.close();
			br = null;
		} catch (Exception ee) {
		}
	}
	return (ArrayList<String>)confresuelt;
	
	}
	
	public String shellScriptStartCtr(String shellScrip) {
		String shRtn ="";
		
		String command = shellScrip;
		
		try 
		{
			if(command.equals("stopScript")) 
			{
				shRtn = "프로세스가 종료 되었습니다";
				Process process =
					Runtime.getRuntime().exec(command);
			BufferedReader reader = new BufferedReader(
					new InputStreamReader(process.getInputStream()));
			}
			else
			{
				shRtn = "프로세스가 실행 되었습니다";
				Process process =
						Runtime.getRuntime().exec(command);
				BufferedReader reader = new BufferedReader(
						new InputStreamReader(process.getInputStream()));
			}
				
		} catch (Exception e) {
			// TODO: handle exception
		}
		
		return shRtn;
		
	}
}
