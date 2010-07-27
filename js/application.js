var factor = 4;
var margin = factor;
var numRect = 0;
var numDoor = 0;
var numCloset = 0;

$(function(){
	
	createRoom(120, 120);
	
	
	$('#room-submit').click(function(){
		createRoom(parseInt($('#room-width')[0].value), parseInt($('#room-height')[0].value));
	});
	
	$('#rect-submit').click(function(){
		createRect(parseInt($('#rect-width')[0].value), parseInt($('#rect-height')[0].value))
	});
	
	$('#door-submit').click(function(){
		createDoor($('#door-select')[0].value, parseInt($('#door-size')[0].value))
	});
	
	$('#room-height').attr('value', parseInt($('.room').css('height'))/factor);
	$('#room-width').attr('value', parseInt($('.room').css('width'))/factor);
	
});

function createRoom(x, y){
	$('#canvas').html("");
	$('#canvas').append("<div class='room'></div>");
	$('#canvas > .room').css('height', y*factor).css('width', x*factor);
	$('#canvas').append("<div class='clear'></div>");
}

function createRect(x, y){
	numRect++;
	$('.room').append("<div class='rect-margin' id='rect-" + numRect + "'></div>");
	
	currRect = $('.room > #rect-' + numRect).css('position', 'absolute');
	currRect.append("<div class='rect'></div>");
	currRect.children('.rect').append("<div class='info' style='display:none'></div>");
	
	currRect.css('height', y*factor).css('width', x*factor).css('padding', margin);
	currRect.draggable({ 
		containment: 'parent',
		grid: [factor, factor],
		snap: true,
		snapMode: 'outer',
		stack: '.rect-margin'
	});
	
	currInfo = currRect.find('.info');
	currInfo.append("<div class='delete'></div>");
	currInfo.append("<div class='rotate'></div>");
	currInfo.append("<div class='dim'><span class='width'>" + formatDim(parseInt(currRect.css('width'))) + "</span>x<span class='height'>" + formatDim(parseInt(currRect.css('height'))) + "</span></div>");
	
	/*$('.rect-margin').resizable({
		containment: 'parent',
		resize: function(){
			rectContainer = $(this)
			rectContainer.find('.width').html(formatDim(parseInt(rectContainer.css('width'))));
			rectContainer.find('.height').html(formatDim(parseInt(rectContainer.css('height'))));
		}
	});*/
	$('.rect-margin').hover(function(){
		rectContainer = $(this);
		rectContainer.find('.info').show();
	
		rectContainer.find('.rotate').unbind('click').click(function(){
			rotate(rectContainer);
		});
		rectContainer.find('.delete').click(function(){
			rectContainer.remove();
		});
	}, function(){
		$(this).find('.info').hide();
	});

}

function createDoor(wall, size){
	numDoor++;
	$('.room').append("<div class='door' id='door-" + numDoor + "'></div>");
	currDoor = $('.room > #door-' + numDoor).css('position', 'absolute');
	
	currDoor.append("<div class='info' style='display:none;'></div>");
	
	currInfo = currDoor.find('.info');
	currInfo.append("<div class='delete'></div>");
	
	
	$('.door').hover(function(){
		doorContainer = $(this);
		currDoor.find('.info').show();
		currInfo.find('.delete').click(function(){
			currDoor.remove();
		});
	}, function(){
		$(this).find('.info').hide();
	});
	
	switch(wall){
		
		case 'top':	
			currDoor.css('borderBottom', '4px solid #666').css('width', size*factor).css('height', 16).css('marginTop', -16);
			currDoor.draggable({ 
				containment: 'parent',
				grid: [factor, factor],
				axis: 'x'
			});
			break;
		case 'left':
			currDoor.css('borderRight', '4px solid #666').css('height', size*factor).css('width', 16).css('marginLeft', -16);
			currDoor.draggable({ 
				containment: 'parent',
				grid: [factor, factor],
				axis: 'y'
			});
			break;
		case 'right':
			currDoor.css('borderLeft', '4px solid #666').css('height', size*factor).css('width', 16).css('marginRight', -16).css('right', 0);
			currDoor.draggable({ 
				containment: 'parent',
				grid: [factor, factor],
				axis: 'y'
			});
			break;
		case 'bottom':
			currDoor.css('borderTop', '4px solid #666').css('width', size*factor).css('height', 16).css('marginBottom', -16).css('bottom', 0);
			currDoor.draggable({ 
				containment: 'parent',
				grid: [factor, factor],
				axis: 'x'
			});
			break;
		default:
			alert("Something went wrong!");
			numDoor--;
			break;
	}
}

function rotate(ele){
	height = ele.css('height');
	ele.css('height', ele.css('width'));
	ele.css('width', height);
}

function formatDim(total){
	feet = Math.floor(total/(12*factor));
	inches = total/factor - (feet * 12);
	
	if(feet !=0 && inches !=0) return feet + '\' ' + inches + '\"';
	if(feet != 0) return feet + '\'';
	if(inches != 0) return inches + '\"';
	
}