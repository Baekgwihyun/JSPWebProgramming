//Cookies 컨트롤
//쿠키는 2차원 배열이상은 존재하지 않는다.(최고 2차원 배열)

function Cookies_Control(){
	
	this.name = "Cookies_Control";
	
	//대분류값 찾기
	this.Ext_LSeq_Cookies = function(){
	
		var SeqOfCookies, Cookies_Seq;
		var Cookies_Arr;
		var x;
		
		Cookies_Seq = arguments[0];
		SeqOfCookies = Cookies_Seq + "=";
		
		//쿠키값 있음
			Cookies_Arr = document.cookie.split(";");
			x = 0;
			for(i=0;i<Cookies_Arr.length;i++){
				//선택한 대분류의 쿠키값이 있는 경우
				if((Cookies_Arr[i]).indexOf(SeqOfCookies) != -1){
					x++;
					
					//대분류의 값에 속해있는 중분류 쿠키값들(&로 구별지어져있음)
					return (Cookies_Arr[i].substring(Cookies_Arr[i].indexOf("=")+1,Cookies_Arr[i].length));
					break;
				}
			}
			if(x == 0){
				return "";
			}
	};
	
	//중분류값 찾기
	this.Ext_MSeq_Cookies = function(){			
		var Cookies_Split;
		var Cookies_Value, C_Val, C_Name;
		var x;
		var offSet_Cookies;
		
		offSet_Cookies = this.Ext_LSeq_Cookies(arguments[0])
		if(offSet_Cookies != ""){
			if(offSet_Cookies.indexOf("&") != -1){
				//2차원 쿠키
				Cookies_Split = offSet_Cookies.split("&");
				
				x = 0;
				for(i=0;i<Cookies_Split.length;i++){
					Cookies_Value = Cookies_Split[i].split("=")
					C_Val = Cookies_Value[0]
					C_Name = Cookies_Value[1]
					if(C_Val == arguments[1]){
						x = x + 1
						return C_Name;
					}
				}
				
				if(x == 0){
					return "";
				}
			}
			else{
				if(offSet_Cookies.indexOf("=") != -1){
					//2차원 쿠키(한개존재시 &가 없다)
					Cookies_Split = offSet_Cookies.split("=")
					if(Cookies_Split[0] == arguments[1]){
						return Cookies_Split[1];
					}
					else{
						return "";
					}
				}
				else{
					//1차원 쿠키
					return offSet_Cookies;
				}
				
			}
		}
		else{
			return "";
		}
		
	};
	
	//쿠키값 생성, 수정 및 삭제(대분류명, 중분류명, 중분류값, 만료시간 - 대분류명이 없으면 1차원 쿠키) 
	this.Create_Cookies = function(){
		var L_Seq, M_Seq, Value, Expire;
		var Exp_Day, vExp_Date, C_Val, C_Val_M
		var Spt_Arr, Spt_Spt_Arr, Spt_Check_Cook
		Check_Cook = ""
		Spt_Check_Cook = ""
		
		L_Seq = arguments[0];
		M_Seq = arguments[1];
		Value = arguments[2];
		Expire = arguments[3];
		
		vExp_Date = "";
		//만료 시간 설정
		if(Expire != ""){
			Exp_Day = new Date();

			Exp_Day.getDate(Exp_Day.getDate() + (Expire));
			vExp_Date = Exp_Day.toGMTString();
		}
		
		if(M_Seq == ""){
			C_Val = (Value);
		}
		else{
			//대분류의 값만 추출한다
			Check_Cook = this.Ext_LSeq_Cookies(L_Seq);
			
			if(Check_Cook != ""){
			//대분류의 값이 존재하는 경우
				//추출된 값은 unescape된 값이므로 다시 풀어서 escape해준다
				Spt_Check_Cook = "";
				if(Check_Cook.indexOf("&") == -1){
					//한개의 단일 값인 경우
					Spt_Arr = Check_Cook.split("=");
					Spt_Check_Cook = Spt_Arr[0] + "=" + (Spt_Arr[1]);
					
				}
				else{
					//2개이상의 값인 경우
					Spt_Arr = Check_Cook.split("&");
					for(i=0;i<Spt_Arr.length;i++){
						Spt_Spt_Arr = Spt_Arr[i].split("=");
						Spt_Check_Cook = Spt_Check_Cook + Spt_Spt_Arr[0] + "=" + (Spt_Spt_Arr[1]);
						if(i < Spt_Arr.length - 1 ){
							Spt_Check_Cook = Spt_Check_Cook + "&"
						}
					}
				}
				
				C_Val_M = this.Ext_MSeq_Cookies(L_Seq, M_Seq)
				//중분류의 값이 존재하는 경우
				if(C_Val_M != ""){
					C_Val = Spt_Check_Cook.replace(M_Seq + "=" + (C_Val_M), M_Seq + "=" + (Value));
				}
				else{
					C_Val = Spt_Check_Cook + "&" + M_Seq + "=" + (Value);
				}
			}
			else{
				//대분류의 값이 없는 경우(처음 생성)
				C_Val = M_Seq + "=" + (Value);
			}
		}
		document.cookie = L_Seq + "=" + C_Val + "; expires=" + vExp_Date;
	};
}
