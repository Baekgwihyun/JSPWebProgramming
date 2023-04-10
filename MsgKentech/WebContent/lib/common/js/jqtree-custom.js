$(function () {
	var edt_node = null;

	var data = [{
		label: "ALPS",
		children: [{
			label: "관리부문",
			children: [{
				label: "경영전략팀",
				children: [{
					label: "오카다"
				}]
			}, {
				label: "관리팀",
			}]
		},
		{ 
			label: "영업부문"
		}]
	},{
		label: "node2",
		children: [{ label: "child3"}]
	}, {
		label: "node3"
	}];

	var $tree = $("#tree1");

	$tree.tree({
		data: data,
		onCreateLi: function(node, $li) {
			// Add 'icon' span before title
			$li.find('.jqtree-title').before('<span class="icon"></span>');
		},
		autoOpen: 0,
		openedIcon: '-',
		closedIcon: '+',
		usecontextmenu: true
	});

	$tree.jqTreeContextMenu($("#ContextMenu"), {
		/* "add": function (node) {
			$tree.tree("appendNode", { label: "new node" }, node);
			$tree.tree("openNode", node);
		},
		"edit": function (node) {
			var $edit = $("#edit_label");
			if(edt_node != node && $edit.size() > 0) {
				var $input = $edit.find("input:text");
				var label = $.trim($input.val());

				updateNodeLabel(edt_node, label);
				$edit.remove();
			}

			edt_node = node;
			var $el = $(node.element);
			$el.find("span.jqtree-title:first").after('<span id="edit_label"><input type="text" name="label" value="'+node.name+'"><button type="button" id="edit_submit">수정</button></span>').hide();
		},
		"delete": function (node) {
			$tree.tree("removeNode", node);
		} */
		"delete_user": function (node) {
		$tree.tree("removeNode", node);
	}
	});

	$(document).on("click", "#edit_submit", function() {
		var $this = $(this);
		var $input = $this.siblings("input:text");
		var label = $.trim($input.val());
		$this.siblings(".jqtree-title").show();
		$("#edit_label").remove();

		updateNodeLabel(edt_node, label);
	});

	function updateNodeLabel(node, label)
	{
		$tree.tree("updateNode", node, label);
		edt_node = null;
	}
});