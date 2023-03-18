
function deptSel(f)
{

    var option_array = new Array(9);

    //기본선택
    option_array[0] = new Array("--과 선택--");

    //기획관리실
    option_array[1] = new Array("--과 선택--", "기획예산담당관실", "문화공보담당관실", "정보통신담당관실");

    //총무국
    option_array[2] = new Array("--과 선택--", "총무과","주민자치과", "회계과", "민원봉사과");

    //재정 경재국
   option_array[3] = new Array("--과 선택--","세무과","지역경제과","농림과","지적과");

   //환경복지국
    option_array[4] = new Array("--과 선택--", "사회복지과", "여성청소년과", "환경위생과", "청소행정과", "상수도과", "하수도과");

    //건설교통국
    option_array[5] = new Array("--과 선택--","도시계획과","건설과","도로과","교통행정과","주택과");

    //직속기관
    option_array[6] = new Array("--과 선택--","보건관리과","농업기술센터");

    //사업소
    option_array[7] = new Array("--사업소 선택--", "환경사업소", "체육시설관리사무소", "경량전철건설사업단", "정보도서관");

    //동사무소
    option_array[8] = new Array("--동사무소 선택--","의정부1동 사무소","의정부2동사무소","의정부3동사무소","호원1동사무소","호원2동사무소", "장암동","신곡1동사무소","신곡2동사무소","송산1동사무소","송산2동사무소","자금동사무소", "가능1동사무소", "가능2동사무소", "가능3동사무소", "녹양동사무소");

     var selIndex = f.SELDEPT1.selectedIndex;

        for (loop = f.SELDEPT2.options.length-1; loop > 0; loop--)
        {
            f.SELDEPT2.options[loop] = null;
        }

        for (loop = 0; loop < option_array[selIndex].length; loop++)
        {
            f.SELDEPT2.options[loop] = new Option(option_array[selIndex][loop]);
        }
        f.SELDEPT2.selectedIndex = 0;
}

