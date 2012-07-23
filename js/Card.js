(function($){

	function Card(){};
  
	// --------- Component Interface Implementation ---------- //
	Card.prototype.create = function(data,config){
		var card = null;
		var data = data || {};
		var opts = {
			show:false,
			cardNo:"",
			cardSuite:"",
			path:"res/images/",
			ext:".png"
		};
		if(data.show){
			opts.show = true;
		}
		opts.cardNo = data.cardNo;
		opts.cardSuite = data.cardSuite;
		console.log(opts);
		this.opts = opts;
		var html = $("#tmpl-Card").render(opts);
		return $(html);
	}
	
	Card.prototype.init = function(data,config){
		var c = this;
		var $e = this.$element;
	}
		
	Card.prototype.postDisplay = function(data,config){
		var c = this;
		var $e = this.$element;
		
		
	}
	// --------- /Component Interface Implementation ---------- //
	
	// --------- Component Public API --------- //	
	
	// --------- /Component Public API --------- //
	// --------- Component Private API --------- //	
	/**
	 * show front of Card
	 */
	Card.prototype.show = function(){
		var c = this;
		var $e = this.$element;
		$e.find(".Card-fg-content img").attr("src", c.opts.path + "card_" + c.opts.cardSuite + "_" + c.opts.cardNo + c.opts.ext);

		$e.addClass("show");
	}
	
	/**
	 * show back of Card
	 */
	Card.prototype.hide = function(){
		var c = this;
		var $e = this.$element;
		$e.removeClass("show");
	}
	
	/**
	 * get value true if card show
	 */
	Card.prototype.isShow = function(){
		var c = this;
		var $e = this.$element;
		return $e.hasClass("show") ? true : false;
	}
	// --------- /Component Private API --------- //
	
	// --------- Component Registration --------- //
	brite.registerComponent("Card",{
        parent: ".cardsArea",
        loadTmpl:true
    },function(){
        return new Card();
    });
	// --------- /Component Registration --------- //
})(jQuery);
