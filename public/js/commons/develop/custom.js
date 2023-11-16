//header footer
$(function() {
  //right drawer open
  $('.l-header__main__rightDrawerOpen, .p-header__main__rightDrawerOpen').on("click",function(){
    $(".l-drawerRight").addClass("is_active");
    $(".l-drawerRight__overlay").addClass("is_active").animate({'opacity':'1'},{'duration': 300});
  });
  //right drawer close
  $('.l-drawerRight__overlay, .l-drawerRight__closeBtn').on("click",function(){
    $(".l-drawerRight").removeClass("is_active");
    $(".l-drawerRight__overlay").animate({'opacity':'0'},{'duration': 300}).removeClass("is_active");
  });

  //footerを下部に固定
  var mainMinHeight = ( $(window).innerHeight() -  $('.ec-layoutRole__header').innerHeight() - $('.ec-layoutRole__footer').innerHeight() );
  $('.ec-layoutRole__contents').css('min-height',mainMinHeight);

});

//ページ内scroll
$(function() {
  $('a[href^="#"]:not(a.c-modal__box)').on("click", function() {
    var speed = 500;
    var href= $(this).attr("href");
    var target = $(href == "#" || href == "" ? 'html' : href);
    var headerHeight = 0;
    if( $('.l-header__fixed').length ){
      headerHeight = $('.l-header__fixed').height();
    }else{
      if( $('.l-header__main.short').length ){
        headerHeight = $('.l-header__main.short').outerHeight();
      }else if( $('.c-header').length ){
        headerHeight = $('.c-header').outerHeight();
      }
    }
    var position = target.offset().top - headerHeight;
    $("html, body").animate({scrollTop:position}, speed, "swing");
    return false;
  });
});

//form関連
$(function() {
  // enterでsubmit禁止
  $(document).on("keypress", "input,button,select", function (e) {
    if (e.which === 13) {
        event.preventDefault();
    }
  });

  //checkbox
  $(document).on("change", "input[type='checkbox']",function(){
    if( $(this).prop("checked") ){
      $(this).addClass('isChecked');
    }else{
      $(this).removeClass('isChecked');
    }
  });

  //radio 選択時判定に必要な箇所あり
  $(document).on("change","input[type='radio']",function(){
    if( $(this).prop("checked") ){
      $(this).addClass('isChecked');
    }else{
      $(this).removeClass('isChecked');
    }
  });
});

$(window).on("load",function(){
  $("input[type='checkbox']:checked").addClass('isChecked');
  $("input[type='radio']:checked").addClass('isChecked');

  // $("input[type='radio']").each(function(index, elem) {
  //   if( $(elem).prop("checked") ){
  //     $(elem).addClass('isChecked');
  //   }else{
  //     $(elem).removeClass('isChecked');
  //   }
  // });
});

$(function() {
  //form clear
  $(".js-parentFormClear").on("click",function(){
      var parentForm = $(this).closest('form');
      parentForm.find("textarea").val("");
      parentForm.find("select option").prop("selected", false);
      parentForm.find("input[type=text],input[type=number],input[type=hidden]").val("");
      parentForm.find("input[type=radio]").prop("checked", false);
      parentForm.find("input[type=checkbox]").prop("checked", false).removeClass('isChecked');
      parentForm.find(".js-refineCategoryTxt").text("指定なし");

      // カテゴリ初期化処理を呼び出す
      resetCategory();
  });

  //js-checkContainer内のcheckboxを外す
  $(".js-checkContainerClear").on("click",function(){
    var parentForm = $(this).closest('.js-checkContainer');
    parentForm.find("input[type=checkbox]").prop("checked", false).removeClass('isChecked');
  });

  //datetime
  // $.datepicker.setDefaults( $.datepicker.regional[ "ja" ] );
  if( $("input[class*='c-form__date']").length ){
    $("input[class*='c-form__date']:not([id^='form_option_form'])").datepicker({//西暦の範囲が違うものを:notへ
      autoclose: true,
      changeMonth: false,
      changeYear: true,
      dayNames:["日","月","火","水","木","金","土"],
      monthNamesShort:["1月","2月","3月","4月","5月","6月","7月","8月","9月","10月","11月","12月"],
      altFormat:"yyyy/mm/dd",
      yearRange: "-10:+10",
      titleFormat:"nnnn m月",
    });


    //購入オプション内 date入力
    $('input[id^="form_option_form"][class*="c-form__date"]').datepicker({
      autoclose: true,
      changeMonth: false,
      changeYear: true,
      dayNames:["日","月","火","水","木","金","土"],
      monthNamesShort:["1月","2月","3月","4月","5月","6月","7月","8月","9月","10月","11月","12月"],
      altFormat:"yyyy/mm/dd",
      yearRange: "-100:+2",
      titleFormat:"nnnn m月",
    });

    //placeholder
    var today = new Date();
    var holder = today.getFullYear() + "/" + (today.getMonth()+1) + "/" + today.getDate();
    $("input[class^='c-form__date']").attr('placeholder',holder);
  }

  //checked=色を変える
  if( $('.js-checkColorChangeBox').length ){//c-itemGroupLabel == js-checkColorChangeBox
    $('input:radio[name="select_kit"]').on("change",function(){
      $('.js-checkColorChangeBox').removeClass('js-selected');
      if ($(this).is(":checked")) {
        $(this).parents('.js-checkColorChangeBox').addClass('js-selected');
      }
    });
  }

});

//アコーディオン
function accordionCommon(elm){
  var slideContents = elm.next();
  var myName = 'js-accordion';
  var topArrow = 'c-button__topArrow-s';
  var btmArrow = 'c-button__bottomArrow-s';
  if( elm.attr('class').indexOf('js-accordionTab') >= 0 ){
    myName = 'js-accordionTab';
    topArrow = 'c-button__topArrow';
    btmArrow = 'c-button__bottomArrow';
  }

  if ( slideContents.css('display') == 'block' ) {
    slideContents.slideUp();
    elm.removeClass(topArrow).addClass(btmArrow);
  } else {
    $('.' + myName ).removeClass(topArrow).addClass(btmArrow).siblings().slideUp();
    elm.removeClass('c-button__bottomArrow').addClass(topArrow);
    slideContents.slideDown();
  }
}

$(function() {
  //アコーディオン（buttonの矢印変更あり）
  if( $('.js-accordion').length ){
    $('.js-accordion').addClass('c-button__bottomArrow-s');
    $('.js-accordion').on("click", function() {
      var slideParents = $(this);
      accordionCommon(slideParents);
    });
  }

  if( $('.js-accordionTab').length ){
    const tabOffsetAccordion = [];
    let headerHeight = $('.l-header__main').height();
    $('.js-accordionTab').each(function() {
    	tabOffsetAccordion.push($(this).offset().top - headerHeight);
    });
    var tapNo = 99;
    $('.js-accordionTab').addClass('c-button__bottomArrow');
    $('.js-accordionTab').on("click", function() {
      var slideParents = $(this);
      accordionCommon(slideParents);

      var index = $('.js-accordionTab').index(this);
      if ( $(this).next().css('display') != 'block' ) {
        if( tapNo <= index ){
          $(window).scrollTop(tabOffsetAccordion[index]);
        }
      }
      tapNo = index;
    });
  }


  //drawer categoryNav 新しいものを開いた時に兄弟要素を閉じない
  $('.js-accordionOtherNotClose').addClass('c-button__bottomArrow-s');
  $('.js-accordionOtherNotClose').on("click",function(){
    var th = $(this).index(this);
    var slideContents = $(this).eq(th).next();
    if ( slideContents.css('display') == 'block' ) {
      slideContents.slideUp();
      $(this).removeClass('c-button__topArrow-s').addClass('c-button__bottomArrow-s');
    } else {
      $(this).removeClass('c-button__bottomArrow-s').addClass('c-button__topArrow-s');
      slideContents.slideDown();
    }
  });

});


//商品詳細ページ
$(function() {
  //detail タブ内ホワイトアウト 伸縮パネル
  $(".js-whiteoutToggle").on("click",function(){
    var th = $(".js-whiteoutToggle").index(this);
    // var curHeight = $(".js-whiteoutToggleContents").eq(th).height();//現在のheight取得
    if( $(".js-whiteoutToggleContents").eq(th).hasClass('is-panelClose') ){
      bScroll = $(window).scrollTop();
      // var autoHeight = $(".js-whiteoutToggleContents").eq(th).css('height', 'auto').height() + 60;//autoにした場合のheightを取得
      $(".js-whiteoutToggleContents").eq(th).css('height', 'auto').removeClass('is-panelClose');
      $(".js-whiteoutToggle").eq(th).text("閉じる");
    }else{
      //$(".js-whiteoutToggleContents").eq(th).height(curHeight).animate({height: 200}, 400).addClass('is-panelClose');
      $(".js-whiteoutToggleContents").eq(th).animate({height: 280}, 400).addClass('is-panelClose');
      $(".js-whiteoutToggle").eq(th).text("もっと見る");
      $("html, body").animate({scrollTop:bScroll}, 300);
    }
    $(this).toggleClass("c-icArrow--down");
    $(this).toggleClass("c-icArrow--up");
  });
});

//cart
$(function() {
  //img popup カートのdrawer内画像切り替え
  $('.js-popupImg').on("click",function(){
    var imgTag = $(this).find('img').attr('src');
    $(this).parents('.js-popupContainer').find('.js-popup').children('img').attr('src',imgTag);
  });
});

var globalModalContMH;
function drawerOpenCommon(innerDrawer){
  bodyScrollStop();
  innerDrawer.addClass('js-modalAction');
  innerDrawer.show();
  setTimeout(function(){
    var windowHeight = window.innerHeight;
    var modalContMH = windowHeight-20;
    $('.l-optionDrawer__screen').css('height', windowHeight);
    //Android対応で元の高さをglobalに持つ
    globalModalContMH = modalContMH;

    innerDrawer.css( 'max-height', modalContMH );
    drawerMainFixed(innerDrawer);
    innerDrawer.animate( {opacity: 1},{duration: 290,queue: false} ).animate( {top:'0'},{duration: 190,queue: false} );
  },200);
}

function drawerCloseCommon(innerDrawer){
  $.when(
    $(".l-optionDrawer__inner.js-modalAction").animate( {opacity: 0},{duration: 180,queue: false} ).animate( {top:'-5vh'},{duration: 150,queue: false} ).removeClass('js-modalAction')
  ).done(function() {
    $('.line-it-button').show();
    $('.l-optionDrawer__main').css('height','auto').removeClass('fixed');
  });
}

//drawerの高さにより、fixedを付与
function drawerMainFixed(innerDrawer){
  //drawer ttl高さ
  var drawerHead = 0;
  drawerHead = innerDrawer.find('.l-optionDrawer__fixTtl').innerHeight();
  //drawer main高さ
  var drawerMain = innerDrawer.find('.l-optionDrawer__main').innerHeight();
  //drawer mainfixed高さ
  var drawerMainBoxHeight = ( innerDrawer.height() - drawerHead );
  innerDrawer.find('.l-optionDrawer__main').removeClass('fixed');
  if( drawerMainBoxHeight < drawerMain ){
    innerDrawer.find('.l-optionDrawer__main').addClass('fixed').css('height', ( drawerMainBoxHeight - 2 ) + "px" );
  }
}

$(window).on('resize',function(){
  if( $(".l-optionDrawer__inner.js-modalAction").length ){
    var innerDrawer = $(".l-optionDrawer__inner.js-modalAction");
    var modalContMH = window.innerHeight-20;
    innerDrawer.css( 'max-height', modalContMH );
    drawerMainFixed(innerDrawer);
  }
});

//popup内で要素の高さが変わる場合l-optionDrawer__autoHeightで中の要素を囲う
$(".l-optionDrawer__autoHeight").on('click',function(e) {
  setTimeout(function(){
    if( $(".l-optionDrawer__inner.js-modalAction .l-optionDrawer__autoHeight").innerHeight() < $(".l-optionDrawer__inner.js-modalAction .l-optionDrawer__main").innerHeight() ){
      $(".l-optionDrawer__inner.js-modalAction .l-optionDrawer__main").css('height','auto');
    }
  },200);
});

//popup androidキーボード対応
var ua = navigator.userAgent;
if ( ua.indexOf('Android') > 0 && ua.indexOf('Mobile') > 0 ) {
  $(function() {
    $('.l-optionDrawer__main input,.l-optionDrawer__main textarea').blur(function(){
      var innerDrawer = $(this).closest(".l-optionDrawer__main");
      innerDrawer.css( 'height', globalModalContMH );
    });
  });
}

/* DRAWER (popup)--------------------------------------------------------------------------------
■関数名 drawerOpen(‘#引数1’,‘#引数2’)・・・・ポップアップを開く

　引数1: ポップアップのまとまりのID名を記載します。すでにポップアップが開いていて、innerだけを入れ替える場合は引数1は空にします。
　引数2: ポップアップのinnerが複数ある場合IDを指定します。一つしかない場合は空にします。

■関数名 slickdrawerOpen(#引数1,#引数2,#引数3)・・・・slickを含むポップアップを開く
　引数3: slickスライダーのIDを指定します。

■関数名 drawerClose()・・・ポップアップを閉じる
もしくは閉じるボタンへ　.js-optionDrawerClose 付与
--------------------------------------------------------------------------------------------------*/
function drawerOpen(drawerId,innerId){
  if( drawerId != "" ){
    if( $(drawerId).children('.l-optionDrawer__screen').length == 0 ){
      $(drawerId).wrapInner('<div class="l-optionDrawer__screen">');
    }
    //drawer背景表示
    bScroll = $(window).scrollTop();
    $(drawerId).show();
    $('.line-it-button').hide();//z-indexに関係なくLINEで送るボタンが押せてしまうことがあるため

    if( innerId != "" ){//drawer背景表示中 かつ inner指定あり(複数のinnerを持つdrawerの中からinnerIdを指定して開く)
      var innerDrawer = $(innerId);
    }else{//（通常drawer）drawer背景表示 かつ inner指定なし
      var innerDrawer = $(drawerId).find(".l-optionDrawer__inner");
    }
    setTimeout(function(){
      drawerOpenCommon(innerDrawer);
      $("input[type='checkbox']:checked").addClass('isChecked');
      $("input[type='radio']:checked").addClass('isChecked');
    },80);
  }else{
      //すでに開いているdrawerinnerを閉じる
      drawerCloseCommon()
      setTimeout(function(){//閉じるモーションが終わったあと表示開始
          var innerDrawer = $(innerId);
          $(".l-optionDrawer__inner").hide();
          drawerOpenCommon(innerDrawer);
      },200);
  }
}

//中にslickがあるdrawer
function slickdrawerOpen(drawerId,slickId,target){//targetはslickで指定のslideを初期表示するのに必要　(1から連番で設定)
  if( $(drawerId).children('.l-optionDrawer__screen').length == 0 ){
    $(drawerId).wrapInner('<div class="l-optionDrawer__screen">');
  }
  bScroll = $(window).scrollTop();
  //drawer背景表示
  $(drawerId).addClass('is-view');
  $(drawerId).fadeIn(80);
  var innerDrawer = $(drawerId).find(".l-optionDrawer__inner");

  $(slickId).css('opacity',0);//一瞬崩れた状態が表示するため
  $(slickId).slick('slickGoTo',target - 1);

  setTimeout(function(){
    drawerOpenCommon(innerDrawer);
    $(slickId).slick('setPosition').css('opacity',1);
  },400);//中身が重いと読み込む前に表示されてしまうため
}

//中にslickがあるinnerDrawerを開く
function slickInnerdrawerOpen(innerdrawerId,slickId,target){
  //すでに開いているdrawerinnerを閉じる
  drawerCloseCommon();
  var innerDrawer = $(innerdrawerId);
  $(slickId).css('opacity',0);
  $(slickId).slick('slickGoTo',target - 1);

  setTimeout(function(){
    $(".l-optionDrawer__inner").hide();
    drawerOpenCommon(innerDrawer);
    $(slickId).slick('setPosition').css('opacity',1);
  },400);
}


//drawerを閉じる
function drawerClose(){
  drawerCloseCommon();

  setTimeout(function(){
    $(".l-optionDrawer__inner").hide();
    $(".l-optionDrawer").fadeOut(100).removeClass('is-view');
  },200);
  bodyScrolldefault();
}
$(function() {
  $(document).on("click",".js-optionDrawerClose",function(){
    drawerClose();
  });
});

// -------------------------------------------------------------------------------- DRAWER


//下部からの距離
function getScrollBottom() {
  var body = window.document.body;
  var html = window.document.documentElement;
  var scrollTop = body.scrollTop || html.scrollTop;
  return html.scrollHeight - html.clientHeight - scrollTop;
}

//button fixed
$(function() {
  //確定ボタン fixed --cart/index.twig　複製元のボタンより上部にいる時表示

  if( $(".js-fixedBottom").length ){
    var fixedItem = $(".js-fixedBottom").html();
    // var buttonHeight = $(".js-fixedBottom").height();
    $(".js-fixedBottomCartForm").append('<div class="c-button__bottomFixed" style="display:none;">' + fixedItem + '</div>');
    var set_height = $(".js-fixedBottom").height() + $(".l-footer__bottom").height() + 70;//padding分
    var dispFlag = false ;
    $(window).on('scroll', function(){
      if( getScrollBottom() > set_height ){
        if( dispFlag == false ){
           $(".c-button__bottomFixed").fadeIn(100);
           dispFlag = true;
        }
      }else{
        if( dispFlag == true ){
           $(".c-button__bottomFixed").fadeOut(100);
           dispFlag = false;
        }
      }
    });
  }

  //レジへ進むボタン fixed --detail.twig　複製元のボタンより下部にいる時表示
  if( $(".js-fixedBottomCart").length ){
    var fixedItem = $(".js-fixedBottomCart").html()
    var windowHeight = $(window).height();
    var buttonHeight = $(".js-fixedBottomCart").height();
    // var headerHeight = $(".l-header__main__inner").height();
    var headerHeight = $(".c-header").height(); // 2020.11.25 ishikawa 高さを取得するheader要素の変更
    var set_height = $(".js-fixedBottomCart").offset().top + (windowHeight - headerHeight - buttonHeight);//上部からの距離　ー　元ボタンが見えなるなるまでの画面サイズ
    $(".js-fixedBottomCartContainer").append('<div class="c-button__bottomFixed u-pW1" style="display:none;">' + fixedItem + '</div>');
    var dispFlag = false ;
    $(window).on('scroll', function(){
      if( $(window).scrollTop()  > set_height ){
        if( dispFlag == false ){
          //console.log('表示中');
          $(".c-button__bottomFixed").fadeIn(100);
          dispFlag = true;
          // 2020.11.25 下部fixする際に、更に下部fixされているフッター要素の高さ分を加味
          if( $('.p-header__main__bottombar').length ){
              $('.c-button__bottomFixed').css('bottom', $('.p-header__main__bottombar').outerHeight()+'px');
          }
        }
      }else{
        if( dispFlag == true ){
          //console.log('非表示');
           $(".c-button__bottomFixed").fadeOut(100);
           dispFlag = false;
         }
      }
    });
  }
});

// MEMO: 絞り込み検索
$(function() {

    if ($('.js-refineOpen').length) {
        //絞り込み検索 drawer
        $('.js-refineOpen').on("click", function () {
            bScroll = $(window).scrollTop();
            if( $(this).hasClass('is-sp') ){
              bodyScrollStop();
              // 検索ワード同期
              $("#free_word").val($('#top_free_word').val())
            }
            $(".l-refine,.l-refine__drawer__inner__main .l-refine__drawer").css('max-height',$(window).height());

            setTimeout(function(){
                $(".l-refine").addClass("is_active");
            },200);

        });
        $('.js-refineClose').on("click", function () {
            $(".l-refine").removeClass("is_active");
            bodyScrolldefault();
        });
        $(window).on("resize", function () {
          $(".l-refine").css('max-height',window.innerHeight);
        });

        //list 絞り込み検索 innerdrawer
        $('.js-refineDrawerOpen').on("click", function () {
            $('.js-refine_mainBtn').hide();
            $(this).parents(".js-refineParent").find(".l-refine__drawer").addClass("is_active");
        });
        $('.l-refine__drawer__back').on("click", function () {
            $('.js-refine_mainBtn').show();
            $(this).parents(".js-refineParent").find(".l-refine__drawer").removeClass("is_active");
        });

        //絞り込み検索スライドタイプ(cart)
        $('.js-refineSlideOpen').on("click", function () {
          $(".js-refineSlide__main").slideToggle();
          if ($(this).children('span').hasClass('c-parts__plus')) {
            $(this).children('span').removeClass('c-parts__plus').addClass('c-parts__minus');
          } else {
            $(this).children('span').removeClass('c-parts__mius').addClass('c-parts__plus');
          }
        });

        // カテゴリが未選択の場合は、こだわり条件を非表示にして、絞り込みメニューを表示
        if(!$('.filter_category').find('select').val()) {
            resetCategory();
        } else {
            if ($('#special_condition_container').length) {
                // 指定されたカテゴリID属性が埋め込まれているタグを取得する
                let li_category = $('li[data-answer=' + $('.filter_category').find('select').val() + ']');
                // カテゴリを選択状態にする
                setAnswer(li_category);
            } else {
                //初期表示時は非同期で絞り込みフォーム読込
                let url = $('#special_condition_element').data('get-special-condition-html-url');
                $(function(){
                    $.ajax({
                        type: "GET",
                        url: url,
                        timeout: 10000,
                        cache: true,
                        dataType: 'html'
                    })
                        .done(function(html){
                            $('#special_condition_element').html(html);
                            let li_category = $('li[data-answer=' + $('.filter_category').find('select').val() + ']');
                            setAnswer(li_category);
                        });
                });
            }
        }

        // 絞り込み検索のタグの削除ボタン押下
        $('.c-termUl__li__del').on('click', function(e){
            e.preventDefault();

            let filter_class = $(this).data('filter-class');
            let filterObj = $(filter_class);
            let target_id = $('#' + $(this).data('id'));

            switch (filter_class) {
                case '.filter_free_word, .filter_top_free_word':

                    let word = $(this).data('value');
                    filterObj.each(function(){
                        let input_elm = $(this).find('input');
                        let new_word = input_elm.val().replace(word, '')
                        input_elm.val(new_word);
                    });

                    break;
                // こだわり条件 / テイスト / 送料無料
                case '.filter_special_condition' :
                case '.filter_taste' :
                case '.filter_shipping_fee_category' :
                    // チェックボックスをOFFにする
                    filterObj
                        .find(target_id)
                        .prop('checked', false)
                        .removeClass('isChecked');

                    break;
                // カテゴリはセレクトボックスの初期化とこだわり条件のチェックボックスOFF
                case '.filter_category':
                    filterObj
                        .find('select')
                        .val('');
                    $('input[id^="SpecialConditionBranch_"]')
                        .prop('checked', false)
                        .removeClass('isChecked');
                    break;
                // 発送までの日数はセレクトボックスの初期化
                case '.filter_delivery_duration':
                    filterObj
                        .find('select')
                        .val('');
                    break;
                // カラー
                case '.filter_color':
                    let currentValue = $('#color_id').val();
                    let target_color_id = $(this).data('id').toString();
                    let deleteIndex = currentValue.indexOf(target_color_id);
                    currentValue.splice(deleteIndex, 1);
                    $('#color_id').val(currentValue);
                // 価格（上限/下限）
                case '.filter_price' :
                    filterObj
                        .find(target_id)
                        .val('');
                    break;
                default:
                    break;
            }

            // 簡易検索ボタンを押下する
            $('#simple_search_btn').click();
        });
    }
});

//カテゴリ & こだわり条件の表示切り替え
function setAnswer(select){

    $('.js-refine_mainBtn').show();

    var categorySearch = select.parents(".js-refineParent");
    var answer = select.data('answer');
    var categoryText = select.children(".js-setText").text();

    if (categoryText === "") {
        categoryText = "指定なし";
    }

    setSelectedNameLabel(categorySearch.find(".js-refineCategoryTxt"), categoryText)

    $("#category_id").val(answer);
    $(".l-refine__drawer").removeClass("is_active");
    // カテゴリ未選択時は、こだわり条件項目は非表示、それ以外の項目は表示します。
    if(answer === '指定なし') {
        resetCategory();
        return false;
    }

    // カテゴリに応じた絞り込み検索条件を取得する
    let url = $('div[data-get-refinement-url]').data('get-refinement-url');
    $.ajax({
        url: url,
        type: 'GET',
        data: {'category_id': answer},
        dataType: 'json',
    }).done(function (data) {

        // ******************************
        // jsonの結果を元にこだわり条件の表示を切り替える
        // カテゴリ未選択時は、こだわり条件項目は非表示
        // ******************************
        if (data['specialConditionCategory'] === null) {
            hideFilterSpecialCondition();
        } else {

            $('.filter_special_condition').show();

            // 一度全て非表示に
            $("div[data-special-condition-id]").hide();
            $("div[data-special-condition-branch-id]").hide();

            // 設定されたこだわり条件をソートされた順で表示する
            for (let i = 0; i < data['specialConditionCategory'].length; i++) {
                let specialConditionCategory = data['specialConditionCategory'][i];
                let elem = $('div[data-special-condition-id="' + specialConditionCategory['special_condition_id'] + '"]');
                elem.show();

                // ソートされた順に要素を追加
                $('#special_condition_container').before(elem);
                let branch = null;
                for (let j = 0; j < specialConditionCategory['branches'].length; j++) {
                    branch = specialConditionCategory['branches'][j];
                    $('div[data-special-condition-branch-id="' + branch['id'] + '"]').show();
                }
            }

            // MEMO: 許可されていないこだわりのチェックONを解除
            $("div[data-special-condition-branch-id]").each(function(){
                if($(this).css('display') === 'none') {
                    $(this).find("input").each(function() {
                        $(this).prop("checked", false).removeClass('isChecked');
                    });
                }
            });

            // MEMO: チェックがONのテイストのこだわり条件を表示ように加工しラベルにセットする
            setSearchParameter('.filter_special_condition', '.js-refineCategoryTxt');
        }

        // ******************************
        // jsonの結果を元に絞り込み検索条件の表示を切り替える
        // カテゴリ未選択時は、こだわり条件項目は非表示、それ以外の項目は表示します。
        // ******************************
        if(data['filterSearchCategory'] === null) {
            // カラー/価格/テイスト/発送日数の項目を非表示
            // カラー/価格/テイスト/発送日数の値をリセット
            resetFilterSearch();
        } else {

            // カラー
            if (data['filterSearchCategory']['color_flg'] === false) {
                hideFilterColor();
            } else {
                $('.filter_color').show();
                setSearchParameterColor();
            }

            // 価格
            if (data['filterSearchCategory']['price_flg'] === false) {
                hideFilterPrice();
            } else {
                $('.filter_price').show();
            }

            // 発送までの日数
            if (data['filterSearchCategory']['delivery_duration_flg'] === false) {
                hideFilterDeliveryDuration();
            } else {
                $('.filter_delivery_duration').show();
            }

            // **************************
            // テイスト
            // **************************
            if (data['filterSearchCategory']['taste_flg'] === false) {
                hideFilterTaste();
            } else {

                // テイスト欄を表示
                $('.filter_taste').show();

                // 一度全て非表示
                $("div[data-taste-id]").hide();

                // 全てのテイストは、フォームTastesに含まれないため、手動で表示にする
                $('div[data-taste-id=0]').show();

                // MEMO: 許可されてるテイストを表示
                for (let i = 0; i < data['filterSearchCategory']['tastes'].length; i++) {
                    let taste = data['filterSearchCategory']['tastes'][i];
                    let target = $("div[data-taste-id=" + taste['id'] + "]");
                    target.show();
                }

                // MEMO: 許可されていないテイストのチェックをOFF
                $("div[data-taste-id]").each(function () {
                    if ($(this).css('display') === 'none') {
                        $(this).find("input").each(function () {
                            $(this).prop("checked", false).removeClass('isChecked');
                        });
                    }
                });

                // MEMO: チェックがONのテイストのテキストを表示ように加工しラベルにセットする
                setSearchParameter('.filter_taste', '.js-refineCategoryTxt');
            }
        }
    }).fail(function (data) {
        alert('失敗');
    });
}

/**
 * 入力された検索パラメーターを各要素にセットし、表示欄に選択された検索条件の名称を表示します
 *
 * @param class_name クラス名。検索する元となるクラス名を指定します
 * @param display_class_name 選択された検索条件の名称を表示するクラス名を指定します
 */
function setSearchParameter(class_name, display_class_name){
    // MEMO: チェックがONのテイストのテキストを表示ように加工しラベルにセットする + チェックをONにする
    let names = '';
    if($(class_name).find("input:checked").length === 0) {
        names= '指定なし';
    } else {

        $(class_name).find("input:checked").each(function(){

            // チェックをONにする + クラスを付与
            $(this).prop("checked", true).addClass('isChecked');
            if($(this).next().text()){
                if(names !== ''){
                    names = names + ",";
                }
                names = names + $(this).next().text();
            }
        });
    }
    setSelectedNameLabel($(class_name).find(display_class_name), names);
}

/**
 * こだわり条件の非表示と選択の解除
 */
function hideFilterSpecialCondition() {
    $('.filter_special_condition').hide();
    $('.filter_special_condition').find('input[type=checkbox]').prop("checked", false).removeClass('isChecked');
    setSelectedNameLabel($('.filter_special_condition').find(".js-refineCategoryTxt"), '指定なし');
}

/**
 * テイストの非表示と選択の解除
 */
function hideFilterTaste() {
    $('.filter_taste').hide();
    $('.filter_taste').find('input[type=checkbox]').prop("checked", false).removeClass('isChecked');
    setSelectedNameLabel($('.filter_taste').find(".js-refineCategoryTxt"), '指定なし');
}

/**
 * カラーの非表示と選択の解除
 */
function hideFilterColor() {
    $('.filter_color').hide();
    $('.filter_color').find('select').val('');
    setSelectedNameLabel($('.filter_color').find(".js-refineCategoryTxt"), '指定なし');
}

/**
 * 価格の非表示と入力の初期化
 */
function hideFilterPrice() {
    $('.filter_price').hide();
    $('.filter_price').find("input[type=text]").val("");
}

/**
 * 発送日数の非表示と入力の初期化
 */
function hideFilterDeliveryDuration() {
    $('.filter_delivery_duration').hide();
    $('.filter_delivery_duration').find('select').val('');
}

/**
 * 絞り込み検索の選ばれた選択項目のテキストを取得し、表示用にセットします
 *
 * @param target 表示箇所の要素
 * @param text 表示する文字列
 */
function setSelectedNameLabel(target, text){

    if(!text){
        text = '指定なし';
    }
    $(target).text(text);
}
/**
 * カラーの検索パラメーターを元に表示欄に選択されたカラーの表示とカラー選択画面の選択描画を行います
 */
function setSearchParameterColor(){
    // ×ボタンを一旦非表示
    $('.js-refinecolorClear').hide();

    let colorIds = [];
    colorIds = $('#color_id').val();
    if(colorIds.length !== 0) {
        $(".js-refinecolorClear").hide();
        let elmVals = [];
        elmVals.push("<div class='l-refine__colorSearch__item'>");
        $.each(colorIds,function(index,value){

            $('a[data-answer='+ value + ']').children().show();
            elmVals.push("<a class='l-refine__colorSearch__item--" + value + " u-mT05 u-mB0'></a>");
        });
        elmVals.push("</div>");
        $('.filter_color').find(".js-refineCategoryTxt").html(elmVals.join(""));

    } else {
        $('.filter_color').find(".js-refineCategoryTxt").text("指定なし");
    }
}
/**
 * カテゴリの初期化
 */
function resetCategory() {
    // こだわり条件非表示
    hideFilterSpecialCondition();

    // 絞り込みメニュー表示
    $('.filter_color').show();
    $('.filter_price').show();
    $('.filter_delivery_duration').show();
    $('.filter_taste').show();

    // 指定されていた検索条件をセット
    setSearchParameter('.filter_taste', '.js-refineCategoryTxt');
    setSearchParameter('.filter_special_condition', '.js-refineCategoryTxt');

    // 指定されていた検索条件をセット（カラー）
    setSearchParameterColor()
}
/**
 * 絞り込みメニューを初期化します
 */
function resetFilterSearch() {
    // カラー/価格/テイスト/発送日数の項目を非表示
    hideFilterColor();
    hideFilterTaste();
    hideFilterPrice();
    hideFilterDeliveryDuration();
}

//こだわり条件
function setCheckAnswer(selectButton){

  $('.js-refine_mainBtn').show();

  var kodawariSearch = selectButton.parents(".js-refineParent");
  //テキストの挿入
  var setText = "";
  if( kodawariSearch.find("input:checked").length != 0 ){
    kodawariSearch.find("input:checked").each(function() {
      if(setText != ""){
        setText = setText + ",";
      }
      setText = setText + $(this).next().text();
    });
    kodawariSearch.find(".js-refineCategoryTxt").text(setText);
  }else{
    kodawariSearch.find(".js-refineCategoryTxt").text("指定なし");
  }
  //検索用のvalue挿入　は必要であればのちのち
  // selectButton.parents(".js-refineParent").find("input[type=hidden]").attr('value',setAnswer)
  $(".l-refine__drawer").removeClass("is_active");
}

$('.l-refine__colorSearch__clear').hide();


//cart & mypage

$(function() {
  //購入オプションoption高さ変化
  $(".js-relatedPanel").on("click",function(){
    var th = $(".js-relatedPanel").index(this);
    var curHeight = $(".js-relatedPanelMain").eq(th).height();//現在のheight取得
    if( $(".js-relatedPanelMain").eq(th).hasClass('is-panelClose') ){
      var autoHeight = $(".js-relatedPanelMain").eq(th).css('height', 'auto').height();//autoにした場合のheightを取得
      $(".js-relatedPanelMain").eq(th).height(curHeight).animate({height: autoHeight}, 200).removeClass('is-panelClose');
      $(".js-relatedPanel").eq(th).text("閉じる");
    }else{
      $(".js-relatedPanelMain").eq(th).height(curHeight).animate({height: 108}, 500).addClass('is-panelClose');
      $(".js-relatedPanel").eq(th).text("もっと見る");
    }
    $(this).toggleClass("c-icArrow--up").toggleClass("c-icArrow--down");
  });
});
//5行未満なら隠さない、5行以上ならゴースト化
$(window).on("load",function(){
  $('.p-cart__wrap__option').each(function(index, elem) {
  	// let optionItemCount = $(elem).find('.c-cartOptionInfo__item').length;
    let boxHeight = $(elem).find('.js-relatedPanelMain').height();

    // if(optionItemCount < 5 ) {
    if( boxHeight < 124 ) {
      $(elem).find('.js-relatedPanel').parent().hide();
    }else{
      $(elem).find('.js-relatedPanelMain').addClass('is-panelClose');
    }
  });
});


//その他FAの表示非表示 囲う要素(li)へ '.js-slideQuestionParent'　FAを表示するlabelへ onclick="showslideQuestion($(this))" 開く要素 'js-slideQuestionCont'
if( $('.js-slideQuestionParent').length ){
  $('.js-slideQuestionCont').hide();
  $(function() {
    $('.js-slideQuestionParent label:not(.js-notSlide)').on("click",function(){
      //要素をしまう
      $(this).parents('li.js-slideQuestionParent').siblings().find('.js-slideQuestionCont').slideUp();
    });
  });
  function showslideQuestion(obj){
    $(obj).parents('.js-slideQuestionParent').find('.js-slideQuestionCont').slideDown();
  }
}

/* 要素開閉(checkbox直下) */
if( $('.js-slideCheck').length ){
	$('.js-slideCheckCont').hide();
  $(function() {
  	$('.js-slideCheck').each(function(){
  		if( $(this).find("input[type='checkbox']").prop('checked') ){
  			$(this).parent('.js-slideCheckContainer').find('.js-slideCheckCont').show();
  		}
  	});
  	$('.js-slideCheck').find("input[type='checkbox']").on('change',function(){
  		var	$thisElm = $(this).parents('.js-slideCheckContainer');
  		if( $(this).prop('checked') ){
  			$thisElm.find('.js-slideCheckCont').slideDown();
  		}else{
  			$thisElm.find('.js-slideCheckCont').slideUp();
  		}
  	});
	});
}

//付与した要素をグレーアウトし、要素内のinputをdisabled
if( $('.js-unabled').length ){
  $('.js-unabled').addClass("u-bgClr--gray01").find('input').prop('disabled', true);
}

//タブ切り替え
$(function() {
    $('.js-switchTab li').on("click",function(){
        var thisSwitch = $(this).parents(".js-switch");
        var th = thisSwitch.find(".js-switchTab li").index(this);
        //tab　及び　panel のis-currentを全て削除
        $(this).parent(".js-switchTab").find('li').removeClass("is-current");
        thisSwitch.find(".js-switch__panel").removeClass("is-current");
        //該当する　tab　及び　panel へis-current付与
        $(this).parent(".js-switchTab").find('li').eq(th).addClass("is-current");
        thisSwitch.find(".js-switch__container .js-switch__panel").eq(th).addClass("is-current").show();
    });
});
//load完了時タブが一つの場合はからタブを挿入
$(window).on('load',function(){
  $('.js-switchTab').each(function(index, elem) {
    if( $(elem).children('li').length == 1 ){
      if( $(elem).children('li').hasClass('c-deliveryTab__item--01') ){
        $(elem).append('<li class="c-switch__tab__label c-deliveryTab__item--01" style="pointer-events: none;">&nbsp;</li>');
      }else{
        $(elem).append('<li class="c-switch__tab__label" style="pointer-events: none;">&nbsp;</li>');
      }
    }
  });
});


//alert用ダイアログ
function dialogOpen(id){
  bScroll = $(window).scrollTop();
  bodyScrollStop();
  if( $('.l-optionDrawer.is-view').length ){
    $('.l-optionDrawer.is-view').append('<div class="l-dialog__overlay"></div>');
  }else{
    $('.ec-layoutRole__contents').append('<div class="l-dialog__overlay"></div>');
  }

  $('.l-dialog__overlay').animate({'opacity':'1'},{'duration': 300});//drawerが出た状態でdialogを呼ぶことがあるので、overlayを分ける
  $('#' + id ).addClass('is-active');
}

$(function(){
  //js-dialogClose で閉じる(いいえ　などの時)
  $(document).on("click",'.js-dialogClose',function(){
  // $(document).on("click",'.js-dialogClose,.l-dialog__overlay',function(){
    let overlay = $('.l-dialog__overlay');
    $('.l-dialog__main').removeClass('is-active');
    overlay.animate({'opacity':'0'},{'duration': 300});
    setTimeout(function(){
      overlay.remove();
    },300);
    bodyScrolldefault();
  });
});

//pager読み込み時whiteout
$(function(){
  $('.js-listClickWhiteout li').on("click",function(){
    loadingOverlay();
  });
});

/**
 * オーバーレイ処理を行う関数
 */
function loadingOverlay(action) {

    if (action == 'hide') {
        $('.bg-load-overlay').remove();
    } else {
        $overlay = $('<div class="bg-load-overlay">');
        $('body').append($overlay);
    }
}
