$(function () 
{
	var edt_node = null;
	var $tree = $("#tree1");
	
	$tree.tree({
		data: rootData,
		onCreateLi: function(node, $li) {
			// Add 'icon' span before title
			var spn = $('<span class="icon"></span>');
			$li.find('.jqtree-title').before(spn);
		},
		autoOpen: false,
		openedIcon: '-',
		closedIcon: '+',
		usecontextmenu: true
	});
	
	$tree.on(
	    'tree.close',
	    function(event) {
	       var node = event.node;
	    }
	);
	
	$tree.on(
	    'tree.open',
	    function(event) {
	       //$adminListBody.empty();	
	       bindUserList(event.node);
	    }
	);
	
	$tree.on(
       'tree.click',
       function(event) 
       {
           var node = event.node;
           
           if(node.type!=undefined&&node.type=="Dept")
           {
           	   //$adminListBody.empty();
           	   if(node.children.length==0)
           	   {
		           $tree.tree('loadDataFromUrl', '/authority/getChildren/'+node.key, node, function() 
		           {
		           		
		           		if(node.children.length>0)
		           		{
					        $tree.tree('openNode', node);
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
				   });
			   }
			   else
			   {
			   		bindUserList(node);
			   }
		   }
       }
    );

	$tree.jqTreeContextMenu($("#ContextMenu"), {
		"add": function (node) {
			$(".adminId").val("");
			$(".adminPassword").val("");
			$(".adminName").val("");
			setDept(node);
		},
		"edit": function (node) {
		},
		"delete": function (node) {
		},
		"delete_user": function (node) {
	}
	});
});