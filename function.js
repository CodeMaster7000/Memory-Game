var shapeDim = 75;
var startPlaying = false;
var isNextable = true;

var cols = 2;
var rows = 2;

$(document).ready(function(){
	next(cols ,rows);
});

function next(c, r) {
  var i, animateOptions, totalShapes;
	
	if(!isNextable) {
		return;
	}
		
	isNextable = false;
	
	$(".content").fadeOut(1000,
	
		function() {
			$(".content").empty();
						
			animateOptions = {
        height : ((shapeDim + 8) * r) + "px",
        width  : ((shapeDim + 8) * c) + "px"
			};
			
			$(".container").animate(animateOptions, 1000,
			
        function() {
          totalShapes = c * r;
          for (i = 0; i < totalShapes; i++) {
						$(".content").append(createShape("circle", shapeDim));	
          }
          
					$(".content").fadeIn(200);
					
          pickRandomShapes();
				}
			);							
    }
  ); 
}


function createShape(type, r) {
  var shapeClass = "shape " + type;
  var totalSelected, totalRight, totalWrong;
  
  return $("<div>").addClass(shapeClass).width(r).height(r).click(function() {
		if (startPlaying) {


			if ($(this).attr("selected") === "selected") {
				$(this).addClass("selected");
			}
			else {
				$(this).addClass("wrong");
			}
			
			totalSelected = $(".shape[selected='selected']" ).length;
			
			totalRight = $(".selected").length;
			
			totalWrong = $(".wrong").length;
			
			if (totalRight + totalWrong >= totalSelected) {
				startPlaying = false;
				
				$(".shape[selected='selected']:not(.selected)").addClass("selected");
				
				if (totalWrong === 0) {
					
					if (cols === rows) {
						cols++;
					}
					else if (cols > rows) {
						rows++;
					}
								
					if (cols > 6) {
						cols = 6;
						rows = 6;
					} 
				}
				
				next(cols, rows);
			}
		}
	});
}

function pickRandomShapes() {
	var count = 0;
	
	var totalShapes = $(".content > .shape").length;
	
	var shapesToPick = Math.ceil(totalShapes / 3);
	
	var random;

	for (count = 0; count < shapesToPick;) {
		random = Math.ceil(Math.random() * totalShapes); 
		
		if (random < totalShapes) {
			if (!$(".content > .shape").eq(random).hasClass("selected")) {
				$(".content > .shape").eq(random).addClass("selected").attr("selected", "selected");
				
				count++;
			}
		}
	} 
	
	window.setTimeout(hideRandomSelectedShapes,1200);
}

function hideRandomSelectedShapes() {
	$(".content > .shape").removeClass("selected");
	
	startPlaying = true;
	isNextable = true;
}
