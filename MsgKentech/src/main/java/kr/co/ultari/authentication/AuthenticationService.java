package kr.co.ultari.authentication;

import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.FileReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.OutputStreamWriter;
import java.util.ArrayList;
import java.util.List;


public class AuthenticationService {

	PropertyManager propertyManager;

	public AuthenticationService(PropertyManager propertyManager) {
		this.propertyManager = propertyManager;
	}
	public String getAdminId() throws IOException {
		return propertyManager.getValue("ADMINID").trim();
	}

	public String getAdminPwd() throws IOException {
		return propertyManager.getValue("ADMINPWD").trim();
	}

	public String getMobilePath() throws IOException {
		return propertyManager.getValue("ADMINMOBILEPATH").trim();
	}

	public String getDiskPath() throws Exception {
		return propertyManager.getValue("ADMINDISKPATH").trim();
	}
	
//	
//	private String getDiskPath() throws Exception {
//		return propertyManager.getValue("ADMINDISKPATH").trim();
//	}
//	

	
	
	public void modMobileConfig(String maxFileSize, String proFileYN) throws IOException {
		System.out.println("여기 찍혀?");
		System.out.println(maxFileSize);
		System.out.println(proFileYN);
		
		String path = getMobilePath();
		File OrgFile = null;
		File TmpFile = null;
		FileInputStream fi = null;
		FileOutputStream fo = null;
		BufferedReader br = null;
		BufferedWriter bw = null;
		String line = null;
		String leftStr = null;
		String rightStr = null;
		
		OrgFile = new File(path);
		
		if(OrgFile.exists())
		{
			TmpFile = new File(path+".tmp");
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
						
						if(leftStr.equals("4CLIENT_MAX_FILE"))
						{
							line = leftStr + ":" + maxFileSize;
						}
						if(leftStr.equals("4CLIENT_USE_EDIT_PICTURE"))
						{
							line = leftStr + ":" + proFileYN;
						}
					}
					
					//System.out.println(line);
					bw.write(line+"\r\n");
				    bw.flush();
				}
				//rtn = true;
			}
			catch (Exception e) {
				e.printStackTrace();
			} finally {
				try {
					br.close();
					bw = null;
				} catch (Exception ee) {
				}
				try {
					br.close();
					br = null;
				} catch (Exception ee) {
				}
			}
		}
		
	}
	
	
	
	
	
	
	
	
	
	
	
	
	
	public ArrayList<String> getMobileConfig() throws IOException {

		String path = getMobilePath();
		FileReader cf = null;
		BufferedReader br = null;

		List<String> result = new ArrayList<String>();

		try {
			cf = new FileReader(path);
			br = new BufferedReader(cf);

			String line = "";

			while ((line = br.readLine()) != null) {
				line.trim();
				if (line.length() > 0 && line.indexOf(":") > 0 && line.charAt(0) != '#') {
					String field = line.substring(0, line.indexOf(":"));

					String value = line.substring(line.indexOf(":") + 1);

					if (field.indexOf(":") == 0 && field.length() > 0) {
					}
					if (field.equals("4CLIENT_MAX_FILE")) {
						result.add(value);
					}
					if (field.equals("4CLIENT_USE_EDIT_PICTURE")) {
						result.add(value);
					}

					// System.out.println(result);

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

		return (ArrayList<String>) result;

	}
	  
	public  List<String> getDiskConfig() throws IOException{

		// String path = getDiskPath();
		String path = "D:\\5.Java_workspase\\PC\\AtMessenger7_Server_212\\AtMessenger7_Server\\DiskCleanService\\Config.dat";
		FileReader cf = null;
		BufferedReader br = null;
		List<String> resultValue = new ArrayList<>();
		
//		List<Integer> diskConf = null;
		List<String> diskConf = new ArrayList<>();;
		try {
			cf = new FileReader(path);
			br = new BufferedReader(cf);

			String line = "";

			while ((line = br.readLine()) != null) {
				line.trim();
				if (line.length() > 0 && line.indexOf(":") > 0 && line.charAt(0) != '#') {
					String field = line.substring(0, line.indexOf(":"));

					String value = line.substring(line.indexOf(":") + 1);

					if (field.indexOf(":") == 0 && field.length() > 0) {
					}
					// String resultField = line.substring(0, line.indexOf("&"));
					resultValue.add(value.substring(value.indexOf("&") + 1));
				}
			}
			diskConf = resultValue.subList(0, 2);
			
			System.out.println(diskConf);
			/*
			 * diskConf = resultValue.subList(0, 2).stream() .map(s -> Integer.parseInt(s))
			 * .collect(Collectors.toList()); System.out.println(diskConf);
			 * 
			 * 
			 * //List<Integer> diskConf = new ArrayList<>(); //diskConf = (List<Integer>)
			 * resultValue.subList(0, 2); // int result = 0; // // for (int i = 0; i <= 1;
			 * i++) { // // for (String str : resultValue) { // result =
			 * Integer.parseInt(str[i]); // } // } // System.out.println(result);
			 * 
			 */
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

	
		return  diskConf;

	}


	// config파일을 읽어 비교하여 true false 반환
	public boolean authentication(String id, String password) throws IOException {
		boolean result = false;

		String storedId = getAdminId();
		String storedPassword = getAdminPwd();

		if (storedId.equals(id) && storedPassword.equals(password))
			result = true;

		System.out.println(new StringBuilder().append("storedId=").append(storedId).append(", storedPassword=")
				.append(storedPassword).toString());

		return result;
	}


}
