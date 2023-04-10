package kr.co.ultari.common;

import java.text.DecimalFormat;

//import com.hs.frmwk.adapters.crypt.HDIdeaCipher;
public class StringTool {

	private static Exception e;

	public static String NullTrim(String szValue) {
	    if (szValue == null) {
	    	szValue = "";
	    } else {
	    	szValue = szValue.trim();
	    }
	    return szValue;
	}
	
	public static String nbspTrim(String szValue) {
	    if (szValue == null || szValue.equals("") || szValue.equals(" ")) {
	    	szValue = "&nbsp;";
	    } else {
	    	szValue = szValue.trim();
	    }
	    return szValue;
	}
	public static String numNullTrim(String szValue) {
	    if (szValue == null || szValue.equals("") || szValue.equals(" ")) {
	    	szValue = "0";
	    } else {
	    	szValue = szValue.trim();
	    }
	    return szValue;
	}
	
	public static String NullTrim(String szValue, String szTarget) {
	    if ((szValue == null) || (szValue.equals(""))) {
	    	szValue = szTarget;
	    } else {
	    	szValue = szValue.trim();
	    }
	    return szValue;
	}
	
	public static String RemoveSpace(String szIn) throws Exception {
	    StringBuffer sbBuffer = new StringBuffer();
	    for (int i = 0; i < szIn.length(); i++) {
	    	char chIn = szIn.charAt(i);
	    	if (!Character.isSpaceChar(chIn))
	    	sbBuffer.append(chIn);
	    }
	    return sbBuffer.toString();
	}
	
	public static String CutString(String szText, int nLength) {
	    if (szText.length() > nLength) {
	      szText = szText.substring(0, nLength - 1);
	      szText = szText + "..";
	    }
	
	    return szText;
	}
	
	public static String WonFormat(String won) {
	    String szReturn = new String();
	    char[] szArr = won.toCharArray();
	    int temp = 0;
	    
	    for (int i = szArr.length; i > 0; i--) {
	    	if ((i % 3 == 0) && (i != szArr.length))
	        szReturn = szReturn + ",";
	    	szReturn = szReturn + szArr[temp];
	    	temp++;
	    }
	
	    return szReturn;
	  }
	
	  public static String WonFormat(int won) {
	    return WonFormat(String.valueOf(won));
	  }
	
	  public static String RowView(String s) throws Exception {
		  		  
		  char[] szChar = s.toCharArray();
		  String szReturn = "";
		  
		  for (int i = 0; i < szChar.length; i++) {
			  
		      if (i + 1 == szChar.length) {
		    	  szReturn = szReturn + szChar[i];
		      } else {
		    	  szReturn = szReturn + szChar[i] + "<br>";
		      }
		  }
		  return szReturn;
	  }

	  
	  public static String ReplaceAllText(String szOrgText, String szFindText, String szRplcText) throws Exception{
	    try
	    {
	      int nBegin = 0;
	      int nEnd = szOrgText.indexOf(szFindText);
	      int nRplcSize = szFindText.length();
	      StringBuffer sbResult = new StringBuffer();

	      while (nEnd != -1){
	        sbResult.append(szOrgText.substring(nBegin, nEnd));
	        sbResult.append(szRplcText);

	        nBegin = nEnd + nRplcSize;
	        nEnd = szOrgText.indexOf(szFindText, nBegin);
	      }
	      sbResult.append(szOrgText.substring(nBegin));

	      return sbResult.toString();
	    }
	    catch (Exception e) {
	    }
	    throw e;
	  }
	  
	  public static String getFileSize(String size) {
		  String[] gubn = { "Byte", "KB", "MB" };
		  String returnSize = new String();
		  int gubnKey = 0;
		  double changeSize = 0.0D;
		  double fileSize = 0.0D;
		  try {
			  fileSize = Long.parseLong(size);
	
			  DecimalFormat format = new DecimalFormat();
			  format.applyLocalizedPattern("0.#");
			  for (int x = 0; fileSize / 1024.0D > 0.0D; fileSize /= 1024.0D) {
				  if ((fileSize > 0.0D) && (fileSize < 1.0D)) {
					  break;
				  }
			  gubnKey = x;
			  changeSize = fileSize;
			  x++;
	      }
	
	      returnSize = format.format(changeSize) + gubn[gubnKey]; } catch (Exception ex) {
	      returnSize = "0.0 Byte";
	      }return returnSize;
	  }
	  
	  public static String modText(String msg, int totalLen,String reg)
	 {
		  String buff =msg;
		while(buff.length()<totalLen)
		{
			buff = reg + buff;
		}
		return buff;
	 }
	  public static String getFilePath(String userId, String baseDir)
		{
			String dirPath = baseDir;
			
			if ( userId == null ) return dirPath;
			
			if ( userId.length() > 2 )
			{
				dirPath += java.io.File.separator;
				dirPath += userId.substring(0,2);
			}
			
			if ( userId.length() > 4 )
			{
				dirPath += java.io.File.separator;
				dirPath += userId.substring(2,4);
			}
			
			if ( userId.length() > 6 )
			{
				dirPath += java.io.File.separator;
				dirPath += userId.substring(4,6);
			}
			
			if ( userId.length() > 8 )
			{
				dirPath += java.io.File.separator;
				dirPath += userId.substring(6,8);
			}
			
			dirPath += java.io.File.separator;
			dirPath += userId;
			
			//File f = new File(dirPath);
			//f.mkdirs();
			
			return dirPath;
		}
	  
	 public static String seedEncryt(String str)
	 {
		  AmCodec codec = new AmCodec();
		  
		  try{
		  str = codec.EncryptSEED(str).trim();
		  }catch(Exception e)
		  {
			  e.printStackTrace();
		  }
		  
		  return str;
	 }
	 
	 public static String seedDecryt(String str)
	 {
		  AmCodec codec = new AmCodec();
		  
		  try{
			  str = codec.DecryptSEED(str).trim();
		  }catch(Exception e)
		  {
			  e.printStackTrace();
		  }
		  
		  return str;
	 }
	 
	public static String getFormatString(String i, int len)
	{
		String ret = i;
		
		if(i.equals(""))
		{
			ret = "999999";
		}
		else
		{
			while ( ret.length() < len ) ret = "0" + ret;
		}
		
		return ret;
	}
	public static String getSHA256(String str)
	{
		String rtn = "";
		
		try
		{
			rtn = SHA256.encryptString(str);
		}
		catch(Exception e)
		{
			rtn = str;
		}
		
		return rtn;
	}
	
	public static String getSHA512(String str)
	{
		String rtn = "";
		
		try
		{
			rtn = Sha512.Crypt_Sha512(str);
		}
		catch(Exception e)
		{
			rtn = str;
		}
		
		return rtn;
	}
	  /*
	  public static String handyEncode(String str)
	  {
		  HDIdeaCipher handyCrypt = new HDIdeaCipher();
		  
		  String rtn = "";
		  rtn = handyCrypt.encrypt(str);
		  return rtn;
	  }
	  
	  public static String handyDecode(String str)
	  {
		  HDIdeaCipher handyCrypt = new HDIdeaCipher();
		  
		  String rtn = "";
		  rtn = handyCrypt.decrypt(str);
		  return rtn;
	  }
	  */
	public static void main(String[] args)
	{
		System.out.println(StringTool.getSHA256("1234"));
	}
}
