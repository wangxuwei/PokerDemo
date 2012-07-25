(function($){

	function MainScreen(){};
  
	// --------- Component Interface Implementation ---------- //
	MainScreen.prototype.create = function(data,config){
		var html = $("#tmpl-MainScreen").html();
		return $(html);
	}
		
	MainScreen.prototype.postDisplay = function(data,config){
		var c = this;
		var $e = this.$element;
		
		brite.display("Card",{cardNo:'2',cardSuite:"d"},{parent:".flip .cardsArea"});
		
		$e.on("click",".btnFlipCard",function(){
			$e.find(".flip .Card").each(function(){
				$(this).bComponent().show();
			});
		});
		
		$e.on("click",".btnDealCard",function(){
			dealCards.call(c);
		});
		
		$e.on("click",".btnBetChips",function(){
			betChips.call(c);
		});
		
		$e.on("click",".btnSeatChange",function(){
			changeSeat.call(c);
		});
		
		$e.on("click",".btnShowTimer",function(){
			showTimer.call(c);
		});
	}
	// --------- /Component Interface Implementation ---------- //
	
	// --------- Component Public API --------- //	
	
	// --------- /Component Public API --------- //
	
	// --------- Component Private API --------- //
	function dealCards(){
		var c = this;
		var $e = this.$element;
		$e.find(".deal .cardsArea .player").empty();
		
		var $dealer = $e.find(".deal .dealer");
		
		var cards = [
			{cardNo:'2',cardSuite:"d"},
			{cardNo:'3',cardSuite:"d"},
			{cardNo:'4',cardSuite:"d"},
			{cardNo:'5',cardSuite:"d"}
		];
		app.util.serialResolve(cards,function(obj,i){
			var dfd = $.Deferred();
			var p = i % 2;
			var $player = $e.find(".deal .player"+p);
			brite.display("Card",{display:false,cardNo:obj.cardNo,cardSuite:obj.cardSuite},{parent:$player}).done(function(card){
				var deltaX = $dealer.position().left - $player.position().left;
				var deltaY = $dealer.position().top - $player.position().top;
				//set origin position
				card.$element.css(brite.ua.cssPrefix()+"transform","translate("+deltaX+"px,"+deltaY+"px)");
				card.$element.css("left",($player.find(".Card").size()*20)+"px");
				setTimeout(function(){
					card.$element.show();
					card.$element.addClass("transitioning");
					//set target position
					card.$element.css(brite.ua.cssPrefix()+"transform","");
					card.$element.one("webkitTransitionEnd",function(){
						card.$element.removeClass("transitioning");
						card.show();
						card.$element.show();
						dfd.resolve();
					});
				},200);
				
			});
			return dfd.promise();
		});
	}
	
	function betChips(){
		var c = this;
		var $e = this.$element;
		
		var $chipArea = $e.find(".betChips .chipsArea").empty();
		var chip = 500;
		//show poker chip
		brite.display("PokerChip",{value:chip},{parent:$chipArea});
	}
	
	function changeSeat(){
		var c = this;
		var $e = this.$element;
		
		$e.find(".seat").each(function(){
			var $seat = $(this);
			$seat.addClass("transitioning");
			var $nextSeat;
			//get next seat, if not exist , use first seat instead
			if($seat.next().size() > 0){
				$nextSeat = $seat.next();
			}else{
				$nextSeat = $e.find(".seat:first");
			}
			var left = Math.round($nextSeat.position().left / 10) * 10;
			var top = Math.round($nextSeat.position().top / 10) * 10;
			$seat.css("left",left+"px");
			$seat.css("top",top+"px");
		});
	}
	
	function showTimer(){
		var c = this;
		var $e = this.$element;
		
		brite.display("Timer", {}, {parent:$e.find(".timerArea")}); 
	}
	// --------- /Component Private API --------- //	
	
	
	// --------- Component Registration --------- //
	brite.registerComponent("MainScreen",{
        parent: "#page",
        emptyParent: true,
        loadTmpl:true
    },function(){
        return new MainScreen();
    });
	// --------- /Component Registration --------- //
	
})(jQuery);
