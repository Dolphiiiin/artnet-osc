# artnet-osc
受信したArt-Netをoscへ変換して送信するプログラム

## 動作環境
- Nodejs

## 使用方法
1. `npm install`で依存関係をインストール
2. `npm start`でプログラムを起動

OSCメッセージは、`/<universe>/dmx/<channel> <float>`の形式で送信されます。

## オプション
`--osc_host=127.0.0.1 --osc_port=9000 --artnet_host=127.0.0.1 --artnet_subnet=0 --artnet_universe=0 --artnet_net=0`
```
--osc_host: OSC送信先のIPアドレス
--osc_port: OSC送信先のポート番号
--artnet_host: Art-Net受信元のIPアドレス
--artnet_subnet: Art-NetのSubnet
--artnet_universe: Art-NetのUniverse
--artnet_net: Art-NetのNet
```