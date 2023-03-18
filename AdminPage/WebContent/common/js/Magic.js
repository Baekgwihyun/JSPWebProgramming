/**
* #PGM_NAME        Magic.js (/ams/common/js/Magic.js)
* #DESC            마법사 처리
*
* @ author         이용회
**********************************************************************************************
* @                     Modification   Log
* @     DATE                AUTHOR                DESCRIPTION
* @   2003.05.27            이용회                최초 작성
**********************************************************************************************
*/
var backupStep=0;
var returnStep=0;

//단계 초기화를 실행하며 MagicTop에서 onload시에 실행하여 단계값을 입력한다.
function init(currStep)
{
    parent.moveTo(0, 0);

    FrmTop.statusImgURL=statusImgURL;
    FrmTop.commentArr1=commentArr1;
    FrmTop.commentArr2=commentArr2;
    FrmTop.init(currStep);

    step=(--currStep);
    next();
}

//앞으로 갈 단계를 변경한다.
function setNextStep(nStep)
{
    step=nStep-1;
}

//뒤로 갈 단계를 변경한다.
function setPrevStep(nStep)
{
    step=nStep+1;
}

//단계를 변경하여 이전으로 갈때 변경전 단계로 이동한다.
function newStep(nStep)
{
    if(returnStep==0)
    {
        backupStep=nStep;
        returnStep=step;
    }
    step=nStep-1;
}

//이전 단계로 돌아간다.
function prev(bPrevCheck)
{
    if(bPrevCheck==null) bPrevCheck=true;
    if(bPrevCheck && FrmBody.location!='about:blank')
        //다음단계로 넘어가도 되는지 유효성 검사를 각 작업페이지에 부여한다.
        if(!FrmBody.prevPage()) return;

    //alert('backupStep : '+backupStep+'\nreturnStep : '+returnStep+'\nstep : '+step);
    if(backupStep==step)
    {
        step=returnStep-1;
        next(false);
        returnStep=0;
        return;
    }

    if(step<2) return;

    topInit(--step);

    //실제 Body 이전 작업 내용을 처리한다.
    FrmBody.location.href=ancStep[step-1]+getParam();

    if(step==1) footImg('FootPrevBtn', 'none');
    else footImg('FootPrevBtn', '');
    if(!footImg('FootNextBtn', '')) footImg('FootNextBtn', '');
}

//다음 단계로 돌아간다.
function next(bNextCheck)
{
    if(bNextCheck==null) bNextCheck=true;
    if(bNextCheck && FrmBody.location!='about:blank')
        //다음단계로 넘어가도 되는지 유효성 검사를 각 작업페이지에 부여한다.
        if(!FrmBody.nextPage()) return;

    //alert('backupStep : '+backupStep+'\nreturnStep : '+returnStep+'\nstep : '+step);

    step++;

    if(ancStep.length<step || ancStep[step-1]=='')
    {
        alert(step+' 단계의 작업이 준비되어 있지 않습니다.');
        prev();
        return;
    }

    topInit(step);

    //실제 Body 다음 작업 내용을 처리한다.
    FrmBody.location.href=ancStep[step-1]+getParam();

    footImg('FootPrevBtn', 'none');
    if((step-1)>=1) footImg('FootPrevBtn', '');

    if(endStep==step)
        if(!footImg('FootNextBtn', 'none')) footImg('FootNextBtn', 'none');
}

//마법사를 종료한다.
function exit()
{
    if(!confirm('마법사를 종료하시겠습니까?')) return;
    parent.close();
}



//상단내용들을 초기화 한다.
function topInit(newStep)
{
    FrmTop.init(newStep);
}

//하단의 이전, 다음 이미지를 조작한다.
function footImg(imgName, visible)
{
    var obj=FrmFoot.document.all(imgName);
    if(obj!=null) obj.style.display=visible;
    else return false;
    return true;
}