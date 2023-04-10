/**
* #PGM_NAME        DoubleCombo.js (/condo/common/js/DoubleCombo.js)
* #DESC                이용콘도와 직영/체인 구분을 선택하면 해당 지역콘도가 Select된다.
*
* @ author         서원종
**********************************************************************************************
* @                     Modification   Log
* @     DATE                AUTHOR                DESCRIPTION
* @   2004.11.10            서원종                최초 작성
**********************************************************************************************
*/

function lowTypeSelect(f)
{

    var option_array = new Array(16);
    option_array[0] = new Array("--대분류 선택--");

    // 시 일 경우
    option_array[1] = new Array("-- 소분류|코드 --","기타도로시설|1031","교통표지판|1041","승강장정비|1061","신호등정비|1071","교통기타시설|1081","매연차량|1111","대형폐기물|1121","상수도공사|1151","하수도공사|1152","녹지기타|1211","기타부서|1271");

    // 기타기관
    option_array[2] = new Array("-- 소분류|코드 --","차도정비|3011","인도정비|3021","볼라드정비|3023","경계석정비|3025","기타도로시설|3031","교통시설물등|3081", "건축자재등|3101","기꽂이대기타|3251");


    // 만기
    option_array[3] = new Array("-- 소분류|코드 --","차도정비|2011","인도정비|2021","볼라드정비|2023","경계석정비|2025","기타도로시설|2031","건축자재등|2101");

    // 만건
    option_array[4] = new Array("-- 소분류|코드 --","차도정비|2012","인도정비|2022","볼라드정비|2024","경계석정비|2026","기타도로시설|2032","상품적치|2091","건축자재등|2102","맨홀정비|2141","하천시설정비|2142","공원시설|2181","놀이터시설|2191","등산로시설|2201","기타녹지|2211","벽화&표지판정비|2212");
    
    // 만교
    option_array[5] = new Array("-- 소분류|코드 --","주정차표지판|2051","기타교통시설|2082","방치차량등|2241");

    // 만환
    option_array[6] = new Array("-- 소분류|코드 --","매연차량|2111");

    // 만동
    option_array[7] = new Array("-- 소분류|코드 --","방치쓰레기등|2131","기꽂이대기타|2251","정보지함|2262");

    // 만총
    option_array[8] = new Array("-- 소분류|코드 --","현수막|2221","광고물등|2231");

    //만    
    option_array[9] = new Array("-- 소분류|코드 --","기타부서|2271");

    //동기
    option_array[10] = new Array("?","차도정비|3011","인도정비|3021","볼라드정비|3023","경계석정비|3025","기타도로시설|3031","교통시설물등|3081","건축자재등|3101","기꽂이대기타|3251");

    // 동건
    option_array[11] = new Array("-- 소분류|코드 --","차도정비|3012","인도정비|3022","볼라드정비|3024","경계석정비|3026","기타도로시설|3032","상품적치|3091","건축자재등|3102","맨홀정비|3141","맨홀설치|3142");

    // 동교
    option_array[12] = new Array("-- 소분류|코드 --","주정차표지판|3051","기타교통시설|3082","방치차량등|3241");

    // 동도
    option_array[13] = new Array("-- 소분류|코드 --","공원시설|3181","놀이터시설|3191","등산로시설|3201","기타녹지|3211","현수막|3221","광고물등|3231","도로복구|3233","정보지함기타|3261");

    // 동동
    option_array[14] = new Array("-- 소분류|코드 --","방치쓰레기등|3131","현수막|3222","광고물등|3232","정보지함|3262");

    // 동환
    option_array[15] = new Array("-- 소분류|코드 --","매연차량|3111");

    var frstSel = f.szHighType.selectedIndex;    //콘도명선택
    var areaSel = 0;                                            //선택된 지역콘도.
    for (loop = f.szLowType.options.length-1; loop > 0; loop--)
    {
        f.szLowType.options[loop] = null;
    }

    if(frstSel == 0){areaSel = 0;}
    else if(frstSel == 1 ){areaSel = 1;}
    else if(frstSel == 2 ){areaSel = 2;}
    else if(frstSel == 3 ){areaSel = 3;}
    else if(frstSel == 4 ){areaSel = 4;}
    else if(frstSel == 5 ){areaSel = 5;}
    else if(frstSel == 6 ){areaSel = 6;}
    else if(frstSel == 7 ){areaSel = 7;}
    else if(frstSel == 8 ){areaSel = 8;}
    else if(frstSel == 9 ){areaSel = 9;}
    else if(frstSel == 10 ){areaSel = 10;}
    else if(frstSel == 11 ){areaSel = 11;}
    else if(frstSel == 12 ){areaSel = 12;}
    else if(frstSel == 13 ){areaSel = 13;}
    else if(frstSel == 14 ){areaSel = 14;}
    else if(frstSel == 15 ){areaSel = 15;}
    else if(frstSel == 16 ){areaSel = 16;}


    for (loop = 0; loop < option_array[areaSel].length; loop++)
    {
        f.szLowType.options[loop] = new Option(option_array[areaSel][loop]);
    }
    f.szLowType.selectedIndex = 0;
}    


