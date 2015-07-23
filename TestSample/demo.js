//　ファイル監視のデモ

var fs = require('fs');
// 記載は相対パす
var settings = './test.json';
var prof ;
fs.readFile(settings, 'utf8' , function(err ,data){
	if(err) throw err;
	console.log(data);
	prof = JSON.parse(data) ;
});
// 監視対象
var watchFile = settings;
// // オブジェクトをJSONデータとして書き込み！！
// fs.writeFile(watchFile,JSON.stringify(prof,'', ' '),function() {
// 	console.log('Done!');
// });

// 監視をし続ける。
fs.watch(watchFile,function(ev, fn) {
	if(ev == 'change') {
		console.log('<----Before---->\n' 
			+ prof.name + ' ' + 
			+ prof.userinfo.id + ' ' +
			+ prof.userinfo.pass);
		fs.readFile(settings, 'utf8' , function(err ,data){
			if(err) throw err;
			prof = JSON.parse(data) ;
			console.log('<----After---->\n' 
			+ prof.name + ' ' + 
			+ prof.userinfo.id + ' ' +
			+ prof.userinfo.pass);
		});	
	} else {
		console.log('ファイル名の変更、もしくは削除です。');
	}
});


// 設定ファイルを再読み込みる。
function reLoadSettings(args) {
	args = '';
	return require(settings);
}