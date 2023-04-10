/**
* #PGM_NAME	Common.js <BR>
* #DESC			���� �ڹٽ�ũ��Ʈ<BR>
*
* @ author     ������
* @ see
* @ version    1.0
* @ reference  table    :
**********************************************************************************************
* @								Modification   Log
* @     DATE				AUTHOR				DESCRIPTION
* @   2002.3.09				������				���� �ۼ�
* @   2002.3.12				�Ǽ���				����
* @	  2002.04.30			�̼���				ShowDeptInfo(deptID, key) �߰�					
* @	  2002.05.14			��ȣ��				popupWinScroll(url, name, width, height) �� resizable=yes �߰�
* @   2002.05.27			�̼���				IsNull(nval) �߰�	   
**********************************************************************************************
*/

/*** Index ***********************************************************************************

$1.	popupWin(url, name, width, height)
	-> �˾�â�� ���� �Լ�
$1-1. popupWinScroll(url, name, width, height)
	-> ��ũ�� �� �ִ� �˾�â ����

$2. showTip(current,e,text)
	-> ���� ���̱�
$2.1. hideTip()
	-> ���� �����

$3. removeStr(beforeStr, deleteStr)
	-> ���ڿ�����

$4. trim(beforeStr)
	-> �Է¹��� ������ ���� ���� �����ֱ�

$5. isArray(inputElement)
	-> Ư�� ������Ʈ�� �迭�������� �Ϲݺ������� �����ϴ� �Լ�

$6. toggleAll(form, chkAll, chkOne)
	-> ����Ʈ ���̺����� checkbox�� toggle��Ű�� ���

$7. OnEnter(form)
 	-> textbox���� ���� �Է½� OnSearch()�Լ� ȣ�� : �˻� ����

$8. OnSearch(form)
 	-> �˻���ư Ŭ���� ȣ��Ǵ� �Լ�(ListFilter.jsp���� ���)

$8-1. OnDetailSearch(form)
 	-> �󼼰˻���ư Ŭ���� ȣ��Ǵ� �Լ�(ListFilter.jsp���� ���)

$9.	existElement(form, elmnt)
	-> Ư�� element�� ���� ���θ� �Ǻ��ϴ� �Լ�

$10.filterCheck(form)
	-> ��Ͽ��� �ٸ� ����� ȣ���ϱ� ���Ͽ� submit()�� �Ͼ �� ��ϰ˻�����(SF,SV��)�� �ʱ�ȭ�ϴ� �Լ�
*********************************************************************************************/



/* $1
 * ��� : �˾�â�� ����
 * �Ķ����
 *   - name:��������
 * ��뿹 :  <a href="javascript:popupWin('RecipientIndex.html', 'S1033', '683', '380')">
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
 * ��� : ��ũ�� �� �ִ� �˾�â ����
 * �Ķ����
 *   - name:��������
 * ��뿹 :  <a href="javascript:popupWin('RecipientIndex.html', 'S1033', '683', '380')">
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
 * ��� : ���� ���̱�
 * �Ķ����
 *   - this, event�� �״�� �ѱ�� text�� �����Ѵ�.
 * ��뿹 : onMouseover='showTip(this, event, "������������")' onMouseout='hideTip()'
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
 * ��� : ���� �����
 * ��뿹 : onMouseover='showTip(this, event, "������������")' onMouseout='hideTip()'
 */
function hideTip()
{
	if (document.layers)
		document.tooltip.visibility="hidden";
}



/* $3
 * ��� : ���ڿ�����
 * �Ķ����
 *   - beforeStr : �����ϱ� ���� ���ڿ�, - deleteStr : ������ ���ڿ�
 * ��뿹 : removeStr("abcdefgh", "bcd") -> aefgh
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
 * ��� : �Է¹��� ������ ���� ���� �����ֱ�
 * �Ķ����
 *   - beforeStr : �����ϱ� ���� ���ڿ�, - deleteStr : ������ ���ڿ�
 * ��뿹 : trim("  abc  ") -> abc
 */
function trim(beforeStr){
	var sLeftTrimed = beforeStr.replace(/^\s+/,"");
	var sBothTrimed = sLeftTrimed.replace(/\s+$/,"");
	return sBothTrimed;
}



/* $5
 * ��� : Ư�� ������Ʈ�� �迭�������� �Ϲݺ������� �����ϴ� �Լ� : true�̸� �迭����, false�̸� �Ϲݺ���
 * ��뿹 : if (isArray(this.form.expertId) == true){ ... }
 */
function isArray(inputElement)
{
    if(inputElement[0] == null)
		return false;
	else
		return true;
}



/* $6
 * ��� : ����Ʈ ���̺����� checkbox�� toggle��Ű�� ���
 * �Ķ����
 *   - chkAll : ����κ��� checkbox�̸�, - chkOne : row�κ��� checkbox�̸�
 * ��뿹 : <input type="checkbox" name="chkAll" onClick="javascript:toggleAll(document.forms[0],'chkAll','chkOne')">
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
 * ��� : textbox���� ���� �Է½� OnSearch()�Լ� ȣ�� : �˻� ����
 * ��뿹 : <input type="text" name="SV" onKeyDown="OnEnter()">
 */
function OnEnter(form)
{
	if(event.keyCode == 13)
	{
		OnSearch(form);
	}
}


/* $8
 * ��� :�˻���ư Ŭ���� ȣ��Ǵ� �Լ�
 * ��뿹 : ListFilter.jsp���� ���

function OnSearch(form)
{
	if((form.SF.value == "") && (form.SV.value != ""))
	{
		alert("�˻��� Ÿ��Ʋ�� �����ϼ���.");
		form.SF.focus();
		return;
	}

	if((form.SF.value != "") && (form.SV.value == ""))
	{
		alert("�˻��� ������ �Է��ϼ���.");
		form.SV.focus();
		return;
	}

	form.PN.value = 1;
	form.submit();
}
 */

/* $8-1
 * ��� :�󼼰˻���ư Ŭ���� ȣ��Ǵ� �Լ�
 * ��뿹 : ListFilter.jsp���� ���
 * �ձ⿵�� �� �Լ����� ����� �����ּ���
function OnDetailSearch(form)
{
	form.target = "Body";
	form.submit();
}
*/


/* $9
 * ��� : Ư�� element�� ���� ���θ� �Ǻ��ϴ� �Լ�
 * �Ķ����
 *   - form : form �̸�, - elmnt : ���翩�θ� �Ǻ��� element�� �̸�
 * ��뿹 : if(existElement(document.forms[0], "CBLIST") == true) {...}
 * ���ϰ�
 *   - true : ������ , - false : �������� ����
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
 * ��� : ��Ͽ��� �ٸ� ����� ȣ���ϱ� ���Ͽ� submit()�� �Ͼ �� ��ϰ˻�����(SF,SV��)�� �ʱ�ȭ�ϴ� �Լ�
 * �Ķ����
 *   - form : form �̸�(�Ѱ����� �ʾƵ� ��)
 * ��뿹 : filterCheck(document.forms[0]);
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
 * ��� : ������ ��åâ�� ����
 * �Ķ����
 *   - form: form �̸�
 *   - name: �μ����� �Էµ� �ʵ��
 *   - type: �μ� �Ǵ� ����� ���� ���� 
 *			('1': �μ� one, '2': �μ� more, '3': ����� one, '4': ����� more, '5': �μ��� ��� more, '6': �μ� �Ǵ� ��� one)
 *   - id: �μ� id�� �Էµ� �ʵ��
 *   - key: K ��
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
 * ��� : ������ ��åâ�� ���� - �μ� one ����
 * �Ķ����
 *   - form: form �̸�
 *   - name: �μ����� �Էµ� �ʵ��
 *   - id: �μ� id�� �Էµ� �ʵ��
 *   - key: K ��
 */
function OrgViewDeptOne(form, name, id,  key){
	OrgView(form, name, id, '1', key);
}

/* $11-2
 * ��� : ������ ��åâ�� ���� - �μ� more ����
 * �Ķ����
 *   - form: form �̸�
 *   - name: �μ����� �Էµ� �ʵ��
 *   - id: �μ� id�� �Էµ� �ʵ��
 *   - key: K ��
 */
function OrgViewDeptMore(form, name, id,  key){
	OrgView(form, name, id, '2', key);
}

/* $11-3
 * ��� : ������ ��åâ�� ���� - ����� one ����
 * �Ķ����
 *   - form: form �̸�
 *   - name: �μ����� �Էµ� �ʵ��
 *   - id: �μ� id�� �Էµ� �ʵ��
 *   - key: K ��
 */
function OrgViewUserOne(form, name, id,  key){
	OrgView(form, name, id, '3', key);
}

/* $11-4
 * ��� : ������ ��åâ�� ���� - ����� more ����
 * �Ķ����
 *   - form: form �̸�
 *   - name: �μ����� �Էµ� �ʵ��
 *   - id: �μ� id�� �Էµ� �ʵ��
 *   - key: K ��
 */
function OrgViewUserMore(form, name, id,  key){
	OrgView(form, name, id, '4', key);
}

/* $11-5
 * ��� : ������ ��åâ�� ���� - �μ��� ����� more ����
 * �Ķ����
 *   - form: form �̸�
 *   - name: �μ����� �Էµ� �ʵ��
 *   - id: �μ� id�� �Էµ� �ʵ��
 *   - key: K ��
 */
function OrgViewDeptUserMore(form, name, id,  key){
	OrgView(form, name, id, '5', key);
}

/* $11-6
 * ��� : ������ ��åâ�� ���� - �μ� �Ǵ� ��� one ����
 * �Ķ����
 *   - form: form �̸�
 *   - name: �μ����� �Էµ� �ʵ��
 *   - id: �μ� id�� �Էµ� �ʵ��
 *   - key: K ��
 */
function OrgViewDeptUserOne(form, name, id,  key){
	OrgView(form, name, id, '6', key);
}

/* $12
 * ��� : ��������� �󼼺��� �˾�â�� ����.
 * �Ķ����
 *   - szUserID: ����� ID
 *   - key: K ��
 */
function  ShowUserInfo(szUserID, key)
{
    window.open('/servlet/HIServlet?SLET=OrgMenuView&K='+key+'&MET=UD&WIN=1&UID=' + szUserID + '&__RANDOM=' + (new Date()).getTime(), 'UserDetailInfo', 'left=6000,top=2000,width=10,height=10,menubar=no,resizable=yes,scrollbars=yes');
}

/* $13
 * ��� : �μ����� �󼼺��� �˾�â�� ����.
 * �Ķ����
 *   - deptID: �μ� ID
 *   - key: K ��
 */
function ShowDeptInfo(deptID, key)
{
    window.open('/servlet/HIServlet?SLET=OrgMenuView&K='+key+'&MET=DD&WIN=1&DID='+deptID+'&__RANDOM=' + (new Date()).getTime(), 'DeptDetailInfo', 'left=6000,top=2000,width=10,height=10,menubar=no,resizable=yes,scrollbars=yes');
}

/**
* $14
* #DESC		����üũ �ڹٽ�ũ��Ʈ<BR>
*
* @ author     �Ǽ���
*/

/* ��¥ Format �� ��Ȯ�� Check */
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

	 	alert("\n��¥ ���Ŀ� ���� �ʽ��ϴ�.\n ex)"+year+"-"+month+"-"+date+"");
	 	srcField.select();
	 	return false;
	}


	var tmpDate = delHyphen(ddate);

	if (tmpDate.length !=8 ) {

	 	alert("\n��¥ ���Ŀ� ���� �ʽ��ϴ�.\n ex)"+year+"-"+month+"-"+date+"");
	 	srcField.select();
	 	return false;
	}


  	for(i=0;i<len;i++) {
  		if( compNum.indexOf(tmpDate.substring(i,i+1)) < 0) {
		  	alert("\n��¥ ���Ŀ� ���� �ʽ��ϴ�.\n ex)"+year+"-"+month+"-"+date+"");
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
	   		alert("\n��¥�� ���� �ʽ��ϴ�.");
			srcField.focus();
			return false;
        }

 	} else {
	   	alert("\n��¥�� ���� �ʽ��ϴ�.");
		srcField.focus();
		return false;

 	}//if



     return true;

}

/* 
 * $15
 * ��� : ��¥ Format���� "-" ���� �Լ�
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
 * ��� : ���ڷ� �Ѿ�� �γ�¥�� üũ�ؼ� ���� ��¥�� ������ false
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
 * ��� : ���ڿ��� ���̿� ���� ó�� �Լ�
 */
function check_length(comp, str, len)
{
	comp.value = Ltrim(comp.value);
    complen = CheckByte(comp.value);
    if (complen > len)
    {
      alert(str + '��(��) ' + len + '�ڸ� �ʰ��Ҽ� �����ϴ�. ���� ' + complen + '�����Դϴ�.');
	  comp.focus();
	  return false;
	}
	return true;
}

var IEYES = 0;
var menufacture = navigator.appName;
var version = navigator.appVersion;
if((menufacture.indexOf('����ũ�μ���Ʈ') >= 0
    || menufacture.indexOf('Microsoft') >= 0)
    && version.indexOf('4.0') >= 0 )
{
   IEYES = 1;
}

/* $18
 * ��� : ������ ��ü�� ���ڿ��� ���̸� ����ϴ� �Լ�
 */
function CheckByte(str)
{
   var i;
   var strLen;
   var strByte;
   strLen = str.length;
   // IE4.0 �̻�
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
   // Netscape�� ���
   else
   {
      return strLen;
	}
}


/* $19
 * ��� : �Ѿ�� ���ڿ����߿� ���ʿ� ���Ե� ������ ��� ���� ���ڿ��� �����Ѵ�
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
 * ��� : �Ѿ�� ���ڿ����߿� �����ʿ� ���Ե� ������ ��� ���� ���ڿ��� �����Ѵ�
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
 * ��� : �Ѿ�� ���ڿ����� ��� �����ΰ��� Ȯ�� true:��μ���, false:��������
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
 * ��� : ����(null) �Է� ���� check, true: ����, false: ���� �ƴ�
 */
function IsNull(nval) {
	for(var i = 0; i < nval.length; i++){
		tst = nval.substring(i,i+1);
		if((tst != ' ')&&(tst != '\r')&&(tst != '\n')&&(tst != '\t')&&(tst != '\b')&&(tst != '\f'))
			return false;
	}
	return true;
}
//�޷�ȣ��
function OnCalendar(form_name, in_name, selectedYear, selectedMonth, selectedDay)
{

	var x = (screen.width - 260)/2;
	var y = (screen.height - 400)/2;

	window.open("/jsp/Calendar.jsp?YEAR=" + selectedYear + "&MONTH=" + selectedMonth + "&DAY=" + selectedDay +"&form_name="+form_name+"&in_name="+in_name,
				"calendar","width=260, height=270, left=" + x + ", top= " + y + ", resizable=yes,status=yes");
}