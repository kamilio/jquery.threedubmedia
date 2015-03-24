module("Live Delegation");

$.each(["draginit","dragstart","drag","dragend"],function( i, type ){
	
	test('"'+ type+'"',function(){
        var $drag, count = 0;

        expect( i ? 5 : 1 );
		
		if ( !i ){
			ok( true, 'Not supported for this event type.');
			return;
		}
		
		// set up the delegation
		$(document).on( type, '.drag', function( event ){
			count += 1;
            ok( $(this).hasClass('drag'), event.type+" target" );
		});

        // add element
        $drag = $('<div class="drag" />').appendTo( document.body );
		
		// manual triggering
		ok( $drag.trigger( type ), '.trigger("'+ type +'")');
		equals( count, 1, "event was triggered");
	
		// simulate a complete drag
		$drag
			.fire("mousedown",{ pageX:50, pageY:50 })
			.fire("mousemove",{ pageX:51, pageY:51 })
			.fire("mouseup",{ pageX:51, pageY:51 })
			.fire("click",{ pageX:51, pageY:51 });
		
		equals( count, 2, "event was delegated");

		// remove delegation
		$(document).off( type, '.drag' );
		$drag.remove();
	});
});