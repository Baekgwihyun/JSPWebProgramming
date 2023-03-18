function removeCookie(name, value)
{
	if(value == null) return;

	var today = new Date();
	today.setTime(today.getTime() -1);
	var cook = name+"="+escape(value)+";" 
		+ "expires=" + today.toGMTString() + ";";
	document.cookie = cook;
}

function removeKey(userid)
{
	removeCookie('AUTHKEY[' + userid + ']','');
}

function setCookie(key, value)
{
	var today = new Date();
    today.setMonth(today.getMonth() + 1);
	document.cookie = key + "=" + escape(value) + ";"
		+ "expires=" + today.toGMTString() + ";";
}

function getCookie(key)
{
	if(document.cookie.length)
	{
		var cookies = ' ' + document.cookie;
		var start = cookies.indexOf(' ' + key + '=');
		if (start == -1) { return ''; }

		var end = cookies.indexOf(";", start);
		if (end == -1) { end = cookies.length; }
		end -= start;
		var cookie = cookies.substr(start,end);

		return unescape(cookie.substr(cookie.indexOf('=') + 1, cookie.length - cookie.indexOf('=') + 1));

	}
	else { return ''; }
}

/*
 * 문자열 str에서 index 번째에 있는 문자열을 구한다.
 * index 값을 1부터 시작함
*/

function getStrByIndex(str, index, del)
{

	var str1 = '';
	/* str이 문자열 object가 아닐 경우에도 문자열 object로 만들기 위해서 */
	str1 += str;
	var idx1 = str1.indexOf(del);
	var val;
	for(var i=1; (idx1 >= 0); i++)
	{
		if(i == index) return (str1.substring(0,idx1));
		else
		{
			str1 = str1.substring(idx1 + del.length);
			idx1 = str1.indexOf(del);
		}
	}
	if(i == index) return str1;
	return '';
}


