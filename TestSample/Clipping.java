import java.awt.Image;
import java.awt.Toolkit;
import java.awt.datatransfer.Clipboard;
import java.awt.datatransfer.DataFlavor;
import java.awt.datatransfer.UnsupportedFlavorException;
import java.awt.image.BufferedImage;
import java.awt.image.RenderedImage;
import java.io.File;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

import javax.imageio.ImageIO;


public class Clipping {

    public static BufferedImage getClipboardImage() {
        /**
         * クリップボードの画像を取得して、返す。
         * @return BufferedImage
         */

        Toolkit kit = Toolkit.getDefaultToolkit();
        Clipboard clip = kit.getSystemClipboard();

        if(clip.isDataFlavorAvailable(DataFlavor.imageFlavor)){
        	// 画像以外を取得しないように

        	try {

        		Image im =  (Image) clip.getData(DataFlavor.imageFlavor);
        		return (BufferedImage)im;

        	} catch (IOException e) {
        		e.printStackTrace();
        	} catch (UnsupportedFlavorException e) {
				e.printStackTrace();
			}
        }
        System.out.println("画像以外のデータ、もしくはイメージを取得できませんでした");
        return null;

    }


    public static void main(String[] args) throws InterruptedException, IOException {

        RenderedImage renimg;
        // 出力先の場所をセット
        // 第一引数を出力先にする
        File outFir = new File(args[0]);

        if(Clipping.getClipboardImage() != null) {

        	//クリップボードの画像を取得
        	renimg = Clipping.getClipboardImage();

        	//ファイルを書き込み
        	if(ImageIO.write(renimg, "bmp", outFir)) {
        		System.out.println("書き込み成功。");
        	} else {
        		System.out.println("書き込み失敗。");
        	}


        }
    } // end main()

} // end class



