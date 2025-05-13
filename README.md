#docker #github  #Laravel 

Dockerで作成した環境を別端末で動かすテスト。

## WSL2にUbuntuとDockerデスクトップをインストールする

端末はWindowsなので、wsl2のUbuntuがインストールされている前提。
まずはWindowsでLINUXを動かせるようにする。
参考：[# Windows 11 に WSL2 Ubuntu をインストールして使ってみる【誰でもできるよ】](https://note.com/hiro20180901/n/nc798a07485e2#6274b303-7384-45b0-bdcb-17b06edfbd3a)

Dockerデスクトップはwindows版をインストールしてもろて。

[Docker公式](https://www.docker.com/ja-jp/)
windowsならAMD版でだいたい大丈夫。
後は画面の指示に従ってインストール。

WSLとUbuntuの設定は忘れずに。

![img|600](https://i.gyazo.com/787be6032099454ed3ab6ba2272c47a6.png)
（右上の⚙マークからResouce→WSL integration）
☑Enable Integration with default WSL distro
☑Ubuntu-22.04

これでdockerの設定は終わり。

## git cloneしてローカルにリポジトリを作成

Ubuntuのターミナルを開き、作業ディレクトリを作成する。場所は任意。
作成したディレクトリに移動して、`git clone` する。

[リポジトリのURL](https://github.com/coydog16/navStupro)を開き、緑色の`<> Code`からHTTPSのURLをコピー

![img|600](https://i.gyazo.com/9c2a82cd1eb594ce053fea93769bb09b.png)

作業ディレクトリ上で`$ git clone https://github.com/coydog16/navStupro.git`を実行。
するとgithubのリポジトリがローカルに作成される。

## .envファイルを作成

リポジトリを作成したら`$ ls` で'navStupro'ディレクトリが作成されていることを確認。
`$ cd navStupro/webApp`でソースのルートディレクトリに移動。
`$ code .` でコードエディタを開き、webApp直下に新たに `.env` ファイルを作成。
`.env.examle` の中身を `.env` にコピー。

![img|600](https://i.gyazo.com/772dfe538cb57d9724a9823e8e9c457a.png)
こんな感じになる

.envを編集して、`your_db_user` と `your_db_password` にデータベースのユーザー名とパスワードを入力。
（パスワードは別途で伝えます）

```
DB_CONNECTION=pgsql
DB_HOST=pgsql
DB_PORT=5432
DB_DATABASE=main
DB_USERNAME=your_db_user
DB_PASSWORD=your_db_password
```

## スクリプトでDockerコンテナとnpmを起動する。

ターミナルを開き `bash ./start-all.sh` を実行。（自動的に作業ディレクトリに移動するのでカレントディレクトリはどこでもいい）

これでDockerコンテナのビルド、composerのインストール、VITEのフロントサーバーの起動、コードエディタの起動が一発で行われる。

## 最後にAPPキーをジェネレイトする

webAppディレクトリで`docker compose exec web php artisan key:generate`
これでAPPキーが作成される（はず）

これで`localhost`に接続し、LaravelBreezeのインデックスが表示されれば環境構築終わり。

![img|600](https://i.gyazo.com/aa8ab03785ad3fca4664e904ca7ded18.png)


次回作業時も  `bash ./start-all.sh`  を実行すればすぐに作業を始められる環境になる。

