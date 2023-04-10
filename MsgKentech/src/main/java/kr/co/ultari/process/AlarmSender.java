package kr.co.ultari.process;

import java.net.Socket;
import java.io.BufferedReader;
import java.io.PrintWriter;
import java.io.InputStreamReader;
import java.util.ArrayList;
import java.util.List;
import java.util.Properties;
import java.util.Calendar;
import java.net.InetSocketAddress;
import java.io.OutputStreamWriter;
import java.io.BufferedWriter;

import kr.co.ultari.common.StringTool;
import kr.co.ultari.db.*;

public class AlarmSender extends Thread{
	
	String ip;
	int port;
	int time;
	
	char DOM = 15;
	
	ArrayList <String> uidAr;
	ArrayList <String> cntAr;
	ArrayList <String> urlAr;
	
	List userList = null;
	List mobileList = null;
	List smsList = null;
	
	Properties prot = null;
	
	public AlarmSender(String ip, int port, int time)
	{
		this.ip = ip;
		this.port = port;
		this.time = time * 1000;
		
		userList = new ArrayList();
		mobileList = new ArrayList();
		smsList = new ArrayList();
		
		uidAr = new ArrayList<String>();
		cntAr = new ArrayList<String>();
		urlAr = new ArrayList<String>();
		
		prot = new Properties();
		String sProtPath = "/config/Config.properties";
		try{
			prot.load(getClass().getResourceAsStream(sProtPath));
		}
		catch(Exception e)
		{
			e.printStackTrace();
		}
	}
	
	public void send()
	{
		this.start();
	}
	
	public void run()
	{
		Socket sc = null;
		InputStreamReader ir = null;
		BufferedReader br = null;
		PrintWriter pw = null;
		
		setUserList();
		
		sendGate();
		sendSMS();
		
		if(mobileList.size() > 0)
		{
			try
			{
				sc = new Socket();
				sc.connect(new InetSocketAddress(ip, port), time);
				ir = new InputStreamReader(sc.getInputStream());
				br = new BufferedReader(ir);
				pw = new PrintWriter(new BufferedWriter(new OutputStreamWriter(sc.getOutputStream(), "UTF-8")), true);
		         
				for ( int i = 0 ; i < uidAr.size() ; i++ )
				{
					StringBuffer sndMsg = new StringBuffer();
					
					sndMsg.append("SYSMSG");
					sndMsg.append("\t");
					sndMsg.append((String)uidAr.get(i));
					sndMsg.append("\t");
					sndMsg.append((String)cntAr.get(i));
					sndMsg.append("\t");
					sndMsg.append((String)urlAr.get(i));
					sndMsg.append("\f");
					
	
					System.out.println("port: " + port);
					System.out.println("sndMsg: [" + sndMsg.toString() + "]");
	
					// pw.println(sndMsg.toString());
					sc.getOutputStream().write((sndMsg.toString() + "\n").getBytes("utf-8"));
					
					if ( !getMessage(br, "ok") ) throw new Exception("Cannot send message");
				}
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
	}
	
	public void setUserList()
	{
		DBController mo = new DBController();
	
		String[] content = null;
		String query = prot.getProperty("ALARMUSERLIST").trim();
		
		try {
			userList = mo.getList(query);
			
			if(userList.size() > 0)
			{
				for(int i=0; i<userList.size(); i++)
				{
					content = (String[])userList.get(i);
					
					if(StringTool.NullTrim(content[2]).equals("Y"))
					{
						mobileList.add(content);
					}
					else
					{
						smsList.add(content);
					}
				}
			}
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}
	
	public void sendGate()
	{
		if(mobileList.size() > 0)
		{
			String[] content = null;
			
			for(int i=0; i<mobileList.size(); i++)
			{
				content = (String[])mobileList.get(i);
				
				System.out.println("[gate send id] "+StringTool.NullTrim(content[0]));
				addMessage(StringTool.NullTrim(content[0]),"관리자","새로운 공지가 등록되었습니다.","","새로운 공지가 등록되었습니다.","공지");
			}
		}
	}
	
	public void sendSMS()
	{
		String sendYN = prot.getProperty("SMSYN").trim();
		
		if(sendYN.equals("Y"))
		{
			System.out.println("[SMS_Y]SMS Dev");
		}
		else
		{
			System.out.println("[SMS_N]SMS Dev");
		}
	}
	
	public void addMessage(String _recipientUId, String sender, String _content, String _url, String _showMessage, String _Type)
	{
		char DOMMI = 15;

		Calendar cal = Calendar.getInstance();
		String sendedTime = cal.getTimeInMillis() + "";
		if (sendedTime.length() > 10) sendedTime = sendedTime.substring(0, 10);

		StringBuffer msg = new StringBuffer();
		msg.append("0");
		msg.append(DOMMI);
		msg.append("1");			// Reserved
		msg.append(DOMMI);
		msg.append(_Type);		//  
		msg.append(DOMMI);
		msg.append(_url);			//  
		msg.append(DOMMI);
		msg.append("Reserved");		// 
		msg.append(DOMMI);
		msg.append(_recipientUId);	//
		msg.append(DOMMI);
		msg.append(sender);			//
		msg.append(DOMMI);
		msg.append("Reserved");		// 
		msg.append(DOMMI);
		msg.append("Reserved");		// 
		msg.append(DOMMI);
		msg.append("Reserved");		// 
		msg.append(DOMMI);
		msg.append("2");			// 
		msg.append(DOMMI);
		msg.append(sendedTime);		// 
		msg.append(DOMMI);
		msg.append("0");			// 
		msg.append(DOMMI);
		msg.append("Reserved");		// 
		msg.append(DOMMI);
		msg.append(_content);		// 
		msg.append(DOMMI);
		msg.append(_showMessage);	//
		msg.append(DOMMI);
		msg.append("0");

		uidAr.add(_recipientUId);
		cntAr.add(msg.toString());
		urlAr.add("SDS");
	}
	
	private boolean getMessage(BufferedReader br, String targetStr) throws Exception
	{
		char buf[] = new char[1024];
		int rcv = 0;
		
		StringBuffer str = new StringBuffer();
		
		while ( ( rcv = br.read(buf, 0, 1024) ) >= 0 )
		{
			str.append(new String(buf, 0, rcv));

			if ( str.indexOf(targetStr) >= 0 )
				return true;
		}
		
		return false;
	}

	public static void main(String[] args)
	{
		AlarmSender as = new AlarmSender("211.190.4.82",1234,3);
		as.send();
	}
}
