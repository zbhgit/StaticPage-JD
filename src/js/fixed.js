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