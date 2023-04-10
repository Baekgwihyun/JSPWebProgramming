var errfound = false;
function error(elem, text){
    if (errfound) 
        return;
    alert(text);
    elem.select();
    elem.focus();
    errfound = true;
}


function chkJumin(obj){
    errfound = false;
    var str_jumin1 = obj.value.substring(0,6);
    var str_jumin2 = obj.value.substring(6,13);
    var checkImg = '';
    
    var i3 = 0
    for (var i = 0; i < str_jumin1.length; i++) {
        var ch1 = str_jumin1.substring(i, i + 1);
        if (ch1 < '0' || ch1 > '9') {
            i3 = i3 + 1
        }
    }
    if ((str_jumin1 == '') || (i3 != 0)) {
        error(obj, '없는 주민등록번호 입니다.\n다시 입력해 주세요!!');
    }
    
    
    
    var i4 = 0
    for (var i = 0; i < str_jumin2.length; i++) {
        var ch1 = str_jumin2.substring(i, i + 1);
        if (ch1 < '0' || ch1 > '9') {
            i4 = i4 + 1
        }
    }
    if ((str_jumin2 == '') || (i4 != 0)) {
        error(obj, '없는 주민등록번호 입니다.\n다시 입력해 주세요!!');
    }
    
    if (str_jumin1.substring(0, 1) < 4) {
        error(obj, '없는 주민등록번호 입니다.\n다시 입력해 주세요!!');
    }
    
    if (str_jumin2.substring(0, 1) > 2) {
        error(obj, '없는 주민등록번호 입니다.\n다시 입력해 주세요!!');
    }
    
    if ((str_jumin1.length > 7) || (str_jumin2.length > 8)) {
        error(obj, '없는 주민등록번호 입니다.\n다시 입력해 주세요!!');
    }
    
    if ((str_jumin1 == '72') || (str_jumin2 == '18')) {
        error(obj, '없는 주민등록번호 입니다.\n다시 입력해 주세요!!');
    }
    
    var f1 = str_jumin1.substring(0, 1)
    var f2 = str_jumin1.substring(1, 2)
    var f3 = str_jumin1.substring(2, 3)
    var f4 = str_jumin1.substring(3, 4)
    var f5 = str_jumin1.substring(4, 5)
    var f6 = str_jumin1.substring(5, 6)
    var hap = f1 * 2 + f2 * 3 + f3 * 4 + f4 * 5 + f5 * 6 + f6 * 7
    var l1 = str_jumin2.substring(0, 1)
    var l2 = str_jumin2.substring(1, 2)
    var l3 = str_jumin2.substring(2, 3)
    var l4 = str_jumin2.substring(3, 4)
    var l5 = str_jumin2.substring(4, 5)
    var l6 = str_jumin2.substring(5, 6)
    var l7 = str_jumin2.substring(6, 7)
    hap = hap + l1 * 8 + l2 * 9 + l3 * 2 + l4 * 3 + l5 * 4 + l6 * 5
    hap = hap % 11
    hap = 11 - hap
    hap = hap % 10
    if (hap != l7) {
        error(obj, '없는 주민등록번호 입니다.\n다시 입력해 주세요!!');
    }
    var i9 = 0
    if (!errfound) 
        return true;
    else
    	return false;
}