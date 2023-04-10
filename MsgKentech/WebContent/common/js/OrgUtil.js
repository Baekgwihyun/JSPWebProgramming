/**
* #PGM_NAME		OrgUtil.js <BR>
* #DESC			조직도관련 자바스크립트<BR>
*
* @ author		hjpark
**********************************************************************************************
* @							Modification   Log
* @     DATE				AUTHOR				DESCRIPTION
* @   2003.05.09			hjpark				최초 작성
**********************************************************************************************
*/

/********************************************************/
/*	$1. 조직도 선택창 관련
/********************************************************/
/* $1-1
 * 기능 : 조직도 선책창을 띄운다
 * 파라미터
 *   - form: form 이름
 *   - name: 부서명이 입력될 필드명
 *   - type: 부서 또는 사용자 선택 유형 
 *			('1': 부서 one, '2': 부서 more, '3': 사용자 one, '4': 사용자 more, '5': 부서와 사원 more, '6': 부서 또는 사원 one)
 *   - id: 부서 id가 입력될 필드명
 *   - key: K 값
 */
function OrgView(form, name, id, type, key){
	var x = new Date();
	str = 'InputOrgValues = document.' + form + '.' + name;
	eval(str);
	str = 'InputOrgIDs = document.' + form + '.' + id;
	eval(str);
	vOrgView = window.open('/jsp/org/assign/OVInitFrame.jsp?MET=org.OVInitFrame&APP=MAIL&OSV=T&K='+key+'&GRP=F&TYP='+type+'&RETIDCTRL=InputOrgIDs&x='+x.getTime(),'OrgView','width=520,height=550,resizable=yes,menubar=no,left=240,top=50');
	vOrgView.focus();
}

/* $1-2
 * 기능 : 조직도 선책창을 띄운다 - 부서 one 선택
 * 파라미터
 *   - form: form 이름
 *   - name: 부서명이 입력될 필드명
 *   - id: 부서 id가 입력될 필드명
 *   - key: K 값
 */
function OrgViewDeptOne(form, name, id,  key){
	OrgView(form, name, id, '1', key);
}

/* $1-3
 * 기능 : 조직도 선책창을 띄운다 - 부서 more 선택
 * 파라미터
 *   - form: form 이름
 *   - name: 부서명이 입력될 필드명
 *   - id: 부서 id가 입력될 필드명
 *   - key: K 값
 */
function OrgViewDeptMore(form, name, id,  key){
	OrgView(form, name, id, '2', key);
}

/* $1-4
 * 기능 : 조직도 선책창을 띄운다 - 사용자 one 선택
 * 파라미터
 *   - form: form 이름
 *   - name: 부서명이 입력될 필드명
 *   - id: 부서 id가 입력될 필드명
 *   - key: K 값
 */
function OrgViewUserOne(form, name, id,  key){
	OrgView(form, name, id, '3', key);
}

/* $1-5
 * 기능 : 조직도 선책창을 띄운다 - 사용자 more 선택
 * 파라미터
 *   - form: form 이름
 *   - name: 부서명이 입력될 필드명
 *   - id: 부서 id가 입력될 필드명
 *   - key: K 값
 */
function OrgViewUserMore(form, name, id,  key){
	OrgView(form, name, id, '4', key);
}

/* $1-6
 * 기능 : 조직도 선책창을 띄운다 - 부서와 사용자 more 선택
 * 파라미터
 *   - form: form 이름
 *   - name: 부서명이 입력될 필드명
 *   - id: 부서 id가 입력될 필드명
 *   - key: K 값
 */
function OrgViewDeptUserMore(form, name, id,  key){
	OrgView(form, name, id, '5', key);
}

/* $1-7
 * 기능 : 조직도 선책창을 띄운다 - 부서 또는 사원 one 선택
 * 파라미터
 *   - form: form 이름
 *   - name: 부서명이 입력될 필드명
 *   - id: 부서 id가 입력될 필드명
 *   - key: K 값
 */
function OrgViewDeptUserOne(form, name, id,  key){
	OrgView(form, name, id, '6', key);
}


/********************************************************/
/*	$2. 조직도 정보보기 관련
/********************************************************/
/* $2-1
 * 기능 : 사용자정보 상세보기 팝업창을 띄운다.
 * 파라미터
 *   - szUserID: 사용자 ID
 *   - key: K 값
 */
function  ShowUserInfo(szUserID, key)
{
    window.open('/servlet/HIServlet?SLET=OrgMenuView&K='+key+'&MET=UD&WIN=1&UID=' + szUserID + '&__RANDOM=' + (new Date()).getTime(), 'UserDetailInfo', 'left=6000,top=2000,width=10,height=10,menubar=no,resizable=yes,scrollbars=yes');
}

/* $2-2
 * 기능 : 부서정보 상세보기 팝업창을 띄운다.
 * 파라미터
 *   - deptID: 부서 ID
 *   - key: K 값
 */
function ShowDeptInfo(deptID, key)
{
    window.open('/servlet/HIServlet?SLET=OrgMenuView&K='+key+'&MET=DD&WIN=1&DID='+deptID+'&__RANDOM=' + (new Date()).getTime(), 'DeptDetailInfo', 'left=6000,top=2000,width=10,height=10,menubar=no,resizable=yes,scrollbars=yes');
}