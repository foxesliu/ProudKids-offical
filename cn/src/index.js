// $(function () {
$(document).ready(function() {
    console.log($('.section1'))
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
                webApp: u.indexOf('Safari') == -1 //是否web应该程序，没有头部与底部
            };
        }(),
        language: (navigator.browserLanguage || navigator.language).toLowerCase()
    };
    if (sfBrowser.versions.mobile || sfBrowser.versions.ios || sfBrowser.versions.android || sfBrowser.versions.iPhone || sfBrowser.versions.iPad) {
        window.location.href = './mobile.html';
    }
    var myVideo = document.getElementsByTagName('video')[0]; //获取视频video
    // 全屏背景
    // $(function(){
    //     // $('.video-back').vidbacking();
    // });
    $('.videoBg').hide()
    $('.video-back').click(function() {
        playPause();
    });
    $(".menuList li:eq(0)").addClass('current_what_style').siblings().removeClass('current_what_style current_how_style current_who_style');

    $('.video-back').hide()
    $('.playBtn').click(function() {
        console.log(1)
        $('.video-back').show()
        $('.video-back .palyImg').hide();
        $('.videoBg').show()

        myVideo.play();
    })
    $('.quit').click(function() {
        event.stopPropagation()
        $('.video-back').hide()
        $('.videoBg').hide()
        myVideo.load();
    })

    function playPause() {
        if (myVideo.paused) {
            myVideo.play();
            $('.video-back .palyImg').hide();
            $('.poster').fadeOut();
            // $('.videoImg').fadeOut();
            // $('.arrowImg').fadeOut();
            // $('.menuList').hide();
        } else {
            myVideo.pause();
            $('.video-back .palyImg').show();
            $('.header').show();
            $('.videoImg').fadeIn();
            $('.arrowImg').fadeIn();
            $('.menuList').show();
            $('.poster').fadeIn();
        }
    }

    function poster() {
        if (myVideo.played) {
            myVideo.pause();
            $('.video-back .palyImg').show();
            $('.header').show();
            $('.header .login').css('zIndex', '10000');
            $('.videoImg').fadeIn();
            $('.arrowImg').fadeIn();
            $('.menuList').show();
        }
    }
    //初始化登录状态
    if (sessionStorage.getItem("inOrOut") == 'true') {
        $(".header .btn .btn_img").hide();
        $(".header .login").show();
        $('.user-name').html(sessionStorage.getItem("chineseName"));
    } else {
        $(".header .login").hide();
        $(".header .btn .btn_img").show();
        $(".header .btn .btn_img").attr('src', './images/btns1.png');
    }

    var i = 0;
    var time_id = 0;
    $(".img ul li").eq(0).css('opacity', '1');
    //自动轮播
    var model = [{ 'btnbg': '#fccc9f', 'btncolor': '#f38100', 'barbg': '#fab57d' }, { 'btnbg': '#fabfba', 'btncolor': '#ef6e61', 'barbg': '#f9aca6' }, { 'btnbg': '#9ce2e1', 'btncolor': '#0e9ba8', 'barbg': '#7fd9d9' }];

    function colorChange() {
        $('.text ul li i').css({
            'background-color': model[i].btnbg,
            'color': model[i].btncolor
        });
        $('.nav li').css({
            'background-color': model[i].barbg,
        });
        $('.text ul li i').removeClass('active active1 active2').eq(i).addClass('active');
    }

    function auto() {
        colorChange();
        $(".nav ul li").eq(i).find("span").animate({
            "width": "2.68rem"
        }, 3900, function() {
            i++;
            $(this).css("width", '0');
            if (i > 2) {
                i = 0;
            }
            $(".img ul li").eq(i).siblings().fadeOut('fast');
            $(".img ul li").eq(i).fadeIn('slow');
            colorChange();
        });
    }
    //定时器
    time_id = setInterval(auto, 4000);
    //点击触发切换
    $(".text ul li").click(function() {
        colorChange();
        $(".nav ul li").find("span").stop().css("width", "0");
        clearInterval(time_id);
        i = $(this).index();
        // $('.text ul li i').removeClass('active');
        $('.text ul li i').removeClass('active').eq(i).addClass('active');
        $(".img ul li").eq(i).fadeIn().siblings().fadeOut();
        auto();
        time_id = setInterval(auto, 4000);
    });

    //fullpage配置
    // $('.proudkids_name').css('color','transparent');
    $('.beian').css('color', 'transparent');
    $('.container').fullpage({
            anchors: ["index", "index_subFirst", "index_subSecond", "what_to_teach", "what_to_teach_subFirst", "who_to_teach", "who_to_teach_subFirst", "how_to_teach", "how_to_teach_subFirst", "how_to_teach_subSecond", "how_to_teach_subThird", "how_to_teach_subFourth", 'aboutus'],
            menu: ".menu",
            // navigation:true,
            resize: false,
            verticalCentered: false,
            lazyLoading: true,
            // scrollOverflow: true,
            easing: 'linear',
            afterLoad: function(anchorLink, index) {
                if (index == 1) {
                    poster();
                    $('.proudkids_name').css('color', 'transparent');
                    $('.beian').css('color', 'transparent');
                }
                switch (index) {
                    case 1:
                        break;
                    case 2:
                        break;
                    case 3:
                        // move('#section3 .list .animation1')
                        //     .duration('3').end(function () {
                        // });
                        $('#section3 .list .animation1').css({
                                'transform': 'translate(.2rem,-.5rem)',
                                'transform-origin': '0% 0%',
                                'width': '13.18rem',
                                'height': '1.85rem',
                                'line-height': '100%',
                                'text-align': 'center',
                                'border-radius': '0.47rem',
                                'border': '2px solid #f7b479',
                                'border-color': '#f7b479',
                                'background': 'linear-gradient(to right, #e65402, #ed5835)'
                            })
                            // move('#section3 .list .animation1 .icon')
                            //     .duration('3').end(function () {
                            //
                            // });
                        $('#section3 .list .animation1 .icon').css({
                                // 'transform':'rotate(180deg)',
                                'width': '1.22rem',
                                'height': '1.06rem',
                                'left': '0.68rem',
                                'top': '0.43rem'
                            })
                            // move('#section3 .list .animation1 h5')
                            //     .duration('3').end(function () {
                            // });
                        $('#section3 .list .animation1 h5').css({
                                // 'transform':'rotate(180deg)',
                                'width': '2.3rem',
                                'height': '100%',
                                'left': '2.5rem',
                                'top': '0',
                                'line-height': '1.78rem',
                                'background-image': 'url("./images/what/list_diwen_bg.png")'
                            })
                            // move('#section3 .list .animation1 .point_bg')
                            //     .duration('3').end(function () {
                            //
                            // });
                        $('#section3 .list .animation1 .point_bg').css({
                                'opacity': '0'
                            })
                            // move('#section3 .list .animation1 p').set('opacity',1)
                            //     .duration('3').end(function () {
                            //
                            // });
                        $('#section3 .list .animation1 p').css({
                                // 'transform':'rotate(180deg)',
                                'width': '8.38rem',
                                'height': '1.78rem',
                                'line-height': '1.85rem',
                                'left': '4.36rem',
                                'top': '0',
                                'opacity': 1
                            })
                            //animation2
                            // move('#section3 .list .animation2')
                            //     .duration('1.8').end(function () {
                            //
                            // });
                        $('#section3 .list .animation2').css({
                                'transform': 'translate(.2rem,-.3rem)',
                                'transform-origin': '0% 0%',
                                'width': '13.18rem',
                                'height': '1.85rem',
                                'line-height': '100%',
                                'text-align': 'center',
                                'border-radius': '0.47rem',
                                'border': '2px solid #f7b479',
                                'border-color': '#f7b479',
                                'background': 'linear-gradient(to right, #43bac8, #119497)'
                            })
                            // move('#section3 .list .animation2 .icon')
                            //     .duration('1.8').end(function () {
                            //
                            // });
                        $('#section3 .list .animation2 .icon').css({
                                'width': '0.94rem',
                                'height': '1.06rem',
                                'left': '0.8rem',
                                'top': '0.36rem'
                            })
                            // move('#section3 .list .animation2 h5')
                            //     .duration('1.8').end(function () {
                            //
                            // });
                        $('#section3 .list .animation2 h5').css({
                                'width': '2.3rem',
                                'height': '100%',
                                'left': '2.5rem',
                                'top': '0',
                                'line-height': '1.78rem',
                                'background-image': 'url("./images/what/list_diwen_bg.png")'
                            })
                            // move('#section3 .list .animation2 .point_bg')
                            //     .duration('1.8').end(function () {
                            //
                            // });
                        $('#section3 .list .animation2 .point_bg').css({
                                'opacity': '0'
                            })
                            // move('#section3 .list .animation2 p').set('opacity',1)
                            //     .duration('1.8').end(function () {
                            //
                            // });
                        $('#section3 .list .animation2 p').css({
                            'width': '8.38rem',
                            'height': '1.78rem',
                            'line-height': '1.85rem',
                            'left': '4.52rem',
                            'top': '0',
                            'opacity': 1
                        })

                        //animation3
                        // move('#section3 .list .animation3')
                        //     .duration('2').end(function () {
                        //
                        // });
                        $('#section3 .list .animation3').css({
                                'transform': 'translate(.2rem,-.1rem)',
                                'transform-origin': '0% 0%',
                                'width': '13.18rem',
                                'height': '1.85rem',
                                'line-height': '100%',
                                'text-align': 'center',
                                'border-radius': '0.47rem',
                                'border': '2px solid #f7b479',
                                'border-color': '#f7b479',
                                'background': 'linear-gradient(to right, #ec5339, #ff5a5a)'
                            })
                            // move('#section3 .list .animation3 .icon')
                            //     .duration('2').end(function () {
                            //
                            // });
                        $('#section3 .list .animation3 .icon').css({
                                'width': '1.22rem',
                                'height': '1.06rem',
                                'left': '0.69rem',
                                'top': '0.44rem'
                            })
                            // move('#section3 .list .animation3 h5').set('opacity','0')
                            //     .duration('1').end(function () {
                            //
                            // });
                        $('#section3 .list .animation3 h5').css({
                            'opacity': '1',
                            'width': '2.3rem',
                            'height': '100%',
                            'left': '2.5rem',
                            'top': '0',
                            'line-height': '1.78rem',
                            'background-image': 'url("./images/what/list_diwen_bg.png")'
                        })

                        // move('#section3 .list .animation3 .point_bg')
                        //     .duration('1').end(function () {
                        //
                        // });
                        $('#section3 .list .animation3 .point_bg').css({
                                'opacity': '0'
                            })
                            // move('#section3 .list .animation3 p').set('opacity',1)
                            //     .duration('1').end(function () {
                            //
                            // });
                        $('#section3 .list .animation3 p').css({
                            'width': '8.38rem',
                            'height': '1.78rem',
                            'line-height': '1.85rem',
                            'left': '5rem',
                            'top': '0',
                            'opacity': 1
                        })
                        break;
                    case 4:
                        // move('#section4 .list .animation1').y(0).duration('1').set('opacity','1').duration('.5').end();
                        // move('#section4 .list .animation2').y(0).duration('1').set('opacity','1').duration('.8').end();
                        // move('#section4 .list .animation3').y(0).duration('1').set('opacity','1').duration('1').end();
                        break;
                    case 5:
                        // $.fn.fullpage.setAutoScrolling(true);
                        break;
                    case 6:
                        break;
                    case 7:
                        // move('#section7 .main .img').set('opacity', '1').duration('.5').end();
                        break;
                    case 8:
                        // move('#section8 .main .img').set('opacity', '1').duration('.5').end();
                        break;
                    case 9:
                        // move('#section9 .main .img').set('opacity', '1').duration('.5').end();
                        break;
                    case 10:
                        // $(".bottom").animate({ height: "1.32rem" }, 1000,function () {
                        //     $(".middle").animate({ height: "1.76rem" }, 2000,function () {
                        //         $(".top").animate({ height: "2.19rem" }, 3000);
                        //     });
                        // });
                        break;
                    case 11:
                        // document.body.addEventListener("DOMMouseScroll", function(event) {
                        //   move('#section11 .list .detail_left').set('margin-left','-3rem').set('opacity','1').set('z-index','-1000').duration('1').end();
                        //   move('#section11 .list .simple_left').set('opacity','0').duration('1').end();
                        //   move('#section11 .list .detail_right').set('margin-left','4rem').set('z-index','-1000').set('opacity','1').duration('1').end();
                        //   move('#section11 .list .simple_right').set('opacity','0').duration('1').end();
                        // });
                        break;
                    case 12:
                        break;
                    case 13:
                    default:
                        break
                }

            },
            onLeave: function(index, nextIndex, direction) {
                switch (index) {
                    case 1:
                        break;
                    case 2:
                        // move('#section2 .list').set('opacity', '0.3').duration('1').end();
                        break;
                    case 3:
                        break;
                    case 4:
                        // $(".menuList").css('background', '#e75501');
                        break;
                    case 5:
                        // $.fn.fullpage.setAutoScrolling(true);
                        // $(".menuList").css('background', '#e75501');
                        break;
                    case 6:
                        // $(".menuList").css('background', '#06a2a6');
                        break;
                    case 7:
                        // $(".menuList").css('background', '#06a2a6');
                        break;
                    case 8:
                        // $(".menuList").css('background', '#06a2a6');
                        break;
                    case 9:
                        // $(".menuList").css('background', '#06a2a6');
                        break;
                    case 10:
                        // $(".menuList").css('background', '#f26150');
                        // var obj={
                        //     init:function (selector,time) {
                        //         return $(selector).animate({
                        //             height:'0'
                        //         },time)
                        //     }
                        // }
                        // obj.init('.bottom',1000);
                        // obj.init('.middle',1000);
                        // obj.init('.top',1000);
                        // $(".bottom").animate({ height: "0" }, 1000);
                        // $(".middle").animate({ height: "0" }, 1000);
                        // $(".top").animate({ height: "0" }, 1000);
                        break;
                    case 11:
                        // $(".menuList").css('background', '#f26150');
                        // move('#section11 .list .detail_left').x(0).set('opacity','0').duration('1').end();
                        // move('#section11 .list .simple_left').x(0).set('opacity','1').duration('1').end();
                        // move('#section11 .list .detail_right').x(0).set('opacity','0').duration('1').end();
                        // move('#section11 .list .simple_right').x(0).set('opacity','1').duration('1').end();
                        break;
                    case 12:
                        // $(".menuList").css('background', '#f26150');
                        break;
                    case 13:
                        // $(".menuList").css('background', '#f26150');
                        break;
                    default:
                        break
                }
            }
        })
        //浮动窗口
    $(function() {
        $('.imghover').hide()
        $('.sidelist li').mouseover(function() {

            $('.imghover').show()
            $(this).siblings().find('.imghover').hide()
            console.log(1)
        })
        $('.sidelist li:nth-child(1)').mouseover(function() {
            $(this).find('.imgshow').attr('src', './images/fixed/side11.png')
        })
        $('.sidelist li:nth-child(1)').mouseleave(function() {
            $(this).find('.imgshow').attr('src', './images/fixed/side1.png')
        })
        $('.sidelist li:nth-child(2)').mouseover(function() {
            $(this).find('.imgshow').attr('src', './images/fixed/side22.png')
        })
        $('.sidelist li:nth-child(2)').mouseleave(function() {
            $(this).find('.imgshow').attr('src', './images/fixed/side2.png')
        })
        $('.sidelist li:nth-child(3)').mouseover(function() {
            $(this).find('.imgshow').attr('src', './images/fixed/side33.png')
        })
        $('.sidelist li:nth-child(3)').mouseleave(function() {
            $(this).find('.imgshow').attr('src', './images/fixed/side3.png')
        })
        $('.sidelist li:nth-child(4)').mouseover(function() {
            $(this).find('.imgshow').attr('src', './images/fixed/side55.png')
        })
        $('.sidelist li:nth-child(4)').mouseleave(function() {
            $(this).find('.imgshow').attr('src', './images/fixed/side5.png')
        })

        $('.sidelist li').mouseleave(function() {

            $('.imghover').hide()

        })
    })
})