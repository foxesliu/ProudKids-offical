//定义全局变量
var proudkidsInter = 'http://39.106.15.229:7892/';
//var proudkidsInter = 'http://192.168.1.192:8080/';
//var proudkidsInter = 'http://192.168.1.124:8081/';
var phoneRight = false,codeRight = false,passRight = false,nameRight = false,passTip = false;
var rand1 = 0;
var rand2 = 0;
var phoneText = '',codeTex = '',passText = '',nameText = '',enameText = '', gradText = '',phoneRemember = '';
var user = 0 ;       //0,不正确用户，1，新用户 2，老用户未领取 3，老用户已领取
var logStatu = 1;     //1，注册预约 2，登录 3，忘记密码
var grade = null, buttonCode = 0 , slideTrue = true; //未倒计时,是否能够滑动
var countdown;
//重置状态
function resetAll() {
    phoneRight = false,codeRight = false,passRight = false,nameRight = false;
    rand1 = 0;
    rand2 = 0;
    phoneText = '';
    codeTex = '';
    passText = '';
    nameText = '';
    enameText = '';
    gradText = '';
    user = 0 ;       //0,不正确用户，1，新用户 2，老用户未领取 3，老用户已领取
    logStatu = 1;     //1，注册预约 2，登录 3，忘记密码
    grade = null;
    slideTrue = true;

    buttonCode = 0;
    $('.grade-choose').stop().hide();
    $('.button-code').html('点击获取');
    $(".input-box input").attr("value","");
    $(".input-box").removeClass('active warn');
    $('.right-wrong').removeClass('icon-icon-cross2').addClass('icon-icon-close hidden');
    $('.tip-box,.tip-box-2,.tip-box-3,.tip-box-4').addClass('hidden');
    $('#l-password').attr("placeholder","密码");
    $('.login-box-1').children('.input-box').eq(2).find('span').removeClass('icon-icon-key4').addClass('icon-icon-key3');
    clearInterval(countdown);
}
//截取url参数
function GetRequest() {
    var url = location.search; //获取url中"?"符后的字串
    var theRequest = new Object();
    if (url.indexOf("?") != -1) {
        var str = url.substr(1);
        strs = str.split("&");
        for(var i = 0; i < strs.length; i ++) {
            theRequest[strs[i].split("=")[0]]=unescape(strs[i].split("=")[1]);
        }
    }
    return theRequest;
}
/*var Request = new Object();
Request = GetRequest();
var 参数1,参数2,参数3,参数N;
参数1 = Request[''参数1''];
参数2 = Request[''参数2''];
参数3 = Request[''参数3''];
参数N = Request[''参数N''];*/



//实时监控电话号码格式
function checkPhone(e) {
    console.log(e.target);
    phoneText = $(e.target).val();
    //console.log(phoneText)
    if(phoneText.length == 11 && (/^1[3|4|5|7|8][0-9]\d{4,8}$/.test(phoneText))){
        $(e.target).parent('.input-box').addClass('active').removeClass('warn');
        //console.log( $(e.target).siblings('.tip-box'))
        $(e.target).siblings('.tip-box').addClass('hidden');
        $(e.target).siblings('em').children('.right-wrong').removeClass('icon-icon-close hidden').addClass('icon-icon-cross2');
        phoneRight = true;
    }else {
        $(e.target).parent('.input-box').addClass('warn').removeClass('active');
        $(e.target).siblings('.tip-box').removeClass('hidden');
        $(e.target).siblings('em').children('.right-wrong').removeClass('icon-icon-cross2 hidden').addClass('icon-icon-close');
        phoneRight = false;
    }
}
//单次检测电话号码
function checkPhoneOnce(arg) {
    console.log(arg);
    phoneText = $(arg).val();
    //console.log(phoneText)
    if(phoneText.length == 11 && (/^1[3|4|5|7|8][0-9]\d{4,8}$/.test(phoneText))){
        $(arg).parent('.input-box').addClass('active').removeClass('warn');
        //console.log( $(e.target).siblings('.tip-box'))
        $(arg).siblings('.tip-box').addClass('hidden');
        $(arg).siblings('em').children('.right-wrong').removeClass('icon-icon-close hidden').addClass('icon-icon-cross2');
        phoneRight = true;
    }else {
        $(arg).parent('.input-box').addClass('warn').removeClass('active');
        $(arg).siblings('.tip-box').removeClass('hidden');
        $(arg).siblings('em').children('.right-wrong').removeClass('icon-icon-cross2 hidden').addClass('icon-icon-close');
        phoneRight = false;
    }
}
//实时监控手机验证码
function checkSms(e) {
    codeTex = $(e.target).val();
    //console.log(codeTex)
    if(codeTex.length == 6){
        $(e.target).parent('.input-box').addClass('active').removeClass('warn');
        $(e.target).siblings('.tip-box-2').addClass('hidden');
        codeRight = true;
    }else {
        $(e.target).parent('.input-box').addClass('warn').removeClass('active');
        $(e.target).siblings('.tip-box-2').removeClass('hidden');
        codeRight = false;
    }
}
//实时监控姓名
function checkName(e) {
    nameText = $(e.target).val();
    //console.log(nameText)
    if(nameText){
        $(e.target).parent('.input-box').addClass('active').removeClass('warn');
        nameRight = true;
    }else {
        $(e.target).parent('.input-box').addClass('warn').removeClass('active');
        nameRight = false;
    }
}
//实时监控英文姓名
function checkEname(e) {
    enameText = $(e.target).val();
    //console.log(enameText)
    if(enameText){
        $(e.target).parent('.input-box').addClass('active').removeClass('warn');
        enameRight = true;
    }else {
        $(e.target).parent('.input-box').addClass('warn').removeClass('active');
        enameRight = false;
    }
}
//实时监控登录密码
function checkPass(e) {
    passText = $(e.target).val();
    //console.log(passText)
    if(passText){
        $(e.target).parent('.input-box').addClass('active').removeClass('warn');
        $('.tip-box-4').addClass('hidden');
        passRight = true;
    }else {
        $(e.target).parent('.input-box').addClass('warn').removeClass('active');
        passRight = false;
    }
}


//,获取短信验证码
function getMassege() {

    if(phoneRight == false){
        $('.tip-box').removeClass('hidden')
        //alert('手机号不正确！')
    }else if(user == 0){
        //alert('请先滑动验证')
        $('#tip-box-1').remove();
        $('#mpanel4').append("<p id='tip-box-1' style='position: absolute;\n" +
            "          left:.75rem;\n" +
            "          bottom:0;\n" +
            "          margin-bottom: -.32rem;\n" +
            "          font-size:0.22rem;\n" +
            "          color:#fd5b58;'>验证错误，请重新滑动！</p>");
    }else{
        if(buttonCode=0){
            buttonCode = 1;
            $.ajax({
                url : proudkidsInter+'ruser/v1/sendSMS/'+phoneText,
                type : 'get',
                async : false,
                cache : false,
                dataType : 'json',
                success : function(data) {
                    console.log(data)
                    changeText();
                },
                error : function() {
                    console.log('提交失败')
                }
            })
        }else {
            $('.tip-box-2').removeClass('hidden').html('操作频繁，请稍后获取！')
            return false;
        }

    }

}
//倒计时60s
function changeText() {
    var rightTime = 60;
    $('.button-code').html('60秒');
    countdown = setInterval(function () {

        if(rightTime>0){
            buttonCode = 1;
            rightTime --;
            $('.button-code').html(rightTime+'秒');
        }else {
            clearInterval(countdown);
            buttonCode = 0;
            $('.button-code').html('点击获取');
        }
    },1000);
}
//滑块儿禁止
function stopSlide() {
    $('.verify-msg').css({'color':'#70e6e4'});
}
//确认预约体验课
function oppointNew() {
    if(phoneRight == false){
        $('.tip-box').removeClass('hidden')
        //alert('手机号不正确！')
    }else if(user == 0) {
        //alert('请先滑动验证')
        $('#tip-box-1').remove();
        $('#mpanel4').append("<p id='tip-box-1' style='position: absolute;\n" +
            "          left:.75rem;\n" +
            "          bottom:0;\n" +
            "          margin-bottom: -.32rem;\n" +
            "          font-size:0.22rem;\n" +
            "          color:#fd5b58;'>请先滑动验证！</p>");
        //新用户
    }else if(!codeRight){
        $('.tip-box-2').removeClass('hidden').show();
        setTimeout(function () {
            $('.tip-box-2').hide();
        },2000)
    }else{
        //console.log(typeof (codeTex))
        $.ajax({
            url : proudkidsInter+'ruser/v1/register',
            data : JSON.stringify({
                'phone' : phoneText,
                'usertype' : '1',
                'code' : codeTex
            }),
            type : 'post',
            async : false,
            cache : false,
            dataType : 'json',
            contentType:'application/json',
            success : function(data) {
                console.log(data)
                if(data.result.code==111){
                    //接口回掉成功新用户

                    //密码提示
                    passTip = true;
                    shadowToast('注册成功<br>密码手机后6位' ,3)

                }else if(data.result.code==333) {
                    console.log(data.result.message)
                    $('.tip-box-2').removeClass('hidden').html(data.result.message).show();
                    setTimeout(function () {
                        $('.tip-box-2').addClass('hidden');
                    },2000)
                }else{
                    console.log(data.result.message)
                    $('.tip-box-3').removeClass('hidden').html(data.result.message);
                    setTimeout(function () {
                        $('.tip-box-3').addClass('hidden');
                    },2000)
                }

            },
            error : function(data) {
                $('.tip-box-3').removeClass('hidden').html(data.message);
                setTimeout(function () {
                    $('.tip-box-3').addClass('hidden');
                },2000)
            }
        });
    }

    //接口回掉成功老用户

}
//领取体验课接口
function getLesson() {
//console.log(gradText);
    if(!$.trim(nameText)) {
        $('.tip-box-5').removeClass('hidden');
        setTimeout(function () {
            $('.tip-box-5').addClass('hidden')
        }, 2000)
    }else if(gradText == '' && gradText != '0'){
        $('.tip-box-6').removeClass('hidden');
        setTimeout(function () {
            $('.tip-box-6').addClass('hidden')
        }, 2000)
    }else {
        $.ajax({
            url : proudkidsInter+'ruser/v1/receive/class',
            data :JSON.stringify({
                "phone":phoneText,
                "name":nameText,
                "nickname":enameText,
                "years":gradText
            }),
            type : 'POST',
            async : false,
            cache : false,
            /*dataType : 'json',*/
            contentType:'application/json;charset=UTF-8',
            success : function(data) {
                console.log(data)
                //接口回掉成功
                /*$('form').hide();
                $('.appoint-success').removeClass('hidden').show();
                $('.form-header').hide();*/
                sessionStorage.setItem("authorization_code", data.result.authorization_code);
                sessionStorage.setItem("phone_num", phoneText);
                sessionStorage.setItem("inOrOut", true);
                window.location.href = './personal.html';
            },
            error : function(data) {
                $('.tip-box-3').removeClass('hidden').html(data.message);
                setTimeout(function () {
                    $('.tip-box-3').addClass('hidden');
                },2000)
            }
        });
    }

}

//登录注册接口
function loginPort() {
    console.log('登录')
    console.log(passRight)
    var usertype = 0;
    if(user==1){
        usertype = 1;
        if(!codeRight){
            $('.tip-box-2').removeClass('hidden');
            setTimeout(function () {
                $('.tip-box-2').addClass('hidden')
            },2000)
            return false;
        };
    }else{
        usertype = 0;
        codeTex = ''
    }
    if(phoneRight == false){
        $('.tip-box').removeClass('hidden')
        //alert('手机号不正确！')
    }else if(user == 0) {
        //alert('请先滑动验证')
        $('#tip-box-1').remove();
        $('#mpanel4').append("<p id='tip-box-1' style='position: absolute;\n" +
            "          left:.75rem;\n" +
            "          bottom:0;\n" +
            "          margin-bottom: -.32rem;\n" +
            "          font-size:0.22rem;\n" +
            "          color:#fd5b58;'>请先滑动验证！</p>");
        //新用户
    }else if(!passRight){
        $('.tip-box-4').removeClass('hidden');

    }else {
        $.ajax({
            url : proudkidsInter+'ruser/v1/loginorregister',
            data : {
                'phone':phoneText,
                'password':passText,
                'response_type':'code',
                'client_id':'proudkids_client',
                'usertype':usertype,
                'code':codeTex
            },
            type : 'post',
            async : false,
            cache : false,
            dataType : 'json',
            success : function(data) {
                console.log(data);
                if(data.code==200) {
                    if (user == 3) {
                        /*$('form').hide();
                        $('.appoint-success').removeClass('hidden').show();
                        $('.form-header').hide();*/
                        console.log(data.result.authorization_code)
                        sessionStorage.setItem("authorization_code", data.result.authorization_code);
                        sessionStorage.setItem("phone_num", phoneText);
                        sessionStorage.setItem("inOrOut", true);
                        window.location.href = './personal.html';
                    } else {
                        $('form').hide();
                        $('.child-info').removeClass('hidden').show();
                    }
                }else if(data.code == 222){
                    $('.tip-box-2').removeClass('hidden').html(data.message);
                    setTimeout(function () {
                        $('.tip-box-2').addClass('hidden')
                    },2000)
                    return false;
                }else {
                    $('.tip-box-4').removeClass('hidden').html(data.message);
                    setTimeout(function () {
                        $('.tip-box-4').addClass('hidden')
                    },2000)
                }


            },
            error : function(data) {
                $('.tip-box-3').removeClass('hidden').html(data.message);
                setTimeout(function () {
                    $('.tip-box-3').addClass('hidden');
                },2000)
            }
        });
    }

}
//找回密码接口
function regetCode() {
    var newpassword = $('#f-password').val();

    var usertype = 0;
    if(user==1){
        usertype = 1;
    }else{
        usertype = 0;
    }
    if(phoneRight == false){
        $('.tip-box').removeClass('hidden')
        //alert('手机号不正确！')
    }else if(user == 0) {
        //alert('请先滑动验证')
        $('#tip-box-1').remove();
        $('#mpanel4').append("<p id='tip-box-1' style='position: absolute;\n" +
            "          left:.75rem;\n" +
            "          bottom:0;\n" +
            "          margin-bottom: -.26rem;\n" +
            "          font-size:0.22rem;\n" +
            "          color:#fd5b58;'>请先滑动验证！</p>");
        //新用户
    }else if(!codeRight) {
        $('.tip-box-2').removeClass('hidden');
    }else if(!passRight){
        $('.tip-box-4').removeClass('hidden');
    }else {
        $.ajax({
            url : proudkidsInter+'ruser/v1/getback/password',
            data : JSON.stringify({
                'phone': phoneText,
                'code': codeTex,
                'newpassword': newpassword
            }),
            type : 'post',
            async : false,
            cache : false,
            contentType: 'application/json',
            dataType : 'json',
            success : function(data) {
                console.log(data)
                if(data.code == 200){
                    //修改成功，
                    if(data.success == false){
                        $('.tip-box-2').removeClass('hidden').show();
                        setTimeout(function () {
                            $('.tip-box-2').hide();
                        },2000)
                    }else {
                        shadowToast('修改成功，请登录！')
                    }

                }

            },
            error : function(data) {
                $('.tip-box-3').removeClass('hidden').html(data.message);
                setTimeout(function () {
                    $('.tip-box-3').addClass('hidden');
                },2000)
            }
        });
    }

}

var getOffsetLeft = function(obj){
    var tmp = obj.offsetLeft;
    var val = obj.offsetParent;
    while(val != null){
        tmp += val.offsetLeft;
        val = val.offsetParent;
    }
    return tmp;
}

$(document).ready(function () {
    //url读取页面初始状态
    var Request = new Object();
    Request = GetRequest();
    var pageStatus =  Request['pageStatus'];
    console.log(pageStatus)

    resetAll();
    if(pageStatus){
        choosePages(pageStatus);
    }

    //默认显示注册预约

    $('.grade-choose').stop().hide();
    $('.choose-grade-box').click(function () {
        $('.grade-choose').stop().slideToggle(function () {
            if($(this).is(":visible")){
                $('.arc-three').removeClass('arc-up').addClass('arc-down');
            }else{
                $('.arc-three').removeClass('arc-down').addClass('arc-up');
            }
        });

    })

    $('.grade-choose').children('li').click(function () {
        grade = this.innerHTML
        gradText = $(this).index();
        console.log(gradText)
        $('#a-grade').val(grade);

        /*if(passText){
            $(e.target).parent('.input-box').addClass('active').removeClass('warn');
            $('.tip-box-4').addClass('hidden');
            passRight = true;
        }else {
            $(e.target).parent('.input-box').addClass('warn').removeClass('active');
            passRight = false;
        }*/
        $('.choose-grade-box').addClass('active').removeClass('warn');

    })



    //顶部大块儿n
    $('.form-control').click(function () {

        resetAll();
        var pageStatus = $(this).index();
        choosePages(pageStatus);


    })
});

function choosePages(pageStatus) {
    resetAll();
    $('.form-control').removeClass('active');
    $('.form-control').eq(pageStatus/2).addClass('active');

    $('#mpanel4').remove();
    var mpanel = document.createElement('div');
    mpanel.setAttribute('id','mpanel4');
    //注册预约
    if(pageStatus == 0){
        logStatu = 1;
        $('form').hide();
        $('.oppoint-form').removeClass('hidden').show();
        //target.insertBefore(newChild,existingChild)
        $('.oppoint-form')[0].insertBefore(mpanel,($('.oppoint-form').children('div').eq(1)[0]));
        initalSlide();
        //登录
    }else if(pageStatus == 2){

        logStatu = 2;
        $('form').hide();
        $('.login-box-1').removeClass('hidden').show();
        $('.login-box-1')[0].insertBefore(mpanel,($('.login-box-1').children('div').eq(1)[0]));
        $('.login-check-position').addClass('hidden'); //默认隐藏
        initalSlide();
        if(phoneRemember){
            $('#l-phone').val(phoneRemember);
            console.log(phoneText)
            checkPhoneOnce($('#l-phone')[0])
            phoneRemember = '';
        }else {
            return false
        }

        //忘记密码
    }else {

        logStatu = 3;
        $('form').hide();
        $('.forget-box-1').removeClass('hidden').show();
        $('.forget-box-1')[0].insertBefore(mpanel,($('.forget-box-1').children('div').eq(1)[0]));
        initalSlide();
    }
}
//滑动成功，图片框效果
function slideSuccess(arg) {
    $('.slide-success').removeClass('hidden');
    $('#slid-gif').remove();

    //var slidGif = "<img id=\"slid-gif\" src=\"images/login/slide-success.png\">";
    var slidGif = "<svg style=\"width: 2rem;height: 2rem;\"  viewBox=\"222 122 225 125\" xmlns=\"http://www.w3.org/2000/svg\">\n" +
        "    <!--<path\n" +
        "            d=\"m74.5,89c1,1 0.7435,1.796997 0,3c-1.662506,2.689995 -1.385094,5.372017 -4,9c-0.826904,1.14727 -2.380554,2.763046 -6,9c-1.122341,1.933998 -4.224205,7.902824 -5,10c-1.430496,3.866997 -1.793934,7.08744 -4,12c-2.748055,6.119492 -4.231731,9.927673 -6,16c-1.152771,3.958679 -0.511269,5.029968 -1,9c-0.503773,4.092209 -1,8 -1,11c0,4 0,7 0,9c0,4 0,7 0,9c0,4 2.224205,6.902832 3,9c1.430496,3.867004 2.385098,6.372009 5,10c2.480717,3.441803 6.198921,5.532364 9,7c4.428894,2.320526 7.823746,4.486252 10,5c3.892998,0.919006 8,0 13,0c4,0 6.888557,-0.194092 12,-3c5.880447,-3.228043 13.513,-9.733566 18,-19c5.665611,-11.70047 6.835007,-21.014893 8,-33c0.876091,-9.012909 1,-19 1,-28c0,-10 0,-15 0,-21c0,-4 -1.617317,-7.076118 -2,-8c-0.541199,-1.306564 -2,-2 -3,-2c-1,0 -2.152245,-0.765366 -4,0c-2.613129,1.08239 -4.729622,6.228851 -9,11c-1.886337,2.107544 -4.496223,7.907784 -5,12c-0.488731,3.970032 -2,9 -2,13c0,4 0,6 0,10c0,5 0,8 0,10c0,4 0.337494,5.310013 2,8c0.7435,1.203003 1.386871,2.917603 4,4c0.923882,0.38269 3.080254,0.689255 6,0c2.176254,-0.513748 4.718987,-3.310211 8,-6c5.576653,-4.571762 13.042938,-9.925766 20,-14c5.031631,-2.946655 13.891708,-8.195755 21,-12c7.885941,-4.220428 16.667084,-6.943726 24,-9c6.808441,-1.909195 14.074814,-0.519623 22,-2c8.106003,-1.51416 13.851593,-2.99511 24,-4c5.970795,-0.591225 11,0 18,0c5,0 9.953308,-0.499031 18,-1c4.990326,-0.310684 12,0 17,0c4,0 8,0 12,0c1,0 2.186005,-0.307449 4,1c1.147278,0.826904 2.493469,2.878555 3,6c0.48056,2.961258 2.376678,7.887314 4,14c2.617523,9.8564 6.499634,19.971207 7,33c0.537262,13.989685 1,26 1,41c0,12 0,26 0,36c0,7 0.977478,16.059937 0,24c-1.007538,8.184418 -4.077637,14.558014 -8,20c-5.78833,8.030884 -10.907776,9.496216 -15,10c-3.970032,0.488739 -10,0 -19,0c-9,0 -18.894653,-1.197296 -30,-7c-7.927338,-4.142151 -19.236221,-11.795441 -27,-21c-8.25679,-9.789063 -13.711609,-22.092255 -18,-35c-4.687119,-14.107834 -7,-28 -7,-40c0,-12 -1.597351,-23.116592 0,-34c1.516068,-10.329651 6,-18 11,-27c5,-9 12.358612,-16.467445 20,-22c6.326187,-4.580322 12.886826,-10.295464 23,-14c8.90799,-3.263069 20.813873,-4.879005 33,-7c9.901031,-1.723274 19,-1 24,-1c6,0 8,0 13,0c3,0 3.852722,0.173096 5,1c1.813995,1.307449 2.679626,2.025826 3,4c0.506531,3.121445 1,5 1,10c0,4 0,7 0,9c0,4 1.579926,7.783798 -1,11c-1.39917,1.744232 -7.951385,7.065948 -12,10c-9.883942,7.162933 -18.967316,13.059311 -28,18c-12.953674,7.085373 -24.722778,14.54303 -40,22c-17.701553,8.64032 -29.891296,15.263245 -49,23c-17.901581,7.248001 -33.896057,15.198013 -49,23c-13.906708,7.183563 -28.085884,15.851547 -42,24c-10.063255,5.893311 -17.617165,10.126862 -25,16c-3.320198,2.641266 -5.714119,6.21167 -8,9c-2.689789,3.281006 -3.877655,5.06601 -5,7c-1.809723,3.118469 -2.707108,5.292908 -2,6c0.707108,0.707092 1.823746,0.486267 4,1c0.973251,0.229767 2.920341,1.167969 7,3c4.91256,2.206055 8.480156,4.092773 16,7c8.599274,3.324524 16.496246,7.13623 29,12c13.569763,5.278412 29.88945,11.245544 43,17c11.903839,5.224792 23.174881,7.58786 33,12c10.199158,4.580109 17.156876,7.579712 23,10c4.131714,1.711426 7.418854,2.418854 9,4c1.581146,1.581146 2,3 3,3l1,1\"\n" +
        "            id=\"svg_1\" stroke-width=\"4\" stroke=\"#000\" fill=\"none\"/>-->\n" +
        "    <path\n" +
        "            stroke-linecap=\"round\"\n" +
        "        d=\"M284.427782,140.173129 C295.534782,130.346129 310.281782,124.538129 326.388782,125.028129 C358.815782,126.016129 384.929782,152.925129 384.999782,185.366129 C385.073782,219.502129 356.876782,247.069129 322.510782,245.968129 C291.517782,244.974129 265.993782,220.227129 264.114782,189.274129 C263.552782,180.017129 265.073782,171.174129 268.254782,163.170129 C269.468782,160.115129 273.426782,159.313129 275.747782,161.641129 L311.815782,197.815129 C314.678782,200.678129 319.321782,200.678129 322.184782,197.815129 L352.999782,166.999129\"\n" +
        "        id=\"svg_1\" stroke-width=\"7\" stroke=\"#ffffff\" fill=\"none\"/>\n" +
        "\n" +
        "</svg>";
    $('.slide-success').append(slidGif);

    var path = document.querySelector('path');
    var len = path.getTotalLength();
    console.log("总长度 : " + len);
    //代码获取长度并设置动画相关属性
    //定义实线和空白区域长度
    path.style.strokeDasharray = len + 10;
    //定义初始dash部分相对起始点的偏移量,正数表示往前便宜
    path.style.strokeDashoffset = len + 10;
    console.log(path.style.strokeDashoffset + 'all')
    var initial_ts = new Date().getTime();
    var duration = 500;


    var draw = function () {
        var progress = (Date.now() - initial_ts) / duration;
        if (progress < 1.8 ) {

            if(path.style.strokeDashoffset< -390){
                path.style.strokeDashoffset = -390;
            }else {
                path.style.strokeDashoffset = Math.floor(len * (1 - progress));
                //console.log(path.style.strokeDashoffset + 'right')
                setTimeout(draw, 2);
            }


        }else {
            path.style.strokeDashoffset = 0;
        }
    };
    draw();

    //this.htmlDoms.sub_block.css("display","none");
    $('.verify-gap').css("display","none");
    setTimeout(function () {
        $('#slide-gif').remove();
        //$('#slide-gif').attr("src","images/login/slide-success.png")

        $('.slide-success').addClass('hidden');
        $('.verify-img-out').css("display","none");
        if(user == 2 && logStatu == 1){
            shadowToast('您已注册，请登录',2);
        }else if(user == 3 && logStatu == 1){
            shadowToast('您已注册，请登录',2);
        }else if(user == 1 && logStatu ==3){
            shadowToast('您未注册，请注册',2);
        }else {
            return;
        }


        //choosePages(arg)
    },2000)
}
//透明弹窗
function shadowToast(texts ,num) {

    var shadow = "<div id='shadow' style='position:fixed;z-index:30000;top:-2rem;width: 100%;height:150%;background-color:rgba(83,20,20,.73);'></div>"
    var alertBox = "<div id='alert-box' style='position: fixed;\n" +
        "  z-index: 30001;\n" +
        "  left: 50%;\n" +
        "  top: 50%;\n" +
        "  width: 3.6rem;\n" +
        "  height: 3.14rem;\n" +
        "  -webkit-transform: translate(-50%,-50%);\n" +
        "   -moz-transform: translate(-50%,-50%);\n" +
        "  -o-transform: translate(-50%,-50%);\n" +
        "  transform: translate(-50%,-50%);\n" +
        "  background-color: #ffffff;\n" +
        "  border-radius:.36rem;\n" +
        "  text-align: center;'><h4 id='txt1' style='font-size: .36rem;\n" +
        "  color: #ff7d7b;padding-top:.62rem;line-height: .36rem;display: block;width: 100%;'></h4><p style=' font-size: .24rem;\n" +
        "  color: #a2a2a2;padding-top: .2rem;padding-bottom:.44rem;'>点击确定返回</p><a onclick='nextPage()' style='display: block;\n" +
        "  width: 1.62rem;\n" +
        "  height:.56rem;\n" +
        "  border-radius: .28rem;\n" +
        "  background-color: #fd5b58;\n" +
        "  text-align: center;\n" +
        "  line-height: .56rem;\n" +
        "  color: #ffffff;\n" +
        "  font-size: .28rem;\n" +
        "  margin: auto; cursor: pointer'>确定</a></div>";

    // 追加新元素
    $('body').append(alertBox);
    $('body').append(shadow);
    $('#txt1').html(texts);
}
function nextPage() {
    console.log(phoneRemember)
    $('#shadow,#alert-box').remove();
    /*if(user == 1 || user ==2){
        if(logStatu ==1){
            choosePages(2);
        }

    }else if(user == 3 && logStatu == 3){
        choosePages(2)
    }*/
    if(user == 2 && logStatu == 1){
        choosePages(2)
    }else if(user == 3 && logStatu == 1){
        choosePages(2);
    }else if(user == 1 && logStatu ==3) {
        choosePages(2)
    }else if(user == 1 && logStatu ==1){
        $('form').hide();
        $('.child-info').removeClass('hidden').show();
    }else if(user == 2 && logStatu == 3) {
        choosePages(2);
    }else if(user == 3 && logStatu == 3){
        choosePages(2);
    }else {
        return;
    }
}