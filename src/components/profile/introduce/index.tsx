import { component$, useStylesScoped$ } from "@builder.io/qwik";
import styles from './index.css?inline';

export default component$(() => {
    useStylesScoped$(styles);
  return (
    <textarea class="textarea" readOnly>
      オレンジ(@0_a_e)です.おあえとも読みます # 基本情報 - 誕生日: 2005年4月3日
      - # していること - キチツイ - # 好物 ナンと杏仁豆腐、貝類を好みます.
      猫派です. # 使える物 - React, Qwik - 中国語(読み書き) - # 使えない物 -
      英語 # 使用端末 - P40 Pro - Matebook 13 - デスクトップ: 2700X/16GB/512GB #
      やったこと・やっていること - Pingheng -
      ReactNative製のMisskeyクライアントです.制作中 - openHuaweiShare -
      HuaweiShare互換ソフトです.制作中 - oa.e-o.ae - このサイトです.
      Qwikで書かれ, IPFSでホストされています.
      この文章はmarkdownをC++のプログラムでパースし、JSCPPで実行して表示しています。
    </textarea>
  );
});
