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

