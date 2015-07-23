var fs = require( 'fs' ) ,
	buf;


fs.readFile( 'test.png' , 'binary' , function( err , data ){
	if ( !err ) {
		buf = data;
	}

	fs.writeFile( 'test2.png' , buf , 'binary' , function( err ) {
		if ( !err ) {
			console.log( 'write image is done! ') ;
		}
	})
})
