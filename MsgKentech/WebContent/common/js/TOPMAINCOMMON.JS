
	var vHelp = null;

	function Help(szURL)
	{
		vHelp = OpenWindow ( "Help", szURL, "width=600,height=440" ) ;
//		alert ( "Help Handle : " + vHelp ) ;
	}
	var vMemo = null ;
	function Memo(szURL)
	{
		vMemo = OpenWindow ( "Memo", szURL, "width=330,height=240,scrollbars=yes" ) ;
//		alert ( "Memo Handle : " + vMemo ) ;
	}
	function OpenWindow ( szTitle, szURL, szSizeString )
	{
		var x = screen.width/2 - 300;
		var y = screen.height/2 - 220;
		return window.open(szURL, szTitle, "left=" + x +",top="+ y+"," + szSizeString + ",resizable=yes");
	}

    function NotifyClicknView ( nType , szOpenUrl )
    {
        var width  = 700;
        var height = 520;
        var winName = 'NotifyClickView';
        this.focus() ;
        // belows are added by qlink 2002.07.20
        var gpType = new Array("300","400","410","420","500","600","610","620","630","640");
        var baseUrl = '';

        for(var index=0; index < gpType.length; index++)
        {
            if(gpType[index] == nType)
            {
            baseUrl = BWURL;
            break;
            }
        }
        szOpenUrl = baseUrl + szOpenUrl;
        /////////////////////////////////////////////////////////////////////////////
        NotifyClicknViewCommon ( nType , szOpenUrl, width, height, winName );
    }

	function NotifyClicknViewCommon ( nType , szOpenUrl, width, height, winName )
	{
		//메일 : width=685,height=570 , 게시판 : width=790,height=580
		var lwidth = 790;
		var lheight = 580;
		if (nType != '1')//게시판이 아닌 경우 기존 사이즈로
		{
			lwidth = width;
			lheight = height;
		}
		var left = screen.lwidth/2 - lwidth/2;
		var top  = screen.lheight/2 - lheight/2;

        if(szOpenUrl.indexOf("hstcltex.mwf")>=0)
            left=2000;

		nm1 = "notifyview = window.open('"+szOpenUrl+"&K=" + szKEY+"','"+ winName + ((new Date()).getTime()) +"','top=" + top + ",left=" + left + ",width=" + lwidth + ",height=" + lheight + ",scrollbars=yes,resizable=yes,menubar=no');  if ( notifyview != null ) notifyview.focus();" ;
		setTimeout(nm1,100);
	}

    function MM_showHideLayers() //v3.0
    {
        var i,p,v,obj,args=MM_showHideLayers.arguments;
        changeMenu(document, args[3],11);
        for (i=0; i<1; i+=3) if ((obj=MM_findObj(args[i]))!=null) { v=args[i+2];
        if (obj.style) { obj=obj.style; v=(v=='show')?'visible':(v='hide')?'hidden':v; }
        obj.visibility=v; }
    }

    function MM_findObj(n, d) //v3.0
    {
        var p,i,x;  if(!d) d=document; if((p=n.indexOf("?"))>0&&parent.frames.length) {
        d=parent.frames[n.substring(p+1)].document; n=n.substring(0,p);}
        if(!(x=d[n])&&d.all) x=d.all[n]; for (i=0;!x&&i<d.forms.length;i++) x=d.forms[i][n];
        for(i=0;!x&&d.layers&&i<d.layers.length;i++) x=MM_findObj(n,d.layers[i].document); return x;
    }

    function changeAdditionalUser(oForm )
    {
        var	szData	= oForm.options[oForm.selectedIndex].value ;
        if ( szData == '..' )
        {
            parent.parent.location='..';
        }
        else
        {
            var	nPos	= szData.indexOf('http://');
            if ( nPos != -1)
            {
                if ( navigator.appName == 'Netscape' )
                {
                document.layers['TopMenu'].document.FORM1.action	= szData.substring ( nPos ) + '/jsp/Init.jsp';
                document.layers['TopMenu'].document.FORM1.UserID.value	= szData.substring(0,nPos );
                document.layers['TopMenu'].document.FORM1.submit();
                }
                else
                {
                document.FORM1.action	= szData.substring ( nPos ) + '/jsp/Init.jsp';
                document.FORM1.UserID.value	= szData.substring(0,nPos );
                document.FORM1.submit();
                }
            }
        }
    }

    function SendMsg()
    {
        vMsgSend = OpenWindow('MsgSend', '/servlet/HIServlet?SLET=msg.SendMessage&K='+szKEY+'&MET=SENDFORM', 'width=360,height=300,resizable=no,scrollbars=yes');
    }

    function Help()
    {
        var x = (screen.width - 800)/2;
        var y = (screen.height - 550)/2;
        vHelp = OpenWindow ('Help', '/helpdocs/01-INTRO/03-HELP.HTML', 'left='+x+',top='+y+',width=800,height=550,scrollbars=auto,resizable=yes,menubar=no');
    }

    function LogOut(szURL)
    {
        vNewInfo = window.open('/servlet/HIServlet?SLET=login.LogInOut&K='+szKEY+'&MET=LOGOUT', "LogOut", "left=5000,top=0,width=10,height=10,resizable=no");
        top.location.href='/index.html';
    }

    function goPortal()
    {
        top.frames['Start'].location = "/jsp/portal/PortalInit.jsp?K='+szKEY+'&CommunityID='+community_id+'&user_id='+user_id+'";
    }

