/**
* #PGM_NAME	Common.js <BR>
* #DESC			공통 자바스크립트<BR>
*
* @ author     박진흥
* @ see
* @ version    1.0
* @ reference  table    :
**********************************************************************************************
* @								Modification   Log
* @     DATE				AUTHOR				DESCRIPTION
* @   2002.3.09				박진흥				최초 작성
* @   2002.3.12				권순형				수정
* @	  2002.04.30			이숙희				ShowDeptInfo(deptID, key) 추가					
* @	  2002.05.14			박호준				popupWinScroll(url, name, width, height) 에 resizable=yes 추가
* @   2002.05.27			이숙희				IsNull(nval) 추가	   
**********************************************************************************************
*/

/*** Index ***********************************************************************************

$1.	popupWin(url, name, width, height)
	-> 팝업창을 띄우는 함수
$1-1. popupWinScroll(url, name, width, height)
	-> 스크롤 바 있는 팝업창 띄우기

$2. showTip(current,e,text)
	-> 툴팁 보이기
$2.1. hideTip()
	-> 툴팁 숨기기

$3. removeStr(beforeStr, deleteStr)
	-> 문자열삭제

$4. trim(beforeStr)
	-> 입력받은 값에서 양쪽 공백 지워주기

$5. isArray(inputElement)
	-> 특정 엘리먼트가 배열변수인지 일반변수인지 구별하는 함수

$6. toggleAll(form, chkAll, chkOne)
	-> 리스트 테이블에서 checkbox를 toggle시키는 기능

$7. OnEnter(form)
 	-> textbox에서 엔터 입력시 OnSearch()함수 호출 : 검색 수행

$8. OnSearch(form)
 	-> 검색버튼 클릭시 호출되는 함수(ListFilter.jsp에서 사용)

$8-1. OnDetailSearch(form)
 	-> 상세검색버튼 클릭시 호출되는 함수(ListFilter.jsp에서 사용)

$9.	existElement(form, elmnt)
	-> 특정 element의 존재 여부를 판별하는 함수

$10.filterCheck(form)
	-> 목록에서 다른 기능을 호출하기 위하여 submit()이 일어날 때 목록검색조건(SF,SV값)을 초기화하는 함수
*********************************************************************************************/



/* $1
 * 기능 : 팝업창을 띄운다
 * 파라미터
 *   - name:생략가능
 * 사용예 :  <a href="javascript:popupWin('RecipientIndex.html', 'S1033', '683', '380')">
 */
function popupWin(url, name, width, height)
{
	var features;
	var t = screen.height / 2 - height / 2;
	var l = screen.width  / 2 - width  / 2;
	var option = "toolbar=no,menubar=no,location=no,scrollbars=no,status=no,resizable=yes";

	features = "top=" + t + ",left=" + l + ",width=" + width + ",height=" + height + "," + option;

	window.open(url, name, features);
}



/* $1-1
 * 기능 : 스크롤 바 있는 팝업창 띄우기
 * 파라미터
 *   - name:생략가능
 * 사용예 :  <a href="javascript:popupWin('RecipientIndex.html', 'S1033', '683', '380')">
 */
function popupWinScroll(url, name, width, height)
{
	var features;
	var t = screen.height / 2 - height / 2;
	var l = screen.width  / 2 - width  / 2;

	if(width == "750" || width == "760")
	{
		t -= 30;
	}

	var option = "toolbar=no,menubar=no,location=no,scrollbars=yes,status=no,resizable=yes";

	features = "top=" + t + ",left=" + l + ",width=" + width + ",height=" + height + "," + option;

	window.open(url, name, features);
}



/* $2
 * 기능 : 툴팁 보이기
 * 파라미터
 *   - this, event는 그대로 넘기고 text만 지정한다.
 * 사용예 : onMouseover='showTip(this, event, "지식지도관리")' onMouseout='hideTip()'
 */
function showTip(current,e,text)
{
	if (document.all){
			current.title = removeStr(text,'<br>');
	}
	else if (document.layers)
	{
		document.tooltip.document.write('<layer bgColor="white" style="border:1px solid black;font-size:12px;">'+text+'</layer>');
		document.tooltip.document.close();
		document.tooltip.left=e.pageX+5;
		document.tooltip.top=e.pageY+5;
		document.tooltip.visibility="show";
	}
}


/* $2-1
 * 기능 : 툴팁 숨기기
 * 사용예 : onMouseover='showTip(this, event, "지식지도관리")' onMouseout='hideTip()'
 */
function hideTip()
{
	if (document.layers)
		document.tooltip.visibility="hidden";
}



/* $3
 * 기능 : 문자열삭제
 * 파라미터
 *   - beforeStr : 삭제하기 전의 문자열, - deleteStr : 삭제할 문자열
 * 사용예 : removeStr("abcdefgh", "bcd") -> aefgh
 */
function removeStr(beforeStr, deleteStr)
{
	aStr=beforeStr.split(deleteStr);
	afterStr ='';
	for (i=0;i<aStr.length;i++)
		afterStr += aStr[i];
	return afterStr;
}


/* $4
 * 기능 : 입력받은 값에서 양쪽 공백 지워주기
 * 파라미터
 *   - beforeStr : 삭제하기 전의 문자열, - deleteStr : 삭제할 문자열
 * 사용예 : trim("  abc  ") -> abc
 */
function trim(beforeStr){
	var sLeftTrimed = beforeStr.replace(/^\s+/,"");
	var sBothTrimed = sLeftTrimed.replace(/\s+$/,"");
	return sBothTrimed;
}



/* $5
 * 기능 : 특정 엘리먼트가 배열변수인지 일반변수인지 구별하는 함수 : true이면 배열변수, false이면 일반변수
 * 사용예 : if (isArray(this.form.expertId) == true){ ... }
 */
function isArray(inputElement)
{
    if(inputElement[0] == null)
		return false;
	else
		return true;
}



/* $6
 * 기능 : 리스트 테이블에서 checkbox를 toggle시키는 기능
 * 파라미터
 *   - chkAll : 헤더부분의 checkbox이름, - chkOne : row부분의 checkbox이름
 * 사용예 : <input type="checkbox" name="chkAll" onClick="javascript:toggleAll(document.forms[0],'chkAll','chkOne')">
 */
function toggleAll(form, chkAll, chkOne)
{
	var elementLength = form.elements.length;
	var flag = false;
	for(i=0; i<elementLength; i++)
	{
		var e1 = form.elements[i];
		if(e1.name == chkAll && e1.checked == true)
		{
			flag = true;
			break;
		}
	}

	for(j=0; j<elementLength; j++)
	{
		var e2 = form.elements[j];
		if(e2.name == chkOne)
		{
			e2.checked = flag;
		}
	}
}


/* $7
 * 기능 : textbox에서 엔터 입력시 OnSearch()함수 호출 : 검색 수행
 * 사용예 : <input type="text" name="SV" onKeyDown="OnEnter()">
 */
function OnEnter(form)
{
	if(event.keyCode == 13)
	{
		OnSearch(form);
	}
}


/* $8
 * 기능 :검색버튼 클릭시 호출되는 함수
 * 사용예 : ListFilter.jsp에서 사용

function OnSearch(form)
{
	if((form.SF.value == "") && (form.SV.value != ""))
	{
		alert("검색할 타이틀을 선택하세요.");
		form.SF.focus();
		return;
	}

	if((form.SF.value != "") && (form.SV.value == ""))
	{
		alert("검색할 내용을 입력하세요.");
		form.SV.focus();
		return;
	}

	form.PN.value = 1;
	form.submit();
}
 */

/* $8-1
 * 기능 :상세검색버튼 클릭시 호출되는 함수
 * 사용예 : ListFilter.jsp에서 사용
 * 손기영이 이 함수막음 사용히 연락주세요
function OnDetailSearch(form)
{
	form.target = "Body";
	form.submit();
}
*/


/* $9
 * 기능 : 특정 element의 존재 여부를 판별하는 함수
 * 파라미터
 *   - form : form 이름, - elmnt : 존재여부를 판별할 element의 이름
 * 사용예 : if(existElement(document.forms[0], "CBLIST") == true) {...}
 * 리턴값
 *   - true : 존재함 , - false : 존재하지 않음
 */
function existElement(form, elmnt)
{
	var elementLength = form.elements.length;
	var flag = false;

	for(i=0; i<elementLength; i++)
	{
		var e1 = form.elements[i];
		if(e1.name == elmnt)
		{
			flag = true;
			break;
		}
	}

	return flag;
}


/* $10
 * 기능 : 목록에서 다른 기능을 호출하기 위하여 submit()이 일어날 때 목록검색조건(SF,SV값)을 초기화하는 함수
 * 파라미터
 *   - form : form 이름(넘겨주지 않아도 됨)
 * 사용예 : filterCheck(document.forms[0]);
 * 
 * 
 */
function filterCheck(form)
{
	if (form == null) form = document.form1;

	if( ((form.SF.value == "")||(form.SF.value == "none")) && (form.SV.value != ""))
	{
		form.SV.value = "";
	}

	if((form.SF.value != "") && (form.SV.value == ""))
	{
		form.SF.value = "";
	}
}

 function OrgUDGMoreView(form, name, id, key, app) {
	 OrgView(form, name, id, '5', key, app);
 }

/* $11
 * 기능 : 조직도 선책창을 띄운다
 * 파라미터
 *   - form: form 이름
 *   - name: 부서명이 입력될 필드명
 *   - type: 부서 또는 사용자 선택 유형 
 *			('1': 부서 one, '2': 부서 more, '3': 사용자 one, '4': 사용자 more, '5': 부서와 사원 more, '6': 부서 또는 사원 one)
 *   - id: 부서 id가 입력될 필드명
 *   - key: K 값
 */
function OrgView(form, name, id, type, key,app){
	var x = new Date();
	str = 'InputOrgValues = document.' + form + '.' + name;
	eval(str);
	str = 'InputOrgIDs = document.' + form + '.' + id;
	eval(str);
	var xleft = (screen.width - 650)/2;
	var ytop = (screen.height - 550)/2;

//vOrgView = window.open('/jsp/org/assign/OVInitFrame.jsp?MET=org.OVInitFrame&OSV=T&K='+key+'&GRP=F&TYP='+type+'&RETIDCTRL=InputOrgIDs&x='+x.getTime(),'OrgView','width=520,height=550,resizable=yes,menubar=no,left=240,top=50');
	vOrgView = window.open('/jsp/org/assign/OVInitFrame.jsp?TOPDEPT=0&POS=1&OSV=T&APP=' + app + '&OUV=1&RESP=1&K='+key+'&GRP=F&TYP=5&RETIDCTRL=InputOrgIDs&x='+x.getTime(),'OrgView','width=650,height=550,resizable=yes,menubar=no,left=' + xleft + ',top=' + ytop);
	vOrgView.focus();
}

/* $11-1
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

/* $11-2
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

/* $11-3
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

/* $11-4
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

/* $11-5
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

/* $11-6
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

/* $12
 * 기능 : 사용자정보 상세보기 팝업창을 띄운다.
 * 파라미터
 *   - szUserID: 사용자 ID
 *   - key: K 값
 */
function  ShowUserInfo(szUserID, key)
{
    window.open('/servlet/HIServlet?SLET=OrgMenuView&K='+key+'&MET=UD&WIN=1&UID=' + szUserID + '&__RANDOM=' + (new Date()).getTime(), 'UserDetailInfo', 'left=6000,top=2000,width=10,height=10,menubar=no,resizable=yes,scrollbars=yes');
}

/* $13
 * 기능 : 부서정보 상세보기 팝업창을 띄운다.
 * 파라미터
 *   - deptID: 부서 ID
 *   - key: K 값
 */
function ShowDeptInfo(deptID, key)
{
    window.open('/servlet/HIServlet?SLET=OrgMenuView&K='+key+'&MET=DD&WIN=1&DID='+deptID+'&__RANDOM=' + (new Date()).getTime(), 'DeptDetailInfo', 'left=6000,top=2000,width=10,height=10,menubar=no,resizable=yes,scrollbars=yes');
}

/**
* $14
* #DESC		날자체크 자바스크립트<BR>
*
* @ author     권순형
*/

/* 날짜 Format 및 정확성 Check */
function dateChk(srcField) {

	var compNum="0123456789";
	var i = 0;
	var temp = 0;
	var ddate = srcField.value;
	var len=ddate.length;

	var today = new Date();
	var year = today.getYear();
	var month = today.getMonth()+1;
	var date = today.getDate();

	month = addZero(month+"");
	date = addZero(date+"");


	if (len != 10) {

	 	alert("\n날짜 형식에 맞지 않습니다.\n ex)"+year+"-"+month+"-"+date+"");
	 	srcField.select();
	 	return false;
	}


	var tmpDate = delHyphen(ddate);

	if (tmpDate.length !=8 ) {

	 	alert("\n날짜 형식에 맞지 않습니다.\n ex)"+year+"-"+month+"-"+date+"");
	 	srcField.select();
	 	return false;
	}


  	for(i=0;i<len;i++) {
  		if( compNum.indexOf(tmpDate.substring(i,i+1)) < 0) {
		  	alert("\n날짜 형식에 맞지 않습니다.\n ex)"+year+"-"+month+"-"+date+"");
		  	srcField.select();
		  	return false;
		}
 	}


 	if(eval(tmpDate.substring(4,6))>0 && eval(tmpDate.substring(4,6))<=12){
   		switch(eval(tmpDate.substring(4,6))){
   			case 1:
   			case 3:
   			case 5:
   			case 7:
   			case 8:
   			case 10:
   			case 12:
   				temp = 31;
   				break;

   			case 4:
   			case 6:
   			case 9:
   			case 11:

   				temp = 30;
   				break;

   			case 2:
   				if(eval(tmpDate.substring(0,4))%4==0){
					if(eval(tmpDate.substring(0,4))%100==0){
						if(eval(tmpDate.substring(0,4))%400==0)
							temp = 29;
						else
						  	temp = 28;
					}
					  	else
							temp = 29;
				}
				else temp = 28;
				break;

   		}//switch



		if(!(eval(tmpDate.substring(6,8))>0 && eval(tmpDate.substring(6,8))<=temp)) {
	   		alert("\n날짜가 맞지 않습니다.");
			srcField.focus();
			return false;
        }

 	} else {
	   	alert("\n날짜가 맞지 않습니다.");
		srcField.focus();
		return false;

 	}//if



     return true;

}

/* 
 * $15
 * 기능 : 날짜 Format에서 "-" 제거 함수
 */
function delHyphen(arg){
	var tmpDate = "";
	arg+="";
	for(var i=0;i<arg.length; i++){
		if(arg.charAt(i) == '-'){
			continue;
		}
		else{
			tmpDate += arg.charAt(i);
		}
	}

	return tmpDate;
}

function addZero(arg){
	if(arg.length == 1)
		return "0"+arg;
	else
		return arg;
}

/* 
 * $16
 * 기능 : 인자로 넘어온 두날짜를 체크해서 이후 날짜가 먼저면 false
 */
function checkDate(pDate, nDate) {
	var prevDate = delHyphen(pDate);
	var nextDate = delHyphen(nDate);

	if( (prevDate.length != 8 ) || (nextDate.length != 8 ) )  {
		return true;
	}

	var tmpPrevDate = new Date( prevDate.substring(0,4), prevDate.substring(4,6), prevDate.substring(6,8) );
	var tmpNextDate = new Date( nextDate.substring(0,4), nextDate.substring(4,6), nextDate.substring(6,8) );

	if ( tmpPrevDate.getTime() <= tmpNextDate.getTime() )  {
		return true;
	}

	return false;
}

/* $17
 * 기능 : 문자열의 길이에 따른 처리 함수
 */
function check_length(comp, str, len)
{
	comp.value = Ltrim(comp.value);
    complen = CheckByte(comp.value);
    if (complen > len)
    {
      alert(str + '은(는) ' + len + '자를 초과할수 없습니다. 현재 ' + complen + '글자입니다.');
	  comp.focus();
	  return false;
	}
	return true;
}

var IEYES = 0;
var menufacture = navigator.appName;
var version = navigator.appVersion;
if((menufacture.indexOf('마이크로소프트') >= 0
    || menufacture.indexOf('Microsoft') >= 0)
    && version.indexOf('4.0') >= 0 )
{
   IEYES = 1;
}

/* $18
 * 기능 : 지정된 객체의 문자열의 길이를 계산하는 함수
 */
function CheckByte(str)
{
   var i;
   var strLen;
   var strByte;
   strLen = str.length;
   // IE4.0 이상
   if(IEYES == 1)
   {
      for(i=0, strByte=0;i<strLen;i++)
	 {
	    if(str.charAt(i) >= ' ' && str.charAt(i) <= '~' )
	       strByte++;
        else
           strByte += 2;
     }
     return strByte;
   }
   // Netscape일 경우
   else
   {
      return strLen;
	}
}


/* $19
 * 기능 : 넘어온 문자열들중에 왼쪽에 포함된 공백을 모두 없앤 문자열을 리턴한다
 */
function Ltrim(strings)
{
    var retString = "";
    var c;
    var i;
    var end=0;
    for(i=0;i<strings.length;i++) {
        c = strings.charAt(i);
        if(c != ' ' || end==1){
           retString += c;
           end = 1;
        }
    }
    return(retString);
}

/* $20
 * 기능 : 넘어온 문자열들중에 오른쪽에 포함된 공백을 모두 없앤 문자열을 리턴한다
 */
function Rtrim(strings)
{
    var retString = "";
    var c;
    var i;
    var end=0;
    for(i=strings.length - 1;i>=0;i--) {
        c = strings.charAt(i);
        if(c != ' ' || end==1){
           retString = c + retString;
           end = 1;
        }
    }
    return(retString);
}

/* $21
 * 기능 : 넘어온 문자열들이 모두 숫자인가를 확인 true:모두숫자, false:문자포함
 */
function Numeric_Check(strings) {
    var c;
    var i;
    for(i=0;i<strings.length;i++) {
        c = strings.charAt(i);
        if(c < '0' || c > '9'){
           return false;
        }
    }
    return true;
}

/* $22
 * 기능 : 공백(null) 입력 여부 check, true: 공백, false: 공백 아님
 */
function IsNull(nval) {
	for(var i = 0; i < nval.length; i++){
		tst = nval.substring(i,i+1);
		if((tst != ' ')&&(tst != '\r')&&(tst != '\n')&&(tst != '\t')&&(tst != '\b')&&(tst != '\f'))
			return false;
	}
	return true;
}
//달력호출
function OnCalendar(form_name, in_name, selectedYear, selectedMonth, selectedDay)
{

	var x = (screen.width - 260)/2;
	var y = (screen.height - 400)/2;

	window.open("/jsp/Calendar.jsp?YEAR=" + selectedYear + "&MONTH=" + selectedMonth + "&DAY=" + selectedDay +"&form_name="+form_name+"&in_name="+in_name,
				"calendar","width=260, height=270, left=" + x + ", top= " + y + ", resizable=yes,status=yes");
}
