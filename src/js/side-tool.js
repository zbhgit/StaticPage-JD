var $bulletinBtn = $('.bulletin-title')
var $bulletinContent = $('.bulletin-content')
var $bttomLine = $('.bottom-line')

var bulletinNum = 0


bulletinShow()
// 显示与隐藏content
function bulletinShow() {
  $bulletinContent.find('ul').each(function (index) {
    if (index === bulletinNum) {
      $(this).css({
        'display': 'block'
      })
    } else {
      $(this).css({
        'display': 'none'
      })
    }
  })
}


$bulletinBtn.find('span').on('mouseenter', function () {
  bulletinNum = $(this).index()
  bulletinShow()
  var left = 54 * bulletinNum + 'px'
  $bttomLine.animate({
    left: left
  }, 200, "linear")
})


//  tool-panel 部分js代码

var $toolPanel = $('.tool-panel')
var $toolShow = $('.tool-show_js')
var $toolHide = $('.tool-hide_js')
var $form = $('.form')
var $tabWrapper = $('.tab-wrapper')
var $close = $('.form .icon-close')

var $btn = $('.tab-title a')
var $btnParent = $btn.parent()
var $contentWrapper = $('.tab-content').parent('.content-wrapper')

var toolShowNum;


// 添加class 

panelHide()
$($toolShow.get(3)).on('mouseleave', function () {
  panelHide()
})

function panelHide() {
  $toolPanel.find('li').on('mouseenter', function () {

    if ($(this).index() < 4) {
      $toolShow.addClass('tool-show')
      $toolHide.addClass('tool-hide')
      $toolHide.css({
        'display': 'none'
      })
      $form.css({
        'top': '27px'
      })
    }
  })
  $toolShow.on('mouseenter', function () {
    var showNum = $(this).index()
    $toolShow.find('span').removeClass('active')
    $(this).find('span').addClass('active')
    $tabWrapper.css({
      'display': 'none'
    })
    $($tabWrapper.get(showNum)).css({
      'display': 'block'
    })

    // 初始化状态
    $($tabWrapper.get(showNum)).find('.tab-title a').each(function (index) {
      if (index === 0) {
        $(this).addClass('enter-active')
      } else {
        $(this).removeClass('enter-active')
      }
    })
    $contentWrapper.css({
      'left': 0
    })

  })
}


// 显示tool-panel

$close.on('click', function () {
  $toolShow.removeClass('tool-show')
  $toolHide.removeClass('tool-hide')
  $toolHide.css({
    'display': 'block'
  })
  $form.css({
    'top': '220px'
  })
  $($toolShow.get(3)).off('mouseenter')
})




// 动画tab切换 





$btnParent.find('a').on('mouseenter', function () {
  $btnParent.find('a').removeClass('enter-active')
  $(this).addClass('enter-active')
  var num = $(this).index()
  var toggleLeft = -182 * num + 'px'
  $contentWrapper.animate({
    'left': toggleLeft
  }, 200)
})