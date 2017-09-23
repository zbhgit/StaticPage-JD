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

var $prev = $('.carousel-wrapper .prev')

var $next = $('.carousel-wrapper .next')

var $point = $('.carousel-wrapper .ponit')

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
var $carouselWrapper = $('.seckill-carousel')
var $carouselItem = $carouselWrapper.find('li')
var $prev = $('.seckill-prev')
var $next = $('.seckill-next')

// 初始num，点击按钮改变

var initNum = 1
var showNum = 5

// 动画进行时

var animate = false
// 克隆元素

// 每个item的宽度
var itemWidth = $carouselItem.first().outerWidth()
var itemLength = $carouselWrapper.find('li').length


// clone前面n个item和后面n个元素 n为显示个数 
var appendArr = []
var prependArr = []
$carouselItem.each(function (index) {
  $(this).attr('data-index', index)
  var newElemnt = $(this).clone()
  if (index < 5) {
    appendArr.push(newElemnt)
  }
  if (index > (itemLength - 1 - 5)) {
    prependArr.push(newElemnt)
  }
})
// 插入前面n个元素
for (var j = prependArr.length - 1; j >= 0; j--) {
  prependArr[j].prependTo('.seckill-carousel')
}
// 添加后面几个元素
for (var i = 0; i < appendArr.length; i++) {
  appendArr[i].appendTo('.seckill-carousel')
}

var newLength = $carouselWrapper.find('li').length

// 设置carousel总长度宽度
$carouselWrapper.css({
  'width': newLength * itemWidth + 'px',
  'transform': 'translateX(' + -itemWidth * showNum + 'px)'

})
// $carouselWrapper.css({
//   'transition': 'transform 0.3s linear'

// })


// 按钮点击事件

$next.on('click', function () {
  if (animate === true) {
    return
  }
  animate = true
  console.log(initNum)
  initNum += 1
  $carouselWrapper.css({
    'transition': 'transform 0.6s',
    'transform': 'translateX(' + -itemWidth * showNum * initNum + 'px)'
  })
  if (initNum >= newLength / showNum - 1) {
    initNum = 1

    setTimeout(function () {
      $carouselWrapper.css({
        'transition': 'none',
        'transform': 'translateX(' + -itemWidth * showNum + 'px)'
      })
    }, 600)
  }
  setTimeout(function () {
    animate = false
  }, 600)
})
$prev.on('click', function () {
  if (animate === true) {
    return
  }
  animate = true
  initNum--
  $carouselWrapper.css({
    'transition': 'transform 0.6s',
    'transform': 'translateX(' + -itemWidth * showNum * initNum + 'px)'
  })
  if (initNum === 0) {
    initNum = 4

    setTimeout(function () {
      $carouselWrapper.css({
        'transition': 'none',
        'transform': 'translateX(' + -itemWidth * showNum * initNum + 'px)'
      })
    }, 600)
  }
  setTimeout(function () {
    animate = false
  }, 600)
})


var fnTimeCountDown = function (d, o) {
  var f = {
    zero: function (n) {
      var n = parseInt(n, 10)
      if (n > 0) {
        if (n <= 9) {
          n = '0' + n;
        }
        return String(n)
      } else {
        return "00"
      }
    },
    dv: function () {
      d = d || Date.UTC(2050, 0, 1) // 设定目标时间
      var future = new Date(d)
      var now = new Date()
      var dur = Math.round((future.getTime() - now.getTime()) / 1000) + future.getTimezoneOffset() * 60
      var pms = {
        sec: "00",
        mini: '00',
        hour: '00',
        day: "00",
        month: "00",
        year: '0'
      }
      if (dur > 0) {
        pms.sec = f.zero(dur % 60)
        pms.mini = Math.floor((dur / 60)) > 0 ? f.zero(Math.floor((dur / 60)) % 60) : "00"
        pms.hour = Math.floor((dur / 3600)) > 0 ? f.zero(Math.floor((dur / 3600)) % 24) : "00"
        pms.day = Math.floor((dur / 86400)) > 0 ? f.zero(Math.floor((dur / 86400)) % 30) : "00"
        //月份，以实际平均每月秒数计算
        pms.month = Math.floor((dur / 2629744)) > 0 ? f.zero(Math.floor((dur / 2629744)) % 12) : "00"
        //年份，按按回归年365天5时48分46秒算
        pms.year = Math.floor((dur / 31556926)) > 0 ? Math.floor((dur / 31556926)) : "0"
      }
      return pms
    },
    ui: function(){
      if(o.sec) {
        o.sec.innerHTML = f.dv().sec
      }
      if(o.mini) {
        o.mini.innerHTML = f.dv().mini
      }
      if(o.hour) {
        o.hour.innerHTML = f.dv().hour
      }
      if(o.day) {
        o.day.innerHTML = f.dv().day
      }
      if(o.month) {
        o.month.innerHTML = f.dv().month
      }
      if(o.year) {
        o.year.innerHTML = f.dv().year
      }
      setTimeout(f.ui,1000)
    }
  }
  f.ui()
}

var sec = document.getElementById('sec')
var mini = document.getElementById('mini')
var hour = document.getElementById('hour')

var d = Date.UTC(2017,8,29,23,00)

var obj = {
  sec: sec,
  mini: mini,
  hour: hour
}
fnTimeCountDown(d,obj)

var $specialWrapper = $('.special-wrapper')
var $specialPrev = $('.special-wrapper .prev')

var $specialNext = $('.special-wrapper .next')

var $specialPoint = $('.special-wrapper .point-wrapper')
var specialListLen = $specialWrapper.find('.special-list').length
var specialLock = false
var specialTimerId
var specialNum = 0

specialChange(specialNum)

//  初始化

function specialChange(specialNum) {
  if (specialLock === true) {
    return
  }
  specialLock = true
  $specialWrapper.find('.special-list').each(function (index) {
    if (index === specialNum) {
      $(this).fadeIn('fast', function () {
        specialLock = false
      })
    } else {
      $(this).fadeOut()
    }
  })
  showSpecialPoint(specialNum)
}


// showActive point 
function showSpecialPoint(specialNum) {
  $specialPoint.find('span').each(function (index) {
    if (index === specialNum) {
      $(this).addClass('active')
    } else {
      $(this).removeClass('active')
    }
  })
}

// 自动播放
specialTimerId = setInterval(function () {
  specialNum = increaseSpecialNum()
  specialChange(specialNum)

}, 3000)


//暂停自动播放 

$specialWrapper.on('mouseenter', function () {
  clearInterval(specialTimerId);
})
$specialWrapper.on('mouseleave', function () {
  clearInterval(specialTimerId)
  specialTimerId = setInterval(function () {
    specialNum = increaseSpecialNum()
    specialChange(specialNum)

  }, 3000)
})



// 增减当前显示图片下标
function increaseSpecialNum() {

  if (specialNum === specialListLen - 1) {
    specialNum = 0
  } else {
    specialNum++
  }
  return specialNum
}

function decreaseSpecialNum() {
  if (specialNum === 0) {
    specialNum = specialListLen - 1
  } else {
    specialNum--
  }
  return specialNum
}

// 左右按钮点击事件

$prev.on('click', function () {
  if (specialLock === true) {
    return
  }
  specialNum = increaseSpecialNum()
  specialChange(specialNum)
})
$specialNext.on('click', function () {
  if (specialLock === true) {
    return
  }
  specialNum = decreaseSpecialNum()
  specialChange(specialNum)
})

// 小圆点点击事件

$specialPoint.find('span').on('click',function(){
  console.log('enter')
  clearInterval(specialTimerId)
  specialNum =  $(this).index()
  specialChange(specialNum)
})
var $rankingTabBtn = $('.tab-button-wrapper .tab-button')

var $rankingLine = $('.tab-button-wrapper .tab-line')

var $rankingContent = $('.tab-content')


// 初始num 

var rankingNum = 0

// 初始调用

showRankingTab()

$rankingTabBtn.find('li').on('mouseenter', function () {
  rankingNum = $(this).index()
  var rankLeft = 15 + rankingNum * 80 + 'px'
  $rankingLine.animate({
    left: rankLeft,
    width: $(this).width()
  }, 200)
  showRankingTab()

})


function showRankingTab() {
  $rankingContent.find('.tab-list').each(function (index) {
    var contentNum = $(this).index()
    if (rankingNum === contentNum) {
      console.log('enter')
      $(this).css({
        'display': 'block'
      })
    } else {
      console.log('leave')
      $(this).css({
        'display': 'none'
      })
    }
  })
}
//  滚动距离超过800px   顶部搜索框出现 

var $fixedSearch = $('.search-fixd')
var $goTop = $('.goTop')


// 左侧固定按钮

var $leftBtn = $('.left-side')

// 获取滚动按钮 
var $scrollbtn = $('.scroll-btn')
// 获取滚动位置 

var $scrollpoint = $('.costume')



// console.log($scrollpoint.length)
// console.log($scrollbtn.length)


var timerout

$(window).on('scroll', function () {
  clearTimeout(timerout)
  var WscrollTop = $(this).scrollTop()
  timerout = setTimeout(function () {
    if (WscrollTop > 650) {
      $fixedSearch.slideDown()
    }
    if (WscrollTop < 650) {
      $fixedSearch.slideUp()

    }
    if (WscrollTop > 1500) {
console.log($leftBtn)
      
      $leftBtn.fadeIn()
    }

    if (WscrollTop < 1500) {
      $leftBtn.fadeOut()

    }
  }, 600)

})

// 回到顶部

$goTop.on('click', function () {
  console.log('enter')
  $('body,html').animate({
    scrollTop: '0px'
  }, 600)
})


//  滚动到指定位置

$scrollbtn.on('click', function () {
  var scrollNum = $(this).index()
  $scrollpoint.each(function (index) {
    if (index === scrollNum) {
      var pointScrollTop = $(this).offset().top
      $('body,html').animate({
        scrollTop: pointScrollTop - 50 + 'px'
      })
    }
  })
  $scrollbtn.each(function (index) {
    if (index === scrollNum) {
      $(this).addClass('active')
    } else {
      $(this).removeClass('active')
    }
  })
})




// // 简单的节流函数
// function throttle(func, wait, mustRun) {
//   var timeout,
//     startTime = new Date();

//   return function () {
//     var context = this,
//       args = arguments,
//       curTime = new Date();
//     clearTimeout(timeout);
//     // 如果达到了规定的触发时间间隔，触发 handler
//     if (curTime - startTime >= mustRun) {
//       func.apply(context, args);
//       startTime = curTime;
//       // 没达到触发间隔，重新设定定时器
//     } else {
//       timeout = setTimeout(func, wait);
//     }
//   };
// };
// // 实际想绑定在 scroll 事件上的 handler
// function realFunc() {
//   console.log("Success");
// }
// 采用了节流函数
// window.addEventListener('scroll', throttle(realFunc, 500, 1000));