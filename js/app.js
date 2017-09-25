$(document).ready(function(){

	$(window)
		.on("scrollstart", function() {
	    	// Paint the world yellow when scrolling starts.
	    	setTimeout(function(){ 
				$(".firstword_search").css("display", "block").fadeIn("slow")
			}, 500);
	  	})
	  	.on("scrollstop", function() {
	    	// Paint it all green when scrolling stops.
			setTimeout(function(){ 
				$(".firstword_search").css("display", "none").fadeOut(1000)
			}, 1000);
	  	})

	//채팅 더보기
	$(".chat_more").click(function(){
		if($(this).find("i").hasClass("fa-commenting")){
			$(this).find("i").removeClass("fa fa-commenting fa-2x").addClass("fa fa-close fa-2x");
		}else{
			$(this).find("i").removeClass("fa fa-close fa-2x").addClass("fa fa-commenting fa-2x");
		}

		$(".chat_btn_list").toggleClass("chat_btn_list-show");

		var maskHeight = $(document).height();
		var maskWidth = $(document).width();
		$(".chat_back").css({"width": maskWidth, "height":maskHeight});
		$(".chat_back").toggleClass("chat_back-show");
	});

	//친구 관리
	$(".header_management").click(function(){
		$(".friend_minus").toggleClass("friend_minus-show");
		$(".friend_mind").toggleClass("friend_mind-hide");
		$(".friend_hide").toggleClass("friend_hide-hide");
		$("div[id='friendList']").find("#friendWrap").toggleClass("friend_wrap-minus");
		$("div[id='friendList']").find("#friendWrap").removeClass("friend_wrap-right friend_wrap-left2");

		if($(".header_management").data("value") == "manage"){
			$(".header_management").addClass("header_complete");
			$(".header_management").html("완료");
			$(".header_setting").html("<i class='fa fa-plus fa-lg'></i> 그룹");

			$(".friend_favorite").hide();
			$(".friend_cutoff").hide();
			$(".friend_hide").removeClass("friend_hide-show friend_hide-show2");

			$(".chat_more").hide();
			$(".header_management").data("value", "complete");

		}else{
			$(".header_management").removeClass("header_complete");
			$(".header_management").html("관리");
			$(".header_setting").html("<i class='fa fa-cog fa-lg'></i>");

			$("div[id='friendList']").find(".friend_minus").removeClass("friend_minus-show");
			$("div[id='friendList']").find("#friendWrap").removeClass();
			$("div[id='friendList']").find("#friendWrap").addClass("friend_wrap");
			$(".friend_hide").removeClass("friend_hide-show friend_hide-show2");

			$(".chat_more").show();
			$(".header_management").data("value", "manage");
		}
	});

	$(".header_edit").click(function(){

		$(".chat_minus").toggleClass("chat_minus-show");

		if($(".chat_minus").hasClass("chat_minus-show")){
			$(".header_edit").addClass("header_complete");
			$(".header_edit").html("완료");
		}else{
			$(".header_edit").removeClass("header_complete");
			$(".header_edit").html("편집");
		}
	});

	//친구 프로필 보기
	$("#myList, #friendList").find(".friend_wrap").click(function(){
		$(".wrap").addClass("wrap-hide");

		$(".chat_more").hide();

		$(".profile").addClass("profile-show");
		var maskTop = $(document).scrollTop();
		var maskWidth = $(document).width();
		$(".profile").css({"width": "100%", "height": "100%"});
	});

	//친구 프로필 닫기
	$(".profile_close").click(function(){
		$(".wrap").removeClass("wrap-hide");
		$(".chat_more").show();
		$(".profile").removeClass("profile-show");
	});

	$("div[id='friendList']").find(".friend_minus_circle").click(function(){
		$(".friend_wrap").each(function(){
			if($(this).hasClass("friend_wrap-left")){
				$(this).parent().find(".friend_minus").addClass("friend_minus-show");
				$(this).parent().find(".friend_wrap").addClass("friend_wrap-minus");
				$(this).parent().find(".friend_wrap").removeClass("friend_wrap-left");
				$(this).parent().find(".friend_hide").removeClass("friend_hide-show");				
			}
		});

		$(this).parent().parent().find(".friend_minus").toggleClass("friend_minus-show");
		$(this).parent().parent().find(".friend_wrap").toggleClass("friend_wrap-minus");
		$(this).parent().parent().find(".friend_wrap").toggleClass("friend_wrap-left");
		$(this).parent().parent().find(".friend_hide").toggleClass("friend_hide-show");
	});

	//숨김
	$(".friend_hide").click(function(e){
		$(this).parent().remove();
	});


	//swipe
	/*
	$("div[id='friendList']").find(".friend_wrap").bind('swipeleft', function(e) {
		$(this).removeClass("friend_wrap-right");
		$(this).parent().find(".friend_favorite").removeClass("friend_favorite-show");

		$(this).addClass("friend_wrap-left2");
		$(this).parent().find(".friend_hide").addClass("friend_hide-show2");
		$(this).parent().find(".friend_cutoff").addClass("friend_cutoff-show");
	});

	$("div[id='friendList']").find(".friend_wrap").bind('swiperight', function(e) {
		$(this).removeClass("friend_wrap-left2");
		$(this).parent().find(".friend_hide").removeClass("friend_hide-show2");
		$(this).parent().find(".friend_cutoff").removeClass("friend_cutoff-show");

		$(this).addClass("friend_wrap-right");
		$(this).parent().find(".friend_favorite").addClass("friend_favorite-show");

	})
	*/
	setFirstword();
	
});

function firstwordSearch(str) {
	var firstwordKor = ["ㄱ","ㄲ","ㄴ","ㄷ","ㄸ","ㄹ","ㅁ","ㅂ","ㅃ","ㅅ","ㅆ","ㅇ","ㅈ","ㅉ","ㅊ","ㅋ","ㅌ","ㅍ","ㅎ"];
	var firstwordEng = ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"];
  	var result = "";
  	for(i=0; i < 1; i++) {
  		var code = "";
  		if(str.toUpperCase().charCodeAt(i) >= 60 && str.toUpperCase().charCodeAt(i) <= 90){
  			code = str.toUpperCase().charCodeAt(i);
  			result = firstwordEng[Math.floor(code-65)];
  		}else{
  			code = str.toUpperCase().charCodeAt(i)-44032;
    		if(code > -1 && code < 11172) result += firstwordKor[Math.floor(code/588)];
  		}
  	}

  	return result;
}

function setFirstword(){
	var firstwords = [];
	var firstwordsUni = [];
	$(".friend").each(function(){
		var firstword = firstwordSearch($(this).find(".friend_title_s").html());
		firstwords.push(firstword);
	});

	$.each(firstwords, function(i, el){
		if($.inArray(el, firstwordsUni) === -1) firstwordsUni.push(el);
	});

	firstwordsUni.sort();

	$.each(firstwordsUni, function(index, item){
		//alert(index+"번째 요소 : "+item.name+" "+item.age);
		$("<li>" + item + "</li>").appendTo($(".firstword_search").find("ul"))
	});
}

//alert(firstwordSearch("안녕하세요"));
