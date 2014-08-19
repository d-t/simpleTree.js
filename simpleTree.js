SPEED = 1;

// Class Branch
function Branch(canvas, initialRadius, initialX, initialY, branchColor, nSplits) {
	// -------------- Attributes -------------- //

	// Coordinates
	this.currX = initialX;
	this.currY = initialY;
	// Angle
	this.angle = Math.PI/2;
	// Radius variables
	this.initialRadius = initialRadius;
	this.radius = this.initialRadius;
	this.radiusReduction = 0.99;
	// Color and transparency
	this.branchColor = branchColor;
	// this.transparency = 0.4 + Math.random()/4.0;
	// Canvas
	this.canvas = canvas;
	// Age and split variables
	this.age = 0;
	this.splitAge = canvas.height / 4.0;
	this.splitDone = false;
	this.nSplits = nSplits;


	// -------------- Functions -------------- //

	// Checks if a branch has to be stopped
	// If so, returns a negative integer
	this.stopCondition = function(){
		if(this.currY < 0 || this.currY > this.canvas.height || this.currX < 0 || this.currX > this.canvas.width || this.radius <= 0.3)
			return true;
		return false;
	}//end stopCondition

	this.getNewAngle = function(oldAngle){
		var newAngle = oldAngle + Math.random()/5 - 0.1;
		if(!this.splitDone) // still close to the ground...
			do{
				newAngle = oldAngle + Math.random()/5 - 0.1;
			}while(newAngle<0 && newAngle>=Math.PI)
		if (newAngle > 3.55)
			newAngle = 3.55;
		if (newAngle > 5.9)
			newAngle = 5.9;
		return newAngle;
	}//end updateAngle


	// Updates attributes, performs splits and calls draw function
	this.nextFrame = function(){
		if(!this.stopCondition()){
			// Update angle
			this.angle = this.getNewAngle(this.angle);
			// this.angle += Math.random()/5 - 0.1;
			// Update coordinates and radius
			this.currX += SPEED * Math.cos(this.angle);
			this.currY += SPEED * -Math.sin(this.angle);
			this.radius *= this.radiusReduction;
			// Update age
			this.age++;
			if(this.age == this.splitAge){
				this.splitDone = true;
				this.splitAge += this.splitAge / 5;
				this.split();
			}
			// Draw
			this.draw();
			return +1;
		}
		else
			return -1;
	}//end nextFrame


	// Draws branch's current frame, i.e. a single circle
	this.draw = function(){
		var context = canvas.getContext("2d");
		context.save();
		context.beginPath();
		context.fillStyle = this.branchColor;
		// context.fillStyle = "rgba(255, 255, 255, " + String(this.transparency) + ")";
		// context.shadowColor = "#000000";
		// context.shadowBlur = 2;
		context.moveTo(this.currX, this.currY);
		context.arc(this.currX, this.currY, this.radius, 0, 2*Math.PI, true);
		context.closePath();
		context.fill();
		context.restore();
	}//end draw


	// Performs branch's split, i.e. creates new branches
	this.split = function(){
		var nNewBranches = Math.random()*this.nSplits;
		for (var i = 0; i < nNewBranches; i++) {
			var b = new Branch(this.canvas, this.radius*this.radiusReduction/1.1, this.currX, this.currY, this.branchColor, this.nSplits);
			b.angle = this.angle;
			b.age = this.age;
			// b.transparency = this.transparency;
			b.splitAge = this.splitAge;
			branches.push(b);
		};
	}//end split
}//end Branch


// Remove i-th branch from the collection
function removeBranch(i){
	branches.splice(branches[i], 1);
}//end removeBranch


// Create a tree in the canvas element
function simpleTree(canvasId, nBranches, nSplits, backgroundColor, treeColor){
	// Select canvas element
	$canvas = jQuery("canvas" + "#" + canvasId);
	canvas = $canvas[0];
	context = canvas.getContext("2d");

	// Width and height
	var width  = $canvas.width();
	var height = $canvas.height();

	// Set actual canvas size to match CSS
	$canvas.attr("width", width);
	$canvas.attr("height", height);

	// Set canvas background
	context.fillStyle = backgroundColor;
	context.fillRect(0, 0, width, height);

	// Initialize branches
	var n = nBranches;
	var initialRadius = (Math.min(width, height) / 20) / SPEED;
	branches = [];
	for (var i = 0; i < n; i++) {
		var b = new Branch(canvas, initialRadius, width/2, height, treeColor, nSplits);
		branches.push(b);
	};

	// Draw on canvas
	var interval = setInterval(function() {
		for (var i = 0; i < branches.length; i++) {
			nextFrameOk = branches[i].nextFrame();
			if (nextFrameOk < 0){ // if branch to be removed...
				removeBranch(i);
			}
		};
	}, 0);//end setInterval
}//end simpleTree