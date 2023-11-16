//header
$(function() {
  //header fixed
  if( !$(".l-header__main.short").length ){
    var hidden_head_height = $(".c-header .c-headerTxt").height() ;
    var fixed_head_height = $(".c-header .l-header__main__chache").height() + $(".c-header .l-header__main__inner").height() ;
    $(window).on('scroll', function() {
      if ($(this).scrollTop() > hidden_head_height ) {
        $(".l-header__main").addClass('is-fixed');
        $("body").css("padding-top", fixed_head_height );
      }
      else{
        $(".l-header__main").removeClass('is-fixed');
        $("body").css("padding-top", "0");
      }
    });
  }
});

//グローバルナビ（マウスオーバーVer）
//$(function() {
//  $('[class^="js-categoryNavBtn"]').on("mouseenter",function(){
//    var thisClassName = $(this).attr('class');
//    var dispNo = thisClassName.replace("js-categoryNavBtn", "");
//    $('.js-categoryNav li').removeClass('is-current');
//    $('.js-categoryNavCate').fadeOut();
//    $(this).parent().addClass('is-current');
//    $('.js-categoryNav' + dispNo ).fadeIn();
//  });
//  $('.l-gnav').on('mouseleave',function() {
//    $('.js-categoryNav li').removeClass('is-current');
//    $('.js-categoryNavCate').fadeOut();
//  });
//});

//グローバルナビ（クリックVer）
$(function() {
    $('[class^="js-categoryNavClickBtn"]').on("click",function(){
        var thisClassName = $(this).attr('class');
        var dispNo = thisClassName.replace("js-categoryNavClickBtn", "");
        
        navClose()
        $(this).parent().addClass('is-current');
        $('.js-categoryNav' + dispNo ).fadeIn();
    });
    $('.js-categoryNavClickClose').on('click',function() {
        navClose()
    });
    $('.ec-layoutRole__header').on('mouseleave',function() {
        navClose()
    });
});

function navClose(){
    $('.js-categoryNav li').removeClass('is-current');
    $('.js-categoryNavCate').fadeOut();
}



// //c-wrap--L01 セクションの背景色を交互に
// $(function() {
//   $('.c-wrap--L01').each(function(index, elem) {
//     if( index % 2 != 0 ){
//       $(elem).css("background-color","#fef6ec");
//     }
//   });
// });

//pc版 絞り込み検索
if( $('.js-refineOpen').length ){

  //カテゴリのラジオボタンクリア(pcラジオボタンは見た目だけのもので機能は伴わない)
  $('.js-refineRadioClear').on("click", function () {
    $(".js-refineRadioClearContainer input[type='radio']").prop('checked', false);
  });

  var selectcate_id = $('#category_id').val();
  //カテゴリが選択されていたらラジオボタンをチェックし見えている状態にする
  if( selectcate_id != "" ){
    let selectCateRadio = $('.js-refineRadioClearContainer').find('#cateCheck'+ selectcate_id);
    selectCateRadio.prop('checked', true).parents('.js-refineRadioClearContainer').show().prev().removeClass('c-button__bottomArrow-s').addClass('c-button__topArrow-s');
  }

  /**
   * カラーの選択
   *
   * @param select
   */
  function setColorAnswer(select){
    $('.js-refine_mainBtn').show();

    // 現在選択されているカラーを取得
    let setAnswer = select.data('answer').toString();
    // クリックされたカラーを取得
    let currentValue = $('#color_id').val();
    let resultIndex = currentValue.indexOf(setAnswer);
    if( resultIndex !== -1 ){
      // 選択済みなら削除
      currentValue.splice(resultIndex,1);
      //clearボタンを消す
      select.children().hide();
    } else {
      // 未選択なら追加
      currentValue.push(setAnswer);
      //clearボタンを表示
      select.children().show();
    }
    $("#color_id").val(currentValue);
  }

  // こだわり条件クリア
  $(".js-specialConditionFormClear").on("click",function(){
    $("#special_condition_element").find("input[type=checkbox]").prop("checked", false).removeClass('isChecked');
  });

  // カラークリア
  $(".js-colorFormClear").on("click",function(){
    $("#color_id").val("");
    setSearchParameterColor()
  });

  // テイストクリア
  $(".js-tasteFormClear").on("click",function(){
    $(".filter_taste").find("input[type=checkbox]").prop("checked", false).removeClass('isChecked');
  });

  // 価格クリア
  $(".js-priceFormClear").on("click",function(){
    $("#price_lower").val("");
    $("#price_upper").val("");
  });

  // 発送までの日数クリア
  $(".js-deliveryDurationtFormClear").on("click",function(){
    $("#delivery_duration").find("option").prop("selected", false);
  });

  // 送料クリア
  $(".js-shippingFeeCategoryFormClear").on("click",function(){
    $("#shipping_fee_category").find("input[type=checkbox]").prop("checked", false).removeClass('isChecked');
  });

  // フリーワードクリア
  $(".js-freeWordFormClear").on("click",function(){
    $("#free_word").val("");
  });
}


//slider
$(function(){
  //toppagePC
  if( $('.js-toppagePcSlide').length ){
    $('.js-toppagePcSlide').slick({
      dots: false,
      autoplay: true,
      autoplaySpeed: 7000,
      slidesToShow: 1,
      speed: 1200,
      // adaptiveHeight: true,
      centerMode: true,
      centerPadding: '10%',
      asNavFor: '.js-toppagePcSlide-thumb',
      arrows: true,
      prevArrow:'<div class="c-slick__bigarrow__prev"></div>',
      nextArrow:'<div class="c-slick__bigarrow__next"></div>',
    });
    //サムネイル
    $('.js-toppagePcSlide-thumb').slick({
      slidesToShow: 6,
      slidesToScroll: 1,
      asNavFor: '.js-toppagePcSlide',
      dots: false,
      centerMode: false,
      focusOnSelect: true,
      accessibility: true,
      adaptiveHeight: true,
    });
  }

  //チェックしたアイテム PC
  if( $('.js-checkedItemlist').length ){
  
    // 2020.10.09 ishikawa
    var shownum = ( $('.js-checkedItemlist').hasClass('c-checkedItemlist--item') )? 4: 5;
    $('.js-checkedItemlist').slick({
        dots: false,
        arrows: true,
        prevArrow:'<div class="c-slick__slide__prev"></div>',
        nextArrow:'<div class="c-slick__slide__next"></div>',
        // autoplay: false,
        speed: 500,
        slidesToShow: shownum,
        slidesToScroll: 2,
    });
  }
});


//商品詳細ページ
$(function() {
  //もっと見る （人気アイテムランキング　一緒に検討されているアイテム　同シリーズのアイテム etc
  if( $('.js-moreContentButton').length ){
    $('.js-moreContentList li:nth-child(n+9)').hide();
    $('.js-moreContentButton').on("click", function() {
      if( !$(this).hasClass('is-moreView') ){
        bScroll = $(window).scrollTop();
        $(this).addClass('is-moreView').parents('.js-moreContentContainer').find('.js-moreContentList li:nth-child(n+9)').slideDown();
        $(this).text("閉じる").removeClass('c-icArrow--down').addClass('c-icArrow--up');
      }else{
        $(this).removeClass('is-moreView').parents('.js-moreContentContainer').find('.js-moreContentList li:nth-child(n+9)').slideUp(100);
        $(this).text("もっと見る").removeClass('c-icArrow--up').addClass('c-icArrow--down');
        $("html, body").animate({scrollTop:bScroll}, 300);
      }
    });
  }
});


//popup時の背景scroll　stop
var fixedArray = ['ec-layoutRole']; // fixedにする要素
function bodyScrollStop(){
  const scrollbar_width = window.innerWidth - $(window).width();
  $('html').css({"padding-right":scrollbar_width, "overflow":"hidden"});
}
//popup時の背景scrollstop を戻す
function bodyScrolldefault(){
  setTimeout(function(){
    $('html').css({"padding-right":"0"});
    $('html').css({"overflow":"auto"});
  },400);
}
//下部固定のボタンエリアがある時、mainエリアにpaddingを設定
$(".l-optionDrawer__inner .c-modalFixedFooter").closest(".l-optionDrawer__inner").css('padding-bottom','90px');

//表示されているパネルのラジオボタンをチェック
$('.js-switch__container').each(function(index, elem) {
  $(elem).find('.js-switch__panel').each(function(no, tab) {
    if( $(tab).hasClass('is-current') ){
      $(tab).closest('.js-switch').find('.js-switchTab li').eq(no).children('input[type="radio"]').prop("checked", true);
    }
  });
});
