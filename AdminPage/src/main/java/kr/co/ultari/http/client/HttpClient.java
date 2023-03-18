package kr.co.ultari.http.client;

import java.io.DataOutputStream;
import java.io.InputStream;
import java.lang.reflect.Method;
import java.net.URL;
import java.net.URLConnection;
import java.net.URLEncoder;
import java.util.HashMap;
import java.util.Iterator;
import java.util.Scanner;

import org.json.JSONException;
import org.json.JSONObject;


public class HttpClient 
{

	private String uri;
	private Method m = null;
	public HttpClient(String uri) 
	{
		this.uri = uri;
	}
	
	@SuppressWarnings("deprecation")
	public static String getParam(HashMap<String, String> data)
	{
		StringBuilder sb = new StringBuilder();
		Iterator<String> it = data.keySet().iterator();
		while(it.hasNext())
		{
			String key = it.next();
			sb.append( "&" + key + "=" + URLEncoder.encode(data.get(key)));
		}
		return sb.toString().substring(1);
	}
	
	public String sendHTTP(HashMap<String, String> data) 
	{
		StringBuilder sb = new StringBuilder();
		String param = getParam(data);
		try 
		{
			
			URL url = new URL(uri);
			URLConnection conn = url.openConnection();
			conn.setDoOutput(true);
			conn.setConnectTimeout(1000);
			conn.setReadTimeout(1000);
			conn.setRequestProperty("Content-Type", "application/x-www-form-urlencoded");
			DataOutputStream out = null;
			out = new DataOutputStream(conn.getOutputStream());
			out.writeBytes(param);
			out.flush();
			out.close();
			InputStream is = conn.getInputStream();
			Scanner scan = new Scanner(is);
			
			while (scan.hasNext()) 
			{
				sb.append(scan.nextLine());
			}
			scan.close();
		} 
		catch (Exception e) 
		{
			e.printStackTrace();
		}
		return sb.toString();
	}
	
	public String sendHTTP(String param) 
	{
		StringBuilder sb = new StringBuilder();
		try 
		{
			URL url = new URL(uri);
			URLConnection conn = url.openConnection();
			System.out.println("sendHTTP" + conn);
			conn.setDoOutput(true);
			conn.setConnectTimeout(1000);
			conn.setReadTimeout(1000);
			conn.setRequestProperty("Content-Type", "application/x-www-form-urlencoded");
			DataOutputStream out = null;
			out = new DataOutputStream(conn.getOutputStream());
			out.writeBytes(param);
			out.flush();
			out.close();
			InputStream is = conn.getInputStream();
			Scanner scan = new Scanner(is);
			
			while (scan.hasNext()) 
			{
				sb.append(scan.nextLine());
			}
			scan.close();
		} 
		catch (Exception e) 
		{
			e.printStackTrace();
		}
		return sb.toString();
	}
	
	public String sendHTTP(JSONObject data) 
	{
		StringBuilder sb = new StringBuilder();
		String param = URLEncoder.encode(data.toString());
		try 
		{
			URL url = new URL(uri);
			URLConnection conn = url.openConnection();
			conn.setDoOutput(true);
			conn.setConnectTimeout(1000);
			conn.setReadTimeout(1000);
			conn.setRequestProperty("Content-Type", "application/x-www-form-urlencoded");
			conn.setRequestProperty("System", "ULTARI");
			DataOutputStream out = null;
			out = new DataOutputStream(conn.getOutputStream());
			out.writeBytes(param);
			out.flush();
			out.close();
			InputStream is = conn.getInputStream();
			Scanner scan = new Scanner(is);
			
			while (scan.hasNext()) 
			{
				sb.append(scan.nextLine());
			}
			scan.close();
		} 
		catch (Exception e) 
		{
			e.printStackTrace();
		}
		return sb.toString();
	}
	
	public static void main(String[] args) throws JSONException, InterruptedException 
	{
	}
}
