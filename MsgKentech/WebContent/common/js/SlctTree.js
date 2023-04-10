ns4 = (document.layers) ? true : false;
ie4 = (document.all) ? true : false;

var offsetx = 20;
var offsety = 0;
var x = -5;
var y =  0;

var idNm = "";	// 하위카테고리를 가져올때 사용하는 카테고리 id 이름

var folder = 0;			// 폴더
var folderStyle = 0;	// 폴더(DIV) Style
var desc = "";			// 하부 카테고리(폴더) 목록

var openNodeImg = "/ams/img/IconMinus.gif";		// 하위 노드가 열렸을 경우 이미지
var closeNodeImg = "/ams/img/IconPlus.gif";		// 하위 노드를 닫았을 경우 이미지

var selectFolderImg = "/ams/img/IconTreeOn.gif";	// 폴더 이미지(열렸을 경우)
var FolderImg = "/ams/img/IconTreeOff.gif";	// 폴더 이미지(닫혔을 경우)
var selectDelFolderImg = "/ams/img/IconTreeEOn.gif";	// 삭제부서의 폴더 이미지(열렸을 경우)
var delFolderImg = "/ams/img/IconTreeEOff.gif";	// 삭제부서의 폴더 이미지(닫혔을 경우)

var cnt = 0;		// folder sequence
var ctgryList = new Array;	// folder list
var frm = "";
var checkBoxCl = "";


/**************************************************************
 * 권일(2002/4/12) 변경한 부분
 *************************************************************/

// 하위 카테고리를 가져올때 사용하는 폼 이름과 URL (서로 배타적으로 사용해야함. url이 우선한다.)

var __url    = "";                // 하위 카테고리를 가져 오는 URL (URL 값이 없으면 아래의 폼을 사용한다.)
var __target = "hiddenFrame";     // target이 되는 hidden frame명 (값이 없으면 현재 프레임에)

// Ex) URL로 읽기
//  __url    = "<%=Controller%>?SLET=com.hs.kms.personal.kmap.KMapTreeCmd&EIPJSP=/kms/personal/kmap/Hidden.jsp&K=<%=szKey%>";
//  __target = "top.hidden";  혹은  __target = "document.iframeHidden";

var __form   = "";                // 하위 카테고리를 가져 오는 폼 (default는 첫번째 폼 -> OnClickNode를 참조)
var __action = "";                // form의 action (값이 없으면 현재 지정된 값을 변경하지 않음)

// Ex) 폼으로 읽기
//  __form   = document.form1;    // SLET, EIPJSP, K 등 필요한 값들은 미리 폼에 셋팅해야함
//  __action = "<%=Controller%>"; // 폼을 다른 프로그램과 공용으로 쓸 경우 action과 target을
//  __target = "hiddenFrame";     // 동적으로 변경해야할 필요가 있으므로

/**************************************************************/


function Folder(id, parentId, name, url, childCnt, endFl)
{
	this.id = id;
	this.parentId = parentId;			// 부모 ID
	this.name = name;	// 카테고리명
	this.url = url;

	this.loadFlag = false;	// 이미 로딩됐는지 아닌지의 상태를 가지는 Flag

	if(endFl == "0")
	{
		this.selectIconImg = selectFolderImg;	// 카테고리(폴더) 이미지
		this.IconImg = FolderImg;	// 카테고리(폴더) 이미지
	}
	else
	{
		this.selectIconImg = selectDelFolderImg;	// 카테고리(폴더) 이미지
		this.IconImg = delFolderImg;	// 카테고리(폴더) 이미지
	}

	this.childCnt = childCnt;
}


/*
* 트리의 최상위 폴더를 생성한다.
* 생성시 사용자 K값을 넘겨서 폴더클릭 이벤트시 사용한다.
*/
function createMainFolder(name, idNm)
{
	this.frm = document.forms[0];
	this.checkBoxCl = frm.CHECKCL.value;  // checkbox표시구분. 0:표시안함, 1:1개선택, 2:멀티선택
	this.idNm = idNm

	mainFolder = "<div id=\"overDiv\" style=\"display:block\" border=0>"
		+ "<table border=\"0\" cellspacing=\"0\" cellpadding=\"0\" style='display:none' >"
		+ "<tr><td class=\"Tree\">&nbsp;"
		+ "<a href=\"javascript:OnClickNode('C000000000')\">"
		+ "<img id=\"nodeIconC0\" src=\""+ openNodeImg + "\" border=\"0\"></a> "
		+ "<img id=\"folderIconC0\" src=\""+ selectFolderImg +"\" border=\"0\">&nbsp;"+name
		+ "</td></tr></table></div>"
		+ "<div id=\"C000000000\" style=\"position:relative; display:none\"></div>";

	document.write(mainFolder);
}

/*
* '+', '-' 노드아이콘 클릭 함수
*/
function OnClickNode(div1, idNm)
{
	eval("var div = "+stringReplace(div1,"^","_")+";");

	var clickNode = div.style;
	var nodeImg = "";
	var folderImg = "";

	if(div.id != "C000000000")	// 최상위 카테고리가 아닐때
	{
		var folderInfo;

		// 노드 클릭시 해당하는 카테고리 id에 해당하는 이미지를 가져온다.
		for(i=0; i < ctgryList.length; i++)
		{
			if(div1 == ctgryList[i].id)
			{
				folderInfo = ctgryList[i];
			}
		}

		if(clickNode.display == "block")
		{
			// 노드가 이미 열려있을 경우 display를 block으로 변경해서 닫고
			// 클릭한 id에 해당하는 노드 이미지를 '+'로 변경한다..
			hideCategory(clickNode);

			nodeImg = closeNodeImg;
		}
		else
		{
			/*
			 * 노드가 닫혀있을 경우 DB에서 클릭한 노드의 하위 카테고리들을 가져와서 추가후
			 * 노드 이미지를 '-'로 변경한다.
			 * 한번 로딩한 하위 카테고리는 다시 로딩하지 않는다.
			*/
			if(!folderInfo.loadFlag)
			{

                folderInfo.loadFlag = true;
                // URL을 통해서 하위 카테고리를 읽는다.
				if(__url != "")
                {
                    var target = (__target == "") ? document : eval(__target);
                    target.location.href = __url + "&ctgryId=" + div1.substr(1);

                // URL값이 없을 경우 폼을 통해서 하위 카테고리를 읽는다.
                } else {

                    document.getElementById(idNm).value = div1.substr(1);	// 현재 클릭한 카테고리 ID

                    var form = __form ? __form : document.forms[0];
                    if(__action != "") form.action = __action;
                    if(__target != "") form.target = __target;

                    form.submit();

                }
			}

			showCategory(clickNode);

			nodeImg = openNodeImg;
//			folderImg = folderInfo.selectIconImg;
		}
	}
	else	// 최 상위 카테고리(제목)
	{
		if(clickNode.display == "block")
		{
			hideCategory(clickNode);

			nodeImg = closeNodeImg;
		}
		else
		{
			showCategory(clickNode);

			nodeImg = openNodeImg;
		}
	}

	document.getElementById("nodeIcon" + div.id).src = nodeImg;
}

/*
*	폴더 클릭함수 (url호출)
*/
function onClickCategory(url, divId, endFl)
{
	parent.parent.WorkingArea.LeftTopMenu.document.location.href = url;	
	parent.parent.WorkingArea.RightMenu.document.location.href = "about:blank";	

	for(i=0; i < ctgryList.length; i++)
	{
		document.getElementById("folderIcon" + ctgryList[i].id).src = ctgryList[i].IconImg;
	}
	if(endFl == "0") // 현존부서
	{
		document.getElementById("folderIcon" + divId).src = selectFolderImg;
	}
	else
	{
		document.getElementById("folderIcon" + divId).src = selectDelFolderImg;
	}
}

/*
* @ id : 카테고리(폴더) id
* @ parentId : 카테고리(폴더) 부모 id
* @ ctgryNm : 카테고리(폴더) 명
* @ url : 카테고리(폴더) 링크 정보
* @ openStat : 카테고리(폴더) 열고 닫기 상태(0, 1)
*/
function addCategory(id, parentId, ctgryNm, ctgryValue, checkYn, url, openStat, childCnt, seq, level, endFl, docDeptFl)
{

	var divId = stringReplace(id, "^", "_");
	var divParId = stringReplace(parentId, "^", "_");

    if(divParId > 0 && !isCategoryExist(divParId)) return;

	var nodeImg = "";	// 폴더 이미지 상태( 열렸는지 닫혔는지)
	var folderImg = "";	// 폴더 이미지 상태( 열렸는지 닫혔는지)

	// 노드 클릭시 해당 카테고리(폴더)의 정보를 사용하기 위해서
	// 추가하는 카테고리마다 폴더를 생성해서 배열로 보관한다.
	var category = new Folder(id, parentId, ctgryNm, url, childCnt, endFl);

	// 폴더 상태에 따라 이미지를 변경해서 보여준다.
	if(openStat == 1)
	{
		category.loadFlag = true;

		nodeImg = openNodeImg;
		if(endFl == "0") // 현존부서
		{
			folderImg = FolderImg;
		}
		else // 폐지부서
		{
			folderImg = delFolderImg;
		}
	}
	else
	{
		nodeImg = closeNodeImg;
		if(endFl == "0") // 현존부서
		{
			folderImg = FolderImg;
		}
		else // 폐지부서
		{
			folderImg = delFolderImg;
		}
	}

	ctgryList[cnt] = category;
	cnt++;

	desc += " <table border=0 cellpadding=0 cellspacing=0><tr><td class=\"Tree\" nowrap>";

	if(level > 1)
		desc += " <img src='/ams/img/IconTreeD.gif' style='vertical-align:middle'>";


	desc1 = "";
	parObj= getCategory(parentId);
	for(var i=2;i<level;i++)
	{
		sparObj = getCategory(parObj.parentId);
		if(sparObj.childCnt != parObj.seq)
		{
			desc1 = " <img src='/ams/img/IconTreeIn.gif' style='vertical-align:middle'>" + desc1;
		}
		else
		{
			desc1 = " <img src='/ams/img/IconTreeD.gif' style='vertical-align:middle'>" + desc1;
		}
		parObj = sparObj
	}
	desc += desc1;

	if(childCnt != "0")	
	{
		desc += " <a href=\"javascript:OnClickNode('"+id+"', '"+ this.idNm +"')\"><img id=nodeIcon"+divId+" src=\""+ nodeImg +"\" border=\"0\" style='vertical-align:middle'></a>";
	}
	else
	{
		if(level > 1)
		{
			if(seq != getCategory(parentId).childCnt)
			{
				desc += " <img src='/ams/img/IconTreeAn.gif' border='0' style='vertical-align:middle'>";
			}
			else
			{
				desc += " <img src='/ams/img/IconTreeLn.gif' border='0' style='vertical-align:middle'>";
			}
		}
	}


	var checkFlag = "";	// 체크여부 값

	if(checkYn == "Y")
	{
		checkFlag = "checked=\'true\'";
	}
	// SLET이나 EIPJSP를 지정하지 않는 경우 폴더 링크를 생성하지 않는다.
	if(url != "")
	{
   		desc += " <a href=\"javascript:onClickCategory('"+url+"','"+divId+"', '"+endFl+"')\"><img id=folderIcon"+ divId +" src=\""+ folderImg +"\" border=\"0\" style='vertical-align:middle'> "+ ctgryNm +"("+id.substr(1)+")</a>";
	}
	else
	{
		desc += " <img id=folderIcon"+ divId +" src=\""+ folderImg +"\" border=\"0\" style='vertical-align:middle'> ";


		if(checkBoxCl == "0")
		{
			desc += ctgryNm;
		}
		else
		{
			var checkboxCtgryNm = "";
			if(docDeptFl == "Y")
			{
				checkboxCtgryNm = "<input type='checkbox' id='"+id.substr(1)+"' name='category' "+checkFlag+ " value=\""+ctgryValue+"\" onClick=\"javascript:toggleCheck(this)\" style='vertical-align:middle;height:16px'>" + ctgryNm +"("+id.substr(1)+")"; // 체크박스가 들어간 팝업창 카테고리 명
			}
			else
			{
				checkboxCtgryNm = ctgryNm +"("+id.substr(1)+")";
			}
			desc += checkboxCtgryNm;
		}
	}

	desc += " </td></tr></table>"
		+ "<div id=\""+divId+"\" style=\"position:relative; display:"+isOpen(openStat)+"\"></div>"
		+ "<table></table>"
		+ "<div id=\"\" style=\"position:relative; display:none\"></div>";
			// div밑에 다시 <table>에 <div>를 추가한 이유는 하위 카테고리에서 자식이 없을경우 빈공백을 없애기 위해서 붙임
}

/*
* status(0, 1)에 따른 div visibility stat(show, hide)를 반환한다.
* 0 : 닫힘, 1: 열림
*/
function isOpen(status)
{
	var stat = "";

	if (ns4)
	{
		if(status == 0)
			stat = "hide";
		else
			stat = "show";
	}
	else if (ie4)
	{
		if(status == 0)
			stat = "none";
		else
			stat = "block";
	}
	return stat;
}

function setup(div)
{
	init(div, desc);
}

function init(div, child)
{
	folder = div;

	if ( (ns4) || (ie4) )
	{
		if (ns4) folderStyle = document.div;
		if (ie4) folderStyle = div.style;
	}

	desc = "";	// 등록한 하위 카테고리 초기화

	display(child);
}

function display(child)
{
//	moveTo(folderStyle, x + offsetx, y + offsety);
	layerWrite(child);
	showCategory(folderStyle);
}

/*
* obj에 해당하는 카테고리를 펼쳐서 보여준다.
*/
function showCategory(obj)
{
	if (ns4)
	{
		obj.visibility = "show"
	}
	else if (ie4)
	{
		obj.display = "block"
	}
}

/*
* obj에 해당하는 카테고리를 숨긴다
*/
function hideCategory(obj)
{
	if (ns4)
	{
		obj.visibility = "hide";
	}
	else if (ie4)
	{
		obj.display = "none";
	}
}

/*
* 추가할려는 자식 카테고리들을 부모보다 이동해서 표현한다.
*/
function moveTo(obj, xPos, yPos)
{
	obj.left = xPos;
	obj.top = yPos;
}

/*
* addCategory()에서 생성한 하위카테고리를 부모 밑에 innerHTML로 삽입한다.
* @child 자식카테고리
*/
function layerWrite(child)
{
	if (ns4)
	{
		var layer = document.folder.document;
		layer.open("text/html");
		layer.write(child);
		layer.close();
	}
	else if (ie4)
	{
		document.all[folder.id].innerHTML = child;
	}
}


/*
* 파라미터로 넘어온 id에 해당하는 상위 카테고리명을 반환한다.
*/
function getCategory(categoryId)
{
	var categoryObject;

	for(i=0; i < ctgryList.length; i++)
	{
		if(ctgryList[i].id.substr(1) == categoryId)
		{
			categoryObject = ctgryList[i];
		}
	}

	return categoryObject;
}

function isCategoryExist(categoryId)
{
    for(var i = 0; i < ctgryList.length; i++)
		if(stringReplace(ctgryList[i].id.substr(1),"^","_") == categoryId)
            return true;
    return false;
}

/*
* 단일선택일 경우 기존에 선택된 카테고리를 삭제한다.
*/
function toggleCheck(checkBoxObj)
{
	if(checkBoxObj.checked == true && checkBoxCl == "1")
	{
		for(i=0; i < frm.elements.length; i++)
		{
			checkedObject = frm.elements[i];

			if(checkedObject != checkBoxObj)
			{
				checkedObject.checked = false;
			}
		}		
	}
}