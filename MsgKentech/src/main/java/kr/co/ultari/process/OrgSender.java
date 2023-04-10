package kr.co.ultari.process;

import java.net.Socket;
import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.InputStreamReader;
import java.io.OutputStreamWriter;
import java.net.InetSocketAddress;

public class OrgSender extends Thread
{
	String ip;
	int port;
	char DOM = 15;
	StringBuffer usr = null;
	
	public OrgSender(String ip, int port)
	{
		this.ip = ip;
		this.port = port;
	}
	
	public void modUser(String userId, String deptId, String userNm, String pos, String deptNm, String grade, String phone, String mobile, String email, String sort, String permission, String pwd)
	{
		usr = new StringBuffer();
		
		usr.append("ORG");
		usr.append("\t");
		
		usr.append("ModUser");
		usr.append("\t");
		usr.append(userId);
		usr.append("\t");
		usr.append(deptId);
		usr.append("\t");
		
		//name index
		usr.append(userNm);
		usr.append("#");
		usr.append(pos);
		usr.append("#");
		usr.append(deptNm);
		usr.append("#");
		usr.append(phone);
		usr.append("#");
		usr.append(grade);
		usr.append("#");
		usr.append(mobile);
		usr.append("#");
		usr.append(email);
		usr.append("#");
		usr.append(permission);
		//name index
		
		usr.append("\t");
		usr.append(pwd);
		usr.append("\t");
		usr.append(sort);
		usr.append("\t");
		usr.append("0");
		usr.append("\f");
	}
	
	public void send()
	{
		this.start();
	}
	
	public void run()
	{
		System.out.println(usr.toString());
		
		Socket sc = null;
		InputStreamReader ir = null;
		BufferedReader br = null;
		OutputStreamWriter ow = null;
		BufferedWriter bw = null;
		try
		{
			//sc = new Socket(ip, port);
			sc = new Socket();
			sc.connect(new InetSocketAddress(ip, port), 5);
			ir = new InputStreamReader(sc.getInputStream());
			br = new BufferedReader(ir);

			ow = new OutputStreamWriter(sc.getOutputStream(),"EUC-KR");
			bw = new BufferedWriter(ow);
			StringBuffer sndMsg = new StringBuffer();
			
			sndMsg.append(usr.toString());
			
			bw.write(sndMsg.toString());
			bw.flush();
							
		}
		catch(Exception e)
		{
			System.out.println("[Gate Conncet fail] " + ip + " / " + port);
			try { sc.close(); sc = null;} catch (Exception ee) {}
		} 
		finally 
		{
			try {	ir.close(); ir = null;} catch (Exception ee) {}
			try { ow.close(); ow = null;} catch (Exception ee) {}
			try { br.close(); br = null;} catch (Exception ee) {}
			try { bw.close();bw = null;} catch (Exception ee) {}
			try { sc.close(); sc = null;} catch (Exception ee) {}
		}
	}
	
	public static void main(String[] args)
	{
		System.out.println("add user start");
		OrgSender org = new OrgSender("211.190.4.82",1234);
		org.modUser("111", "D00005", "정가리1", "직위", "최상위부서","직급", "전화번호", "휴대폰", "이메일", "999999", "Y", "1234");
		org.send();
	}
}
