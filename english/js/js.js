/**
 * Created by zhangsanfeng on 2018/7/6.
 */

$(function () {
    var foot = $("footer");
    foot.load("footer.html", '', function () {
        if (typeof pageIndex !== 'undefined') {
            $('footer .middle a').eq(pageIndex).addClass('active');
        }
        footerLocation();
    });
    $("header").load("header.html", '', function () {
        if (typeof pageIndex !== 'undefined') {
            $('header .pull-right li').eq(pageIndex).find('a').addClass('active');
        }
        if (pageIndex === 0) {
            $('header').css({background: '#ff6900'});
        } else if (pageIndex === 3) {
            $('header').css({
                backgroundImage: 'linear-gradient(90deg, #ff6400 0%, #ffa200 100%), linear-gradient(#5952ff, #5952ff)',
                boxShadow: '0 3px 21px 0 rgba(52, 52, 52, 0.2)'
            });
        }
    });


    $(window).scroll(function () {
        console.log($(window).scrollTop())
        if (pageIndex !== 3) {
            if ($(window).scrollTop() > 64) {
                $('header').css({
                    backgroundImage: 'linear-gradient(90deg, #ff6400 0%, #ffa200 100%), linear-gradient(#5952ff, #5952ff)',
                    // boxShadow: '0 3px 21px 0 rgba(52, 52, 52, 0.2)'
                });
            } else {
                $('header').css({
                    backgroundImage: 'none',
                    boxShadow: 'none'
                });
            }
        }
    })
});


function footerLocation() {
    var screenHeight = $('body').height();
    var articleHeight = $('article').height();
    console.log(articleHeight);
    var footerHeight = $('footer').height();
    if (articleHeight + footerHeight < screenHeight) {
        $('article').after('<div style="height:' + (screenHeight - (articleHeight + footerHeight)) +
            'px"></div>');
    }
}

function showDialog(type, title, text, callback) {
    if (!title) {
        title = 'SUBMITTED SUCCESSFULLY';
    }
    if (!text) {
        text = 'We look forward to working with you!';
    }
    var a = '<div class="dialog-container hidden"><div class="dialog-box"><div class="icon-box"><img src="images/dialog-' + type + '.png"/></div><div class="title t-hidden pl-20 pr-20">' + title + '</div><div class="pl-20 pr-20 text">' + text + '</div><div class="button c-pointer" onclick="closeDialog(this,' + callback + ')">OK</div></div></div>';
    $('body').append(a);
    $('.dialog-container').fadeIn();

}

function closeDialog(o, callback) {
    $(o).parents('.dialog-container').fadeOut();
    setTimeout(function () {
        $('.dialog-container').remove();
        callback && callback();
    }, 500);
}

// 获取URL中的参数
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
}
