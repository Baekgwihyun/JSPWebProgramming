function clsSort(){}
clsSort.prototype =
{
	nodeRoot : null,

	asc : function (key)
	{
		var temp = null;
		
		if (this.nodeRoot.childNodes.length<=300)
		{
			for(var i = 0; i < this.nodeRoot.childNodes.length-1; i++)
			{
				for(var j = i; j < this.nodeRoot.childNodes.length; j++)
				{
				
					if(this.nodeRoot.childNodes[i].getElementsByTagName(key)[0]!=undefined) 
					{
						if( getNodeText(this.nodeRoot.childNodes[i].getElementsByTagName(key)) > getNodeText(this.nodeRoot.childNodes[j].getElementsByTagName(key)))
						{
							this.nodeRoot.insertBefore(this.nodeRoot.childNodes[j],this.nodeRoot.childNodes[i]);
						}
					}
				}
			}
		}
		else
		{
			
		}
		return this.nodeRoot;
	},
	
	desc : function (key)
	{
		if (this.nodeRoot.childNodes.length<=300)
		{
			for(var i = 0; i < this.nodeRoot.childNodes.length-1; i++)
			{
				for(var j = i; j < this.nodeRoot.childNodes.length; j++)
				{
					if( getNodeText(this.nodeRoot.childNodes[i].getElementsByTagName(key)) < getNodeText(this.nodeRoot.childNodes[j].getElementsByTagName(key)))
					{
	//					temp = this.nodeRoot.childNodes[i];
						this.nodeRoot.insertBefore(this.nodeRoot.childNodes[j],this.nodeRoot.childNodes[i]);
	//					this.nodeRoot.replaceChild(this.nodeRoot.childNodes[j],temp);
					}
				}
			}
		}
		return this.nodeRoot;
	}
};