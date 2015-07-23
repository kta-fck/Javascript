var gui = require( 'nw.gui' ) ,
        fs = require( 'fs' ) ,
        export_image = require( 'child_process' ) ,
        app = gui.App;
var imageDom,
      img_dom  ;
// 設定ファイル
var setting = require( './setting' ) ;


// 画像取り込みプログラムの指定
var counter = 0;
// 画面側のメソッド

function takeSnapshot(){
    // 画像を取得
    export_image.exec( setting.pgm,function( err , stdout, stderr ){


        imgFile = setting.imgFile;
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
