package kr.co.ultari.common;

import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;


public class SHA256 {

	public static String encryptString(String str){

		String SHA = ""; 

		try{
			MessageDigest sh = MessageDigest.getInstance("SHA-256"); 
			sh.update(str.getBytes()); 
			byte byteData[] = sh.digest();
			StringBuffer sb = new StringBuffer(); 

			for(int i = 0 ; i < byteData.length ; i++){
				sb.append(Integer.toString((byteData[i]&0xff) + 0x100, 16).substring(1));
			}
			SHA = sb.toString();


		}catch(NoSuchAlgorithmException e){
			e.printStackTrace(); 
			SHA = null; 
		}
		return SHA;
	}

	public static void main(String[] args) {
		
		/*String pass = "1111";
		pass = SHA256.encryptString(pass);
		System.out.println("[INFO] " + pass);*/
	}

}
