package kr.co.ultari.authentication;

import java.io.BufferedReader;
import java.io.FileReader;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;


public class AuthenticationService {

	PropertyManager propertyManager;

	public AuthenticationService(PropertyManager propertyManager) {
		this.propertyManager = propertyManager;
	}
	private String getAdminId() throws IOException {
		return propertyManager.getValue("ADMINID").trim();
	}

	private String getAdminPwd() throws IOException {
		return propertyManager.getValue("ADMINPWD").trim();
	}

	private String getMobilePath() throws IOException {
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

	public ArrayList<String> mobileConfig() throws IOException {

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
	  
	public  List<String> diskConfig() throws IOException{

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
