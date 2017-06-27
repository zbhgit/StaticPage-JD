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