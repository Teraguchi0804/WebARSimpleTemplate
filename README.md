# WebARSimpleTemplate

WebARコンテンツを作成するためのシンプルな開発環境です。

## Overview
- スマートフォンで体験用に最適化
- マーカーの認識のWebARのコア部分はAR.jsを使用
- アニメーションはSpineのエクスポートデータをSpineランタイムにより実装
- Spineのアニメーションデータを表示する土台をthree.jsにより準備

## Requirements
- node.js v6.11.2で動作確認
- gulp v3.9.1で動作確認  

※その他の開発に必要なpackageのバージョンはpackage.jsonを参照

## Description
### 主要な開発ファイル  
src/assets/js/_devjs/src/display/DisplayTop.js  
：UAチェック等のARに関すること以外の基本処理を実行

src/assets/js/_devjs/src/three/glStage.js   
：AR.jsの初期化、Spineランタイムの実行等のコア処理を行なっている


## Build Setup

``` bash
# install dependencies
$ npm install

# serve with hot reload at localhost
$ gulp default

# build for production
$ gulp publish
```

## License
Public domain

## Authors
[Norikazu Teraguchi](https://nrmk.jp/)
