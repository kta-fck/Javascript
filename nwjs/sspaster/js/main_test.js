var gui = require( 'nw.gui' ) ,
fs = require( 'fs' ) ,
setting = require( './setting' ) ;
var cc = require( 'crypto' );
var export_image = require( 'child_process' ) ,
app = gui.App;
var imageDom,
img_dom  ;
// 設定ファイル
var counter = 0;

// template
var tp ;
var tp_dg = '' ;

var button = document.getElementById('main') ;

/**
 * compare binary
 * 
 */
 function equal( data1 , data2 ) {
 	var hash1 = cc.createHash( 'sha1' ) ;
 	var hash2 = cc.createHash( 'sha1' ) ;

 	var data1_hs = hash1.update( data1 , {"input_encoding" : 'binary'} ).digest( 'hex' ) ;
 	var data2_hs = hash2.update( data2 , {"input_encoding" : 'binary'} ).digest( 'hex' ) ;

 	if ( data1_hs === data2_hs ) {
 		return true ;
 	} else {
 		return false ;
 	}
 }

 function takeSnapshot(){
	// 二重押し禁止
	button.disabled = true ;
	tp = fs.readFileSync( setting.imgFile , {
    // 画像を取得
    "encoding" : 'base64'
        } ) ; //readFile

	export_image.exec( setting.pgm,function( err , stdout, stderr ){
        var ri = fs.readFileSync( setting.imgFile , {
           "encoding" : 'base64'
        } ) ; //readFile
        console.log(equal( ri, tp ));
        if(!equal( ri, tp ) ) {
           fs.writeFile('test[' + counter + '].png', ri ,{
              "encoding" : 'base64'
          } ,
          function(err) {
              if ( counter === 0 ){
                 imgFile = setting.imgFile;
             } else {
                 imgFile = 'test[' + counter + '].png';
             }

            imageDom =  document.getElementById( 'list' );
            img_dom = document.createElement( 'input' );
            img_dom.setAttribute( "type","image" ) ;
            img_dom.setAttribute( "src",imgFile ) ;
            img_dom.setAttribute( "id",counter ) ;
            img_dom.setAttribute( "width",270 ) ;
            img_dom.setAttribute( "height",180 ) ;

            function test(a){
                alert(a.id) ;
            }

            img_dom.addEventListener("click", function(){test(this)}, false);

            
             // img_dom = document.createElement( 'img' );
             // imageDom =  document.getElementById( 'list' );
             // img_dom.src = '' ;
             // img_dom.src = imgFile ;
             imageDom.appendChild( img_dom ); 
	            // update tempalte File
	            console.log( imgFile ) ;
	            fs.writeFileSync( setting.imgFile , ri , {
	            	"encoding" : 'base64'
	            } ) ; 

	            counter++ ;
            	// 処理が終わった
            	button.disabled = false ;
	        }) ; // writeFile
       } else {
           console.log('same data') ;
           button.disabled = false ;
       }


    }); // exportimage

}


// 監視をして変更があればDOM追加。
fs.watch(setting.imgFile,function(ev, fn) {
	if( ev === 'change' ) {
		console.log('File changed.');
        // takeSnapshot() ;
    } else {
    }
});


function appClose(){
	app.quit();
}
// 


// img_dom.src = '' ;
// img_dom.src = imgFile ;
