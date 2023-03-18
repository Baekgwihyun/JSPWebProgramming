package kr.co.ultari.db;

import java.util.HashMap;
import java.util.List;

import kr.co.ultari.db.DBCreator;
import kr.co.ultari.db.DBController;

public class DBController
{
	private static DBController instance = null;
	private static DBCreator modelCreator = new DBCreator();

  public static DBController getInstance() {
      if (instance == null)
    	  instance = new DBController();
      return instance;
  }
  
  public boolean execute(String szQuery) throws Exception {
      return modelCreator.dataProcessor(szQuery, null);
  }

  public boolean execute(String szQuery, String[] szFormValue) throws Exception {
	  return modelCreator.dataProcessor(szQuery, szFormValue);
  }
  
  public boolean executeBatch(String szQuery, String[][] szFormValue) throws Exception {
	  return modelCreator.dataProcessorBatch(szQuery, szFormValue);
  }
  
  public String[][] getTree() throws Exception {
    return modelCreator.TreeProcessor();
  }

  /*
  public String executeClob(String szQuery, String szPrimaryKey, String[] szFormValue, int szFlag) throws Exception {
    return modelCreator.clobDataProcessor(szQuery, szFormValue, szPrimaryKey, szFlag, returnQueryFlag(szQuery));
  }*/

  public HashMap listOptimizer(String szCountQuery, String szListQuery, int nPageNo, int nListSize) throws Exception {
    return listOptimizer(szCountQuery, szListQuery, "", null, nPageNo, nListSize);
  }

  public HashMap listOptimizer(String szCountQuery, String szListQuery, String szAddQuery, int nPageNo, int nListSize) throws Exception {
    return listOptimizer(szCountQuery, szListQuery, szAddQuery, null, nPageNo, nListSize);
  }

  public HashMap listOptimizer(String szCountQuery, String szListQuery, String[] szCondition, int nPageNo, int nListSize) throws Exception {
    return listOptimizer(szCountQuery, szListQuery, "", szCondition, nPageNo, nListSize);
  }

  public HashMap listOptimizer(String szCountQuery, String szListQuery, String szAddQuery, String[] szCondition, int nPageNo, int nListSize) throws Exception {
    HashMap hm = new HashMap();
    int szCount = getCount(szCountQuery, szAddQuery, szCondition);
    List szList = getList(szListQuery, szAddQuery, szCondition, szCount, nPageNo, nListSize);
    hm.put("COUNT", String.valueOf(szCount));
    hm.put("LIST", szList);
    return hm;
  }

  public List getList(String szQuery) throws Exception {
    return getList(szQuery, "", null);
  }

  public List getList(String szQuery, String szAddQuery) throws Exception {
    return getList(szQuery, szAddQuery, null);
  }

  public List getList(String szQuery, String[] szCondition) throws Exception {
    return getList(szQuery, "", szCondition);
  }

  public List getList(String szQuery, String szAddQuery, String[] szCondition) throws Exception {
    return modelCreator.listProcessor(szQuery, szAddQuery, szCondition, 0, 0, 0, returnQueryFlag(szQuery),0,0);
  }

  public List getList(String szQuery, int nRecordCount, int nPageNo, int nListSize) throws Exception {
    return getList(szQuery, "", null, nRecordCount, nPageNo, nListSize);
  }

  public List getList(String szQuery, String szAddQuery, int nRecordCount, int nPageNo, int nListSize) throws Exception {
    return getList(szQuery, szAddQuery, null, nRecordCount, nPageNo, nListSize);
  }

  public List getList(String szQuery, String[] szCondition, int nRecordCount, int nPageNo, int nListSize) throws Exception {
    return getList(szQuery, "", szCondition, nRecordCount, nPageNo, nListSize);
  }

  public List getList(String szQuery, String szAddQuery, String[] szCondition, int nRecordCount, int nPageNo, int nListSize) throws Exception {
    int[] nPage = getPageRange(nPageNo, nListSize, nRecordCount);
    return modelCreator.listProcessor(szQuery, szAddQuery, szCondition, nPage[0], nPage[1], 1, returnQueryFlag(szQuery),nPageNo,nListSize);
  }

  public int getCount(String szQuery) throws Exception {
    return getCount(szQuery, "", null);
  }

  public int getCount(String szQuery, String szAddQuery) throws Exception {
    return getCount(szQuery, szAddQuery, null);
  }

  public int getCount(String szQuery, String[] szCondition) throws Exception {
    return getCount(szQuery, "", szCondition);
  }

  public int getCount(String szQuery, String szAddQuery, String[] szCondition) throws Exception {
    return modelCreator.countProcessor(szQuery, szAddQuery, szCondition, returnQueryFlag(szQuery));
  }

  public String[] getContent(String szQuery) throws Exception {
    return getContent(szQuery, "", null);
  }

  public String[] getContent(String szQuery, String szAddQuery) throws Exception {
    return getContent(szQuery, szAddQuery, null);
  }

  public String[] getContent(String szQuery, String[] szCondition) throws Exception {
    return getContent(szQuery, "", szCondition);
  }

  public String[] getContent(String szQuery, String szAddQuery, String[] szCondition) throws Exception {
    return modelCreator.contentProcessor(szQuery, szAddQuery, szCondition);
  }

  public String getKey(String szQuery) throws Exception {
    return getKey(szQuery, "", null);
  }

  public String getKey(String szQuery, String szAddQuery) throws Exception {
    return getKey(szQuery, szAddQuery, null);
  }

  public String getKey(String szQuery, String[] szCondition) throws Exception {
    return getKey(szQuery, "", szCondition);
  }

  public String getKey(String szQuery, String szAddQuery, String[] szCondition) throws Exception {
    return modelCreator.createKeyProcessor(szQuery, szAddQuery, szCondition, returnQueryFlag(szQuery)).trim();
  }

  public int[] getPageRange(int nPageNo, int nPageSize, int nRecordCnt) {
    int nStrt = (nPageNo - 1) * nPageSize + 1;
    int nEnd = nStrt + nPageSize - 1;

    if (nEnd >= nRecordCnt) {
      nEnd = nRecordCnt;
    }
    int[] nRslt = new int[2];
    nRslt[0] = nStrt;
    nRslt[1] = nEnd;
    return nRslt;
  }

  public int returnQueryFlag(String szQuery) {
    return szQuery.substring(0, 4).equals("sql.") ? 1 : szQuery.substring(0, 4).equals("SQL.") ? 1 : 2;
  }

  public int nGetPage(int nRecordCnt, int nPageSize) throws Exception {
    return nRecordCnt / nPageSize + (nRecordCnt % nPageSize > 0 ? 1 : 0);
  }    
}

