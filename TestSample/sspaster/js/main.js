var gui = require( 'nw.gui' );
var fs = require( 'fs' );
var export_image = require( 'child_process' );
var app = gui.App;
var imageDom,
img_dom  ;
// 画像取り込みプログラムの指定
var pgm = 'Clipping2.jar'
var imgFile = './test.png' ;
// 画面側のメソッド
function takeSnapshot(){
    // 画像を取得
    export_image.exec( pgm,function( err , stdout, stderr ){
        imgFile = './test.png' ;
        img_dom = document.createElement( 'img' );
        imageDom =  document.getElementById( 'list' );
        img_dom.src = '' ;
        img_dom.src = imgFile ;
        imageDom.appendChild( img_dom );    
    });
}


// 監視をして変更があればDOM追加。
fs.watch(imgFile,function(ev, fn) {
    if( ev === 'change' ) {
        console.log('ファイル名の変更、もしくは削除です。');
    } else {
    }
});
function appClose(){
    app.quit();
}
// 
