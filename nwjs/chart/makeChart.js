var time_reg = /(\d*\.\d{3})/ ;
var gctype_reg = /((GC)|((Full\sGC)\s(\(System\))?))/;
var mem_reg = /(\w*):\s(\d*)K->(\d*)K\((\d*)K\)/ ;
var mem_value_reg = /(\d*)K->(\d*)K\((\d*)K\)/g ;    //()
var mem_value_reg2 = /(\d*)K->(\d*)K\((\d*)K\)/ ;    //()
var fs = require( 'fs' ) ;
var readline = require	( 'readline' );

Chart.defaults.global = {
    // Boolean - Whether to animate the chart
    animation: false,

    // Number - Number of animation steps
    animationSteps: 0,

    // String - Animation easing effect
    // Possible effects are:
    // [easeInOutQuart, linear, easeOutBounce, easeInBack, easeInOutQuad,
    //  easeOutQuart, easeOutQuad, easeInOutBounce, easeOutSine, easeInOutCubic,
    //  easeInExpo, easeInOutBack, easeInCirc, easeInOutElastic, easeOutBack,
    //  easeInQuad, easeInOutExpo, easeInQuart, easeOutQuint, easeInOutCirc,
    //  easeInSine, easeOutExpo, easeOutCirc, easeOutCubic, easeInQuint,
    //  easeInElastic, easeInOutSine, easeInOutQuint, easeInBounce,
    //  easeOutElastic, easeInCubic]
    animationEasing: "easeOutBounce",

    // Boolean - If we should show the scale at all
    showScale: true,

    // Boolean - If we want to override with a hard coded scale
    scaleOverride: false,

    // ** Required if scaleOverride is true **
    // Number - The number of steps in a hard coded scale
    scaleSteps: null,
    // Number - The value jump in the hard coded scale
    scaleStepWidth: null,
    // Number - The scale starting value
    scaleStartValue: null,

    // String - Colour of the scale line
    scaleLineColor: "rgba(0,0,0,.1)",

    // Number - Pixel width of the scale line
    scaleLineWidth: 1,

    // Boolean - Whether to show labels on the scale
    scaleShowLabels: true,

    // Interpolated JS string - can access value
    scaleLabel: "<%=value%>",

    // Boolean - Whether the scale should stick to integers, not floats even if drawing space is there
    scaleIntegersOnly: true,

    // Boolean - Whether the scale should start at zero, or an order of magnitude down from the lowest value
    scaleBeginAtZero: false,

    // String - Scale label font declaration for the scale label
    scaleFontFamily: "'Helvetica Neue', 'Helvetica', 'Arial', sans-serif",

    // Number - Scale label font size in pixels
    scaleFontSize: 12,

    // String - Scale label font weight style
    scaleFontStyle: "normal",

    // String - Scale label font colour
    scaleFontColor: "#666",

    // Boolean - whether or not the chart should be responsive and resize when the browser does.
    responsive: false,

    // Boolean - whether to maintain the starting aspect ratio or not when responsive, if set to false, will take up entire container
    maintainAspectRatio: true,

    // Boolean - Determines whether to draw tooltips on the canvas or not
    showTooltips: true,

    // Function - Determines whether to execute the customTooltips function instead of drawing the built in tooltips (See [Advanced - External Tooltips](#advanced-usage-custom-tooltips))
    customTooltips: false,

    // Array - Array of string names to attach tooltip events
    tooltipEvents: ["mousemove", "touchstart", "touchmove"],

    // String - Tooltip background colour
    tooltipFillColor: "rgba(0,0,0,0.8)",

    // String - Tooltip label font declaration for the scale label
    tooltipFontFamily: "'Helvetica Neue', 'Helvetica', 'Arial', sans-serif",

    // Number - Tooltip label font size in pixels
    tooltipFontSize: 14,

    // String - Tooltip font weight style
    tooltipFontStyle: "normal",

    // String - Tooltip label font colour
    tooltipFontColor: "#fff",

    // String - Tooltip title font declaration for the scale label
    tooltipTitleFontFamily: "'Helvetica Neue', 'Helvetica', 'Arial', sans-serif",

    // Number - Tooltip title font size in pixels
    tooltipTitleFontSize: 20,

    // String - Tooltip title font weight style
    tooltipTitleFontStyle: "bold",

    // String - Tooltip title font colour
    tooltipTitleFontColor: "#fff",

    // Number - pixel width of padding around tooltip text
    tooltipYPadding: 6,

    // Number - pixel width of padding around tooltip text
    tooltipXPadding: 6,

    // Number - Size of the caret on the tooltip
    tooltipCaretSize: 8,

    // Number - Pixel radius of the tooltip border
    tooltipCornerRadius: 6,

    // Number - Pixel offset from point x to tooltip edge
    tooltipXOffset: 10,

    // String - Template string for single tooltips
    tooltipTemplate: "<%if (label){%><%=label%>: <%}%><%= value %>",

    // String - Template string for multiple tooltips
    multiTooltipTemplate: "<%= value %>",

    // Function - Will fire on animation progression.
    onAnimationProgress: function(){},

    // Function - Will fire on animation completion.
    onAnimationComplete: function(){}
}

var randomScalingFactor = function(){ return Math.round(Math.random()*100)};
var lineChartData = {
	labels : ["Start"],
	datasets : [
		{
			label: "Old Generation",
			fillColor : "rgba(220,111,222.2)",
			strokeColor : "rgba(220,220,220,1)",
			pointColor : "rgba(220,220,220,1)",
			pointStrokeColor : "#fff",
			pointHighlightFill : "#fff",
			pointHighlightStroke : "rgba(0,0,220,1)",
			data : [0] 
		},
		{
			label: "Young Generation",
			fillColor : "rgba(151,187,205,0.2)",
			strokeColor : "rgba(151,187,205,1)",
			pointColor : "rgba(151,187,205,1)",
			pointStrokeColor : "#fff",
			pointHighlightFill : "#fff",
			pointHighlightStroke : "rgba(151,187,205,1)",
			data : [0] 
		},
		{
			label: "Heap",
			fillColor : "rgba(151,187,205,0.2)",
			strokeColor : "rgba(151,187,205,1)",
			pointColor : "rgba(151,187,205,1)",
			pointStrokeColor : "#fff",
			pointHighlightFill : "#fff",
			pointHighlightStroke : "rgba(151,187,205,1)",
			data : [0] 
		}
	]
}

var ctx = document.getElementById("canvas").getContext("2d");
window.myLine = new Chart(ctx).Line(lineChartData, {
	bezierCurve: false
});



rs = fs.createReadStream( 'readable.txt' , {
	'encoding':'utf8' 
}) ;

graphData = fs.createReadStream( 'writable.txt' , {
	'encoding':'utf8' 
}) ;

ws = fs.createWriteStream( 'writable.txt', {
	'encoding' : 'utf8'
})

rl = readline.createInterface( rs , {
	'input' : rs ,
	'output' : ws
} );
gi = readline.createInterface( graphData , {
	'input' : graphData
} );

console.time( 'timer' ) ;
var linenum = 0 ;
rl.on( 'line' ,function( line ) {
		// console.log(parseReadLine( line )) ;
		var js = parseReadLine( line ) ;
		window.myLine.addData([0,0,js.heap_before] , js.time );
		window.myLine.addData([0,0,js.heap_after] , " " ) ;
		ws.write(JSON.stringify(parseReadLine( line ) ) + '\n') ;
} ) ;

	// gi.on( 'line' ,function( line ){
	// 	var js = JSON.parse( line );
	// } )
		

rl.on ( 'close'  , function(){


}) 

console.timeEnd( 'timer' )

var rs_c = 0;

var pool = '';
var string_test = '2323.056: [Full GC [PSYoungGen: 3119K->0K(55360K)] [PSOldGen: 716798K->475849K(720896K)] 719918K->475849K(776256K) [PSPermGen: 175364K->175364K(262144K)], 2.4827685 secs] [Times: user=2.28 sys=0.02, real=2.48 secs] '
// Get Time
pool =  string_test.match( time_reg );

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
		poolStr = line.match( mem_value_reg ) 
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
