
// 画面キャプチャ(Excelが必要)
var excel = WScript.CreateObject("Excel.Application");
excel.ExecuteExcel4Macro( "CALL(\"user32\",\"keybd_event\",\"JJJJJ\",44,121,1,0)" );
excel.ExecuteExcel4Macro( "CALL(\"user32\",\"keybd_event\",\"JJJJJ\",44,121,3,0)" );

// 現在アクティブなウィンドウを最小化
// 
//   ※エクスプローラ上でこのスクリプトを
//     ダブルクリック等により起動した場合，
//     単にペイントをAppActivateするだけだと，
//     エクスプローラがアクティブなままになる。
//     ペイントをアクティブにするためには，このように最小化して
//     エクスプローラからフォーカスを外す。
//
var ws = WScript.CreateObject("WScript.Shell");
ws.SendKeys( "% n" );    


// 空画像を作成
var bmpname = "clip" + (new Date()).getTime() + ".bmp";
var out = WScript.CreateObject("ADODB.Stream");
out.Type = 1; // バイナリモードで書き込み
out.Open();
out.SaveToFile( bmpname, 2 ); // 上書き保存
out.Close();


// MSペイントを起動・最大化 http://msdn.microsoft.com/ja-jp/library/cc364421.aspx
var mspaint = ws.Run("mspaint.exe " + bmpname, 3);
WScript.Sleep( 1000 );
var ret = ws.AppActivate( mspaint );

// 画像を保存
ws.SendKeys( "^v" );    // ペースト
ws.SendKeys( "^s" );    // 保存
ws.SendKeys( "%{F4}" ); // 終了

// さっき最小化したアプリケーションを復元
ws.SendKeys( "%+{TAB}" );
