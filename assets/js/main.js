;(function($) {
    //スムーススクロール
    $.fn.smoothScroll = function(options){
        var defaults = {
            speed : 500
        };
        var setting = $.extend(defaults,options);
        $(this).on('click',function(){
            var href= $(this).attr("href");
            var target = $(href == "#" || href == "" ? 'html' : href);
            var position = target.offset().top;
            $("html, body").animate({scrollTop:position}, setting.speed, "swing");
            return false;
        });
        return(this);
    };

    //上に戻るを表示制御
    $.fn.onScrollToggleClass = function(options){
        var defaults = {
            className :"scroll"
        };
        var setting = $.extend(defaults,options);

        var target = $(this);
        var scrollTimer = false;
        $(window).on("scroll touchmove", function(){
            if (scrollTimer !== false) clearTimeout(scrollTimer);
            scrollTimer = setTimeout(function() {
                var position = $(window).scrollTop();
                if(position === 0){
                    $(target).removeClass(setting.className);
                }else{
                    $(target).addClass(setting.className);
                }
            }, 100);
        });
        return(this);
    };

    //ウィンドウのリサイズを監視し、widthが変わった場合だけ実行
    $.fn.onResizeWidthRun = function(runResizedfunc){
        var resizeTimer = false;
        var currentWidth = window.innerWidth;
        $(window).on("resize", function(){
            if (resizeTimer !== false) clearTimeout(resizeTimer);
            resizeTimer = setTimeout(function() {
                if (currentWidth != window.innerWidth) {
                    // ウインドウ横幅が変わったのでリサイズと見なす。
                    runResizedfunc();
                }
                currentWidth = window.innerWidth;
            }, 200);
        });
        return(this);
    };


    //特定の要素が見えたらClass付与
    $.fn.checkInView = function(options){
        var defaults = {
            className :"inview",
            padding:0,
            addClassTarget:"body"
        };
        var setting = $.extend(defaults,options);
        var target = $(this);
        var scrollTimer = false;
        $(window).on("load scroll touchmove", function(){
            if (scrollTimer !== false) clearTimeout(scrollTimer);
            scrollTimer = setTimeout(function() {
                var position = $(window).scrollTop();
                var target_height = target.height();
                var target_position = target.offset().top + setting.padding + target_height;
                var current_height = window.innerHeight;
                var check_position = position + current_height;
                if(check_position >= target_position){
                    $(setting.addClassTarget).addClass(setting.className);
                }else{
                    $(setting.addClassTarget).removeClass(setting.className);
                }

            }, 100);
        });
        return(this);
    };

    //特定の要素が画面外に消えたらClass付与
    $.fn.checkOutView = function(options){
        var defaults = {
            className :"outview",
            padding:0,
            addClassTarget:"body"
        };
        var setting = $.extend(defaults,options);
        var target = $(this);
        var scrollTimer = false;
        $(window).on("load scroll touchmove", function(){
            if (scrollTimer !== false) clearTimeout(scrollTimer);
            scrollTimer = setTimeout(function() {
                var position = $(window).scrollTop();
                var target_height = target.height();
                var target_position = target.offset().top + setting.padding ;
                var outview_positon = + target_height + target_position;

                if(position >= outview_positon){
                    //$(setting.addClassTarget).removeClass(setting.className);
                }else{
                    $(setting.addClassTarget).addClass(setting.className);
                }
            }, 100);
        });
        return(this);
    };

})(jQuery);



$(function(){

    var $body = $("body");
    $body.onScrollToggleClass("scroll");


    var $form_btn = $('.form_btn');
    var $ss_resume_result_wrap = $('.ss_resume_result_wrap');
    $form_btn.on('click',function(){

        var name = $("#name").val();
        var rank = $("#rank").val();
        var start_y = $("#start_y").val();
        var start_m = $("#start_m").val();
        var start = start_y + start_m +'から';
        var motive = $("#motive").val();
        var userid = $("#userid").val();
        var follow_back = $("[name='follow_back']:checked").val();
        var support_character = $("#support_character").val();
        var favorite_character = $("#favorite_character").val();
        var favorite_episode = $("#favorite_episode").val();
        var favorite_content = "";
        $("[name='favorite_content']:checked").each(function() {
            favorite_content += '、' + $(this).val();
        });
        var comment = $("#comment").val();
        var $ss_resume_result = $('.ss_resume_result');


        $ss_resume_result.find('.name').find('dd').text(name);
        $ss_resume_result.find('.start').find('dd').text(start);
        $ss_resume_result.find('.motive').find('dd').text(motive);
        $ss_resume_result.find('.userid').find('dd').html(userid + '<span class="follow_back">フォロー返'+follow_back+'</span>');

        $ss_resume_result.find('.support_character').find('dd').text(support_character);
        $ss_resume_result.find('.favorite_character').find('dd').text(favorite_character);
        $ss_resume_result.find('.favorite_episode').find('dd').text(favorite_episode);
        $ss_resume_result.find('.favorite_content').find('dd').text(favorite_content.slice( 1 ));
        $ss_resume_result.find('.comment').find('dd').text(comment);


        $form_btn.text("これで冒険者登録証を更新する！");


        $ss_resume_result_wrap.slideDown(500,function(){
            var href= "#result";
            var target = $(href == "#" || href == "" ? 'html' : href);
            var position = target.offset().top;
            $("html, body").animate({scrollTop:position}, 500, "swing");
        });

        return false;
    });

});
