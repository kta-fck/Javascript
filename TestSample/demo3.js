// 锟斤拷锟斤拷锟狡ナワ拷锟斤拷 锟斤拷锟斤拷锟斤拷2015 - 2015/07/07锟轿ワ拷锟矫プホテワ拷锟角わ拷JAVA锟秸ワ拷锟斤拷锟饺ワ拷锟斤拷锟狡ワ拷锟轿ワ拷锟斤拷锟狡ナンス堬拷锟斤拷锟剿つわ拷锟斤拷
// <NDL>
// <REPLICA 49257DBE:00390383>
// <VIEW OFDFB2BABA:72AB2689-ON49256663:002D36BE>
// <NOTE OF19819603:EE6933EC-ON49257E7A:00629403>
// <HINT>CN=oki-nmserver01/O=tap</HINT>
// <REM>Database '锟斤拷锟斤拷锟狡ナワ拷锟斤拷 锟斤拷锟斤拷锟斤拷2015', View '锟斤拷锟斤拷锟斤拷锟斤拷', Document '2015/07/07锟轿ワ拷锟矫プホテワ拷锟角わ拷JAVA锟秸ワ拷锟斤拷锟饺ワ拷锟斤拷锟狡ワ拷锟轿ワ拷锟斤拷锟狡ナンス堬拷锟斤拷锟剿つわ拷锟斤拷'</REM>
// </NDL>
/*

锟桔テワ拷锟斤拷锟斤拷锟斤拷
(\d{4}/\d{2}/\d{2})(锟斤拷)(\w*)(锟角わ拷)
*/


// var test_string = '2015/07/07锟轿ワ拷锟矫プホテワ拷锟角わ拷JAVA锟秸ワ拷锟斤拷锟饺ワ拷锟斤拷锟狡ワ拷锟轿ワ拷锟斤拷锟狡ナンス堬拷锟斤拷锟剿つわ拷锟斤拷' ;
// var reg = // 锟斤拷锟斤拷锟狡ナワ拷锟斤拷 锟斤拷锟斤拷锟斤拷2015 - 2015/07/07锟轿ワ拷锟矫プホテワ拷锟角わ拷JAVA锟秸ワ拷锟斤拷锟饺ワ拷锟斤拷锟狡ワ拷锟轿ワ拷锟斤拷锟狡ナンス堬拷锟斤拷锟剿つわ拷锟斤拷
// // <NDL>
// // <REPLICA 49257DBE:00390383>
// <VIEW OFDFB2BABA:72AB2689-ON49256663:002D36BE>
// <NOTE OF19819603:EE6933EC-ON49257E7A:00629403>
// <HINT>CN=oki-nmserver01/O=tap</HINT>
// <REM>Database '锟斤拷锟斤拷锟狡ナワ拷锟斤拷 锟斤拷锟斤拷锟斤拷2015', View '锟斤拷锟斤拷锟斤拷锟斤拷', Document '2015/07/07锟轿ワ拷锟矫プホテワ拷锟角わ拷JAVA锟秸ワ拷锟斤拷锟饺ワ拷锟斤拷锟狡ワ拷锟轿ワ拷锟斤拷锟狡ナンス堬拷锟斤拷锟剿つわ拷锟斤拷'</REM>
// </NDL>
/*

锟桔テワ拷锟斤拷锟斤拷锟斤拷
(\d{4}/\d{2}/\d{2})(锟斤拷)(\w*)(锟角わ拷)
*/


// var test_string = '2015/07/07锟轿ワ拷锟矫プホテワ拷锟角わ拷JAVA锟秸ワ拷锟斤拷锟饺ワ拷锟斤拷锟狡ワ拷锟轿ワ拷锟斤拷锟狡ナンス堬拷锟斤拷锟剿つわ拷锟斤拷' ;
// var reg = (\d{4}/\d{2}/\d{2})(锟斤拷)(\w*)(锟角わ拷);

// var result = test_string.replace(reg , '$3') ;

// console.log(result);
// ;

// var result = test_string.replace(reg , '$3') ;

// console.log(result);

// C:\Program Files\Adobe\Reader 10.0\Reader\AcroRd32.exe

// "C:\Program Files\Adobe\Acrobat Reader DC\Reader\AcroRd32.exe"

var time_reg = /(\d*\.\d{3})/ ;
var gctype_reg = /((GC)|((Full\sGC)\s(\(System\))?))/;
var mem_reg = /(\w*):\s(\d*)K->(\d*)K\((\d*)K\)/ ;
var mem_value_reg = /(\d*)K->(\d*)K\((\d*)K\)/g ;    //()
var mem_value_reg2 = /(\d*)K->(\d*)K\((\d*)K\)/ ;    //()
var fs = require( 'fs' ) ;
var readline = require	( 'readline' );

// {
// 	"time" : ,
// 	"gctype" : ,
// 	"value" :{
// 		"PSYoungGen" : ,
// 		"ParOldGen" : ,
// 		"Total" : ,
// 		"PSPermGen" : ,
// 	}	
// }

// 锟秸ワ拷锟斤拷锟斤拷锟絠锟斤拷锟絲锟斤拷
rs = fs.createReadStream( 'readable.txt' , {
	'encoding':'utf8' 
}) ;

ws = fs.createWriteStream( 'writable.txt', {
	'encoding' : 'utf8'
})

rl = readline.createInterface( rs , {
	'input' : rs ,
	'output' : ws
} );

console.time( 'timer' ) ;
var linenum = 0 ;
rl.on( 'line' ,function( line ) {
	// console.log(parseReadLine( line )) ;
	ws.write(JSON.stringify(parseReadLine( line ) , 2) + '\n' ) ;
} );
		
rl.on ( 'close'  , function(){	
	console.timeEnd( 'timer' )
}) 

var rs_c = 0;

var pool = '';
var string_test = '2323.056: [Full GC [PSYoungGen: 3119K->0K(55360K)] [PSOldGen: 716798K->475849K(720896K)] 719918K->475849K(776256K) [PSPermGen: 175364K->175364K(262144K)], 2.4827685 secs] [Times: user=2.28 sys=0.02, real=2.48 secs] '
// Get Time
pool =  string_test.match( time_reg );


console.log( JSON.stringify(parseReadLine( string_test ) , 2) ) ;

function parseReadLine( line ) {
	var result = [] ;
	var poolStr  = '';
	// Get Time
	poolStr =  line.match( time_reg );
	result['time'] = poolStr[1] ;

	// Get GC type  FullGC or GC
	poolStr = line.match( gctype_reg ) ;
	if ( poolStr[1] === 'GC' ) {
		// GC 
		poolStr = string_test.match( mem_value_reg ) 
		result['yg_before']		= returnString(poolStr[0].match( mem_value_reg2 ), 1 ) ;
		result['yg_after']		= returnString(poolStr[0].match( mem_value_reg2 ), 2 ) ;
		result['yg_total']		= returnString(poolStr[0].match( mem_value_reg2 ), 3 ) ;
		result['heap_before']	= returnString(poolStr[1].match( mem_value_reg2 ), 1 ) ;
		result['heap_after']	= returnString(poolStr[1].match( mem_value_reg2 ), 2 ) ;
		result['heap_total']	= returnString(poolStr[1].match( mem_value_reg2 ), 3 ) ;
		result['og_total']		= result['heap_total'] - result['yg_total'] ;

		// logger(result, 'yg_before') ;
		// logger(result, 'yg_after') ;
		// logger(result, 'yg_total') ;
		// logger(result, 'heap_before') ;
		// logger(result, 'heap_after') ;
		// logger(result, 'heap_total') ;
		// logger(result, 'og_total') ;
				return {
			"time" : result['time'] ,
			"yg_before" : result['yg_before'] ,
			"yg_after"  : result['yg_after'] ,
			"yg_total" : result['yg_total'] ,
			"og_total" : result['og_total'] ,
			"heap_before" : result['heap_before'] ,
			"heap_after" : result['heap_after'] ,
			"heap_total" : result['heap_total'] 
		}
	} else {
		// Full GC or other
		poolStr = line.match( mem_value_reg ) 
		result['yg_before']		= returnString(poolStr[0].match( mem_value_reg2 ), 1 ) ;
		result['yg_after']		= returnString(poolStr[0].match( mem_value_reg2 ), 2 ) ;
		result['yg_total']		= returnString(poolStr[0].match( mem_value_reg2 ), 3 ) ;
		result['og_beforel']	= returnString(poolStr[1].match( mem_value_reg2 ), 1 ) ;
		result['og_after']		= returnString(poolStr[1].match( mem_value_reg2 ), 2 ) ;
		result['og_total']		= returnString(poolStr[1].match( mem_value_reg2 ), 3 ) ;
		result['heap_before']	= returnString(poolStr[2].match( mem_value_reg2 ), 1 ) ;
		result['heap_after']	= returnString(poolStr[2].match( mem_value_reg2 ), 2 ) ;
		result['heap_total']	= returnString(poolStr[2].match( mem_value_reg2 ), 3 ) ;

		// logger(result, 'yg_before') ;
		// logger(result, 'yg_after') ;
		// logger(result, 'yg_total') ;
		// logger(result, 'heap_before') ;
		// logger(result, 'heap_after') ;
		// logger(result, 'heap_total') ;
		// logger(result, 'og_beforel') ;
		// logger(result, 'og_after') ;
		// logger(result, 'og_total') ;

		return {
			"time" : result['time'] ,
			"yg_before" : result['yg_before'] ,
			"yg_after"  : result['yg_after'] ,
			"yg_total" : result['yg_total'] ,
			"og_beforel" : result['og_beforel'] ,
			"og_after" : result['og_after'] ,
			"og_total" : result['og_total'] ,
			"heap_before" : result['heap_before'] ,
			"heap_after" : result['heap_after'] ,
			"heap_total" : result['heap_total'] 
		}
	}

	// console.log( result ) ;
	
	return result ;
}

function returnString(array , num) {
	return array[num];
}

// --((GC)|((Full\sGC)\s(\(System\))?))
// --(\d*\.\d{3})
// --(PSYoungGen):\s(\d*)K->(\d*)k\((\d*)k\)
// --(\d*)k->(\d*)k\((\d*)k\)
// ^\w*

function logger(list , listname) {
	if ( listname.length < 5 ) {
		console.log(listname + '\t\t : ' + list[listname]);
	} else 
		console.log(listname + '\t : ' + list[listname]);
}