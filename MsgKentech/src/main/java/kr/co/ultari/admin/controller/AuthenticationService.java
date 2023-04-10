package kr.co.ultari.admin.controller;

import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.IOException;
import java.util.Properties;

public class AuthenticationService {
	
	PropertyManager propertyManager;
	
	public AuthenticationService(PropertyManager propertyManager) {
		this.propertyManager = propertyManager;
	}

	
//	public boolean changePwd (String pwd) throws IOException {
//		boolean result = false;
//		String changePwd = pwd;
//		
//		Properties properties = new Properties();
//		String protPath = "/config/Config.properties";
//		
//		//String protPath = "D:\\8.eclipse-2022-06\\MsgKentech\\WebContent\\WEB-INF\\classes\\config\\Config.properties";
//		properties.load(getClass().getResourceAsStream(protPath));
//		
//		properties.load(new FileInputStream(protPath));
//		properties.setProperty("ADMINPWD", changePwd);
//		properties.store(new FileOutputStream(protPath), "PWDCHANGE");
//		result = true;
//		
//		
//		
//		//System.out.println(new StringBuilder().append("storedId=").append(storedId).append(", storedPassword=").append(storedPassword).toString());
//		
//		return result;
//		
//	}
		
	
	public boolean changePwd (String pwd) throws IOException {
		boolean result = false;
		String changePwd = pwd;
		
		Properties properties = new Properties();
		String protPath = "/config/Config.properties";
		
		//String protPath = "D:\\8.eclipse-2022-06\\MsgKentech\\WebContent\\WEB-INF\\classes\\config\\Config.properties";
		properties.load(getClass().getResourceAsStream(protPath));
		
		properties.load(new FileInputStream(protPath));
		properties.setProperty("ADMINPWD", changePwd);
		properties.store(new FileOutputStream(protPath), "PWDCHANGE");
		result = true;
		
		
		
		//System.out.println(new StringBuilder().append("storedId=").append(storedId).append(", storedPassword=").append(storedPassword).toString());
		
		return result;
		
	}
	
	

	// config파일을 읽어 비교하여 true false 반환
	public boolean authentication(String id, String password) throws IOException {
		boolean result = false;
		
		String storedId = getAdminId();
		String storedPassword = getAdminPwd();
		
		if (storedId.equals(id) && storedPassword.equals(password)) 
			result = true;
		
		//System.out.println(new StringBuilder().append("storedId=").append(storedId).append(", storedPassword=").append(storedPassword).toString());
		
		return result;
	}
	
	private String getAdminId() throws IOException {
		return propertyManager.getValue("ADMINID").trim(); 
	}
	
	private String getAdminPwd() throws IOException {
		return propertyManager.getValue("ADMINPWD").trim(); 
	}
}
