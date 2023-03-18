function bindUserList(node)
		{
			console.log(node.children)
			if(node.children.length>0)
			{
				$(node.children).each(function(index, item)
		        {
		        	if(item.type=="User")
		        	{
		        		var tr = $("<tr/>");
		      			var tdCheck = $("<td/>");
		      			var lbl = $("<label/>");
		      			$(lbl).addClass("type_check");
		      			var ipt = $("<input/>");
		      			$(ipt).attr("type","checkbox");
		      			$(ipt).attr("name","classChange");
		      			var spn = $("<span/>");
		      			$(spn).addClass("label");
		      			$(spn).addClass("no_txt");
		      			$(lbl).append(ipt);
		      			$(lbl).append(spn);
		      			$(tdCheck).append(lbl);
		      			
		      			var tdSeq = $("<td/>");
		      			$(tdSeq).html(index+1);

		      			var tdId = $("<td/>");
		      			$(tdId).html(item.model.userId);

		      			var tdName = $("<td/>");
		      			$(tdName).html(item.model.userInfo.userName);

		      			var tdPos = $("<td/>");
		      			$(tdPos).html(item.model.userInfo.posName);
		      			
		      			var tdComp = $("<td/>");
		      			$(tdComp).html(item.model.userInfo.companyName);
		      			
		      			var tdDept = $("<td/>");
		      			$(tdDept).html(item.model.userInfo.deptName);
		      			
		      			var tdPhone = $("<td/>");
		      			$(tdPhone).html(item.model.userInfo.phone);
		      			
		      			var tdStatus = $("<td/>");
		      			$(tdStatus).html("-");
		      			//$(tdStatus).html(item.model.userStatus);
		      			
		      			var tdIp = $("<td/>");
		      			$(tdIp).html("-");
		      			
		      			var tdEtc = $("<td/>");
		      			var btnStop = $("<button/>");
		      			$(btnStop).attr("type","button");
		      			$(btnStop).addClass("btn_radius");
		      			
		      			var userstatus = 0;
		      			
		      			var userStatus = "0";
		    			if(item.model.userInfo.userStatus=="1") userStatus = "1";
		    			
		    			if(userStatus=="1")
		      			{
		    				$(btnStop).addClass("type_red");
		    				$(btnStop).addClass("btnUnUse");
			      			$(btnStop).text("중지");
		      			}
		    			else
	    				{
		    				$(btnStop).addClass("type_blue");
		    				$(btnStop).addClass("btnUse");
			      			$(btnStop).text("사용");		
	    				}
		    			$(btnStop).attr("key",item.model.userId);
		      			$(btnStop).attr("name",item.model.userName);
		      			
		      			$(tdEtc).append(btnStop);
		      			
		      			//$(tr).append(tdCheck);
		      			//$(tr).append(tdSeq);
		      			$(tr).append(tdId);
		      			$(tr).append(tdName);
		      			$(tr).append(tdPos);
		      			$(tr).append(tdComp);
		      			$(tr).append(tdDept);
		      			$(tr).append(tdPhone);
		      			//$(tr).append(tdStatus);
		      			//$(tr).append(tdIp);
		      			$(tr).append(tdEtc);
		      			$userListBody.append(tr);
		        	}
		        });
	        }
			
			$(".btnUnUse").click(function() {
				var obj = new UseUser($(this).attr("key"), "0");
				if (confirm($(this).attr("name") + "님의 계정을 비활성화 하시겠습니까?")) {
					set(obj,"useUser");
				}
			});
			
			$(".btnUse").click(function() {
				var obj = new UseUser($(this).attr("key"), "1");
				if (confirm($(this).attr("name") + "님의 계정을 활성화 하시겠습니까?")) {
					set(obj,"useUser");
				}
			});
		}
		
		function set(obj, method) 
		{
			$.ajax({
				type : 'POST',
				url : '/organization/'+method,
				dataType : 'text',
				contentType : 'application/json; charset=UTF-8',
				data : JSON.stringify(obj),
				error: function(req, status, e)
				{
					alert('관리자에게 문의바랍니다.');
				},
				success: function(data)
				{
					if(data=="0")
					{
						swal("적용완료!", "적용되었습니다.", "success");					
					}
					else
					{
						swal("적용 실패!", "데이터 적용에 실패하였습니다.", "info");
					}
				}
			});
		}
		
		function chkOverlapId(userId) {
			var check = validateUserId(userId);
			if (!check)
			{
				swal("아이디 이상!", "아이디는 영문, 숫자 1자 이상으로 해주세요.", "info");
				$("#user_id").focus();
				return;
			}
			
			var obj = new ObjKey(userId);
			
			$.ajax({
				type : 'POST',
				url : '/organization/hasUser',
				dataType : 'text',
				contentType : 'application/json; charset=UTF-8',
				data : JSON.stringify(obj),
				error: function(req, status, e)
				{
					alert('관리자에게 문의바랍니다.');
				},
				success: function(data)
				{
					if(data=="0")
					{
						swal("사용가능!", "사용가능한 아이디입니다.", "success");
						$("#isChkOverlapId").val("ok");
					}
					else
					{
						swal("중복 아이디!", "사용중인 아이디입니다. 다른 아이디를 입력해 주세요.", "info");
						$("#user_id").focus();
						$("#isChkOverlapId").val("no");
					}
				}
			});
		}
		
		function searchUser(data)
		{
			$.ajax({
				type : 'POST',
				url : '/organization/searchUser',
				dataType : 'JSON',
				contentType : 'application/json; charset=UTF-8',
				data : JSON.stringify(data),
				error: function(req, status, e)
				{
					alert('관리자에게 문의바랍니다.');
				},
				success: function(dto)
				{
					$userListBody.empty();
					bindUserList(dto);
				}
			});
		}
	  
	  	function setUser(method, tree, node)
	  	{
//	  		console.log("setUser start");
	  		if (method == "addUser") {
	  			var chkOverlapId = $("#isChkOverlapId").val();
				if (chkOverlapId == "no") {
					swal("중복 아이디!", "중복확인을 해주세요.", "warning");
					return;
				}
				
				if(!validatorSetUser()) return;
	  		}
	  		
	  		var obj;
	  		if(method=="addUser")
	  		{
	  			obj = new User(
						  $("#userId").val(),
						  $("#userName").val(),
						  $("#posName").val(),
						  $("#userDeptId").val(),
						  $("#userDeptName").val(),
						  $("#userPassword").val(),
						  $("#userPhone").val(),
						  $("#userMobile").val(),
						  $("#userOrder").val(),
						  $("#userType").val(),
						  $("#userEmail").val(),
						  $(":input:radio[name=userStatus]:checked").val(),
						  $("#userJob").val()
				);
	  		}
	  		else
	  		{
	  			obj = new User(
						  $("#detailUserId").val(),
						  $("#detailUserName").val(),
						  $("#detailPosName").val(),
						  $("#detailUserDeptId").val(),
						  $("#detailUserDeptName").val(),
						  $("#detailUserPassword").val(),
						  $("#detailUserPhone").val(),
						  $("#detailUserMobile").val(),
						  $("#detailUserOrder").val(),
						  $("#detailUserType").val(),
						  $("#detailUserEmail").val(),
						  $(":input:radio[name=detailUserStatus]:checked").val(),
						  $("#detailUserJob").val()
	  			);
	  		}
	  		
	  		$.ajax ({
	  			type : 'POST',
	  			url : '/organization/'+method,
	  			dataType : 'JSON',
	  			contentType : 'application/json; charset=UTF-8',
	  			data : JSON.stringify(obj),
	  			error: function(req, status, e)
	  			{
	  				alert('관리자에게 문의바랍니다.');
	  			},
	  			success: function(dto) 
	  			{
	  				
	  				if(method == "addUser")
	  				{
	  					tree.tree("appendNode", dto, node);
						contextPopupClose('userDepartment');
						if(node.children.length>0)
		           		{
					        $(node.children).each(function(index, item)
					        {
					        	if(item.type=="Dept")
					        	{
					        		$(item.element).addClass("jqtree-folder");
					        		$(item.element).addClass("jqtree-closed");
					        	}
					        });
				        }
						searchUser(new SearchUser('userId',$("#userId").val()));
	  				}
	  				else
	  				{
	  					  					
	  					tree.tree("updateNode", node, dto);
						contextPopupClose('userInfo');
						searchUser(new SearchUser('userId',$("#detailUserId").val()));
	  				}
	  				
	  				swal("적용완료!", "적용되었습니다.", "success");
	  			}
	  		});
	  	}
	  	
	  	function delUser(node, tree) 
	  	{
	  		var obj = new ObjKey(node.key);
	  		
	  		$.ajax({
	  			type : 'POST',
				url : '/organization/delUser',
				dataType : 'text',
				contentType : 'application/json; charset=UTF-8',
				data : JSON.stringify(obj),
				error: function(req, status, e)
				{
					alert('관리자에게 문의바랍니다.');
				},
				success: function(data) {
					if(data=="0")
					{
						
						swal("적용완료!", "적용되었습니다.", "success");
						tree.tree("removeNode", node);
					}
					else
						swal("적용 실패!", "삭제된 사용자입니다. 웹페이지를 새로고침 해주세요.", "info");
				}
	  		});
		}
	  
	  function setPart(method, tree, node)
	  {
		  if(!validatorSetPart()) return;
		  
		  var obj = new Dept(
					$("#deptId").val(),
					$("#parentDeptId").val(),
					$("#deptName").val(),
					$("#deptOrder").val(),
					$(":input:radio[name=partStatus]:checked").val(),
					$("#deptType").val()
					);
		  
			$.ajax ({
					type : 'POST',
					url : '/organization/'+method,
					dataType : 'JSON',
					contentType : 'application/json; charset=UTF-8',
					data : JSON.stringify(obj),
					
					error: function(req, status, e) 
					{
						alert('관리자에게 문의바랍니다.');
					},
					success: function(dto) 
					{
						swal("적용완료!", "적용되었습니다.", "success");
						
						if(method == "addPart")
							tree.tree("appendNode", dto, node);
						else if (method == "modPart")
							tree.tree("updateNode", node, dto);
						
						if(node.children.length>0)
		           		{
					        $(node.children).each(function(index, item)
					        {
					        	if(item.type=="Dept")
					        	{
					        		$(item.element).addClass("jqtree-folder");
					        		$(item.element).addClass("jqtree-closed");
					        	}
					        });
				        }
				        else
				        {
				        	$(node.element).addClass("jqtree-folder");
				        }			
						
						contextPopupClose('addEditDepartment');
				    }
			});
	  }
	  
	  function delPart(node, tree) {
			
		  var obj = new ObjKey(node.key);
		  
		  $.ajax({
			  type : 'POST',
			  url : '/organization/getChildExist',
			  dataType : 'text',
			  contentType : 'application/json; charset=UTF-8',
			  data : JSON.stringify(obj),
			  error: function(req, status, e)
			  {
				  alert('관리자에게 문의바랍니다.');
			  },
			  success: function(data) {
				  if(data=="0")
				  {
					  $.ajax({
						  type : 'POST',
						  url : '/organization/delPart',
						  dataType : 'text',
						  contentType : 'application/json; charset=UTF-8',
						  data : JSON.stringify(obj),
						  error: function(req, status, e)
						  {
							  alert('관리자에게 문의바랍니다.');
						  },
						  success: function(data) {
							  if(data=="0")
							  {
								  swal("적용완료!", "적용되었습니다.", "success");
								  tree.tree("removeNode", node);
							  }
							  else{
								  swal("적용 실패!", "삭제된 부서입니다. 웹페이지를 새로고침를 해주시기 바랍니다.", "info");
							  }
						  }
					  });
				  }
				  else
				  {
					  contextPopup('cannotDeletDepartment');
				  }
			  }
		  });
	  }
	  
	  function ticker(node){
		  var tickerNode = node;
		  console.log(tickerNode);
		  
		  $('#tickerDeptId').val(tickerNode.key);
		  $('#tickerdeptName').val(tickerNode.name);
		  
		  getTicker(tickerNode.key);
	  }
	  
	  function getTicker(deptId) {
		  $.ajax({
				type : 'POST',
				url : '/organization/getSlogan',
				dataType : 'JSON',
				contentType : 'application/json; charset=UTF-8',
				data : JSON.stringify(new GetSlogan(deptId)),
				error: function(req, status, e)
				{
					alert('관리자에게 문의바랍니다.');
				},
				success: function(data) {
					$("#tickerValue").val(data.content);
				}
		});
	}
	  
	 function setTicker() {
		  
		var tickerDeptId = $("#tickerDeptId").val();
		var tickerContent = $("#tickerValue").val();
		  
		console.log(tickerDeptId);
		console.log(tickerContent);
		  
		$.ajax({
			type : 'POST',
			url : '/organization/setSlogan',
			dataType : 'JSON',
			contentType : 'application/json; charset=UTF-8',
			data : JSON.stringify(new SetSlogan(tickerDeptId, tickerContent)),
			error: function(req, status, e)
			{
				alert('관리자에게 문의바랍니다.');
			},
			success: function(data) {
				console.log(data);
				if(data=="0")
				{
					swal("적용완료!", "적용되었습니다.", "success");
				}
				else{
					swal("적용 실패!", "문제가 발생하였습니다.", "info");
				}
				contextPopupClose("addTicker");
				$("#tickerDeptId").val("");
				$("#tickerValue").val("");
			}
		});
	  }
	  
	function notice(node,type) {

		$(".recvId").val("");
		$(".docTitle").val("");
		$(".docUrl").val("");
		$(".docDesc").val("");
		$(".noticeType").val("");
		  
		$(".recvName").val(node.name);
		$(".recvId").val(node.key);
		var typeName = "";
		if(type == "0") typeName = " [사용자]";
		else if(type == "1") typeName = " [해당부서만]";
		else if(type == "2") typeName = " [하위부서포함]";
		
		$(".noticeType").val(type);
		$(".typeName").text(typeName);
	}
	  
	function setNotice() {
		var sysName = $(".sysName").val();
		var recvId = $(".recvId").val();
		var docTitle = $(".docTitle").val();
		var docUrl = $(".docUrl").val();
		var docDesc = $(".docDesc").val();
		var noticeType = $(".noticeType").val();
		var sndName = "메신저 관리자";
  		console.log(JSON.stringify(new Alarm(sysName,recvId, docTitle, docUrl, docDesc, noticeType, sndName)));
		
		$.ajax({
			type : 'POST',
			url : '/alarm',
			dataType : 'JSON',
			contentType : 'application/json; charset=UTF-8',
			data : JSON.stringify(new Alarm(sysName,recvId, docTitle, docUrl, docDesc, noticeType, sndName)),
			error: function(req, status, e)
			{
				alert('관리자에게 문의바랍니다.');
			},
			success: function(data) {
				swal("전송 완료!", "전송되었습니다.", "success");
				contextPopupClose("noticeSubmit");
			}
		});
	}

	function validatorSetPart() {
		var check = true;
		if ($("#partDeptName").val() == "") {
			alert("부서명을 입력해주세요.");
			$("#partDeptName").focus();
			check = false;
		} else if ($("#deptOrder").val() == "") {
			alert("순서를 입력해주세요.");
			$("#deptOrder").focus();
			check = false;
		}
		return check;
	}

	function validatorSetUser() {
		var check = true;
		if ($("#userId").val() == "") {
			alert("아이디를 입력해주세요.");
			$("#userId").focus();
			check = false;
		} else if (!validateUserId($("#userId").val())) {
			alert("아이디는 영문, 숫자 1자 이상으로 해주세요");
			$("#userId").focus();
			check = false;
		} else if ($("#userPassword").val() == "") {
			alert("비밀번호를 입력해주세요.");
			$("#userPassword").focus();
			check = false;
		} else if ($("#userName").val() == "") {
			alert("이름을 입력해주세요.");
			$("#userName").focus();
			check = false;
		} else if (validateName($("#userName").val())) {
	        alert("이름은 한글, 영문, 숫자만 입력해주세요.");
	        $("#user_name").focus();
	        check = false;
		} else if ($("#userOrder").val() == "") {
			alert("순서를 입력해주세요.");
			$("#userOrder").focus();
			check = false;
		}
		
		return check;
	}
	  
	  function OrgSynchronization()
	  {
	    swal("동기화 시작!", "동기화를 시작합니다.", "success");
	  	$.ajax({
			type : 'POST',
			url : '/organization/synchronization',
			contentType : 'application/json; charset=UTF-8',
			error: function(req, status, e)
			{
				alert('관리자에게 문의바랍니다.');
			},
			success: function(data) {
				swal("동기화 완료!", "동기화 되었습니다.", "success");
				contextPopupClose("synchronization");
				location.reload(true);
			}
		});
	  }
	  
	  var $userListBody;
	  $(document).ready(function() {
		  
		  $(".organization").addClass("on");
		  
		  $userListBody = $("#userListBody");
			$("#btnSearchUser").click(function()
			{
				searchUser(new SearchUser($("#sltSearchKey").val(),$("#txtSearchValue").val()));
				return false;
			});
			
			$("#btnChkOverlapId").click(function()
			{
				var userId = $("#userId").val();
				chkOverlapId(userId);
			});
			
			$("#btnOrgSynchronization").click(function()
			{
				OrgSynchronization();
			});
			
			$(".docDesc").keyup(function (e){
                    var content = $(this).val();
                    $(".docDescCount").html("("+content.length+" / 최대 200자)");    //글자수 실시간 카운팅

                    if (content.length > 200){
                            alert("최대 200자까지 입력 가능합니다.");
                            $(this).val(content.substring(0, 200));
                            $(".docDescCount").html("(200 / 최대 200자)");
                    }
            });
			
			/*$("#btnPartAdd").click(function()
			{
				setPart("addPart");
				return true;
			});*/
		});