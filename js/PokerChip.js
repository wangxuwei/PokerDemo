(function($){

	function PokerChip(){};
  
	// --------- Component Interface Implementation ---------- //
	PokerChip.prototype.create = function(data,config){
		var data = data || {};
		var opts = {value:1};
		if(data.value){
			opts.value = data.value;
		}
		this.opts = opts;
		var html = $("#tmpl-PokerChip").html();
		return $(html);
	}
		
	PokerChip.prototype.postDisplay = function(data,config){
		var c = this;
		var $e = this.$element;
		showChips.call(c);
	}
	// --------- /Component Interface Implementation ---------- //
	
	// --------- Component Public API --------- //	
	// --------- /Component Public API --------- //
	// --------- Component Private API --------- //	
	function showChips(){
		var c = this;
		var $e = this.$element;
		var chip = c.opts.value;
		var chips = [];
		var $chips = $e.find(".chips");
		for(var i = chip; i > 0; i = i - 100){
			chips.push(100);
		}
		
		app.util.serialResolve(chips,function(obj,i){
			var dfd = $.Deferred();
			var params = {imgSrc:1};
			var chipHtml = $("#tmpl-PokerChip-chip").render(params);
			var $chip = $(chipHtml);
			$chips.append($chip);
			$chip.css("left",(i*0.5)+"px");
			
			var deltaX = -100;
			var deltaY = 0;
			$chip.css(brite.ua.cssPrefix() + "transform", "translate(" + deltaX + "px," + deltaY + "px)");
			setTimeout(function() {
				$chip.addClass("transitioning-fast");
				$chip.css(brite.ua.cssPrefix() + "transform", "");
				$chip.one("webkitTransitionEnd", function() {
					$chip.removeClass("transitioning-fast");
					change$Value.call(c,obj);
					dfd.resolve();
				});
			}, 1); 
			return dfd.promise();
		});
	}
	function change$Value(value){
		var c = this;
		var $e = this.$element;
		var $value = $e.find(".value");
		$value.html($value.html()*1 + value);
	}
	// --------- /Component Private API --------- //
	
	// --------- Component Registration --------- //
	brite.registerComponent("PokerChip",{
        parent: ".player1 .betArea",
        loadTmpl:true
    },function(){
        return new PokerChip();
    });
	// --------- /Component Registration --------- //
})(jQuery);
