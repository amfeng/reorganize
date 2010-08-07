$(document).ready(function(){
	
	test("Dimension Validation", function() {
	  expect(9);
	
	  createRoom(120, 120);
	  ok( validateDimensions(120, 120), "Can build rectangle to fill entire room" );
	  ok( validateDimensions(1, 1), "Can build 1x1 rectangle" );
	  ok( !validateDimensions(121, 120), "Can't build rectangle that won't fit" );
	  ok( !validateDimensions(120, 121), "Can't build rectangle that won't fit" );
	  ok( !validateDimensions(0, 0), "Can't build rectangle with 0 dimensions" );
	  ok( !validateDimensions(-.5, -.5), "Can't build rectangle with negative dimensions" );
	  ok( !validateDimensions('sdf', 55), "Can't enter non-number" );
	  ok( !validateDimensions(55, 'sdf'), "Can't enter non-number" );
	  ok( !validateDimensions('sdf', 'sdf'), "Can't enter non-number" );
	 
	});
	
	module("Room Creation")

	test("Room is created", function() {
	  expect(1);
	
	  createRoom(120, 120);
	  ok( $('.room'), "Room div is created" ); 
	});
	
	test("Room dimensions are correct", function() {
	  expect(4);
	
	  width = parseInt($('.room').css('width'))/factor;
	  height = parseInt($('.room').css('height'))/factor;
	
	  equals(width, 120, "Room width is correct");
	  equals(height, 120, "Room height is correct");
	
	  createRoom(55, 23);
	
	  width = parseInt($('.room').css('width'))/factor;
	  height = parseInt($('.room').css('height'))/factor;
	
	  equals(width, 55, "Room width is correct");
	  equals(height, 23, "Room height is correct");
	});

});