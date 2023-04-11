package kr.co.ultari.authentication;

import java.io.IOException;

public class AuthenticationService {
	
	PropertyManager propertyManager;
	
	public AuthenticationService(PropertyManager propertyManager) {
		this.propertyManager = propertyManager;
	}

	
	// config파일을 읽어 비교하여 true false 반환
	public boolean authentication(String id, String password) throws IOException {
		boolean result = false;
		
		String storedId = getAdminId();
		String storedPassword = getAdminPwd();
		
		if (storedId.equals(id) && storedPassword.equals(password)) 
			result = true;
		
		System.out.println(new StringBuilder().append("storedId=").append(storedId).append(", storedPassword=").append(storedPassword).toString());
		
		return result;
	}
	
	private String getAdminId() throws IOException {
		return propertyManager.getValue("ADMINID").trim(); 
	}
	
	private String getAdminPwd() throws IOException {
		return propertyManager.getValue("ADMINPWD").trim(); 
	}
}
