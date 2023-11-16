$(function() {

    // main部分のmin-height自動調整（フッターが画面最下に位置するように）
    const minHeight = window.innerHeight -  $('.c-WIfooter').outerHeight() - 80;
    $('.c-WImain').css('min-height', minHeight+'px');

    $(window).on('load scroll', function(){
        /*
         * スクロール位置に来たら発動するCSSアニメ
         * 発動を遅延させたい場合はclassに「anime-delay」を追加し、data-delay属性に遅延タイミングをミリ秒で指定
         *
         * anime-scrollExpand: ぼよんっと膨張
         * anime-scrollFadeIn: フェードイン表示（見た目はlazyloadっぽいが遅延読込機能はない）
         * anime-scrollSlideL: 左からスライドしてくる（anime-scrollFadeInと併用OK）
         */

        var scroll = $(window).scrollTop();
        $('.anime-scrollExpand, .anime-scrollFadeIn, anime-scrollSlideLeft, .js-scrollAction').each(function(){

            var target = $(this);
            var position = target.offset().top - $(window).height();

            if( position < scroll-50 ){
                var delay = (target.hasClass('anime-delay'))? target.data('delay'): 0;

                if( delay > 0 ){
                    setTimeout( function(){
                        target.addClass('is-active');
                    }, delay);
                }else{
                    target.addClass('is-active');
                }
            }else{
                target.removeClass('is-active');
            }
        });
    });

    // モーダルを開く
    // 例文
    $('.js-textEdit').on('click', function(){
        drawerOpen('.js-modal--textEdit','');
    });
    // おすすめ画像
    $('.js-imageEdit').on('click', function(){
        drawerOpen('.js-modal--imageEdit','');
    });
    // 招待状作成
    $('.js-invCreate').on('click', function(){
        drawerOpen('.js-modal--invCreate','');
    });
    /* 削除アラート
      招待状・ゲスト情報・ページ戻る
    */
    $('.js-invDelete').on('click', function(){
        drawerOpen('.js-modal--invDelete','');
    });
    $('.js-guestDelete').on('click', function(){
        drawerOpen('.js-modal--guestDelete','');
    });
    $('.js-guestDeleteSevDo').on('click', function(){
        drawerOpen('.js-modal--guestDeleteSev','');
    });

    $('.js-pageback').on('click', function(){
        drawerOpen('.js-modal--pageback','');
    });

    // 入力チェック
    $('.js-okButton').addClass('is-inactive');
    $('.js-require').on('keydown keyup keypress change', function() {
        let error;
        let invName = $(this).val();
        if(invName === '' || invName === null) {
            error = true;
        }
        if(error) {
            // if(!$(this).nextAll('.errorMessage').length) {
            //	 $(this).after('<p class="errorMessage">空欄です。招待状の名前を入力してください。</p>');
            // }
            $('.js-okButton').addClass('is-inactive');

        } else {
            // if($(this).nextAll('.errorMessage').length) {
            //	 $(this).nextAll('.errorMessage').remove();
            // }
            $('.js-okButton').removeClass('is-inactive');
        }
    });
    // 閉じるボタンでクリア
    $('.js-optionDrawerClose').on('click',function() {
        $('.js-require').val('');
    });

    // 各radioボタン
    $('.js-radioBtn').each(function() {
        $('.js-radioBtn').on('click', function() {
            $(this).siblings('.js-radioBtn').removeClass('js-selected').children('input[type="radio"]').prop('checked', false).addClass('isChecked');
            $(this).addClass('js-selected').children('input[type="radio"]').prop('checked', true).removeClass('isChecked');
        });
    });
    // 項目選択（例文）
    $('.js-selectItem').each(function() {
        $('.js-selectItem').on('click', function() {
            $(this).siblings('.js-selectItem').removeClass('js-selected');
            $(this).addClass('js-selected');
        });
    });
    // 項目選択（デザイン）
    $('.js-selectChildItem').each(function() {
        $('.js-selectChildItem').on('click', function() {
            // 兄弟要素
            $(this).parent().siblings().children('.js-selectChildItem').removeClass('js-selected');
            // 従兄弟要素
            $(this).parents('.js-selectGrandParentItem').siblings().find('.js-selectChildItem').removeClass('js-selected');
            $(this).addClass('js-selected');

            // プレビュー画像反映
            $('.js-invCreateItem__imgNow').attr('src', $(this).find('.js-designEdit__img').attr('src') );
        });
    });
    // checkboxボタン（補足文/複数選択可）
    $('.js-checkItem').each(function() {
        $('.js-checkItem').on('click', function() {
            var parentItem = $(this).parent('.js-checkItemParent');
            var childItem = $(this).children('input[type="checkbox"]');
            if(childItem.hasClass('isChecked')) {
                parentItem.removeClass('js-selected');
            } else {
                parentItem.addClass('js-selected');
            }
        });
    });
    // checkボタン（google map）
    $('.js-mapCheck').on('click', function() {
        if($(this).children('input[type="checkbox"]').hasClass('isChecked')) {
            $(this).removeClass('js-selected');
        } else {
            $(this).addClass('js-selected');
        }
    });
    // checkボタン（動画音声再生）
    $('.js-unMute').on('click', function() {
        if($(this).children('input[type="checkbox"]').hasClass('isChecked')) {
            $(this).removeClass('js-selected');
        } else {
            $(this).addClass('js-selected');
        }
    });
    // datepicker
    $.datepicker.setDefaults( $.datepicker.regional[ "ja" ] );
    $('.js-datepicker').datepicker({
        changeMonth: false,
        changeYear: true,
        dayNames:["日","月","火","水","木","金","土"],
        monthNamesShort:["1月","2月","3月","4月","5月","6月","7月","8月","9月","10月","11月","12月"],
        // altFormat:'yy年mm月dd日',
        dateFormat: 'yy年mm月dd日',
        yearRange: '-nn:+10',
        titleFormat:'nnnn m月',
    });

    // datepicker（誕生日用）
    $.datepicker.setDefaults( $.datepicker.regional[ "ja" ] );
    $('.js-datepicker--birth').datepicker({
        changeMonth: false,
        changeYear: true,
        dayNames:["日","月","火","水","木","金","土"],
        monthNamesShort:["1月","2月","3月","4月","5月","6月","7月","8月","9月","10月","11月","12月"],
        // altFormat:'yy年mm月dd日',
        dateFormat: 'yy年mm月dd日',
        yearRange: '-100:nn',
        titleFormat:'nnnn m月',
    });

    // Googleマップ表示・非表示
    $('.js-useGoogleMap').on('change', function(){
        if($(this).prop('checked')){
            $('.js-useGoogleMapCont').slideDown();
        }else{
            $('.js-useGoogleMapCont').slideUp();
        }
    });

    // パスワード入力表示・非表示
    $('.js-toggleButton--publish_type').on('click', function(){
        // パスワード
        if($(this).hasClass('is-password')){
            $('.js-publish_type--passwordCont').slideDown();
            // それ以外
        }else{
            $('.js-publish_type--passwordCont').slideUp();
        }
    });

    // 会費項目表示・非表示
    $('.js-toggleContent01, .js-toggleContent02').hide();
    $('.js-toggleButton').on('click',function() {
        const num = $(this).index();
        if(num == 2) {
            $('.js-toggleContent01, .js-toggleContent02').show();
        } else if(num == 1) {
            $('.js-toggleContent02').show();
            $('.js-toggleContent01').hide();
        } else {
            $('.js-toggleContent01, .js-toggleContent02').hide();
        }
    });

    // 項目削除
    $('.js-deleteButton').on('click',function() {
        $(this).parents('.js-deleteContent').remove();
    });
    // // 会費項目追加
    // $('.js-addButton').on('click',function() {
    //     $('.js-addItemArea').append('<div class="js-deleteContent u-mB1"><div class="c-feeEdit__item u-flx u-flxMid"><input type="text" class="c-textEdit__text u-w40" placeholder="女性"><input type="text" class="c-textEdit__text u-w35" placeholder="000,000">円<div class="js-deleteItem"><img src="resource/img/ic_minus_bk.svg" width="26" alt="削除"></div></div><p class="u-mT05">お振込額0円（システム利用料0円）</p></div>');
    // });
    // 追加した項目の削除
    $(document).on('click', '.js-deleteButton', function () {
        $(this).parents('.js-deleteContent').remove();
    });

    // メールアドレス追加
    // const check = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    // const addressMaxNum = 20;
    // $('.js-addAddress').on('click',function() {
    //     var address = $('.js-inputAddress').val();
    //     if(address.length > 0 && check.test(address) && $('.js-mailList__item').length < addressMaxNum) {
    //         $('.js-addressArea').append('<div class="c-mailList__item u-flxBet u-flxMid js-mailList__item js-deleteContent"><div class="c-mailList__address">'+ address +'</div><div class="c-mailList__deleteButton js-deleteButton js-deleteButton--address"><img src="resource/img/ic_minus_bk.svg" width="26" alt="削除"></div></div>')
    //
    //         $('.js-addressError').hide();
    //         $('.js-doMailSend').show();
    //
    //         // 入力した値を空にする
    //         $('.js-inputAddress').val('');
    //     }
    //     // MAX：エラー表示
    //     if( $('.js-mailList__item').length >= addressMaxNum ){
    //         $('.js-addressError').text('1回に送信できるのは20件までです').show();
    //     }
    //     $('.js-sendNum').text($('.js-mailList__item').length);
    // });

    // メールアドレス削除
    // $(document).on('click', '.js-deleteButton--address', function(){
    //
    //     // 0件：エラー表示＋送信ボタン非表示
    //     if( $('.js-mailList__item').length == 0){
    //         $('.js-addressError').text('メールアドレスを登録してください').show();
    //         $('.js-doMailSend').hide();
    //
    //         // MAXではなくなった：エラー非表示
    //     }else if( $('.js-mailList__item').length < addressMaxNum ){
    //         $('.js-addressError').hide();
    //         $('.js-doMailSend').show();
    //     }
    //     $('.js-sendNum').text($('.js-mailList__item').length);
    // });


    // アコーディオン（送信履歴・ゲスト情報）
    $('.js-summaryContent').hide();
    $('.js-summary').each(function() {
        $(this).on('click',function() {
            $(this).toggleClass('is-open');
            $(this).next('.js-summaryContent').slideToggle();
        })
    });

    // URLをコピー
    $('.js-copyText').on('click',function() {
        // dataのテキストをコピー
        const text = $('.js-copyText').data('clipboard-text');
        const clipboard = $('<textarea></textarea>');
        clipboard.text(text);
        $('body').append(clipboard);
        clipboard.select();
        document.execCommand('copy');
        clipboard.remove();
        // メッセージを表示して5秒後に消す
        $('body').append('<p class="c-copyMessage js-copyMessage">URLがコピーされました</p>');
        setTimeout(function(){
            $('.js-copyMessage').remove();
        },5000);
    });

    // メッセージ送信 タイトル・例文切り替え
    // $('.js-messageSelect').on('change',function() {
    //     const msg1 = 'このたび私たちは結婚をすることになりました。\r\nつきましては、挙式・披露宴を催したく存じます。\r\n当日の詳細をWeb招待状にてご案内いたしますので、\r\n下記より出欠ご登録をお願いいたします。\r\n\r\nhttps://foeijfio845.piary.jp\r\n\r\n皆様にお会いできることを楽しみにしています。';
    //     const msg2 = 'このたび私たちは結婚をすることになりました。\r\nつきましては、日頃お世話になっております皆様に\r\n感謝を込めて二次会パーティーを開催いたします。\r\n当日の詳細をWeb招待状にてご案内いたしますので、\r\n下記より出欠ご登録をお願いいたします。\r\n\r\nhttps://foeijfio845.piary.jp\r\n\r\n皆様にお会いできることを楽しみにしています。';
    //     const val = $('.js-messageSelect option:selected').val();
    //     const title = $('.js-messageSelect option:selected').text();
    //     if(val == 0) {
    //         $('.js-messageTitle').val('');
    //         $('.js-messageText').val('');
    //     } else {
    //         $('.js-messageTitle').val(title);
    //         if(val == 1) {
    //             $('.js-messageText').val(msg1);
    //         } else if(val == 2) {
    //             $('.js-messageText').val(msg2);
    //         } else {
    //             $('.js-messageText').val('');
    //         }
    //     }
    // });

    // ゲスト絞り込み
    const searchSelect = '.js-searchSelect';
    const searchBtn = '.js-searchBtn';
    const searchItem = '.js-searchItem';

    $(function() {
        // selectタイプ
        $(searchSelect).on('change', function() {
            search_filter();
        });
        // radioタイプ
        $(document).on('change', searchBtn + ' input[type="radio"]', function() {
            search_filter();
        });
    });

    function search_filter() {

        // 招待状の種類
        let valKind = $(searchSelect).val();

        // 出欠・招待側
        let valAttendance = $('input[name="attendance"]:checked').val();
        let valHost = $('input[name="host"]:checked').val();

        // 招待状の種類なし：全ゲスト表示
        if(valKind == '') {

            // 全ゲスト表示＋出欠・支払状況非表示
            $(searchItem).removeClass('is-inactive');
            $('.js-guestHistory__status').addClass('is-inactive');

            // 絞り込み検索非表示＋絞り込み解除
            $('.js-invitationOnCont').addClass('is-inactive');
            $('.js-searchBtn').children().eq(0).find('input[type="radio"]').prop('checked', true);

            // ゲストごとの招待状返信内容非表示
            $('.js-guestReply').addClass('is-inactive');

            // 招待状の種類あり：該当ゲストのみ表示
        } else {

            // 絞り込み状態を判定＋表示するclass名生成
            var statusClass = '';
            if(valAttendance != '') statusClass += '.is-invitation--'+valKind+'-'+valAttendance;
            if(valHost != '') statusClass += '.is-invitation--'+valKind+'-'+valHost;

            // 該当ゲストのみ表示
            $(searchItem).addClass('is-inactive');
            $(searchItem+'.is-invitation--'+valKind+statusClass).removeClass('is-inactive');

            // ゲストの出欠・支払状況表示
            $('.js-guestHistory__status').addClass('is-inactive');
            $('.js-guestHistory__status[data-invitation="'+valKind+'"]').removeClass('is-inactive');

            // ゲストごとの招待状返信内容表示
            $('.js-guestReply').addClass('is-inactive');
            $('.js-guestReply.js-guestReply--invitation'+valKind).removeClass('is-inactive');

            // 絞り込み検索表示
            $('.js-invitationOnCont').removeClass('is-inactive');
        }

        // ゲスト表示人数の反映＋0人の時は専用メッセージを表示
        const guestCnt = $('.js-searchItem').not('.is-inactive').length;
        $('.js-guestCnt').text(guestCnt);
        if(guestCnt == 0){
            $('.js-guestSearchNone').removeClass('is-inactive');
        }else{
            $('.js-guestSearchNone').addClass('is-inactive');
        }
    }

    // ゲスト編集モーダル　対象招待状
    $('.js-guestInvitationCheck').on('change', function(){
        if( $(this).prop('checked') ){
            $(this).parents('.js-guestInvitation').addClass('js-selected');
            $(this).parents('.js-guestInvitation').siblings('.js-guestInvInfo').slideDown();
        }else{
            $(this).parents('.js-guestInvitation').removeClass('js-selected');
            $(this).parents('.js-guestInvitation').siblings('.js-guestInvInfo').slideUp();
        }
    });

    // ゲストの選択削除モード
    $('.js-guestDeleteSev').on('click', function(){

        // 選択削除モード終了
        if( $(this).hasClass('is-active') ){

            $(this).removeClass('is-active');
            $('.js-guestDeleteSevMenu').addClass('is-inactive');
            $('.js-searchItem').removeClass('is-guestDeleteSevMode');
            guestDeleteCheckFalse();

            // 選択削除モード開始
        }else{
            $(this).addClass('is-active');
            $('.js-guestDeleteSevMenu').removeClass('is-inactive');
            $('.js-searchItem').addClass('is-guestDeleteSevMode');
        }
    });

    // ゲストの選択削除モード終了
    $('.js-guestDeleteSevCancel').on('click', function(){

        $('.js-guestDeleteSev').removeClass('is-active');
        $('.js-guestDeleteSevMenu').addClass('is-inactive');
        $('.js-searchItem').removeClass('is-guestDeleteSevMode');
        guestDeleteCheckFalse();
    });

    // ゲストの選択削除モード終了
    function guestDeleteCheckFalse(){
        $('.js-guestDeleteCheck').prop('checked', false).removeClass('isChecked');
        $('.js-guestDeleleCheckLabel').removeClass('js-selected');
        $('.js-guestDeleteSevDo').addClass('is-inactive');
    }

    // ゲストの選択削除Check
    $('.js-guestDeleteCheck').on('change', function(){

        // Check
        if( $(this).prop('checked') ){
            $(this).addClass('isChecked');
            $(this).parent('.js-guestDeleleCheckLabel').addClass('js-selected');

            // Check解除
        }else{
            $(this).removeClass('isChecked');
            $(this).parent('.js-guestDeleleCheckLabel').removeClass('js-selected');
        }

        // ゲストの選択がある時のみ削除ボタンを活性化
        if( $('.js-guestDeleleCheckLabel.js-selected').length ){
            $('.js-guestDeleteSevDo').removeClass('is-inactive');
        }else{
            $('.js-guestDeleteSevDo').addClass('is-inactive');
        }
    });

    /**
     * @param  {String} name 対象にするinputのname属性の値
     * @return {Array}	   選択されているinputのvalue属性の値
     */
    function get_selected_input_items(name) {
        let searchData = [];
        $('[name=' + name + ']:checked').each(function() {
            searchData.push($(this).val());
        });
        return searchData;
    }

});
