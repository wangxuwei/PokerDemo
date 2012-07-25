(function($){

	function Timer(){};
	var REFRESH_TIME = 20;
	var RADIUS = 5;
  
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
		
		var w = c.w;
		var h = c.h;
		//padding
		var m = c.m;
        var g = c.g;
        //round radius
        var r = RADIUS;
        g.clear();
        // cirle length / 4, divide round rectangle to 9 segments 
        var lc = Math.PI/2 * r;
        var l1 = w/2 - m - r;
        var l2 = lc;
        var l3 = h - 2 * m - 2 * r;
        var l4 = lc;
        var l5 = 2*l1;
        var l6 = lc;
        var l7 = l3;
        var l8 = lc;
        var l9 = l1;
        //get the length by ratio
		var length = (l1 + l2 + l3 + l4 + l5 + l6 + l7 + l8 + l9) * ratio;
		
        var thickness = 3;
        g.lineWidth(thickness);
        g.strokeStyle("rgb(27,224, 165)");
        
        g.moveTo(w/2,m);
        if(length <= l1){
        	var lm = length;
        	g.lineTo(l1 - lm + m + r,m);
        }else if(length > l1 && length <= l1 + l2){
        	g.lineTo(l1+m+r,m);
        	var lm = length - l1;
        	g.arc(m+r,m+r, r, 3*Math.PI/2,3*Math.PI/2 - lm/r,true);
        }else if(length > l1 + l2 && length <= l1 + l2 + l3){
        	g.lineTo(l1+m+r,m);
        	g.arc(m+r,m+r, r, 3*Math.PI/2,Math.PI,true);
        	var lm = length - l1 - l2;
        	g.lineTo(m,lm+m+r);
        }else if(length > l1 + l2 + l3 && length <= l1 + l2 + l3 + l4){
        	g.lineTo(l1+m+r,m);
        	g.arc(m+r,m+r, r, 3*Math.PI/2,Math.PI,true);
        	g.lineTo(m,l3+m+r);
        	var lm = length - l1 - l2 - l3;
        	g.arc(m+r,h - m - r, r, Math.PI,Math.PI-lm/r,true);
        }else if(length > l1 + l2 + l3 + l4 && length <= l1 + l2 + l3 + l4 + l5){
        	g.lineTo(l1+m+r,m);
        	g.arc(m+r,m+r, r, 3*Math.PI/2,Math.PI,true);
        	g.lineTo(m,l3+m+r);
        	g.arc(m+r,h - m - r, r, Math.PI,Math.PI/2,true);
        	var lm = length - l1 - l2 - l3 - l4;
        	g.lineTo(lm + r + m,h - m);
        }else if(length > l1 + l2 + l3 + l4 + l5 && length <= l1 + l2 + l3 + l4 + l5 + l6){
        	g.lineTo(l1+m+r,m);
        	g.arc(m+r,m+r, r, 3*Math.PI/2,Math.PI,true);
        	g.lineTo(m,l3+m+r);
        	g.arc(m+r,h - m - r, r, Math.PI,Math.PI/2,true);
        	g.lineTo(l5 + r + m,h - m);
        	var lm = length - l1 - l2 - l3 - l4 - l5;
        	g.arc(w - m - r,h - m - r, r, Math.PI/2 ,Math.PI/2-lm/r,true);
        }else if(length > l1 + l2 + l3 + l4 + l5 + l6 && length <= l1 + l2 + l3 + l4 + l5 + l6 + l7){
        	g.lineTo(l1+m+r,m);
        	g.arc(m+r,m+r, r, 3*Math.PI/2,Math.PI,true);
        	g.lineTo(m,l3+m+r);
        	g.arc(m+r,h - m - r, r, Math.PI,Math.PI/2,true);
        	g.lineTo(l5 + r + m,h - m);
        	g.arc(w - m - r,h - m - r, r, Math.PI/2 ,0,true);
        	var lm = length - l1 - l2 - l3 - l4 - l5 - l6;
        	g.lineTo(w - m,l7 - lm + m + r);
        }else if(length > l1 + l2 + l3 + l4 + l5 + l6 + l7 && length <= l1 + l2 + l3 + l4 + l5 + l6 + l7 + l8){
        	g.lineTo(l1+m+r,m);
        	g.arc(m+r,m+r, r, 3*Math.PI/2,Math.PI,true);
        	g.lineTo(m,l3+m+r);
        	g.arc(m+r,h - m - r, r, Math.PI,Math.PI/2,true);
        	g.lineTo(l5 + r + m,h - m);
        	g.arc(w - m - r,h - m - r, r, Math.PI/2 ,0,true);
        	g.lineTo(w - m,l7 + m + r);
        	var lm = length - l1 - l2 - l3 - l4 - l5 - l6 - l7;
        	g.arc(w - m - r,m + r, r, Math.PI*2 ,Math.PI * 2 - lm/r,true);
        }else if(length > l1 + l2 + l3 + l4 + l5 + l6 + l7 + l8 && length <= l1 + l2 + l3 + l4 + l5 + l6 + l7 + l8 + l9){
        	g.lineTo(l1+m+r,m);
        	g.arc(m+r,m+r, r, 3*Math.PI/2,Math.PI,true);
        	g.lineTo(m,l3+m+r);
        	g.arc(m+r,h - m - r, r, Math.PI,Math.PI/2,true);
        	g.lineTo(l5 + r + m,h - m);
        	g.arc(w - m - r,h - m - r, r, Math.PI/2 ,0,true);
        	g.lineTo(w - m,l7 + m + r);
        	g.arc(w - m - r,m + r, r, Math.PI*2 ,Math.PI  * 3/2,true);
        	var lm = length - l1 - l2 - l3 - l4 - l5 - l6 - l7 - l8;
        	g.lineTo(l9 - lm + l1 + m + r,m);
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
