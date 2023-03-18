var ctgryList  =  new Array;	// folder list
var cnt = 0;		// folder sequence
var selectFolderImg = "/excess/common/js/tree/IconTreeOn.gif";	// 폴더 이미지(열렸을 경우)
var FolderImg = "/excess/common/js/tree/IconTreeOff.gif";	// 폴더 이미지(닫혔을 경우)
var selectDelFolderImg = "/excess/common/js/tree/IconTreeEOn.gif";	// 삭제부서의 폴더 이미지(열렸을 경우)
var delFolderImg = "/excess/common/js/tree/IconTreeEOff.gif";	// 삭제부서의 폴더 이미지(닫혔을 경우)

var noAcptFolderImg = "/excess/common/js/tree/IconNoAcpt.gif" ;  // 접수
var acptFolderImg = "/excess/common/js/tree/IconAcpt.gif" ;  // 접수
var rjctFolderImg = "/excess/common/js/tree/IconRjct.gif" ;  // 반려
var cpltFolderImg = "/excess/common/js/tree/IconCplt.gif" ;  // 인수
var inspFolderImg = "/excess/common/js/tree/IconInsp.gif" ;  // 검수

var selectNoAcptFolderImg = "/excess/common/js/tree/IconNoAcptOn.gif" ;  // 접수
var selectAcptFolderImg = "/excess/common/js/tree/IconAcptOn.gif" ;  // 접수
var selectRjctFolderImg = "/excess/common/js/tree/IconRjctOn.gif" ;  // 반려
var selectCpltFolderImg = "/excess/common/js/tree/IconCpltOn.gif" ;  // 인수
var selectInspFolderImg = "/excess/common/js/tree/IconInspOn.gif" ;  // 검수
var selectDelFolderImg = "/excess/common/js/tree/IconTreeEOn.gif";	// 삭제부서의 폴더 이미지(열렸을 경우)
var	delFolderImg  = "/excess/common/js/tree/IconTreeEOff.gif";	// 삭제부서의 폴더 이미지(닫혔을 경우)
var	funcFolderImg = "/excess/common/js/tree/IconFunc.gif";// 기능폴더
var	selectFuncFolderImg = "/excess/common/js/tree/IconOn.gif"; // 기능폴더

var	unitFolderImg = "/excess/common/js/tree/IconUnit.gif";// 단위업무
var	selectUnitFolderImg = "/excess/common/js/tree/IconUnitOn.gif"; // 단위업무

var	enrollFolderImg = "/excess/common/js/tree/IconEnroll.gif";// 일정등록
var	selectEnrollFolderImg = "/excess/common/js/tree/IconEnroll.gif"; // 일정등록

var	noEnrollFolderImg = "/excess/common/js/tree/IconNoEnroll.gif";// 일정미등록
var	selectNoEnrollFolderImg = "/excess/common/js/tree/IconNoEnroll.gif"; // 일정미등록

var menuTreeConfig = {
	
	folderIcon      : '/excess/common/js/tree/IconFunc.gif',
	openFolderIcon  : '/excess/common/js/tree/IconOn.gif',
	Icon           : '/excess/common/js/tree/IconTreeIn.gif',
	lIcon           : '/excess/common/js/tree/IconTreeLn.gif',
	lMinusIcon      : '/excess/common/js/tree/IconMinus.gif',
	lPlusIcon       : '/excess/common/js/tree/IconPlus.gif',
	tIcon           : '/excess/common/js/tree/IconTreeAn.gif',
	tMinusIcon      : '/excess/common/js/tree/IconMinus.gif',
	tPlusIcon       : '/excess/common/js/tree/IconPlus.gif',
	blankIcon       : '/excess/common/js/tree/IconTreeD.gif',
	
	defaultText     : 'Tree Item',
	defaultAction   : 'javascript:void(0);',
	defaultValue    : '',
	usePersistence	: false
};

var menuTreeHandler = {
	idCounter : 0,
	idPrefix  : "menu-tree-object-",
	all       : {},
	selected  : null,
	onSelect  : null, /* should be part of tree, not handler */
	getId     : function() { return this.idPrefix + this.idCounter++; },
	toggle    : function (oItem) { this.all[oItem.id.replace('-plus','')].toggle(); },
	select    : function (oItem) { this.all[oItem.id.replace('-icon','')].select(); },
	focus     : function (oItem) { this.all[oItem.id.replace('-anchor','')].focus(); },
	getElementById	: function(Id) { return this.all[Id]; },
	cookies   : new MenuCookie(),
	insertHTMLBeforeEnd	:	function (oElement, sHTML) {
		if (oElement.insertAdjacentHTML != null) {
			oElement.insertAdjacentHTML("BeforeEnd", sHTML)
			return;
		}
		var df;	// DocumentFragment
		var r = oElement.ownerDocument.createRange();
		r.selectNodeContents(oElement);
		r.collapse(false);
		df = r.createContextualFragment(sHTML);
		oElement.appendChild(df);
	}
};

/*
 * MenuCookie class
 */

function MenuCookie() {
	if (document.cookie.length) { this.cookies = ' ' + document.cookie; }
}

MenuCookie.prototype.setCookie = function (key, value) {
// This cookie saving routine is to save the folder status (folded or expanded).
// However, this routine collide the cookies and so this make the JSESSIONID hide.
// Therefore, this routine must be empty. (Ko, Woon San, 2004/03/30)
}

MenuCookie.prototype.getCookie = function (key) {
	if (this.cookies) {
		var start = this.cookies.indexOf(' ' + key + '=');
		if (start == -1) { return null; }
		var end = this.cookies.indexOf(";", start);
		if (end == -1) { end = this.cookies.length; }
		end -= start;
		var cookie = this.cookies.substr(start,end);
		return unescape(cookie.substr(cookie.indexOf('=') + 1, cookie.length - cookie.indexOf('=') + 1));
	}
	else { return null; }
}

/*
 * MenuTreeAbstractNode class
 */

function MenuTreeAbstractNode(sText, sId, sValue, sAction) {
	this.childNodes  = [];
	this.id     = sId || menuTreeHandler.getId();
	this.text   = sText || menuTreeConfig.defaultText;
	this.action = sAction || menuTreeConfig.defaultAction;
	this._last  = false;
	this.value  = sValue || menuTreeConfig.defaultValue;
	
	menuTreeHandler.all[this.id] = this;
	
	
	
}

/*
 * To speed thing up if you're adding multiple nodes at once (after load)
 * use the bNoIdent parameter to prevent automatic re-indentation and call
 * the obj.ident() method manually once all nodes has been added.
 */

/*
 * 추가 getValues() by mhkim
 */
MenuTreeAbstractNode.prototype.getValues = function () {
	//alert(this.getSelected().value);
	if (this.getSelected())
	{
		return this.getSelected().value;
	}
}

/*
 * 추가 : selfValue by qlink
 */
MenuTreeAbstractNode.prototype.selfValue = function () {
	return this.value;
}

MenuTreeAbstractNode.prototype.getChild = function (index) {
	var retObj		 = null;
	var childNodeCnt = ((this.childNodes) ? this.childNodes.length : 0);	

	if(0 <= index && index < childNodeCnt) {
		retObj = this.childNodes[index];
	}

	return retObj;	
}

MenuTreeAbstractNode.prototype.getChildCount = function () {
	return ((this.childNodes) ? this.childNodes.length : 0);
}

MenuTreeAbstractNode.prototype.add = function (node, bNoIdent) {
	node.parentNode = this;
	this.childNodes[this.childNodes.length] = node;
	var root = this;
	if (this.childNodes.length >= 2) {
		this.childNodes[this.childNodes.length - 2]._last = false;
	}
	while (root.parentNode) { root = root.parentNode; }
	if (root.rendered) {
		if (this.childNodes.length >= 2) {
			document.getElementById(this.childNodes[this.childNodes.length - 2].id + '-plus').src = ((this.childNodes[this.childNodes.length -2].folder)?((this.childNodes[this.childNodes.length -2].open)?menuTreeConfig.tMinusIcon:menuTreeConfig.tPlusIcon):menuTreeConfig.tIcon);
			this.childNodes[this.childNodes.length - 2].plusIcon = menuTreeConfig.tPlusIcon;
			this.childNodes[this.childNodes.length - 2].minusIcon = menuTreeConfig.tMinusIcon;
			this.childNodes[this.childNodes.length - 2]._last = false;
		}
		this._last = true;
		var foo = this;
		while (foo.parentNode) {
			for (var i = 0; i < foo.parentNode.childNodes.length; i++) {
				if (foo.id == foo.parentNode.childNodes[i].id) { break; }
			}
			if (i == foo.parentNode.childNodes.length - 1) { foo.parentNode._last = true; }
			else { foo.parentNode._last = false; }
			foo = foo.parentNode;
		}
		menuTreeHandler.insertHTMLBeforeEnd(document.getElementById(this.id + '-cont'), node.toString());
		if ((!this.folder) && (!this.openIcon)) {
			this.icon = menuTreeConfig.folderIcon;
			this.openIcon = menuTreeConfig.openFolderIcon;
		}
		if (!this.folder) { this.folder = true; this.collapse(true); }
		if (!bNoIdent) { this.indent(); }
	}

	return node;
}

MenuTreeAbstractNode.prototype.toggle = function() {
	if (this.folder) {
		if (this.open) { this.collapse(); }
		else { this.expand(); }
}	}

MenuTreeAbstractNode.prototype.select = function() {

	document.getElementById(this.id + '-anchor').focus();
}

MenuTreeAbstractNode.prototype.deSelect = function() {
	if (this.openIcon) { document.getElementById(this.id + '-icon').src = this.icon; }
//	document.getElementById(this.id + '-anchor').className = '';
	menuTreeHandler.selected = null;
}

MenuTreeAbstractNode.prototype.focus = function() {
	
	
	
	for(i=0; i < ctgryList.length; i++)
	{
		document.getElementById(ctgryList[i].id + '-icon').src = ctgryList[i].icon;
	}
	
	if ((menuTreeHandler.selected) && (menuTreeHandler.selected != this)) { menuTreeHandler.selected.deSelect(); }
	menuTreeHandler.selected = this;
	document.getElementById(this.id + '-icon').src = this.openIcon;
	if (menuTreeHandler.onSelect) { menuTreeHandler.onSelect(this); }
}
MenuTreeAbstractNode.prototype.doExpand = function() {
	if (this.childNodes.length) {  document.getElementById(this.id + '-cont').style.display = 'block'; }
	this.open = true;
	if (menuTreeConfig.usePersistence)
		menuTreeHandler.cookies.setCookie(this.id.substr(18,this.id.length - 18), '1');
}

MenuTreeAbstractNode.prototype.doCollapse = function() {
	if (this.childNodes.length) { document.getElementById(this.id + '-cont').style.display = 'none'; }
	this.open = false;
	if (menuTreeConfig.usePersistence)
		menuTreeHandler.cookies.setCookie(this.id.substr(18,this.id.length - 18), '0');
}

MenuTreeAbstractNode.prototype.expandAll = function() {
	this.expandChildren();
	if ((this.folder) && (!this.open)) { this.expand(); }
}

MenuTreeAbstractNode.prototype.expandChildren = function() {
	for (var i = 0; i < this.childNodes.length; i++) {
		this.childNodes[i].expandAll();
} }

MenuTreeAbstractNode.prototype.collapseAll = function() {
	this.collapseChildren();
	if ((this.folder) && (this.open)) { this.collapse(true); }
}

MenuTreeAbstractNode.prototype.collapseChildren = function() {
	for (var i = 0; i < this.childNodes.length; i++) {
		this.childNodes[i].collapseAll();
} }

MenuTreeAbstractNode.prototype.indent = function(lvl, del, last, level, nodesLeft) {
	/*
	 * Since we only want to modify items one level below ourself,
	 * and since the rightmost indentation position is occupied by
	 * the plus icon we set this to -2
	 */
	if (lvl == null) { lvl = -2; }
	var state = 0;
	for (var i = this.childNodes.length - 1; i >= 0 ; i--) {
		state = this.childNodes[i].indent(lvl + 1, del, last, level);
		if (state) { return; }
	}
	if (del) {
		if ((level >= this._level) && (document.getElementById(this.id + '-plus'))) {
			if (this.folder) {
				document.getElementById(this.id + '-plus').src = (this.open)?menuTreeConfig.lMinusIcon:menuTreeConfig.lPlusIcon;
				this.plusIcon = menuTreeConfig.lPlusIcon;
				this.minusIcon = menuTreeConfig.lMinusIcon;
			}
			else if (nodesLeft) { document.getElementById(this.id + '-plus').src = menuTreeConfig.lIcon; }
			return 1;
	}	}
	var foo = document.getElementById(this.id + '-indent-' + lvl);
	if (foo) {
		if ((foo._last) || ((del) && (last))) { foo.src =  menuTreeConfig.blankIcon; }
		else { foo.src =  menuTreeConfig.Icon; }
	}
	return 0;
}

/*
 * MenuTree class
 */

function MenuTree(sText, sValue, sAction, sIcon, sOpenIcon) {
	this.base = MenuTreeAbstractNode;
	this.base(sText, sValue, sAction);
	this.icon      = sIcon || menuTreeConfig.folderIcon;
	this.openIcon  = sOpenIcon || menuTreeConfig.openFolderIcon;

	/* Defaults to open */
	if (menuTreeConfig.usePersistence)
		this.open  = (menuTreeHandler.cookies.getCookie(this.id.substr(18,this.id.length - 18)) == '0')?false:true;
	else
		this.open  = true;
	this.folder    = true;
	this.rendered  = false;
	this.onSelect  = null;
	
}

MenuTree.prototype = new MenuTreeAbstractNode;

MenuTree.prototype.getSelected = function() {
	if (menuTreeHandler.selected) { return menuTreeHandler.selected; }
	else { return null; }
}

MenuTree.prototype.getElementById = function(i) {
	return menuTreeHandler.getElementById(i);
}

MenuTree.prototype.getElementByName = function(n) {
	for (var i = 0; i < this.childNodes.length; i++) {
		if (this.childNodes[i].text == n)
			return this.childNodes[i];
	}
	return null;
}

MenuTree.prototype.remove = function() { }

MenuTree.prototype.expand = function() {
	this.doExpand();
}

MenuTree.prototype.collapse = function(b) {
	this.doCollapse();
}

MenuTree.prototype.getFirst = function() {
	return null;
}

MenuTree.prototype.getLast = function() {
	return null;
}

MenuTree.prototype.getNextSibling = function() {
	return null;
}

MenuTree.prototype.getPreviousSibling = function() {
	return null;
}

MenuTree.prototype.toString = function() {
	var str = "<div id=\"" + this.id + "\" class=\"menu-tree-item\" ></div>";
	str += "<div id=\"" + this.id + "-cont\"  class=\"menu-tree-container\" style=\"display: " + ((this.open)?'block':'none') + ";\">";
	for (var i = 0; i < this.childNodes.length; i++) {
		str += this.childNodes[i].toString(i, this.childNodes.length);
	}
	str += "</div>";
	this.rendered = true;
	return str;
};

/*
 * MenuTreeItem class
 sText 
 sId
 sValue
 sAction
 blink
 check
 endFl
 docDeptFl 
 codeCl
 sIcon
 sOpenIcon
 eParent

 */

/*
    2004.6.10
    onClickScript 추가 - 이용회
    checkbox를 클릭했을때 이벤트를 일으킨다.
*/
function MenuTreeItem(sText, sId, sValue, sAction, blink, check,  funcCl, codeCl, onClickScript, tipCl, tipValue, eParent, onMouseMove) {
	this.base = MenuTreeAbstractNode;
	this.base(sText, sId, sValue, sAction);
	/* Defaults to close */
	if (menuTreeConfig.usePersistence)
		this.open = (menuTreeHandler.cookies.getCookie(this.id.substr(18,this.id.length - 18)) == '1')?true:false;
	else
		this.open = false;
	if (eParent) { eParent.add(this); }

	if (onMouseMove!=null) { this.onMouseMove=onMouseMove; }
	else this.onMouseMove=false;

	// label text is linked?
	if (blink) { this.blink = blink; } else { this.blink = false; }
	if (check) { this.check = check; } else { this.check = false; }
	if (sValue) { this.sValue = sValue; }
	if (codeCl) { this.codeCl = codeCl; }
	if (tipCl) { this.tipCl = tipCl; }
	if (tipValue) { this.tipValue = tipValue; }

	this.onClickScript=(onClickScript==null) ? '' : onClickScript;
	
	if(funcCl == '0') 
	{
		if( codeCl == '2')
		{
			this.icon      = acptFolderImg;
			this.openIcon  = selectAcptFolderImg;
		}
		else if( codeCl == '4')
		{
			this.icon      = inspFolderImg;
			this.openIcon  = selectInspFolderImg;
		}
		else if( codeCl == '5')
		{
			this.icon      = rjctFolderImg;
			this.openIcon  = selectRjctFolderImg;
		}
		else if( codeCl == '6')
		{
			this.icon      = cpltFolderImg;
			this.openIcon  = selectCpltFolderImg;
		}
		else if(codeCl   == '9') // 일정미등록
		{
			this.icon      = noEnrollFolderImg;
			this.openIcon  = selectNoEnrollFolderImg;
		}
		else if(codeCl   == '10') // 일정등록
		{
			this.icon       = enrollFolderImg;
			this.openIcon  = selectEnrollFolderImg;
		}
		else
		{
			this.icon      = noAcptFolderImg;
			this.openIcon  = selectNoAcptFolderImg;
		}
	}
	else if(funcCl == '1') 
	{
		this.icon      = noAcptFolderImg;
		this.openIcon  = selectNoAcptFolderImg;
	}
	else if(funcCl == '2') 
	{
		this.icon      = unitFolderImg;
		this.openIcon  = selectUnitFolderImg;
	}
	else if(funcCl == '3')
	{
		this.icon      = funcFolderImg;
		this.openIcon  = selectFuncFolderImg;
	}
	
	
	ctgryList[cnt] = this;
	cnt++;
	
}

MenuTreeItem.prototype = new MenuTreeAbstractNode;

MenuTreeItem.prototype.remove = function() {
	var iconSrc = document.getElementById(this.id + '-plus').src;
	var parentNode = this.parentNode;
	var prevSibling = this.getPreviousSibling(true);
	var nextSibling = this.getNextSibling(true);
	var folder = this.parentNode.folder;
	var last = ((nextSibling) && (nextSibling.parentNode) && (nextSibling.parentNode.id == parentNode.id))?false:true;
	this.getPreviousSibling().focus();
	this._remove();
	if (parentNode.childNodes.length == 0) {
		document.getElementById(parentNode.id + '-cont').style.display = 'none';
		parentNode.doCollapse();
		parentNode.folder = false;
		parentNode.open = false;
	}
	if (!nextSibling || last) { parentNode.indent(null, true, last, this._level, parentNode.childNodes.length); }
	if ((prevSibling == parentNode) && !(parentNode.childNodes.length)) {
		prevSibling.folder = false;
		prevSibling.open = false;
		iconSrc = document.getElementById(prevSibling.id + '-plus').src;
		iconSrc = iconSrc.replace('minus', '').replace('plus', '');
		document.getElementById(prevSibling.id + '-plus').src = iconSrc;
		document.getElementById(prevSibling.id + '-icon').src = menuTreeConfig.folderIcon;
	}
	if (document.getElementById(prevSibling.id + '-plus')) {
		if (parentNode == prevSibling.parentNode) {
			iconSrc = iconSrc.replace('minus', '').replace('plus', '');
			document.getElementById(prevSibling.id + '-plus').src = iconSrc;
}	}	}

MenuTreeItem.prototype._remove = function() {
	for (var i = this.childNodes.length - 1; i >= 0; i--) {
		this.childNodes[i]._remove();
 	}
	for (var i = 0; i < this.parentNode.childNodes.length; i++) {
		if (this == this.parentNode.childNodes[i]) {
			for (var j = i; j < this.parentNode.childNodes.length; j++) {
				this.parentNode.childNodes[j] = this.parentNode.childNodes[j+1];
			}
			this.parentNode.childNodes.length -= 1;
			if (i + 1 == this.parentNode.childNodes.length) { this.parentNode._last = true; }
			break;
	}	}
	menuTreeHandler.all[this.id] = null;
	var tmp = document.getElementById(this.id);
	if (tmp) { tmp.parentNode.removeChild(tmp); }
	tmp = document.getElementById(this.id + '-cont');
	if (tmp) { tmp.parentNode.removeChild(tmp); }
}

MenuTreeItem.prototype.expand = function() {
	this.doExpand();
	document.getElementById(this.id + '-plus').src = this.minusIcon;
}

MenuTreeItem.prototype.collapse = function(b) {
	this.doCollapse();
	document.getElementById(this.id + '-plus').src = this.plusIcon;
}

MenuTreeItem.prototype.getFirst = function() {
	return this.childNodes[0];
}

MenuTreeItem.prototype.getLast = function() {
	if (this.childNodes[this.childNodes.length - 1].open) { return this.childNodes[this.childNodes.length - 1].getLast(); }
	else { return this.childNodes[this.childNodes.length - 1]; }
}

MenuTreeItem.prototype.getNextSibling = function() {
	for (var i = 0; i < this.parentNode.childNodes.length; i++) {
		if (this == this.parentNode.childNodes[i]) { break; }
	}
	if (++i == this.parentNode.childNodes.length) { return this.parentNode.getNextSibling(); }
	else { return this.parentNode.childNodes[i]; }
}

MenuTreeItem.prototype.getPreviousSibling = function(b) {
	for (var i = 0; i < this.parentNode.childNodes.length; i++) {
		if (this == this.parentNode.childNodes[i]) { break; }
	}
	if (i == 0) { return this.parentNode; }
	else {
		if ((this.parentNode.childNodes[--i].open) || (b && this.parentNode.childNodes[i].folder)) { return this.parentNode.childNodes[i].getLast(); }
		else { return this.parentNode.childNodes[i]; }
} }

MenuTreeItem.prototype.toString = function (nItem, nItemCount) {
	var foo = this.parentNode;
	var indent = '';
	if (nItem + 1 == nItemCount) { this.parentNode._last = true; }
	var i = 0;
	while (foo.parentNode) {
		foo = foo.parentNode;
		indent = "<img id=\"" + this.id + "-indent-" + i + "\" src=\"" + ((foo._last || !foo.parentNode)?menuTreeConfig.blankIcon:menuTreeConfig.Icon) + "\">" + indent;
		i++;
	}
	// 트리 모양을위해 다시 셋팅
	foo = this.parentNode;
	//
	this._level = i;
	if (this.childNodes.length) { this.folder = 1; }
	else { this.open = false; }
	if (!this.icon) { this.icon = menuTreeConfig.folderIcon; }
	if (!this.openIcon) { this.openIcon = menuTreeConfig.openFolderIcon; }
	
	var label = this.text.replace(/</g, '&lt;').replace(/>/g, '&gt;');
	var isDisable = '' ;
	var str = "<div id=\"" + this.id + "\" class=\"menu-tree-item\" >";
	str += indent;
	str += "<img id=\"" + this.id + "-plus\" src=\"" + ((this.folder)?((this.open)?((this.parentNode._last)?menuTreeConfig.lMinusIcon:menuTreeConfig.tMinusIcon):((this.parentNode._last)?menuTreeConfig.lPlusIcon:menuTreeConfig.tPlusIcon)):((!foo.parentNode)?menuTreeConfig.blankIcon:((this.parentNode._last)?menuTreeConfig.lIcon:menuTreeConfig.tIcon))) + "\" onclick=\"menuTreeHandler.toggle(this);\">";
	str += (this.folder)? "&nbsp;" : "";
	// label text is linked set?
	
	str += "<img id=\"" + this.id + "-icon\"  src=\"" + this.icon + "\"  class=\"menu-tree-icon\" >";
	
	if(this.codeCl == '9' || this.codeCl == '10') isDisable = 'disabled';
	onClick='';
	if(this.onClickScript != '')
	    onClick=' onclick="'+this.onClickScript+'"';
	if(this.check == true)
		str +="<input type='text' id='"+this.id+"' name=\"szDeptCode\""+this.onClickScript.substring(0,8)+"  style='vertical-align:middle;height:16px' "+isDisable+onClick+">"; // 체크박스가 들어간 팝업창 카테고리 명
        str +="<input type='hidden' id='"+this.id+"' name=\"szHiddenDeptInfo\"  value=\""+this.onClickScript+"\"  style='vertical-align:middle;height:16px' "+isDisable+onClick+">"; // 체크박스가 들어간 팝업창 카테고리 명
    var tipText = '';
	if(this.tipCl == true) tipText = "onmouseover=\"ViewToolTip('"+this.tipValue+"', window.event, 1);\" onmouseMove=\"moveToolTip(window.event);\" onmouseout=\"hideToolTip();\"";
	if(this.onMouseMove) tipText = "onmousemove=\""+this.onMouseMove+"\"";
	if(this.blink == true)
	//str += "<a class=\"menu-tree-icon\"  href=\"" + this.action + "\" id=\"" + this.id + "-anchor\" onclick=\"menuTreeHandler.focus(this);\"   onfocus=\"blur();\">&nbsp;"+  label + "</a></div>";
	str += "<a class=\"menu-tree-icon\"  href=\"javascript:onClickItem('"+this.id+"','"+this.openIcon+"','"+this.action+"','"+this.sValue+"');\" id=\"" + this.id + "-anchor\"  "+tipText+"  onfocus=\"blur();\">&nbsp;"+  label + "</a></div>";
	//str += "<a class=\"menu-tree-icon\"  href=\"javascript:onClickCategory("+this.all[this.id]+");\" id=\"" + this.id + "-anchor\"    onfocus=\"blur();\">&nbsp;"+  label + "</a></div>";

	else
		str +="&nbsp;"+ label + "</div>";
	
	str += "<div id=\"" + this.id + "-cont\"  class=\"menu-tree-container\" style=\"display: " + ((this.open)?'block':'none') + ";\">";
	for (var i = 0; i < this.childNodes.length; i++) {
		str += this.childNodes[i].toString(i,this.childNodes.length);
	}
	str += "</div>";
	this.plusIcon = ((this.parentNode._last)?menuTreeConfig.lPlusIcon:menuTreeConfig.tPlusIcon);
	this.minusIcon = ((this.parentNode._last)?menuTreeConfig.lMinusIcon:menuTreeConfig.tMinusIcon);
	return str;
}

function initOpenIconImg()
{
	document.write("<div style=\"display:none;\">");
	document.write("<img src='" + menuTreeConfig.openFolderIcon + "'>");
	document.write("</div>");
}

function onClickItem(id, openIcon, action, value)
{
	this.id = id ;
	this.action = action ;
	this.value = value ;
	this.openIcon = openIcon ;
	
	for(i=0; i < ctgryList.length; i++)
	{
		document.getElementById(ctgryList[i].id + '-icon').src = ctgryList[i].icon;
	}
	//if ((menuTreeHandler.selected) && (menuTreeHandler.selected != this)) { menuTreeHandler.selected.deSelect(); }
	
	menuTreeHandler.selected = this;
	document.getElementById(this.id + '-icon').src = this.openIcon;
	//if (menuTreeHandler.onSelect) { menuTreeHandler.onSelect(this); }
	//this.action.replace("\'" ,'');
	linkTo();
		
}

// 트리 노드 선택시, 노드 이미지 변경용 스크립트
var PreviousNode = "";
var PreviousNodeImage = "";
function setSelectedImage(target, funcCl, codeCl)
{
	var targetImage  = '';
	var selectedImag = '';
	
	if(funcCl == '0') 
	{
		if( codeCl == '2')
		{
			targetImage      = acptFolderImg;
			selectedImag  = selectAcptFolderImg;
		}
		else if( codeCl == '4')
		{
			targetImage      = inspFolderImg;
			selectedImag  = selectInspFolderImg;
		}
		else if( codeCl == '5')
		{
			targetImage      = rjctFolderImg;
			selectedImag  = selectRjctFolderImg;
		}
		else if( codeCl == '6')
		{
			targetImage      = cpltFolderImg;
			selectedImag  = selectCpltFolderImg;
		}
		else if(codeCl   == '9') // 일정미등록
		{
			targetImage      = noEnrollFolderImg;
			selectedImag  = selectNoEnrollFolderImg;
		}
		else if(codeCl   == '10') // 일정등록
		{
			targetImage      = enrollFolderImg;
			selectedImag  = selectEnrollFolderImg;
		}
		else
		{
			targetImage      = noAcptFolderImg;
			selectedImag  = selectNoAcptFolderImg;
		}
	}
	else if(funcCl == '1') 
	{
		targetImage      = folderIcon;
		selectedImag  = openFolderIcon;
	}
	else if(funcCl == '2') 
	{
		targetImage      = unitFolderImg;
		selectedImag  = selectUnitFolderImg;
	}
	else if(funcCl == '3')
	{
		targetImage      = funcFolderImg;
		selectedImag  = selectFuncFolderImg;
	}
	
	target = target + '-icon';
	var CI = document.getElementById(target);	
	if (!CI) return;
	CI.src = selectedImag;
	if ( PreviousNode.length > 0 && PreviousNode != target )
	{
		if ( document.getElementById(PreviousNode) )
		{
			var PI = document.getElementById(PreviousNode);
			PI.src = PreviousNodeImage;
		}
	}
	PreviousNode = target;
	PreviousNodeImage = targetImage;
}


