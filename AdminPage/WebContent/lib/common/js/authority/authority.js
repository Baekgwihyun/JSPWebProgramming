$(function () 
{
	getAdminListAll();

	$('.btn_addAdmin').on('click',function () {
		var type = $('.selectLevel').val();
		var id = $('.adminId').val();
		var name = $('.adminName').val();
		var password = $('.adminPassword').val();
		var deptid = $('.deptId').val();
		addAdmin(id,name,password,deptid,type);
	});
});

function addAdmin(id, name, password, deptid, type) {
	$.ajax (
		{
			type : 'POST',
			url : '/authority/addAdmin',
			dataType : 'JSON',
			contentType : 'application/json; charset=UTF-8',
			data : JSON.stringify(new setAddAdmin(id,name,password,deptid,type))
		,
		error: function(req, status, e) 
		{
			alert('관리자에게 문의바랍니다.');
		},
		success: function(data) 
	    {
	    	console.log(data.returnMessage);
	    	if(data.returnMessage == "notNull")
	    		swal("실패!", "중복된 아이디입니다.", "error");
	    	else
	    	{
	    		swal("완료!", "관리자 등록이 완료되었습니다.", "success");
	    		getAdminListAll();
	    	}
	    }
	});
	
	contextPopupClose('addAdmin');
}


function srchUser(key, value) {
	console.log(JSON.stringify(new SearchUser(key,value)));
	
	$.ajax (
		{
			type : 'POST',
			url : '/authority/getSrchUser',
			dataType : 'JSON',
			contentType : 'application/json; charset=UTF-8',
			data : JSON.stringify(new SearchUser(key,value))
		,
		error: function(req, status, e) 
		{
			alert('관리자에게 문의바랍니다.');
		},
		success: function(dto) 
	    {
	    	console.log(dto);
	    	console.log(dto[0].userName);
	    	console.log(dto.length);
	    	for(var i=0; i < dto.length; i++)
	    	{
	    		$('.popup_box__body .dtable tbody').append(dto[i].userName+'\n');
	    	}
	    }
	});
}

function getAdminListAll() {
	$.ajax (
		{
			type : 'POST',
			url : '/authority/getAdminListAll',
			dataType : 'JSON',
			contentType : 'application/json; charset=UTF-8'
			,
			error: function(req, status, e) 
			{
				alert('관리자에게 문의바랍니다.');
			},
			success: function(data) 
		    {
		    	console.log(data);
		    	$('#adminListBody').empty();
		    	for(var i = 0; i < data.length; i++)
		    	{
		    		var adminLevel = '';
		    		var rownum = i+1;
		    		if(data[i].adminLevel == '1') adminLevel = '관리자';
		    		else if(data[i].adminLevel == '2') adminLevel = '매니저';
		    		var str = '<tr><td>'+rownum+'</td><td class="list_adminId">'+data[i].adminId+'</td><td>'+data[i].adminName+'</td><td>'+adminLevel+'</td><td>'+data[i].adminDeptCode+'</td><td><button type="button" class="btn_radius type_red btn_delAdmin" key="'+data[i].adminId+'" onclick="javascript:delAdmin(this);">삭제</button></td></tr>';
					$('#adminListBody').append(str);	    		
		    	}
		    }
		}
	);
}

function delAdmin(adminId) {
	var id = $(adminId).attr('key');
	$.ajax (
		{
			type : 'POST',
			url : '/authority/delAdmin',
			dataType : 'JSON',
			contentType : 'application/json; charset=UTF-8',
			data : JSON.stringify(new DelAdmin(id)),
			error: function(req, status, e) 
			{
				alert('관리자에게 문의바랍니다.');
			},
			success: function(data) 
		    {
		    	swal("완료!", "관리자가 삭제 되었습니다.", "success");
		    	getAdminListAll();
		    }
		}
	);
}

function setDept(node) {
	console.log(node.name);
	console.log(node.key);
	//관리 부서명
	$('.popup_box__body .ptable .form_box').eq(0).children('input').val(node.name);
	$('.deptId').val(node.key);
}

function DelAdmin(id)
{
	this.adminId = id;
}

function setAddAdmin(id,name,password,deptid,type) 
{
	this.adminId = id;
	this.adminName = name;
	this.password = password;
	this.adminDeptCode = deptid;
	this.adminLevel = type;
}