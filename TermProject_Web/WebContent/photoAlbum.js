/* 사진첩 jsp */

var fileURL = []; // 사진 불러올 때 필요한 정보 저장을 위한 배열 변수

/** 윈도우 로드시 호출 */
window.onload = function() {
	// console.log(localStorage.getItem("img0"));
	
	// txt 파일로 저장되어있는 사진의 url을 읽어와서 초기화면에 불러준다.
	$.ajax({
		url : "./uploadURLs/url.txt",
		dataType : "text",
		type : "POST",
		success : function(data) {
			var msg = data.split("+"); //+로 각 사진의 url을 나눠  msg 배열에 넣어준다.

			for (var i = 0; i < msg.length; i++) {
				if (msg[i] == "") // 만약 배열이 비어있으면 break 해준다. (예외처리)
					break;

				var li = document.createElement("li"); // append 해줄 list item
				var liImg = document.createElement("img"); // 업로드 해줄 img

				// li의 속성들을 모두 정해준다.
				$(liImg).attr("class", "img-responsive"); 
				$(liImg).attr("src", msg[i]);
				$(liImg).attr("alt", msg[i]); // 아직 DB가 없어서 alt가 뜰텐데 일단 이전에 만들어줬던 url이 뜨게 해놓았다.
				
				$(li).attr("class", "col-lg-2 col-md-2 col-sm-3 col-xs-4");

				li.appendChild(liImg);
				document.getElementById("photoList").append(li); // 사진 추가

			}
		},

		error : function(xhr, message, errorThrown) {
			var msg = xhr.status + " / " + message + " / " + errorThrown;
			console.log(msg);
		}
	})
}

/** 사진 추가 버튼 클릭 시 form 띄워주기 */
$('#applyBtn').click(function() {
	$('#photoAdd').css("display", "block");
});

/** 사진 클릭시 모달창 팝업 */
$(document).ready( function() {$('li img').on('click',function() {
	var src = $(this).attr('src');
	var img = '<img src="' + src+ '" class="img-responsive"/>';// start of new code new code
	var index = $(this).parent('li').index();
	var html = '';
	html += img;
	html += '<div style="height:25px;clear:both;display:block;">';
	html += '<a class="controls next" href="'+ (index + 2)+ '">next &raquo;</a>';
	html += '<a class="controls previous" href="'+ (index)+ '">&laquo; prev</a>';
	html += '</div>'; //모달창에 나타낼 div 코드 생성

	$('#photoModal').modal();
	$('#photoModal').on('shown.bs.modal',function() {$('#photoModal .modal-body').html(html);// new code
	$('a.controls').trigger('click');})
	$('#photoModal').on('hidden.bs.modal',function() {$('#photoModal .modal-body').html('');
		});
	});
})

/** 모달 팝업 시 다음 이전 버튼 생성 */
$(document).on('click', 'a.controls', function() {
	var index = $(this).attr('href');
	var src = $('ul.row li:nth-child(' + index + ') img').attr('src');

	$('.modal-body img').attr('src', src);

	var newPrevIndex = parseInt(index) - 1;
	var newNextIndex = parseInt(newPrevIndex) + 2;

	//이전과 다음이 있다면 버튼을 만들어 사진을 볼 수 있게 한다.
	if ($(this).hasClass('previous')) {
		$(this).attr('href', newPrevIndex);
		$('a.next').attr('href', newNextIndex);
	} else {
		$(this).attr('href', newNextIndex);
		$('a.previous').attr('href', newPrevIndex);
	}

	var total = $('ul.row li').length + 1;
	// hide next button
	if (total === newNextIndex) {
		$('a.next').hide();
	} else {
		$('a.next').show()
	}
	// hide previous button
	if (newPrevIndex === 0) {
		$('a.previous').hide();
	} else {
		$('a.previous').show()
	}
	return false;
});

/** 로그인창 */
$(document).ready(function() {
	$("#login").click(function() {
		$("#LoginModal").modal();
	});
});

/** 사진 올리는 부분 */
$("#append_photo").click(function() {
	var files = document.getElementById("photos").files;
	var list = [];
	var listImg = [];

	for (var i = 0; i < files.length; i++) {
		list[i] = document.createElement("li");
		listImg[i] = document.createElement("img");

		listImg[i].src = window.URL.createObjectURL(files[i]);

		fileURL.push(window.URL.createObjectURL(files[i]));

		$(listImg[i]).attr("class", "img-responsive");
		$(list[i]).attr("class", "col-lg-2 col-md-2 col-sm-3 col-xs-4");
		$(list[i]).attr("alt", files[i].name);

		list[i].appendChild(listImg[i]);
		document.getElementById("photoList").append(list[i]);

		// console.log(files[i]);
		//		
		// localStorage.setItem("img"+i, files[i]);
	}

	jQuery.ajaxSettings.traditional = true;
	
	/* onload시 파일 불러오기 위해 jsp 파일로 값 넘겨주는 부분 */
	$.ajax({
		url : "NewFile.jsp",
		type : "POST",
		data : {
			"url" : fileURL,
		},
		success : function(data) {
			console.log("전송 완료");
		},
		error : function(errorThrown) {
			alert("에러 : " + errorThrown);
		}
	});

});

/** 닫기버튼 누르면 form 감추기 */
$("#hide_form").click(function() {
	$('#photoAdd').css("display", "none");
});
