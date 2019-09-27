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

//判断浏览器
$(function() {
    var sfBrowser = {
        versions: function() {
            var u = navigator.userAgent,
                app = navigator.appVersion;
            return { //移动终端浏览器版本信息
                trident: u.indexOf('Trident') > -1, //IE内核
                presto: u.indexOf('Presto') > -1, //opera内核
                webKit: u.indexOf('AppleWebKit') > -1, //苹果、谷歌内核
                gecko: u.indexOf('Gecko') > -1 && u.indexOf('KHTML') == -1, //火狐内核
                mobile: !!u.match(/AppleWebKit.*Mobile.*/), //是否为移动终端
                ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), //ios终端
                android: u.indexOf('Android') > -1 || u.indexOf('Linux') > -1, //android终端或者uc浏览器
                iPhone: u.indexOf('iPhone') > -1, //是否为iPhone或者QQHD浏览器
                iPad: u.indexOf('iPad') > -1, //是否iPad
                webApp: u.indexOf('Safari') == -1, //是否web应该程序，没有头部与底部
                weixin: u.toLowerCase().indexOf('micromessenger') > -1
            };
        }(),
        language: (navigator.browserLanguage || navigator.language).toLowerCase()
    };

    if (sfBrowser.versions.weixin) {
        // window.location.href = 'http://wechat.proudkids.cn/perviews/index.html';
    } else if (sfBrowser.versions.iPad) {
        window.addEventListener("orientationchange", function() {
            //hengshuping();
        }, false);
        //hengshuping();
    } else if (sfBrowser.versions.mobile || sfBrowser.versions.ios || sfBrowser.versions.android || sfBrowser.versions.iPhone) {
        //alert('手机端');
        window.location.href = 'https://wechat.proudkids.cn/m-landing/index.html?cid=122682'
    } else {
        //alert('PC端')
    }

    //alert(JSON.stringify(sfBrowser.versions));

    //判断手机横竖屏状态：
    function hengshuping() {
        if (window.orientation == 180 || window.orientation == 0) {
            alert("竖屏状态！")
        }
        if (window.orientation == 90 || window.orientation == -90) {
            $('body').addClass('iPad');
        }
    }
});