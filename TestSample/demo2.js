//　ファイル監視のデモ

var fs = require('fs');

// 記載は相対パす
var watchFile = 'test.png';
var export_image = require('child_process');
// 画像取り込みプログラムの指定
var pgm = 'Clipping2.jar'

// 画像を取得
setInterval(function(){
	export_image.exec( pgm,function( err , stdout, stderr ){});
},10000);




// 監視をし続ける。
fs.watch(watchFile,function(ev, fn) {
	if(ev === 'change') {
		console.log('Changed.');
	} else {
		console.log('ファイル名の変更、もしくは削除です。');
	}
});


