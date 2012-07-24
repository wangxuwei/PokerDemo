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
				console.log(deltaX,deltaY);
				card.$element.css(brite.ua.cssPrefix()+"transform","translate("+deltaX+"px,"+deltaY+"px)");
				card.$element.css("left",($player.find(".Card").size()*20)+"px");
				setTimeout(function(){
					card.$element.show();
					card.$element.addClass("transitioning");
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
