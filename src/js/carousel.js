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
  console.log(currentImgIndex)
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