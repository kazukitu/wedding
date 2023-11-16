//header
$(function() {
  //header fixed
  var hidden_head_height = 0;
  if( $(".c-header .c-headerTxt").length ){
    hidden_head_height = $(".c-header .c-headerTxt").height() ;
  }
  var fixedHeader = $(".l-header__main").html();
  if (fixedHeader !== undefined) {
    $(".ec-layoutRole").append('<div class="l-header__fixed" style="display:none;">' + fixedHeader + '</div>');

    $(window).on('scroll', function () {
      if ($(".ec-layoutRole").css('position') !== 'fixed') {
        if ($(this).scrollTop() > hidden_head_height) {
          $(".l-header__fixed").show();
        } else {
          $(".l-header__fixed").hide();
        }
      }
    });
  }
});

//sp版 絞り込み検索
if( $('.js-refineOpen').length ) {
  /**
   * カラーの選択
   *
   * @param select
   */
  function setColorAnswer(select){
    // $('.js-refine_mainBtn').show();
    // 現在選択されているカラーを取得
    let setAnswer = select.data('answer').toString();
    // クリックされたカラーを取得
    let currentValue = $('#color_id').val();
    let resultIndex = currentValue.indexOf(setAnswer);
    if(select.children().is(':visible')) {
      // 表示されている場合の処理
      select.children().hide();
    } else {
      // 非表示の場合の処理
      select.children().show();
    }
  }

  //カラー選択で指定する押下時
  function setCheckAnswerColor(selectButton){
    $('.js-refine_mainBtn').show();

    // 初期表示時のsort noを保持.
    let checkedColorIds = [];
    let colorClear = $('.js-refinecolorClear');
    colorClear.each(function() {
    // ×ボタンが表示されているものが選択中
      if($(this).is(':visible')) {
        checkedColorIds.push($(this).parent().data('answer').toString());
      }

    });

    //検索用のvalue挿入
    $("#color_id").val(checkedColorIds);

    setSearchParameterColor();

    $(".l-refine__drawer").removeClass("is_active");
  }

  // カラー選択状態を解除する
  function clearCheckColor() {
    $(".l-refine__colorSearch__clear").hide();
  }
}
//slider
$(function() {
  //toppageSP
  if( $('.js-toppageSlide').length ){
    $('.js-toppageSlide').slick({
      dots: true,
      arrows: false,
      autoplay: true,
      speed: 800
    });
  }

  //listpages - slickSlide
  if( $('.js-listpageSlide').length ){
    $('.js-listpageSlide').slick({
        dots: true,
        arrows: false,
        autoplay: true,
        speed: 300
    });
  }


  //無料特典freegift.twig
  // if( $('.js-brlSlider').length ){
  //   $('.js-brlSlider').slick({
  //       dots: true,
  //       arrows: false,
  //       autoplay: true,
  //       speed: 300
  //   });
  // }

});


//商品詳細ページ
$(function() {
  //もっと見る （人気アイテムランキング　一緒に検討されているアイテム　同シリーズのアイテム etc
  if( $('.js-moreContentButton').length ){
    $('.js-moreContentList li:nth-child(n+7)').hide();
    $('.js-moreContentButton').on("click", function() {
      if( !$(this).hasClass('is-moreView') ){
        bScroll = $(window).scrollTop();
        $(this).addClass('is-moreView').parents('.js-moreContentContainer').find('.js-moreContentList li:nth-child(n+7)').slideDown();
        $(this).text("閉じる").removeClass('c-icArrow--down').addClass('c-icArrow--up');
      }else{
        $(this).removeClass('is-moreView').parents('.js-moreContentContainer').find('.js-moreContentList li:nth-child(n+7)').slideUp(100);
        $(this).text("もっと見る").removeClass('c-icArrow--up').addClass('c-icArrow--down');
        $("html, body").animate({scrollTop:bScroll}, 300);
      }
    });
  }
});

//popup時の背景scroll　stop
var fixedArray = ['ec-layoutRole']; // fixedにする要素
function bodyScrollStop(){
  if( $( '.' + fixedArray[0] ).css('position') != 'fixed' ){
    var pos = new Array();
    $.each(fixedArray,function(i,k){
      if($('.'+k).length) pos[i] = $('.'+k).position().top - bScroll;
    });
    $.each(fixedArray,function(i,k){
      if($('.'+k).length) $('.'+k).css('position','fixed').css('top',pos[i]+'px').css('z-index','0').css('left',0).css('width','100%');
    });
  }
}
//popup時の背景scrollstop を戻す
function bodyScrolldefault(){
  if (typeof bScroll === 'undefined') {
    bScroll = $(window).scrollTop();
  }
  $.each(fixedArray,function(i,k){
    if(k != 'l-header__main.is-fixed' ){
      $('.'+k).css('position','').css('top','');
    }
  });
  $('.c-headerTxt').css('display','');
  $('.c-header').css('height','');
  $('.ec-layoutRole__footer').css('z-index','');
  $(window).scrollTop(bScroll);
}

//下部固定のボタンエリアがある時、mainエリアにpaddingを設定
$(".l-optionDrawer__inner .c-modalFixedFooter").closest(".l-optionDrawer__inner").css('padding-bottom','78px');
