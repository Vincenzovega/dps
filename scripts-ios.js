



window.onload = function() {

	var dragged = false;
	var track = document.getElementById("track");
	var panel = document.getElementById("panel");
	var trackPos = document.getElementById("trackPos");


	window.addEventListener('orientationchange', doOnOrientationChange);
	window.addEventListener('touchstart', dragStart);
	window.addEventListener('touchmove', dragMove);
	window.addEventListener('touchend', dragEnd);


	function doOnOrientationChange(ev) {
		ev.preventDefault();
	}

	function dragStart(ev) {
		ev.preventDefault();
		if (!dragged && ev.target !== track) dragged = ev.target;
	};

	function dragMove(ev) {
		ev.preventDefault();
		var p = track.createSVGPoint();
		p.x = ev.touches[0].pageX;
		p.y = ev.touches[0].pageY;

		if (dragged !== false) {
			var m = dragged.getScreenCTM();
			p = p.matrixTransform(m.inverse());
			dragged.setAttribute("x", p.x - 15);
			dragged.setAttribute("y", p.y - 15);
		}
	};

	function dragEnd(ev) {
		console.log(getTrackPos(dragged.getAttribute("x"),dragged.getAttribute("y")));
		ev.preventDefault();
		trackPos.value = "Position: "+ getTrackPos(dragged.getAttribute("x"),dragged.getAttribute("y"));
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