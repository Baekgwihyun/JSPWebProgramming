function UploadConfig(key, value)
{
	this.key = key;
	this.value = value;
}

function CheckLogin(userId, userPassword) 
{
	this.userId = userId;
	this.userPassword = userPassword;
	this.user = null;
}

function GetTree(key) 
{
	this.key = key;
}

function SearchUser(key,value) 
{
	this.key = key;
	this.value = value;
}

function UseUser(id,status)
{
	this.userId = id;
	this.status = status;
}

function ObjKey(key)
{
	this.key = key;
}

function Dept(id,high,name,order,status,type)
{
	this.deptId = id;
	this.deptName = name;
	this.parentDept = high;
	this.deptOrder = order;
	this.deptStatus = status;
	this.deptType = type;
	this.companyCode = "";
	this.companyName = "";
}

function User(id,name,posname,deptId,deptName,pwd,phone,mobile,order,type,email,status,job)
{
	this.userId = id;
	this.userName = name;
	this.userDeptId = deptId;
	this.posName = posname;
	this.password = pwd;
	this.phone = phone;
	this.mobile = mobile;
	this.userOrder = order;
	this.userType = type;
	this.email = email;
	this.userStatus = status;
	this.userJob = job;
}

function GetAuthGroupAll() 
{
	this.list = null;
}

function AddAuthGroup(groupName,groupType)
{
	this.groupName = groupName;
	this.groupType = groupType;
}

function RemoveAuthDept(groupCode,list)
{
	this.groupCode = groupCode;
	this.list=list;
} 


function RemoveAuthGroup(groupCode)
{
	this.groupCode = groupCode;
}

function SetAuthPolicy ()
{
	this.list = [];
}

SetAuthPolicy.prototype = 
{
	add : function(sourceGroupCode,targetGroupCode,chat,message,file,remote)
	{
		var obj = new Object();
		obj.sourceGroupCode = sourceGroupCode;
		obj.targetGroupCode = targetGroupCode;
		obj.chat = chat;
		obj.message = message;
		obj.file = file;
		obj.remote = remote;
		this.list.push(obj);
	}
}

function GetSlogan(deptId)
{
	this.deptId = deptId;
}

function SetSlogan(deptId, content)
{
	this.deptId = deptId;
	this.content = content;
}

function Alarm(sysName, recvId, docTitle, docUrl, docDesc, noticeType, sndName)
{
	this.sysName = sysName;
	this.recvId = recvId;
	this.docTitle = docTitle;
	this.docDesc = docDesc;
	this.docUrl = docUrl;
	this.type = noticeType;
	this.sndUser = sndName;
}


function SetAuthIp (groupCode,ipCode,startIp,endIp)
{
	this.groupCode = groupCode;
	this.ipCode = ipCode;
	this.startIp = startIp;
	this.endIp = endIp;
	this.authQuickTalk=false;
	this.authQuickSetting=false;
	this.authQuickUserInfo=false;
	this.authQuickArchive=false;
	this.authQuickSendMessage=false;
	this.authQuickPostIt=false;
	this.authTabUser=false;
	this.authTabOrganization=false;
	this.authTabChat=false;
	this.authTabSearch=false;
	this.authTabMessage=false;
	this.authUserAgenyGroup=false;
	this.authUserCommonGroup=false;
	this.authUserTeamTalk=false;
	this.authUserGroupware=false;
	this.authUserCloud=false;
	this.authUserMore=false;
	this.authUserSearch=false;
	this.authUserConference=false;
	this.authUserOrganization=false;
	this.authUserBuddy=false;
	this.authUserMessage=false;
	this.authUserTalk=false;
}


function SetAuthDept ()
{
	this.list = [];
}

SetAuthDept.prototype = 
{
	add : function(groupCode,deptCode,deptName)
	{
		var obj = new Object();
		obj.groupCode = groupCode;
		obj.deptCode = deptCode;
		obj.deptName = deptName;
		this.list.push(obj);
	}
}
