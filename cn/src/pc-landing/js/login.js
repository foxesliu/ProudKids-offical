var buttonCode = 0;
var phoneText = ''; //手机号码
var baseUrl = 'https://ce.proudkids.cn';
//var baseUrl = 'http://192.168.1.80:9527'
var token = '';
var cid = null;
var ruserId = 148;
var newpassword;
//设置cookie
function setCookie(name, value, iDay, iPath) {
    var oDate = new Date();
    iDay = arguments[2] ? arguments[2] : 1;
    iPath = arguments[3] ? arguments[3] : "/";
    oDate.setDate(oDate.getDate() + iDay);
    document.cookie = name + "=" + encodeURIComponent(value) + ";expires=" + oDate + ";path=" + iPath;
}

function getCookie(name) {
    var arr = document.cookie.split("; ");
    for (var i = 0; i < arr.length; i++) {
        var arr2 = arr[i].split("=");
        if (arr2[0] === name) {
            return decodeURIComponent(arr2[1]);
        }
    }
    return "";
};
//获取url参数
function getRequest() {
    var url = location.search;
    var theRequest = {};
    if (url.indexOf("?") != -1) {
        var str = url.substr(1);
        strs = str.split("&");
        for (var i = 0; i < strs.length; i++) {
            theRequest[strs[i].split("=")[0]] = decodeURI(strs[i].split("=")[1]);
        }
    }
    return theRequest;
};
$(window).ready(function() {
    phoneText = localStorage.getItem('phoneText');
    cid = sessionStorage.getItem('cid');
    console.log(cid)
    if (cid == undefined || cid == 'undefined') {
        cid = 122682;
    };
    console.log(cid)
    $('#phone').val(phoneText);
    if ($('#phone').val()) {
        $('#phone').siblings('label').removeClass('canSee');
    }
    //cid = getRequest().cid
});
//注册
$(function() {
    $('#phone').change(function() {
        phoneText = $.trim($('#phone').val());
        if (phoneText.length == 11 && (/^1[3|4|5|7|8][0-9]\d{4,8}$/.test(phoneText))) {
            $('#phone').siblings('p').addClass('hidden');
        } else {
            $('#phone').siblings('p').removeClass('hidden');
        }
        if (phoneText.length == 0) {
            $('#phone').siblings('p').addClass('hidden');
        }
    })
    $('#next-step').click(function() {
        checkSms();
    });

    $('#get-message').click(function() {
        getCode();
    });
    //实时监控电话号码格式
    function checkPhone(e) {

    }

    function checkPhoneOnce() {
        phoneText = $.trim($('#phone').val());
        console.log(phoneText)
        if (phoneText.length == 11 && (/^1[3|4|5|7|8][0-9]\d{4,8}$/.test(phoneText))) {
            getCode();
        } else {
            $('#phone').siblings('p').removeClass('hidden');
        }
    };
    //获取验证码
    function getCode() {
        console.log(phoneText)
        if (buttonCode == 1) {
            console.log('发送频繁，请稍后')
            return false
        } else {
            console.log('进入')
            buttonCode = 1;
            changeText();
            $.ajax({
                //url: 'https://wechat.proudkids.cn/packGroupController.do?sendSMS&phone=' + phoneText,
                url: baseUrl + '/admin//smsCode/' + phoneText,
                type: 'get',
                async: false,
                cache: false,
                dataType: 'json',
                success: function(data) {
                    console.log(data);
                    //changeText();
                },
                error: function() {
                    console.log('获取失败')
                }
            })
        }
    };

    function changeText() {
        var rightTime = 60;
        $('#get-message').html('60秒');
        countdown = setInterval(function() {
            if (rightTime > 0) {
                buttonCode = 1;
                rightTime--;
                $('#get-message').html(rightTime + '秒');
            } else {
                clearInterval(countdown);
                buttonCode = 0;
                $('#get-message').html('点击获取');
            }
        }, 1000);

    };
    //验证码正确错误
    function checkSms() {
        //接口回掉成功新用户
        phoneText = $.trim($('#phone').val());
        var smsCode = $('#message').val();
        if (phoneText.length == 11 && (/^1[3|4|5|6|7|8][0-9]\d{4,8}$/.test(phoneText))) {
            if ((/^\d{4}$/.test(smsCode))) {
                $.ajax({
                    //url: 'https://wechat.proudkids.cn/packGroupController.do?checkPhone&phone=' + phoneText + '&userCode=' + smsCode,
                    url: baseUrl + '/auth/ruser/mobile/token?mobile=' + phoneText + '&code=' + smsCode + '&cid=' + cid + '&grant_type=mobile&scope=server',
                    type: 'post',
                    async: false,
                    cache: false,
                    dataType: 'json',
                    success: function(data) {
                        var data = data
                        console.log(data);
                        token = data.value;
                        //接口回掉成功新用户
                        ruserId = data.ruserId;
                        localStorage.setItem('ruserId', data.ruserId);
                        localStorage.setItem('isComplete', data.isComplete);
                        localStorage.setItem('ruserId', data.ruserId);

                        setCookie('token', data.oauth2.value);
                        setCookie('refreshToken', data.oauth2.refreshToken.value);

                        $('#message').siblings('p').addClass('hidden');
                        $('#phone').siblings('p').addClass('hidden');
                        token = data.oauth2.value;
                        console.log(data.oauth2.value);
                        if (data.isComplete) {
                            $('.content-box').addClass('hidden');
                            $('.success').removeClass('hidden');
                        } else {
                            $('.content-box').addClass('hidden');
                            $('.content-box-1').removeClass('hidden');
                        }
                    },
                    error: function() {
                        $('#message').siblings('p').removeClass('hidden');
                    }
                });
            } else {
                $('#message').siblings('p').removeClass('hidden');
            }
        } else {
            $('#phone').siblings('p').removeClass('hidden');
        }
    }

})

//~~~~~~~~~~~~~~~~~~~~~~~~新用户完成name提交~~~~~~~~~~~~~~~~

$(function() {
    var type = 0;
    var name = '';
    var enName = '';
    var grade = null;
    $('.all').hide();
    $('#trigger1').click(function() { //下拉动态效果
        $('.all').slideToggle(300);
        if ($('#trigger1 span').hasClass('rotate')) {
            $('#trigger1 span').removeClass('rotate');
        } else {
            $('#trigger1 span').addClass('rotate');
        }
    })
    $('.all li').click(function() {
        if ($('#trigger1 span').hasClass('rotate')) {
            $('#trigger1 span').removeClass('rotate');
        } else {
            $('#trigger1 span').addClass('rotate');
        }
        $(this).addClass('selected')
        $(this).siblings().removeClass('selected');
        $('#trigger1 .level').text($('.all .selected').text().substring(0, 6))
        $('#trigger1 .levelNum').text($('.all .selected').text().substring(6, 7))
        if ($('.all .selected').text().substring(6, 7) == 1) {
            grade = 1
        } else if ($('.all .selected').text().substring(6, 7) == 2) {
            grade = 2
        } else if ($('.all .selected').text().substring(6, 7) == 3) {
            grade = 3
        } else if ($('.all .selected').text().substring(6, 7) == 4) {
            grade = 4
        } else if ($('.all .selected').text().substring(6, 7) == 5) {
            grade = 5
        } else if ($('.all .selected').text().substring(6, 7) == 6) {
            grade = 6
        } else {
            grade = '0'
        }
        $('#trigger1').siblings('p').addClass('hidden');
        $('#trigger1').siblings('label').removeClass('canSee');
        console.log(grade)
        $('.all').slideUp(300);
    })
    $('#name').change(function() {
        $('#name').siblings('p').addClass('hidden');
    });

    $('#complete-button').click(function() {
        name = $('#name').val()
        enName = $('#enName').val()
        console.log(grade)
        if (!name) {
            $('#name').siblings('p').removeClass('hidden');
        }
        if (!enName) {
            $('#enName').siblings('p').removeClass('hidden');
        }
        if (grade == null) {
            $('#trigger1').siblings('p').removeClass('hidden');
        }
        if (name && grade) {
            $.ajax({
                //url: 'https://wechat.proudkids.cn/packGroupController.do?enrollSubmit&phone=' + phoneText + '&type=' + type + '&name=' + name + '&level=' + level,
                url: baseUrl + '/ruser/v1/ruser/v3/edit-ruser',
                type: 'put',
                async: false,
                cache: false,
                headers: {
                    'Authorization': 'Bearer ' + token
                },
                contentType: "application/json",
                data: JSON.stringify({
                    'name': name,
                    'enName': enName,
                    'grade': grade,
                    'ruserId': ruserId,
                }),
                dataType: 'json',
                success: function(data) {
                    console.log(data);
                    //接口回掉成功新用户
                    $('.content-box-1').addClass('hidden');
                    $('.success').removeClass('hidden')
                },
                error: function(data) {
                    console.log(data)
                }
            });
        }

    })
});