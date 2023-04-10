package kr.co.ultari.admin.controller;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileReader;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.regex.Pattern;

public class test {
public static void main(String[] args) throws IOException {
	DiskConfCtr();
}

private static String splitLastString(String target, String deliminator) {
    int x = target.lastIndexOf(deliminator);
    if (x > 0) return target.substring(x + 1);
    //System.out.println(target);
    return target;
    
}





	
static ArrayList<String> DiskConfCtr() throws IOException {
		
		String patn = "D:\\5.Java_workspase\\PC\\AtMessenger7_Server_212\\AtMessenger7_Server\\DiskCleanService\\Config.dat";
		File confFile = new File(patn);
		FileReader cf = null;
		BufferedReader br = null;
		
		
		List<String> confresuelt = new ArrayList<>();
		
		try {
			cf = new FileReader(confFile);
			br = new BufferedReader(cf);

			String line = "";
			String field ="";
			String value = "";
			String chatDate = "";
			String fileDate ="";
			
			List<String> result = new ArrayList<>();

			while ((line = br.readLine()) != null) {
				line.trim();
				if (line.length() > 0 && line.indexOf(":") > 0 && line.charAt(0) != '#') 
				{
					 field = line.substring(0, line.indexOf(":"));

					value = line.substring(line.indexOf(":") + 1);
					//value = line.substring(line.indexOf("RVED&") + 5);
					 
					if (field.indexOf(":") == 0 && field.length() > 0) 
					{
					}
					
					if(value = line.equals("RESERVED&")&& line.equals("GroupMessageAttachment&"))
					{
					
						System.out.println(value);		
					}
					//result = value.indexOf("RESERVED&"). + 1;
					//splitLastString(value, "RESERVED");
					
								
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
		return null;
		
		
	
	}

}

