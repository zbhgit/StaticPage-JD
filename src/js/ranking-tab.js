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