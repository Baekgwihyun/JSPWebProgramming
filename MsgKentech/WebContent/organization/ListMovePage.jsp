<%@ page language="java" contentType="text/html; charset=EUC-KR"
    pageEncoding="EUC-KR"%>
<%
	int nPageNo			=	Integer.parseInt((String)request.getAttribute("PN")); // 현재페이지
	int nRecordCount=	Integer.parseInt((String)request.getAttribute("RC")); // 전체레코드수
	int nListSize		=	Integer.parseInt((String)request.getAttribute("LS")); // 한 페이지에 표시할 레코드수
	int nPageSize		= 10;	// 페이지네비게이션 크기(1~10, 11~20...)
	int nTotalEnd		= nRecordCount/nListSize + ((nRecordCount%nListSize > 0) ? 1 : 0);	// 맨 끝 페이지를 구한다.(총 글수 / 화면에 보여질 페이지의 수)

	//현재 페이지가 마지막 페이지보다 클때 마지막 페이지를 보여준다.
	if(nPageNo > nTotalEnd)
	{
		nPageNo = nTotalEnd;
	}

	int nStartPage	= ((nPageNo - 1) / nPageSize) * nPageSize + 1;
	int nEndPageTmp = nStartPage + nPageSize - 1;
	int nEndPage	= (nTotalEnd > nEndPageTmp) ? nEndPageTmp : nTotalEnd;
	int nPrevious	= (nStartPage == 1) ? 0 : (nStartPage - 1);
	int nNext		= (nTotalEnd > nEndPage) ? (nEndPage + 1) : 0;
	
%>
<STYLE TYPE="text/css">
<!--
a.PageCrnt{color: #FF0000; font-size: 9pt;font-weight: bold;text-decoration: none; }
a.PageNavi:link{color: #353535; font-size: 9pt; text-decoration: none; }
a.PageNavi:active{color: #353535; font-size: 9pt;text-decoration: none; }
a.PageNavi:visited{color: #353535; font-size: 9pt; text-decoration: none; }
a.PageNavi:hover { color: #353535; font-size: 9pt; text-decoration: none; }
A:link     {font: 9pt Gulim, 굴림; text-decoration: none; color: #666666; letter-spacing: -0.06em}
-->
</STYLE><table align="center" cellspacing="0" cellpadding="0">
	<tr height="15">
		<%
			// 검색된 목록이 없을경우 이동버튼 이미지를 보이지 않는다.
			if(nRecordCount != 0)
			{
		%>
		<td width="80" align="left">
		<%
				if(nPrevious != 0)
				{
		%>
				<a href="javascript:OnPageMove('<%=nPrevious%>')"><img alt="이전 10페이지" src="../images/bu_prepre_on.gif" border="0" ></a>
		<%
				}
				else
				{
		%>
				<img alt="이전 10페이지" src="../images/bu_prepre_off.gif" border="0">
		<%
				}
				if(nPageNo > 1)
				{
		%>
				<a href="javascript:OnPageMove('<%=nPageNo-1%>')"><img alt="이전" src="../images/bu_pre_on.gif" border="0" ></a>
		<%
				}
				else
				{
		%>

 				<img alt="이전" src="../images/bu_pre_off.gif" border="0">
		<%
				}
		%>
		</td>
		<td width="4"></td>
		<%
				for(int i=nStartPage ; i <= nEndPage ; i++)
				{
		%>
		<td width="4" align="center">
		<%
					if(i == nPageNo)
					{
		%>
					<a class="PageCrnt" ><%=i%></a>
		<%
					}
					else
					{
		%>
					 <a href="javascript:OnPageMove('<%=i%>')" PageCrnt="PageNavi"><%=i%></a>
		<%
					}
		%>
		</td><td width="4"></td>
		<%
				}
		%>
		<td width="80" align="right">
		<%
				if(nPageNo < nTotalEnd)
				{
		%>
				<a href="javascript:OnPageMove('<%=nPageNo+1%>')"><img alt="다음" src="../images/bu_next_on.gif" border="0" ></a>
		<%
				}
				else
				{
		%>
					<img alt="다음" src="../images/bu_next_off.gif" border="0">
		<%
				}
				if(nNext != 0)
				{
		%>
				<a href="javascript:OnPageMove('<%=nNext%>')"><img alt="다음 10페이지" src="../images/bu_nextnext_on.gif" border="0" ></a>
		<%
				}
				else
				{
		%>
					<img alt="다음 10페이지" src="../images/bu_nextnext_off.gif" border="0">
		<%
				}
			}
		%>
		</td>
	</tr>
</table>