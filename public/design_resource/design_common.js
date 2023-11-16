$(function() {

    // テキスト内URLを自動でリンク化
    $('.js-textAutoLink').each(function(){
        // var textAutoLink = $(this).html().replace(/(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/ig,"<a href='$1' target='_blank' class='u-txtDecUL' rel='noopener'>$1</a>");
        var textAutoLink = $(this).html().replace(/(https?:\/\/[-_.!~*\'()a-zA-Z0-9;\/?:\@&=+\$,%#\u3000-\u30FE\u4E00-\u9FA0\uFF01-\uFFE3]+)/ig,"<a href='$1' target='_blank' class='u-txtDecUL' rel='noopener'>$1</a>");
        $(this).html(textAutoLink);
    });

    // ゲストの返信ページ：出欠変更
    $('.js-reply-attendance').on('click', function(){
        // 出席
        if( $(this).hasClass('is-attend') ){
            $('.js-attendOnly').removeClass('is-inactive');

            // 欠席
        }else{
            $('.js-attendOnly').addClass('is-inactive');
        }
    });
    // オンライン決済：利用の有無選択
    $('.js-paymentMethodLabel').on('click', function(){

        // オンライン決済あり
        if( $(this).hasClass('is-credit') ){
            $('.js-paymentInfo').slideDown();

            // オンライン決済なし
        }else{
            $('.js-paymentInfo').slideUp();
        }
    });
    // オンライン決済：金額の自由入力（ご祝儀）
    $('.js-paymentAmount').on('change', function(){
        if( $(this).val() == 'free' ){
            $('.js-paymentAmoutFree').show();
        }else{
            $('.js-paymentAmoutFree').hide();
        }
    });
    // オンライン決済：会費合計金額の計算
    $('.js-paymentAmount').on('change', function(){
        let kaihi = 0;
        $('.js-paymentAmount').each(function(){
            kaihi += $(this).val() * $(this).attr('data-fee');
        });
        $('.js-paymentKaihiListTotal').text(kaihi.toLocaleString());
        $("input[name='settlement_amount']").val(kaihi);
    });

	// 動画の遅延読み込み（スクロール位置に来たらsourceタグを追加）
	$(window).on('scroll load', function(){
		let scroll_y = $(this).scrollTop();
		
		$('.js-movieVideo').each(function(){
			
			if( $(this).hasClass('is-loaded') ) return true;
			let position_y = $(this).offset().top;
			if(scroll_y + window.innerHeight >=  position_y){
				let moviesrc =  $(this).attr('data-src');
				$(this).append('<source src="'+moviesrc+'" type="video/mp4">'
					+'<source src="'+moviesrc+'" type="video/ogg">'
					+'<source src="'+moviesrc+'" type="video/webm">');
				$(this).addClass('is-loaded');
			}
		});
		
		/*
		if( $('.js-movie01')[0] ){
			let moviesrc01 =  $('.js-movie01').attr('data-src');
			$('.js-movie01').append('<source src="'+moviesrc01+'" type="video/mp4">'
				+'<source src="'+moviesrc01+'" type="video/ogg">'
				+'<source src="'+moviesrc01+'" type="video/webm">');
		}
		if( $('.js-movie02')[0] ){
			let moviesrc02 =  $('.js-movie02').attr('data-src');
			$('.js-movie02').append('<source src="'+moviesrc02+'" type="video/mp4">'
				+'<source src="'+moviesrc02+'" type="video/ogg">'
				+'<source src="'+moviesrc02+'" type="video/webm">');
		}
		*/
	});
});