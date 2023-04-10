<%@ page language="java" contentType="text/html; charset=utf-8"
    pageEncoding="utf-8"%>
<%@ page import="java.util.*" %>
<%@ page import="java.text.*" %>    
<%@ page import="kr.co.ultari.common.StringTool" %>
<%
	request.setCharacterEncoding("utf-8");

String adminId = (String) request.getSession().getAttribute("adminId");

String cookie = request.getHeader("cookie");
String sessionId = (String)request.getSession().getAttribute("sessionId");

if(sessionId == null || !sessionId.equals(cookie))
{
%>
<!-- <script language=javascript>

	// 이미지 및 기타 외부 컨텐츠가로드 되기 전에 DOM이 준비 될 때 호출됩니다 .
	document.onload = noId();  
	function noId()
	{
		parent.document.location.href = "../index.html";
	}
	
</script> -->
<%
}

if ( adminId == null )
{
%>
<script language=javascript>
	document.onload = noId();
	function noId()
	{
		//parent.document.location.href = "../index.html";
	}
	
</script>
<%
}

	//String tabId = StringTool.NullTrim(request.getParameter("tabId"));
	
	//String queryId = "'"+tabId+"'";
	
	//Properties prot = new Properties();
	//String protPath = "/config/Config.properties";
	//prot.load(getClass().getResourceAsStream(protPath));
	
	/* 
	String TOPPART = prot.getProperty("TOPPART").trim();
	String TOPID = prot.getProperty("TOPID").trim();
	*/
	
%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html xmlns:th="http://www.thymeleaf.org">
<head>
	<meta charset="UTF-8">
	<link rel="shortcut icon" th:href="../lib/commonn/img/favicon.ico">
	<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
	<title>조직관리</title>
	
	<link href="../common/css/ui.dynatree.css" rel="stylesheet" type="text/css">
	<script type="text/javascript" src="../common/js/json/json2.js"></script>
	<script type="text/javascript" src="../common/js/jquery.js"></script>
	<script type="text/javascript" src="../common/js/jquery/jquery-ui.custom.js"></script>
	<script type="text/javascript" src="../common/js/jquery/jquery.dynatree.js"></script>
	
	<!-- lib -->
	<link rel="stylesheet" type="text/css" href="../lib/common/lib/fontAwesome/fontawesome.min.css" />
	<script type="text/javascript" src="../lib/common/lib/searchHighlight/SearchHighlight.js"></script>

	<!-- css -->
	<link rel="stylesheet" type="text/css" href="../lib/common/css/fonts/fonts.css" />
	<link rel="stylesheet" type="text/css" href="../lib/common/css/style.css" />

<script language="javascript" >
<%-- 
var ClassLoader = "Service.jsp";
var ClassName = "kr.co.ultari.process.OrgProcessor";
var nowNode = null;

var topPart = "<%=TOPPART%>";
var topId = "<%=TOPID%>";

var tree = null;

var selNode = null;
var targetNode = null;

part.prototype.toJ = function()
{
	return JSON.stringify(this);
}

String.prototype.d = function()
{
	return chgEnc(this);
}
function part(id,high,name,order)
{
	this.C = "";
	this.M = "";
	this.ReqType = "JSON";
	this.id = id;
	this.name = name;
	this.high = high;
	this.order = order;
	this.setMethod = function(M)
	{
		
		this.C = ClassName;
		this.M = M;
		return this;	
	}
	
}

var bindTree = function ()
{
	this.bind = function(method){
		$("#tree").dynatree(
		{
       		onActivate: function(node){
       		},
			onClick: function(node, event) 
			{
			  	$("#UserInfo").fadeOut("fast");
				$("#PartInfo").fadeOut("fast");
				$("#treeLayerForm").fadeOut("fast");
				
		        if( $(".contextMenu:visible").length > 0 )
		        {
		        	
		            $(".contextMenu").hide();
		        }
		    	
		    	// 창 컨트롤
		    	
		        var rtn =  list.checkPage();

		    	if(rtn == "list")
		    	{
		    		SetNowNode(node.data.key,node.data.title);
		    		SetUserList(node.data.key,node.data.title);
		    	}
		    	else if(rtn == "move")
		    	{
		    		SetDeptNmForChild(node.data.key,node.data.title);
		    	}
		    	else if(rtn == "deptview")
		    	{
		    		SetNowNode(node.data.key,node.data.title);
		    		setDeptView(node.data.key,node.data.title);
		    	}
		    	else if(rtn == "deptadd")
		    	{
		    		SetNowNode(node.data.key,node.data.title);
		    		SetDeptNmForChild(node.data.key,node.data.title);
		    	}
			},
		
			onCreate: function(node, span)
			{
				
				if(node.data.key == topId)
				{
					node.expand(true);
					node.activate(true);
					setRootNode();
					SetNowNode(node.data.key,node.data.title);
					SetUserList(node.data.key,node.data.title);
				}
			},
			clickFolderMode: 1,
		  	imagePath: "../img/",
		  	checkbox: true,
		  	
		    initAjax: 
		    {
				type : "POST",
				url : ClassLoader,
				dataType : "json",
				data : new part("",topPart,"","").setMethod(method).toJ()
		    },
	    
	    	onLazyRead: function(node)
	    	{
				node.appendAjax({
				  	type : "POST",	
			        url: ClassLoader,
					dataType : "json",
					data : new part("",node.data.key,"","").setMethod(method).toJ(),
			        debugLazyDelay: 750 
				});
	    	}
		});
	}
};

$(document).ready
(
		function()
		{
			tree = new bindTree();
			tree.bind("getChild");	
		}
);

function SetNowNode(key, title)
{
	document.getElementById("deptId").value = key;
	document.getElementById("deptNm").value = title;
}

function SetDeptNmForChild(key, title)
{
	list.SetDeptNm(key, title);
}

function setDeptNm(nm)
{
	document.getElementById("deptNm").value = nm;
}

function SetUserList(key,nm)
{
	document.getElementById("list").src = "usrlist.jsp?tabId="+key;
}
function setDeptView(key,nm)
{
	document.getElementById("list").src = "deptview.jsp?tabId="+key;
}


function setGroupView(key,nm)
{
	document.getElementById("list").src = "groupview.jsp?tabId="+key;
}
function setWallView(key,nm)
{
	document.getElementById("list").src = "wallview.jsp?tabId="+key;
}
function setDeptList(key,nm)
{
	document.getElementById("list").src = "deptlist.jsp?tabId="+key;
}

function reLoad(gubun,id)
{
	$("#tree").dynatree("getTree").reload();
}

function setSelNode(node)
{
	selNode = node;
}

function setTargetNode(node)
{
	targetNode = node;
}

function setRootNode()
{
	selNode = $("#tree").dynatree("getActiveNode");
}

function test()
{
	alert("test");
}

function getDeptNm()
{
	var nm = document.getElementById("deptNm").value;
	return nm;
}
 --%>
</script>
</head>
<body>
<!-- <form name="MainForm">
<input type="hidden" id="deptId"  name="deptId" value="">
<input type="hidden" id="deptNm"  name="deptNm" value=""> -->


</form>
	<!-- wrap -->
	<section id="wrap">
		<section class="wrap_layout">
			<div data-include-path="../include/nav.html"></div>

			<section>
				<!-- header -->
				<div data-include-path="../include/out.html"></div>
				<!-- // header -->
				 <script>
						window.addEventListener('load', function() {
								var allElements = document.getElementsByTagName('*');
								Array.prototype.forEach.call(allElements, function(el) {
										var includePath = el.dataset.includePath;
										if (includePath) {
												var xhttp = new XMLHttpRequest();
												xhttp.onreadystatechange = function () {
														if (this.readyState == 4 && this.status == 200) {
																el.outerHTML = this.responseText;
														}
												};
												xhttp.open('GET', includePath, true);
												xhttp.send();
										}
								});
						});
				</script>

				<!-- contents -->
				<section id="container">
					<header class="sub_head">
						<h2>
							<i class="ico_tit sub01"></i> <span>프로세스관리</span>
							<!-- <p>
									메신저 관리<br/>
								</p> -->
						</h2>
					</header>

					<div class="conts_inner">
						<!-- 좌측 영역 -->
						<!-- <aside class="conts_inner__aside">
							<div class="conts_inner__aside__inner">
								<div class="file_tree_wrap">
								
									<div id="tree1" class="tree_wrap">
									<div id="tree" valign="top"></div>
									</div>
								</div>
							</div>
						</aside> -->
						<!-- // 좌측 영역 -->

						<!-- 우측 영역 -->
						 <iframe width="100%"  height="100%" frameborder="0" scrolling="auto" name="processCtrl" id="processCtrl" src="../adm/processCtrl.jsp"></iframe>
						<!--  <iframe width="100%"  height="100%" frameborder="0" scrolling="auto" name="list" id="list" src="usrlist.jsp"></iframe>
						-->
						<!-- // 우측 영역 -->
					</div>
				</section>
				<!-- // contents -->
			</section>
		</section>
	</section>
	<!-- // wrap -->
	
	
	
</body>
</html>
