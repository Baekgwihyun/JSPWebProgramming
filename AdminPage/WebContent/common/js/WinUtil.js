/**
* #PGM_NAME		WinUtil.js <BR> (/ams/common/js/WinUtil.js)
* #DESC			공통 자바스크립트<BR>
*
* @ author		hjpark
**********************************************************************************************
* @							Modification   Log
* @     DATE				AUTHOR				DESCRIPTION
* @   2003.05.09			hjpark				최초 작성
**********************************************************************************************
*/

/*** Index **********************************************
$1. Window 관련
$2. 툴팁 관련
$3. checkbox 관련
$4. listbox 관련
$5. form 관련
$6. 문자열 관련
$7. Date 관련
$8. Array 관련
*********************************************************/


/********************************************************/
/*	$1. Window 관련
/********************************************************/
/* $1-1
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
	var option = "toolbar=no,menubar=no,location=no,scrollbars=no,status=no,resizable=no,maximize=no";

	features = "top=" + t + ",left=" + l + ",width=" + width + ",height=" + height + "," + option;

	window.open(url, name, features);
}

/* $1-2
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

	if(width*1 >= 750)
	{
		t -= 30;
	}

	var option = "toolbar=no,menubar=no,location=no,scrollbars=yes,status=no,resizable=yes";

	features = "top=" + t + ",left=" + l + ",width=" + width + ",height=" + height + "," + option;

	window.open(url, name, features);
}
/* $1-3
 * 기능 : 메뉴가 있는 팝업창 띄우기
 * 파라미터
 *   - name:생략가능
 * 사용예 :  <a href="javascript:popupWin('RecipientIndex.html', 'S1033', '683', '380')">
 */
function popupWinMenu(url, name, width, height)
{
	var features;
	var t = screen.height / 2 - height / 2;
	var l = screen.width  / 2 - width  / 2;

	if(width*1 >= 750)
	{
		t -= 30;
	}

	var option = "toolbar=no,menubar=yes,location=no,scrollbars=no,status=no,resizable=yes";

	features = "top=" + t + ",left=" + l + ",width=" + width + ",height=" + height + "," + option;

	window.open(url, name, features);
}
function popupVWinScroll(url, name, width, height)
{
	var features;
	var t = screen.height / 2 - height / 2;
	var l = screen.width  / 2 - width  / 2;
	var option = "toolbar=no,menubar=no,location=no,scrollbars=yes,status=no,resizable=yes";

	features = "top=" + t + ",left=" + l + ",width=" + width + ",height=" + height + "," + option;

	window.open(url, name, features);
}
/* $1-3
 * 기능 : 메뉴가 있는 팝업창 띄우기
 * 파라미터
 *   - name:생략가능
 * 사용예 :  <a href="javascript:popupWin('RecipientIndex.html', 'S1033', '683', '380')">
 */
function popupWinMenuScroll(url, name, width, height)
{
	var features;
	var t = screen.height / 2 - height / 2;
	var l = screen.width  / 2 - width  / 2;

	if(width*1 >= 750)
	{
		t -= 30;
	}

	var option = "toolbar=no,menubar=yes,location=no,scrollbars=yes,status=no,resizable=yes";

	features = "top=" + t + ",left=" + l + ",width=" + width + ",height=" + height + "," + option;

	window.open(url, name, features);
}

/* $1-3
 * 기능 : 상태창비우기
 */
function ResetStatus()
{
	window.status = "";
}

/* $1-4
 * 기능 : 상태창에 표시하기
 */
function ChngStatus(value)
{
	window.status = value;
}

/* $1-5
 * 기능 : 화면을 리로드한다. (새로고침)
 */
function refresh()
{
	document.location.reload();
}

/* $1-6
 * 기능 : 팝업창을 띄운다
 * 파라미터
 *   - name:생략가능
 * 사용예 :  <a href="javascript:popupWin('RecipientIndex.html', 'S1033', '683', '380')">
 */
function popupFullWin(url, name)
{
	var features;
	var width=screen.width;
	var height=screen.height;
	var t = screen.height / 2 - height / 2;
	var l = screen.width  / 2 - width  / 2;
	var option = "toolbar=no,menubar=no,location=no,scrollbars=no,status=yes,resizable=no,maximize=no";

	features = "top=" + t + ",left=" + l + ",width=" + width + ",height=" + height + "," + option;

	window.open(url, name, features);
}

/********************************************************/
/*	$2. 툴팁 관련
/********************************************************/
/* $2
 * 기능 : 툴팁 보이기
 * 파라미터
 *   - this, event는 그대로 넘기고 text만 지정한다.
 * 사용예 : onMouseover='showTip(this, event, "생산현황보고")' onMouseout='hideTip()'
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
 * 사용예 : onMouseover='showTip(this, event, "생산현황보고")' onMouseout='hideTip()'
 */
function hideTip()
{
	if (document.layers)
		document.tooltip.visibility="hidden";
}


/********************************************************/
/*	$3. checkbox 관련
/********************************************************/
/* $3-1
 * 기능 : checkbox 모두선택
 * 사용예 : checkAll('MainForm', 'checkItem')
 * 20030530 이신태 disabled설정 안된것들만 check 되게 바꿈
 */
function checkAll(formName, itemName)
{
	var foundCheckBoxes= findElements(formName, itemName);
	var i;
	for(i= 0; i < foundCheckBoxes.length; i++)
	{
		if(foundCheckBoxes[i].disabled!=true){
			foundCheckBoxes[i].checked= true;
		}
	}
}

/* $3-2
 * 기능 : checkbox 모두선택취소
 * 사용예 : uncheckAll('MainForm', 'checkItem')
 */
function uncheckAll(formName, itemName)
{
	var foundCheckBoxes= findElements(formName, itemName);
	var i;
	for(i= 0; i < foundCheckBoxes.length; i++)
	{
		foundCheckBoxes[i].checked= false;
	}
}

/* $3-3
 * 기능 : checked된 checkbox element 찾기
 * 사용예 : findCheckedItems('MainForm', 'checkItem')
 */
function findCheckedItems(formName, itemName)
{
	var result= new Array();
	var foundCheckBoxes= findElements(formName, itemName);
	var i;
	for(i= 0; i < foundCheckBoxes.length; i++)
	{
		if(foundCheckBoxes[i].checked == true) result.push(foundCheckBoxes[i]);
	}

	return result;
}

/* $3-4
 * 기능 : checkbox 의 checked 여부확인
 * 사용예 : isChecked('MainForm', 'checkItem')
 * @param	item : checkbox 객체
 * @return	boolean
 */
function isChecked(item)
{
	var result = false;
	var itemCnt = item.length;

	if(itemCnt > 1)
	{
		for(var i=0; i<itemCnt; i++)
		{
			if(item[i].checked)
			{
				result = true;
				break;
			}
		}
	}
	else
	{
		if(item.checked)
		{
			result = true;
		}
	}
	return result;
}

/* $3-4
 * 기능 : 선택한 checkbox를 제외한 나머지 checkbox를 unckeck한다. (radio 버튼처럼 동작)
 * 사용예 : <inpu type="checkbox" name="checkItem" onClick="toggleCheckBox('MainForm', 'checkItem', this)">
 */
function toggleCheckBox(formName, itemName, checkedObj)
{
	var foundCheckBoxes= findElements(formName, itemName);
	var i;
	for(i= 0; i < foundCheckBoxes.length; i++)
	{
		if(foundCheckBoxes[i] != checkedObj){
			foundCheckBoxes[i].checked= false;
		}
	}

}

/********************************************************/
/*	$4. listbox 관련
/********************************************************/
/* $4-1
 * 기능 : select list 의 모든 value 를 String으로 얻음(";" 로 구분함)
 * @param listBox:Select
 * @return :String, all item values separated by ";", if not exist, return null;
 */
function getAllValuesInListBox(listBox)
{
	var result= "";
	var i;
	for(i=0; i < listBox.options.length; i++)
	{
		result+= listBox.options[i].value + ";";
	}

	if(result == "") result= null;

	return result;
}
/* $4-2
 * 기능 : select list의 value 값에 해당하는 list option 찾기
 * @param listBox:Select
 * @param value:String
 * @return  :Option, a item has the parameter 'value', return null if not exist.
 *
 */
function findItemByValueInListBox(listBox, value)
{
	var result= null;
	var i;
	for(i=0; i < listBox.options.length; i++)
	{
		if(listBox.options[i].value == value)	result= listBox.options[i];
	}

	return result;
}

/* $4-3
 * 기능 : 선택된 select list 의 list option 찾기
 * @param listBox:Select
 * @return  Option array, return null if not exist.
 *
 */
function findSelectedItemsInListBox(listBox)
{
	var result= new Array();
	var i;
	for(i=0; i < listBox.options.length; i++)
	{
		if(listBox.options[i].selected == true)	result.push(listBox.options[i]);
	}

	if(result.length == 0) result= null;
	return result;
}

/********************************************************/
/*	$5. form 관련
/********************************************************/
/* $5-1
 * 기능 : 이름으로 form element object 구하기
 * @param forName:String
 * @param name:String
 * @return :Array
 */
function findElements(formName, name)
{
	if(formName == null) retrun;
	var result= new Array();
	var fn= formName.indexOf("document.") == -1 ?  ("document." + formName): formName;
	var elems= eval(fn + ".elements");
	var i;
	var count = 0;
	for(i=0; i < elems.length; i++)
	{
		if(elems[i].name.indexOf(name) == 0){
			result[count] = elems[i];
			count++;
		}
	}

	return result;
}

/* $5-2
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

/********************************************************/
/*	$6. 문자열 관련
/********************************************************/
/* $6-1
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

/* $6-2
 * 기능 : 입력받은 값에서 양쪽 공백 지워주기
 * 사용예 : trim("  abc  ") -> "abc"
 */
function trim(beforeStr){
	var sLeftTrimed = beforeStr.replace(/^\s+/,"");
	var sBothTrimed = sLeftTrimed.replace(/\s+$/,"");
	return sBothTrimed;
}

/* $6-3
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

/* $6-4
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

/* $6-5
 * 기능 : 넘어온 문자열들이 모두 숫자인가를 확인 true:모두숫자, false:문자포함
 */
function isNumber(value) {
	num = new Number(value);
	var Result = num + '';
	if(Result == 'NaN') return false;
	return true;
}

/* $6-6
 * 기능 : 공백(null) 입력 여부 check, true: 공백, false: 공백 아님
 */
function isNull(nval) {
	for(var i = 0; i < nval.length; i++){
		tst = nval.substring(i,i+1);
		if((tst != ' ')&&(tst != '\r')&&(tst != '\n')&&(tst != '\t')&&(tst != '\b')&&(tst != '\f'))
			return false;
	}
	return true;
}

/* $6-7
 * 기능 : 지정된 객체의 문자열의 길이를 계산하는 함수
 */
function getTextByte(InputStr) {
	str = new String(InputStr);
	var strLen = str.length;
	var strByte = 0;

	for (var i=0; i<strLen; i++) {
		tmp = new String(str.charCodeAt(i));
		strByte++;
		if (tmp.length > 3) {
			strByte++;
		}
	}
	return strByte;
}

/* $6-8
 * 기능 : 1자리 숫자를 2자리로 맞춤(ex: 1 --> 01)
 */
function make1To2Word(vIn) {
	var vLength = vIn.length;
	if(vLength == 1) {
		vIn = '0' + vIn;
	}
	return vIn;
}

/* $6-9
 * 기능 : 문자열 치환. orgStr 에서 findText 에 해당하는 문자열을 찾아서 rplcText 로 변환한다.
 */
function stringReplace(orgStr,findText,rplcText) {
	var pos = 0;
	pos = orgStr.indexOf(findText);
	while(pos != -1) {
		preStr = orgStr.substring(0,pos);
		postStr = orgStr.substring(pos+(findText.length)*1,orgStr.length);
		orgStr = preStr + rplcText + postStr;
		pos = orgStr.indexOf(findText);
	}
	return orgStr;
}

/********************************************************/
/*	$7. Date 관련
/********************************************************/
/* $7-1
 * 기능 : 날짜 Format 및 정확성 Check
 * @param	날짜 스트링 (예: 2003-05-01)
 * @return  true / false
 */
function isValidDate(dt)
{
	if(dt == null) return false;
	var re= /(^\d\d\d\d)-(\d\d)-(\d\d)/;
	var aDate= dt;
	var ar= dt.match(re);

	if(ar == null || ar.length == 0) return false;

	var aYear= ar[1];
	var aMonth= ar[2]-1;
	var aDay= ar[3];

	var utcDate= new Date(Date.UTC(aYear, aMonth, aDay));

	var newYear= utcDate.getFullYear();
	var newMonth= utcDate.getMonth();
	var newDay= utcDate.getDate();

	if( aYear == newYear && aMonth == newMonth && aDay == newDay)
	{
		return true;
	}
	else
	{
		return false;
	}
}

/*
 * $7-2
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

function isOld(dt)
{
	var tmpDay = new Date();
	var baseDay = dt.substring(0,4) + dt.substring(5,7) + dt.substring(8,10);
	var today = tmpDay.getFullYear() +""+ make1To2Word((tmpDay.getMonth()+1)+"") +""+ make1To2Word((tmpDay.getDate())+"");
	if(parseInt(today) > parseInt(baseDay))
		return true;
	else
		return false;
}

/********************************************************/
/*	$8. Array 관련
/********************************************************/
/* $8-1
 * 기능 : 배열변수인지 일반변수인지 구별하는 함수 : true이면 배열변수, false이면 일반변수
 * 사용예 : if (isArray(this.form.expertId) == true){ ... }
 */
function isArray(source)
{
    if(source[0] == null)
		return false;
	else
		return true;
}

/* $8-2
 * copy 2 desimension array  source 'source' to 'target'
 */
function copyArray2D(source, target)
{
	if( source == null || target==null) return;
	var i,j;
	for(i=0; i < source.length; i++)
	{
		var aAr= new Array();
		for(j=0; j < source[i].length; j++)
		{
			aAr.push( source[i][j] );
		}

		target.push(aAr);
	}
}

/* $8-2
 * 기능 : array 복사
 */
function cloneArray(source)
{
	if( source == null) return;
	var result= new Array();
	var i,j;
	for(i=0; i < source.length; i++)
	{
		result.push(source[i]);
	}

	return result;
}
function viewFolderInfo(bindNo)
{
  var form = document.MainForm;
  var viewUrl = form.action +"?SLET=com.hs.ams.common.util.viewInfo.PopViewBindInfoCmd&EIPJSP=/ams/common/PopViewBindInfo.jsp&K="+form.K.value+"&GUBUN=BindInfo&CallBindNo="+bindNo;
//  popupWinScroll(viewUrl, bindNo, "827", "520");

	var features;
	var height = 520;
	var width = 827;
	var t = screen.height / 2 - height / 2;
	var l = screen.width  / 2 - width  / 2;
	var option = "toolbar=no,menubar=no,location=no,scrollbars=auto,status=no,resizable=no,maximize=no";

	features = "top=" + t + ",left=" + l + ",width=" + width + ",height=" + height + "," + option;
	var BIND = window.open(viewUrl, bindNo, features);
	BIND.focus();
}

/********************************************************/
/*	$9. Tree메뉴 관련
/********************************************************/
/* $9-1
 * 기능 : 메뉴 슬라이딩 실행
 */
function AMSrunMenu(myName,newspeed)
	{

		ieStep=0;
		thereS=false;
		thereC=false;
		if(newspeed>0)
		{
			mySpeed=newspeed;
		}
		first=myName;
		if(whichOpen==-1&&!running&&AMSmain[myName]&&!(whichOpen==myName))
		{
			running=true;
			if(NN)
			{
				myLayer[myName+1].clip.height=0;
				myLayer[myName+1].visibility=VISIBLE;
			}
			if(IE)
			{
				myLayer[myName+1].clip= "rect(" + ("auto") +" "+ ("auto") +" "+ (0) +" "+ ("auto") +")";
				myLayer[myName+1].visibility=VISIBLE;
			}
			AMSopenMenuS(myName);
			AMSopenMenuC(myName);
		}
		if(whichOpen>=0&&!running&&!(whichOpen==myName))
		{
			running=true;
			second=whichOpen;
			ieStep1=myHeight[second+1];
			thereCS=false;
			thereCC=false;
			AMScloseMenuS(second);
			AMScloseMenuC(second);
		}
		/* 자기자신을 닫지 못하게 막음
		if(whichOpen>=0&&!running&&whichOpen==myName&&closes)
		{
			running=true;
			second=whichOpen;
			ieStep1=myHeight[second+1];
			thereCS=false;
			thereCC=false;
			AMScloseMenuS(second);
			AMScloseMenuC(second);
		}
		*/
	}
	
	function AMSstopCloseS(myName)
	{
		running=false;
		thereCS=true;
		if(closes&&first==whichOpen)
		{
			whichOpen=-1;
		}
		else
		{
			whichOpen=-1;
			AMSrunMenu(first);
		}
	}
	
	function AMSstopOpenS(myName)
	{
		running=false;
		thereS=true;
		if(IE)
		{
			myLayer[myName+1].clip= "rect(" + ("auto") +" "+ ("auto") +" "+ ("auto") +" "+ ("auto") +")";}
			whichOpen=myName;
		}
	
	function AMSopenMenuS(myName)
	{
		myStep=mySpeed;
		if(NN&&!thereS&&!(first==lastMain))
		{
			if(myLayer[first+2].top+myStep>mySlide[first+1])
			{
				myStep=mySlide[first+1]-myLayer[first+2].top;
			}
			for(i=first+2; i<myLayer.length; i+=2)
			{
				myLayer[i].top+=myStep;
			}
			if(myLayer[first+2].top==mySlide[first+1])
			{
				AMSstopOpenS(first)
			}
			if(running)setTimeout('AMSopenMenuS(first)',10);
		}
		if(IE&&!thereS&&!(first==lastMain))
		{
			if(myLayer[first+2].pixelTop+myStep>mySlide[first+1])
			{
				myStep=mySlide[first+1]-myLayer[first+2].pixelTop;
			}
			for(i=first+2; i<myLayer.length; i+=2)
			{
				myLayer[i].pixelTop+=myStep;
			}
			if(myLayer[first+2].pixelTop==mySlide[first+1])
			{
				AMSstopOpenS(first)
			}
			if(running)setTimeout('AMSopenMenuS(first)',10);
		}
	}
	function AMSopenMenuC(myName)
	{
		myStep=mySpeed;
		if(NN&&!thereC)
		{
			if ((myLayer[first+1].clip.height+myStep)>myHeight[first+1])
			{
				myLayer[first+1].clip.height=myHeight[first+1]
			}
			if(myLayer[first+1].clip.height==myHeight[first+1])
			{
				thereC=true;
				whichOpen=first;
				AMSstopOpenS(first)

			}else
			{
				myLayer[first+1].clip.height+=myStep;
			}
			if(running)setTimeout('AMSopenMenuC(first)',10);
		}
		if(IE&&!thereC)
		{
			ieStep+=myStep;
			myLayer[myName+1].clip= "rect(" + ("auto") +" "+ ("auto") +" "+ (ieStep) +" "+ ("auto") +")";

			if(ieStep>=myHeight[first+1])
			{
				thereC=true;
				whichOpen=first;
				AMSstopOpenS(first)
			}
			if(running)setTimeout('AMSopenMenuC(first)',10);
		}
	}
	function AMScloseMenuS(myName)
	{
		myStep=mySpeed;
		if(NN&&!thereCS&&!(second==lastMain))
		{
			if(myLayer[second+2].top-myStep<myTop[second+2])
			{
				myStep=myLayer[second+2].top-myTop[second+2];
			}
			for(i=second+2; i<myLayer.length; i+=2)
			{
				myLayer[i].top-=myStep;

			}
			if(myLayer[second+2].top==myTop[second+2])
			{
				AMSstopCloseS(second);
			}
			if(running)setTimeout('AMScloseMenuS(second)',10);
		}
		if(IE&&!thereCS&&!(second==lastMain))
		{
			if(myLayer[second+2].pixelTop-myStep<myTop[second+2])
			{
				myStep=myLayer[second+2].pixelTop-myTop[second+2];
			}
			for(i=second+2; i<myLayer.length; i+=2)
			{
				myLayer[i].pixelTop-=myStep;

			}
			if(myLayer[second+2].pixelTop==myTop[second+2])
			{
				AMSstopCloseS(second);
			}
			if(running)setTimeout('AMScloseMenuS(second)',10);
		}
	}
	function AMScloseMenuC(myName)
	{
		myStep=-mySpeed;
		ieStep1-=mySpeed;
		if(NN&&!thereCC)
		{
			if ((myLayer[second+1].clip.bottom+myStep)<0)
			{
				myLayer[second+1].clip.bottom=0;
			}
			if(myLayer[second+1].clip.bottom==0)
			{
				thereCC=true;

				if(second==lastMain)AMSstopCloseS(second);
			}
			else
			{
				myLayer[second+1].clip.bottom+=myStep;

			}
			if(running)setTimeout('AMScloseMenuC(second)',10);
		}
		if(IE&&!thereCC)
		{
			if(ieStep1<=0)
			{
				myLayer[myName+1].clip= "rect(" + ("auto") +" "+ ("auto") +" "+ (0) +" "+ ("auto") +")";
				thereCC=true;
				if(second==lastMain)AMSstopCloseS(second);

			}
			else
			{
				myLayer[myName+1].clip= "rect(" + ("auto") +" "+ ("auto") +" "+ (ieStep1) +" "+ ("auto") +")";

			}
			if(running)setTimeout('AMScloseMenuC(second)',10);
		}
	}