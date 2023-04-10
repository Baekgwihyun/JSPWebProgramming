package kr.co.ultari.db;

import java.io.IOException;
import java.io.Reader;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.ResultSetMetaData;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.List;
import java.util.Properties;
//import oracle.jdbc.driver.OracleResultSet;
//import oracle.sql.CLOB;

import kr.co.ultari.db.ConnectionMgr;

public class DBCreator 
{
  ConnectionMgr cmgr = null;
  String type = null;
  
  public DBCreator ()
  {
	  cmgr = new ConnectionMgr();
	  
	  Properties prot = new Properties();
	  String sProtPath = "/config/Config.properties";
	  try
	  {
		  prot.load(getClass().getResourceAsStream(sProtPath));
	  }catch(Exception e){}
		
	  type = prot.getProperty("DBTYPE").trim();
  }

  public boolean dataProcessor(String szQueryKey, String[] szFormValue) throws SQLException {

    Connection lm_oConnection = null;
    PreparedStatement lm_oPreState = null;

    int lm_iRs = -1;
    String lm_sQuery = null;
    boolean szRtnCode = false;
    int szCount = szFormValue == null ? 0 : szFormValue.length;
    try
    {
      lm_oConnection = cmgr.getConnection();
      lm_oConnection.setAutoCommit(false);
      
      lm_sQuery = szQueryKey;
      
      lm_oPreState = lm_oConnection.prepareStatement(lm_sQuery);

      for (int i = 0; i < szCount; i++)
      {
        lm_oPreState.setString(i + 1, szFormValue[i]);
      }

      lm_iRs = lm_oPreState.executeUpdate();

      if (lm_iRs >= 0)
      {
        lm_oConnection.commit();
        szRtnCode = true;
      }
    }
    catch (Exception e)
    {
      lm_oConnection.rollback();
      e.printStackTrace();
    } finally {
      lm_oConnection.setAutoCommit(true);
      
      cmgr.close(lm_oConnection, lm_oPreState);      
      
    }
    return szRtnCode;
  }
  
  public boolean dataProcessorBatch(String szQueryKey, String[][] szFormValue) throws SQLException {
    Connection lm_oConnection = null;
    PreparedStatement lm_oPreState = null;

    int lm_iRs = 0;
    String lm_sQuery = szQueryKey;
    boolean szRtnCode = false;
    int szCount = szFormValue == null ? 0 : szFormValue.length;
    try
    {
    	lm_oConnection = cmgr.getConnection();
        lm_oConnection.setAutoCommit(false);

      lm_oPreState = lm_oConnection.prepareStatement(lm_sQuery);
      
      if(szCount > 0){
	      for(int i = 0; i < szFormValue.length; i++)
	      {
	    	  for(int j = 0; j < szFormValue[i].length; j++){
	    		  lm_oPreState.setString(j + 1, szFormValue[i][j]);
	    	  }
	    	  lm_oPreState.addBatch();
	    	  if(i % 1000 == 0){
	    		  lm_oPreState.executeBatch();
		      }
	      }
	      lm_oPreState.executeBatch();
      }
      
      if (lm_iRs >= 0)
      {
        lm_oConnection.commit();
        szRtnCode = true;
      }
    }
    catch (Exception e)
    {
      lm_oConnection.rollback();
      e.printStackTrace();
    } finally {
      lm_oConnection.setAutoCommit(true);
      cmgr.close(lm_oConnection, lm_oPreState);    
    }
    return szRtnCode;
  }
    
  public String[] contentProcessor(String szQueryKey, String szAddQuery, String[] szCondition) throws SQLException {
	  
    Connection lm_oConnection = null;
    PreparedStatement lm_oPreState = null;
    ResultSet lm_oResult = null;
    
    String lm_sQuery = null;
    String comVo = null;
    String[] returnString = null;
    int szCount = szCondition == null ? 0 : szCondition.length;
    
    try
    {
      lm_oConnection = cmgr.getConnection();
      lm_sQuery = szQueryKey;
      
      lm_oPreState = lm_oConnection.prepareStatement(lm_sQuery);
      for (int i = 0; i < szCount; i++)
      {
        lm_oPreState.setString(i + 1, szCondition[i]);
      }
      lm_oResult = lm_oPreState.executeQuery();
      
      ResultSetMetaData rsmd = lm_oResult.getMetaData();
  
      returnString = new String[rsmd.getColumnCount()];
            
      if (lm_oResult.next())
      {
        for (int i = 0; i < rsmd.getColumnCount(); i++)
        {
          comVo =lm_oResult.getString(rsmd.getColumnName(i + 1));
          returnString[i] = comVo;
        }
      }
    }
    catch (Exception e)
    {
      e.printStackTrace();
    }
    finally
    {
      cmgr.close(lm_oConnection, lm_oResult, lm_oPreState);
    }
    return returnString;
  }
  
  public List listProcessor(String szQuery, String szAddQuery, String[] szCondition, int nStartPage, int nEndPage, int iFlag, int iKeyFl,int nPageNo, int nListSize) throws SQLException {
    Connection lm_oConnection = null;
    PreparedStatement lm_oPreState = null;
    ResultSet lm_oResult = null;
    String lm_sQuery = szQuery;
    
    List selectList = new ArrayList();
    int szFlag = 0;
    int szCount = szCondition == null ? 0 : szCondition.length;
    try
    {
    	lm_oConnection = cmgr.getConnection();

      if (szAddQuery.length() > 0)
      {
        lm_sQuery = lm_sQuery + szAddQuery;
      }

      if (iFlag == 1)
      {
    	  if(type.equals("ORACLE"))
    	  {
    		  lm_sQuery = "SELECT * FROM (SELECT SZQUERY.*, ROWNUM ROW_NUM FROM ( " + lm_sQuery + " ) SZQUERY ) WHERE ROW_NUM BETWEEN ? AND ? ";
    	  }else
    	  {
    		  //lm_sQuery = "SELECT LISTQUERY.* FROM (SELECT SZQUERY.*, @RNUM:=@RNUM+1 AS ROW_NUM FROM ( " + lm_sQuery + " ) AS SZQUERY, (SELECT @RNUM:=0) AS R ) AS LISTQUERY WHERE LISTQUERY.ROW_NUM BETWEEN ? AND ? ";
    		  lm_sQuery = lm_sQuery + " LIMIT ?, ?";
    	  }
        
      }


      lm_oPreState = lm_oConnection.prepareStatement(lm_sQuery);

      for (; szFlag < szCount; szFlag++)
      {
        lm_oPreState.setString(szFlag + 1, szCondition[szFlag]);
      }

      if (iFlag == 1)
      {
    	  if(type.equals("ORACLE"))
    	  {
	        lm_oPreState.setInt(szFlag + 1, nStartPage);
	        lm_oPreState.setInt(szFlag + 2, nEndPage);
    	  }
    	  else
    	  {
    		  if(nPageNo == 1)
    		  {
    			  nPageNo = 0;
    		  }
    		  else
    		  {
    			  nPageNo = (nPageNo -1) * nListSize;
    		  }
    		  lm_oPreState.setInt(szFlag + 1, nPageNo);
  	          lm_oPreState.setInt(szFlag + 2, nListSize);
    	  }
      }
      lm_oResult = lm_oPreState.executeQuery();
      ResultSetMetaData rsmd = lm_oResult.getMetaData();

      for (int i = 0; lm_oResult.next(); i++)
      {
        String[] comVo = new String[rsmd.getColumnCount()];
        for (int j = 0; j < rsmd.getColumnCount(); j++)
        {
          comVo[j] =lm_oResult.getString(rsmd.getColumnName(j + 1));
        }
        selectList.add(comVo);
      }
    }
    catch (Exception e) {

      e.printStackTrace();
    } finally {
      cmgr.close(lm_oConnection, lm_oResult, lm_oPreState);
    }
    return selectList;
  }
  
  public int countProcessor(String szQueryKey, String szAddQuery, String[] szCondition, int iKeyFl) throws SQLException
  {
    Connection lm_oConnection = null;
    PreparedStatement lm_oPreState = null;
    ResultSet lm_oResult = null;
    String lm_sQuery = szQueryKey;
    int rtnCount = 0;
    int szCount = szCondition == null ? 0 : szCondition.length;
    
    try
    {
    	lm_oConnection = cmgr.getConnection();

      if (szAddQuery.length() > 0)
      {
        lm_sQuery = lm_sQuery + szAddQuery;
      }

      lm_oPreState = lm_oConnection.prepareStatement(lm_sQuery);
      for (int i = 0; i < szCount; i++)
      {
        lm_oPreState.setString(i + 1, szCondition[i]);
      }

      lm_oResult = lm_oPreState.executeQuery();

      if (lm_oResult.next())
      {
        rtnCount = lm_oResult.getInt("COUNT");
      }
    }
    catch (Exception e) {
      e.printStackTrace();
    } finally {
      cmgr.close(lm_oConnection, lm_oResult, lm_oPreState);
    }
    return rtnCount;
  }
  
  public String createKeyProcessor(String szQueryKey, String szAddQuery, String[] szCondition, int iKeyFl) throws SQLException
  {
    Connection lm_oConnection = null;
    PreparedStatement lm_oPreState = null;
    ResultSet lm_oResult = null;
    String lm_sQuery = null;
    String getDocID = "";
    int szCount = szCondition == null ? 0 : szCondition.length;
    try
    {
    	lm_oConnection = cmgr.getConnection();

      if (szAddQuery.length() > 0)
      {
        lm_sQuery = lm_sQuery + szAddQuery;
      }

      lm_oPreState = lm_oConnection.prepareStatement(lm_sQuery);

      for (int i = 0; i < szCount; i++)
      {
        lm_oPreState.setString(i + 1, szCondition[i]);
      }

      lm_oResult = lm_oPreState.executeQuery();

      if (lm_oResult.next())
      {
        getDocID = lm_oResult.getString(1);
      }
    }
    catch (Exception e) {
      e.printStackTrace();
    } finally {
      cmgr.close(lm_oConnection, lm_oResult, lm_oPreState);
    }
    return getDocID;
  }
  
  public String[][] TreeProcessor() throws SQLException {
	    Connection lm_oConnection = null;
	    PreparedStatement lm_oPreState = null;
	    ResultSet lm_oResult = null;
	    String lm_sCountQuery = "SELECT COUNT(DEPT_ID) COUNT FROM DEPT_INFO";
	    String lm_sDataQuery = "SELECT PAR_ID, DEPT_ID, DEPT_NAME, LEVEL FROM DEPT_INFO START WITH PAR_ID='000000000' CONNECT BY PRIOR DEPT_ID = PAR_ID ORDER BY PAR_ID, SEQ";
	    String[][] comVo = new String[countProcessor(lm_sCountQuery, "", null, 0)][4];
	    try
	    {
	      lm_oConnection = cmgr.getConnection();
	      lm_oPreState = lm_oConnection.prepareStatement(lm_sDataQuery);
	      lm_oResult = lm_oPreState.executeQuery();
	      ResultSetMetaData rsmd = lm_oResult.getMetaData();

	      for (int i = 0; lm_oResult.next(); i++)
	      {
	        for (int j = 0; j < rsmd.getColumnCount(); j++)
	        {
	          comVo[i][j] = lm_oResult.getString(rsmd.getColumnName(j + 1));
	        }
	      }
	    }
	    catch (Exception e) {
	      e.printStackTrace();
	    } finally {
	    	cmgr.close(lm_oConnection, lm_oResult, lm_oPreState);
	    }
	    return comVo;
  }
  

  /* public boolean dataProcessorClob(String szQueryKey,String szQuerySel, String[] szFormValue, String[] szClobValue, int iKeyFl) throws SQLException
  {
    Connection lm_oConnection = null;
    PreparedStatement lm_oPreState = null;
    ResultSet lm_oResult = null;

    int lm_iRs = -1;
    String lm_sQuery = null;
    boolean szRtnCode = false;
    String[] comVo = (String[])null;
    
    int szCount = szFormValue == null ? 0 : szFormValue.length;
    int szClobCount = szClobValue == null ? 0 : szClobValue.length;
    
    try
    {
      lm_oConnection = getConnection();
      lm_oConnection.setAutoCommit(false);

      if (iKeyFl == 1)
        lm_sQuery = getQueryString(szQueryKey);
      else {
        lm_sQuery = szQueryKey;
      }
      lm_oPreState = lm_oConnection.prepareStatement(lm_sQuery);

      for (int i = 0; i < szCount; i++)
      {
        lm_oPreState.setString(i + 1, szFormValue[i]);
      }

      lm_iRs = lm_oPreState.executeUpdate();
      close(lm_oPreState);

      if (lm_iRs >= 0)
      {
    	lm_oPreState = lm_oConnection.prepareStatement(szQuerySel);
    	lm_oResult = lm_oPreState.executeQuery();  
    	ResultSetMetaData rsmd = lm_oResult.getMetaData();
    	
    	if (lm_oResult.next())
        {
	    	comVo = new String[rsmd.getColumnCount()];
	        for (int i = 0; i < szClobCount; i++)
	        {
	          comVo[i] = new String(rsmd.getColumnName(i + 1));
	          CLOB clob = (CLOB)lm_oResult.getClob(comVo[i]);
	          
	          Writer writer = ((CLOB)clob).getCharacterOutputStream();
	          Reader src = new CharArrayReader(szClobValue[i].toCharArray());
	
	          char[] buffer = new char[1024];
	          int read = 0;
	          while((read = src.read(buffer, 0, 1024)) != -1){
	                 writer.write(buffer, 0, read);
	          }
	          src.close();
	          writer.close();
	        }
        }
        
        lm_oConnection.commit();
        szRtnCode = true;
      }
    }
    catch (Exception e)
    {
      lm_oConnection.rollback();
      e.printStackTrace();
    } finally {
      lm_oConnection.setAutoCommit(true);
      close(lm_oPreState);
      close(lm_oConnection);
    }
    return szRtnCode;
  }

  public boolean clobDataProcessor(String szQueryKey, String[] szFormValue, String szPrimaryKey, int iKeyFl) throws SQLException
  {
    Connection lm_oConnection = null;
    PreparedStatement lm_oPreState = null;

    int lm_iRs = -1;
    String lm_sQuery = null;
    boolean szRtnCode = false;
    ResultSet lm_oResult = null;
    CLOB cl = null;
    BufferedWriter writer = null;
    String[] comVo = (String[])null;
    int szCount = szFormValue == null ? 0 : szFormValue.length;
    try
    {
      lm_oConnection = getConnection();
      lm_oConnection.setAutoCommit(false);

      if (iKeyFl == 1)
        lm_sQuery = getQueryString(szQueryKey);
      else {
        lm_sQuery = szQueryKey;
      }

      lm_oPreState = lm_oConnection.prepareStatement(lm_sQuery);

   
      lm_oPreState.setString(1, szPrimaryKey);

      lm_oResult = lm_oPreState.executeQuery();
      ResultSetMetaData rsmd = lm_oResult.getMetaData();

      if (lm_oResult.next())
      {
        comVo = new String[rsmd.getColumnCount()];
        for (int i = 0; i < szCount; i++)
        {
          comVo[i] = new String(rsmd.getColumnName(i + 1));
          cl = ((OracleResultSet)lm_oResult).getCLOB(comVo[i]);
          writer = new BufferedWriter(cl.getCharacterOutputStream());

          writer.write(szFormValue[i]);
          writer.close();
        }
      }

      lm_iRs = lm_oPreState.executeUpdate();
      if (lm_iRs >= 0)
      {
        lm_oConnection.commit();
        szRtnCode = true;
      }
    }
    catch (Exception e)
    {
      lm_oConnection.rollback();
      e.printStackTrace();
    } finally {
      lm_oConnection.setAutoCommit(true);
      close(lm_oPreState);
      close(lm_oConnection);
    }
    return szRtnCode;
  }
*/
}
