(function($){

	function Timer(){};
	var REFRESH_TIME = 20;
  
	// --------- Component Interface Implementation ---------- //
	Timer.prototype.create = function(data,config){
		var html = $("#tmpl-Timer").html();
		
		//make sure just one timer running.
		if($(".Timer").size() > 0){
			$(".Timer").bComponent().close();
		}
		
		return $(html);
	}
		
	Timer.prototype.postDisplay = function(data,config){
		var c = this;
		var $e = this.$element;
		var $canvas = $e.find("canvas");
		var canvas = c.canvas = $canvas[0];
		c.time = app.TIMER_ORIGIN_VALUE;
		c.parent = config.parent;
		
		var padding = 8;
		var $target = $e.parent();
		$e.width($target.width() + padding * 2 );
		$e.height($target.height() + padding * 2);
		c.g = brite.gtx($canvas).fitParent();
		$e.css("left","-"+padding+"px");
		$e.css("top","-"+padding+"px");
		
		//init
		var m = c.m = 4;
		var w = c.w = $e.width();
		var h = c.h = $e.height();
		
		refreshTimer.call(c);
	}
	// --------- /Component Interface Implementation ---------- //
	
	// --------- Component Public API --------- //	
	
	/**
	 * the event when timer runs out
	 */
	Timer.prototype.done = function(){
		var c = this;
		var $e = c.$element;
		
		c.close();
		if(c._onCloseCallback && $.isFunction(c._onCloseCallback)){
			c._onCloseCallback();
		}
	}
	
	/**
	 * do close
	 */
	Timer.prototype.close = function(){
		var c = this;
		var $e = c.$element;
		
		$e.bRemove();
	}
	
	/**
	 * done event call back with done event
	 */
	Timer.prototype.onDone = function(callback){
		var c = this;
		var $e = c.$element;
		c._onCloseCallback = callback;
	}
	// --------- /Component Public API --------- //
	
	// --------- Component Private API --------- //
	
	/**
	 * refresh Timer every 20 millseconds
	 */
	function refreshTimer(){
		var c = this;
		var $e = c.$element;
		c.time = c.time - REFRESH_TIME;
		var timeRatio = c.time / app.TIMER_ORIGIN_VALUE;
		
		if(c.time < 0){
			c.done();
		}else{
			drawShape.call(c,timeRatio);
			setTimeout(function(){
				console.log(1);
				refreshTimer.call(c);
			},REFRESH_TIME);
		}
	}
	
	/**
	 * draw shape by ratio
	 * @param {float} ration between 0 and 1
	 */
	function drawShape(ratio){
		var c = this;
		var $e = this.$element;
		
		//get the length by ratio
		var length = ((c.w - 2 * c.m) * 2 + (c.h - 2 * c.m) * 2) * ratio;
		
		var w = c.w;
		var h = c.h
		var m = c.m;
        var g = c.g;
        g.clear();
        var thickness = 3;
        g.lineWidth(thickness);
        g.strokeStyle("rgb(27,224, 165)");
        
        g.moveTo(w/2,m);
        if(length <= w/2 - m){
        	g.lineTo(w/2 - length,m);
        }else if(length > w/2 - m && length <= w/2 + h - 3 * m){
        	g.lineTo(m,m);
        	var lm = length - (w/2-m) + m;
        	g.lineTo(m,lm);
        }else if(length > w/2 + h - 3*m && length <= w/2 + h + w - 5*m){
        	g.lineTo(m,m);
        	g.lineTo(m,h-m);
        	var lm = length - (h - 2 * m) - (w/2 - m) + m;
        	g.lineTo(lm,h-m);
        }else if(length > w/2 + h + w - 5*m && length <= w/2 + h + w + h - 7*m){
        	g.lineTo(m,m);
        	g.lineTo(m,h-m);
        	g.lineTo(w-m,h-m);
        	var lm = h - m - (length - (h - 2*m) - (w-2*m) - (w/2 - m));
        	g.lineTo(w-m,lm);
        }else{
        	g.lineTo(m,m);
        	g.lineTo(m,h-m);
        	g.lineTo(w-m,h-m);
        	g.lineTo(w-m,m);
        	var lm = w - m - (length - (h - 2*m)*2 - (w-2*m) - (w/2 - m));
        	g.lineTo(lm,m);
        }
        g.stroke();
        
	}
	// --------- /Component Private API --------- //	
	
	
	// --------- Component Registration --------- //
	brite.registerComponent("Timer",{
        parent: ".player",
        loadTmpl:true
    },function(){
        return new Timer();
    });
	// --------- /Component Registration --------- //
})(jQuery);
