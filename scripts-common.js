window.onload = function() {

	var dragged = false;
	var track = document.getElementById("track");
	var panel = document.getElementById("panel");
	var trackPos = document.getElementById("trackPos");
    
    var touchDevice = "ontouchstart" in track;
    
    var skaters = document.getElementsByTagName("use");
    var blockers = [];
    
    for (var skater = 0;skater < skaters.length ; skater++){
        var it = skaters[skater];
        
        if (it.dataset.role !== "jammer") blockers.push(it);
        it.dataset.trackPos = getTrackPos(it.getAttribute('x'),it.getAttribute('y'));
        it.addEventListener((touchDevice) ? 'touchstart':'mousedown', dragStart);
    }
    
    
    console.log(packIsHere());

    window.addEventListener((touchDevice) ? 'orientationchange':'', doOnOrientationChange);
	window.addEventListener((touchDevice) ? 'touchmove':'mousemove', dragMove);
	window.addEventListener((touchDevice) ? 'touchend':'mouseup', dragEnd);


	function doOnOrientationChange(ev) {
		ev.preventDefault();
	}

	function dragStart(ev) {
		ev.preventDefault();
        
		if (!dragged && ev.target !== track) dragged = ("correspondingUseElement" in ev.target) ? ev.target.correspondingUseElement:ev.target;
        dragStat.textContent = "Dragging: "+ dragged;
        console.dir(dragged);
	};

	function dragMove(ev) {
		ev.preventDefault();
		var p = track.createSVGPoint();
        
		p.x = ("touches" in ev) ? ev.touches[0].pageX:ev.pageX;
		p.y = ("touches" in ev) ? ev.touches[0].pageY:ev.pageY;

		if (dragged !== false) {
			var m = dragged.getScreenCTM();
			p = p.matrixTransform(m.inverse());
			dragged.setAttribute("x", p.x - 15);
			dragged.setAttribute("y", p.y - 15);
            dragged.dataset.trackPos = getTrackPos(dragged.getAttribute('x'),dragged.getAttribute('y'));
			trackPos.textContent = "Position: "+ dragged.dataset.trackPos;
            
		}
        
	};

	function dragEnd(ev) {
		ev.preventDefault();
        console.log(packIsHere());
        
		dragged = false;
	};

	
	function getTrackPos(x, y) {
		if (x < 750 && x > 330) {
			if (y < 342) return 750 - parseInt(x);
			return 533 + parseInt(x);
		}
		var angle = Math.atan(parseInt(330-x,10)/parseInt(342-y,10));
		if (angle < 0) angle = Math.PI	+ angle;
        
		if (x< 330) return parseInt(420 + angle * 144);
        var angle = Math.atan(parseInt(x-750,10)/parseInt(y-342,10));
        if (angle < 0) angle = Math.PI	+ angle;
        
		return parseInt(1282 + angle * 144);
		return -1;
	}
    
    function packIsHere(){
        blockers = blockers.sort(function(a, b) {return a.dataset.trackPos - b.dataset.trackPos;});
        var groups = [];
        var group = [];
        var hasred = false;
        var hasblue= false;
        
        for (var s = 0;s < blockers.length;s ++){
            if (s !== 0){
            if (blockers[s].dataset.trackPos - blockers[s-1].dataset.trackPos > 120 ) {
                if (hasred && hasblue) groups.push(group);
                group = [];
                hasred = hasblue = false;
            }}
            if (blockers[s].dataset.team === "red") hasred = true;
            if (blockers[s].dataset.team === "blue") hasblue = true;
            group.push(blockers[s]);
        }
        if (hasred && hasblue) groups.push(group);
        
        // Create new group


        
        console.log(groups);
        }
    
    




};