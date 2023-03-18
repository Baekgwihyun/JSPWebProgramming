package kr.co.ultari.common;

import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException; 
public class Sha512
{
	public Sha512()
	{
	}
	
	public Sha512(String str)
	{
		System.out.println(Crypt_Sha512(str));
	}
	
	public static String Crypt_Sha512(String str)
	{
		MessageDigest md;
		byte[] digest = null;
		try {
			md = MessageDigest.getInstance("SHA-512");
			md.update(str.getBytes());     
			digest = md.digest(); 
			String base64 = Base64.encodeBytes(digest);
		} catch (NoSuchAlgorithmException e) {
			
			e.printStackTrace();
		}     
		return toString(digest, 0, digest.length);     
		
	}
	
	private static final char[] HEX_DIGITS = "0123456789abcdef".toCharArray();    
	
	public static final String toString(byte[] ba, int offset, int length) 
	{       
		char[] buf = new char[length * 2];       
		for (int i = 0, j = 0, k; i < length; ) 
		{          
			k = ba[offset + i++];          
			buf[j++] = HEX_DIGITS[(k >>> 4) & 0x0F];          
			buf[j++] = HEX_DIGITS[ k        & 0x0F];       
		}       
		return new String(buf);   
	}  
	public static void main(String[] args)
	{
		//System.out.println(kr.co.ultari.util.StringUtil.crypt("1234", "Crypt_Sha256", "kr.co.ultari.encrypt.Sha256"));
		Sha512 Sha512 = new Sha512();
		String pass = Sha512.Crypt_Sha512("gy12345678");
		System.out.println(pass);
	}
}