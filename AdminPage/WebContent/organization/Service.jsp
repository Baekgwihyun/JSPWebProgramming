<%@ page language="java" contentType="text/html; charset=EUC-KR"
    pageEncoding="EUC-KR"%>
<%@ page import="kr.co.ultari.process.*" %>
<%@ page import="java.io.*" %>
<%@ page import="java.net.URLDecoder" %>
<%@ page import="java.lang.reflect.Constructor" %>
<%@ page import="org.json.*" %>
<%
	ServletContext context = pageContext.getServletContext();
	Constructor con;
	Class cls = null;
	JSONObject json = null;
	StringBuffer j = new StringBuffer();
	String line = null;
	try 
	{
	    BufferedReader reader = request.getReader();
	    while((line = reader.readLine()) != null) 
	    {
	        j.append(URLDecoder.decode(line,"EUC-KR"));
	    }
	    
	    json = new JSONObject(j.toString());
	}
	catch(Exception e) 
	{
		System.out.println("Error reading JSON string: " + e.toString());
	}
	
	try
	{	
		cls = Class.forName(json.getString("C"));
		Class[] param = new Class[]{HttpServletRequest.class, HttpServletResponse.class, ServletContext.class};
		con = cls.getConstructor(param);
	
		kr.co.ultari.process.Proc svc = null;
		svc = (kr.co.ultari.process.Proc)con.newInstance(new Object[]{request,response,context});
		String MethodName = json.getString("M");
		Class partypes[] = new Class[1];
		partypes[0] = json.getClass();
		Object[] p = new Object[1];
		p[0] = json;
		cls.getMethod(MethodName, partypes).invoke(svc, p);
	}
	catch(Exception e)
	{
		e.printStackTrace();
	}
%>