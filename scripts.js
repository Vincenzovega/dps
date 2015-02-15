

	
	
window.onload = function() {
	
	var dragged = false;
	var track = document.getElementById("track");
	var trackPos = document.getElementById("trackPos");
	
	window.addEventListener('orientationchange', doOnOrientationChange);
	
	
	function doOnOrientationChange(ev) {
		ev.preventDefault();
	}
	
	
	
	track.ontouchstart = function (ev) {
		ev.preventDefault();
		console.log(ev.target);
		if (!dragged && ev.target !== track) dragged = ev.target.correspondingUseElement;
		};
	
	
	track.ontouchmove = function (ev) {
		//ev.preventDefault();
		var p = track.createSVGPoint();
		p.x = ev.clientX;
		p.y = ev.clientY;
		console.log(ev.clientX +":"+ ev.clientY);

		if (dragged != false) {
			var m = dragged.getScreenCTM();
			p = p.matrixTransform(m.inverse());
			dragged.setAttribute("x", p.x - 15);
			dragged.setAttribute("y", p.y - 15);
			}

	};
	
	track.onmouseup = function (ev) {
		ev.preventDefault();
		//trackPos.value = getTrackPos(dragged.getAttribute("x"),dragged.getAttribute("y"));
		dragged = false;
	};
	
	track.onmouseleave = function (ev) {

		dragged = false;
	};

	function getTrackPos(x, y) {
		if (x < 610 && x > 260) {
			if (y < 285) return 610 - parseInt(x);
			return 467 + parseInt(x);
		}
		var angle = Math.atan(parseInt(265-x,10)/parseInt(265-y,10));
		if (angle < 0) angle = Math.PI	+ angle;
		if (x< 260) return parseInt(350 + angle * 125);
		return parseInt(1092 + angle * 125);

		return -1;
	}

};