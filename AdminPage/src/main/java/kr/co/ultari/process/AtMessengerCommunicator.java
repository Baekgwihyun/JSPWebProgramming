package kr.co.ultari.process;

import java.net.Socket;
import java.io.BufferedReader;
import java.io.PrintWriter;
import java.io.InputStreamReader;
import java.util.Vector;
import java.util.Calendar;
import java.net.InetSocketAddress;

public class AtMessengerCommunicator extends Thread
{
	String ip;
	int port;
	int time;
	String sendStr;
	
	String userId;
	String password;
	
	public AtMessengerCommunicator(String ip, int port, int time)
	{
		this.ip = ip;
		this.port = port;
		this.time = time * 1000;
		
	}
	
	public void sendPassword(String userId, String password)
	{
		this.userId = userId;
		this.password = password;
		this.start();
	}
	
	public void run()
	{
		Socket sc = null;
		InputStreamReader ir = null;
		BufferedReader br = null;
		PrintWriter pw = null;
		
		try
		{
			sc = new Socket();
			sc.connect(new InetSocketAddress(ip, port), time);
			ir = new InputStreamReader(sc.getInputStream());
			br = new BufferedReader(ir);
			pw = new PrintWriter(sc.getOutputStream(), true);
			
			pw.println("ADMIN");
			pw.flush();
			
			this.sleep(50);
			 
			pw.println("/passwd " + userId + " " + password);
			pw.flush();
			  
			String line = null;
			  
			this.sleep(1000);
			
		}
		catch(Exception e)
		{
			e.printStackTrace();
		}
		finally
		{
			try { ir.close(); ir = null; } catch(Exception ee) {}
			try { br.close(); br = null; } catch(Exception ee) {}
			try { pw.close(); pw = null; } catch(Exception ee) {}
			try { sc.close(); sc = null; } catch(Exception ee) {}
		}
	}
	
	public static void main(String[] args)
	{
		AtMessengerCommunicator at = new AtMessengerCommunicator("211.190.4.82",1234,5);
		
		at.sendPassword("00005", "1234");
	}
}

