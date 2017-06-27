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
var toolShowNum;

$toolPanel.find('li').on('mouseenter', function () {
  
  if ($(this).index() < 4) {
    $toolShow.addClass('tool-show')
    $toolHide.addClass('tool-hide')
     $toolHide.css({
       'display': 'none'
     })
  }
})


$toolShow.on('mouseenter',function(){
  $toolShow.find('span').removeClass('active')
  $(this).find('span').addClass('active')
})