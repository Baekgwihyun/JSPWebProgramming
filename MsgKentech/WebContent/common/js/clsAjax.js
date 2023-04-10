/////////////////////////////
///// 2009-02-24 김성계 /////
///// psychout@nate.com /////
///// clsAjax.js       /////
/////////////////////////////
var userList=null;

function clsAjax(){}
clsAjax.prototype =
{
	xmlHttp : null,
	xmlDom  : null,
	nodeRoot : null,
	nodeText : null,
	method : "POST",
	param : null,
	async : true,
	xslPath : "",
	url : "/At/",
	proc : "",
	callback : function(){},
	init : function ()
	{
		this.xmlHttp  = this.createXMLHttpRequest();
	},

	createXMLHttpRequest : function ()
	{
		var xmlhttp;

		if (window.XMLHttpRequest)
		{
			xmlhttp = new XMLHttpRequest();
		}
		else
		{
			xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
		    
		}
		return xmlhttp;
	},

	openxmlHttp : function ()
	{
		var self = this;
		this.xmlHttp = this.createXMLHttpRequest();
		this.xmlHttp.open(this.method, this.url, this.async);
		this.xmlHttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded; charset=UTF-8");
	    this.xmlHttp.onreadystatechange = function(){self.callback();}
        this.xmlHttp.send(this.param);
        //alert(this.xmlHttp.responseText);
	}

}


// 트리바인딩
clsAjax.prototype.setTree = function() {

    this.setDom();
        if (isIE()) {
            this.xslDom = new ActiveXObject('Microsoft.XMLDOM');
            this.xslDom.async = false;
            this.xslDom.load(this.xslPath);
            
            if (this.nodeRoot.childNodes.length > 0)
            	{
            	this.bindObj.innerHTML = this.xmlDom.transformNode(this.xslDom);
            	}
            else
            	{
					if(this.bindObj.tagName=="DIV"&&this.bindObj.id!="div_srchList")
						this.bindObj.outerHTML = "";
					else
						this.bindObj.innerHTML = "";
				}
        }
        else {
            this.xslDom = document.implementation.createDocument("", "", null);
            this.xslDom.async = false;
            this.xslDom.load(this.xslPath);
            var xsltProcessor = new XSLTProcessor();
            xsltProcessor.importStylesheet(this.xslDom);
            var resultDocument = xsltProcessor.transformToFragment(this.xmlDom, document);
            if (this.nodeRoot.childNodes.length > 0)
            	{
                	this.bindObj.appendChild(resultDocument);
            	}
            else
            	{
					if(this.bindObj.tagName=="DIV"&&this.bindObj.id!="div_srchList")
						this.bindObj.outerHTML = "";
					else
						this.bindObj.innerHTML = "";
				}
        }
}

// 트리 클릭 시 리스트 및 가지 추가
clsAjax.prototype.setList = function()
{
	this.bindPartList();
    userList = this.nodeRoot;
    var sort = new clsSort();
    sort.nodeRoot = userList;
    userList = sort.asc("order");
	bindUserList();
}

clsAjax.prototype.setDom = function()
{
	
		if(isIE())
		{
			this.xmlDom = new ActiveXObject('Microsoft.XMLDOM');
			this.xmlDom.async = true;
			this.xmlDom.loadXML(this.xmlHttp.responseText);
			this.nodeRoot = this.xmlDom.documentElement;
		}
		else
		{
			var domParser = new DOMParser();
			this.xmlDom.async = true;
			this.xmlDom = domParser.parseFromString(this.xmlHttp.responseText,'application/xml');
			this.nodeRoot = this.xmlDom.documentElement;
		}
}

clsAjax.prototype.ErrAct = function()
{
	alert("error");
}
