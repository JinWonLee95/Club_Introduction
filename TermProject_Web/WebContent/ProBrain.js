/* 홈페이지 관련 js */

/** 구글맵 관련 함수 */
$(document).ready(function (){
	 
	  var latlng = new google.maps.LatLng(36.366658, 127.344441);
	  
	  var options = {
	    zoom: 17,
	    center: latlng,
	    mapTypeId: google.maps.MapTypeId.ROADMAP,
	    navigationControl: true,
	    mapTypeControl: false,
	    scrollwheel: false,
	    disableDoubleClickZoom: true
	  };
	 
	  var map = new google.maps.Map(document.getElementById('google_map'), options);

	  var marker1 = new google.maps.Marker({
	    position: latlng, map: map
	  });
	 
	  google.maps.event.addListener(marker1, 'click', function() {
	    infowindow.open(map, marker1);
	  });
	
	  var infowindow = new google.maps.InfoWindow({
	    content:  '<div class="info"><strong>ProBrain</strong><br><br>프로브레인의 위치<br> 공과대학 5호관 402호</div>'
	  }); 
	});
/* 구글 api */

/* parellex 기능 구현 부분  */
$(window).on('scroll',function(){
	var curPos = $(window).scrollTop();
	$('body').css('background-position','1 -' + curPos * .1 +'px');
	fadePanels(curPos);
}).scroll();

$("#login_Button").click(function(){
	alert("로그인 점검중입니다.")
})

/** 위로 올라가면 살짝 fade out되고 내려오면 fadein 된다. */
function fadePanels(curPos){
	var panels = $('.pad-section');

	for(var i =0; i<panels.length; i++){
		var offsetTop = $(panels[i]).offset().top;
		var halfPanel = (($(panels[i]).height() + 80) / 2)
		var offsetHalf = halfPanel + offsetTop;

		$(panels[i]).attr('data-scroll-top', offsetTop);
		$(panels[i]).attr('data-scroll-half', offsetHalf);

		var j = (curPos - offsetHalf) / halfPanel; // 어느정도 가야 fade가 될지 값을 정해준다.

		if( curPos> $(panels[i]).data('scroll-half')){
			$(panels[i]).css('opacity', 1 - (j));
		}else{
			$(panels[i]).css('opacity', '1');
		}
	}
}
/*fade처리 */

/** more 버튼 클릭 시 창 추가로 scroll */
$(document).ready(function(){
	$("#showMoreBtn").click(function(){
		$("#services01").slideToggle("slow");
	});
});

/** home에서 둘러보기 클릭시 내려가는 부분 */
$(document).ready(function(){
	$("#moreInfo").click(function(){
		$('html,body').animate({
			scrollTop: window.scrollY+window.innerHeight // Y축으로 1000만큼 scroll 된다.
		}, 1000);
	});
});
/* 둘러보기 버튼 자동 스크롤 */

$(document).ready(function(){
    $("#login").click(function(){
        $("#myModal").modal();
    });
});
/* 로그인 modal */

$('.carousel').carousel({
		interval:5000,
		pause:"hover"
		});
/* 활동 사진 carousel */