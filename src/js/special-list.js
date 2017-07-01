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