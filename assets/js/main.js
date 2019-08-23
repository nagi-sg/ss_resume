$(function(){

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
        $ss_resume_result.find('.rank').find('dd').text(rank);
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
