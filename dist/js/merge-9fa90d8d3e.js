var $nav = $('.side-nav')
var $navWrap = $('.nav-wrapper')
var $navItem = $('.nav-item')
var $detailWrap = $('.detail-wrapper')
var $navDetail = $('.nav-detail')
// 当前列表项
var num
var num2
var timerId
$navItem.on('mouseenter',function(e){
  $(this).addClass('active')
  num = $(this).index()
  navShow()

})
$navItem.on('mouseleave',function(e){
  $(this).removeClass('active')
  navHide()
})



$navDetail.on('mouseenter',function(){
  num2 = $(this).index()
  $($navItem[num2]).addClass('active')
  $detailWrap.css({'display': 'block'})
  $(this).css({'display':'block'})
})
$navDetail.on('mouseleave',function(){
  $($navItem[num2]).removeClass('active')
  $detailWrap.css({'display': 'none'})
  $(this).css({'display':'none'})
})
//显示函数

function navShow() {
  $detailWrap.css({'display':'block'})
  $($navDetail[num]).css({'display': 'block'})
}

//隐藏函数 
function navHide() {
  $detailWrap.css({'display':'none'})
  $($navDetail[num]).css({'display': 'none'})
}
var $carousel = $('.carousel')

var $prev = $('.prev')

var $next = $('.next')

var $point = $('.ponit')

var len = $carousel.find('img').length;

var currentImgIndex = 0;

var changeLock

var timerId

// 初始化 

change(currentImgIndex)



// 切换函数  

function change(currentImgIndex) {
  if (changeLock === true) {
    return
  }
  changeLock = true
  $carousel.find('img').each(function (index) {
    if (index === currentImgIndex) {
      $(this).fadeIn(500, function () {
        changeLock = false
      })
    } else {
      $(this).fadeOut()
    }
  })
  showPoint()

}

// showActive point 
function showPoint() {
  $point.find('span').each(function (index) {
    if (index === currentImgIndex) {
      $(this).addClass('active')
    } else {
      $(this).removeClass('active')
    }
  })
}

// 自动播放
timerId = setInterval(function () {
  currentImgIndex = increaseIndex()
  change(currentImgIndex)
}, 3000)


//暂停自动播放 

$carousel.on('mouseenter', function () {
  clearInterval(timerId);
})
$carousel.on('mouseleave', function () {
  clearInterval(timerId)
  timerId = setInterval(function () {
    currentImgIndex = increaseIndex()
    change(currentImgIndex)
  }, 3000)
})


// 左右按钮点击事件

$prev.on('click', function () {
  if (changeLock === true) {
    return
  }
  currentImgIndex = decreaseIndex()
  change(currentImgIndex)
})
$next.on('click', function () {
  console.log(currentImgIndex)
  if (changeLock === true) {
    return
  }
  currentImgIndex = increaseIndex()
  change(currentImgIndex)
})


// 小圆点点击事件

$point.find('span').on('click',function(){
  clearInterval(timerId)
  currentImgIndex =  $(this).index()
  change(currentImgIndex)
})



// 增减当前显示图片下标
function increaseIndex() {

  if (currentImgIndex === len-1) {
    currentImgIndex = 0
  } else {
    currentImgIndex++
  }
  return currentImgIndex
}

function decreaseIndex() {
  if (currentImgIndex === 0) {
    currentImgIndex = len-1
  } else {
    currentImgIndex--
  }
  return currentImgIndex
}
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