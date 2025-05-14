# Laravel 代表的なグローバルヘルパ関数まとめ

| 関数         | 用途・説明                                                                 |
|--------------|--------------------------------------------------------------------------|
| `auth()`     | 現在の認証ユーザー情報を取得。`auth()->user()`でUserモデルが取れる           |
| `route()`    | ルート名からURLを生成。`route('dashboard')`など                            |
| `view()`     | Bladeビューを返す。`view('welcome', [...])`                                |
| `now()`      | 現在日時（Carbonインスタンス）を取得                                       |
| `asset()`    | public配下のファイルURLを生成。`asset('img/logo.png')`                     |
| `config()`   | 設定値の取得・変更。`config('app.name')`                                   |
| `env()`      | .envファイルの値を取得。`env('APP_ENV')`                                   |
| `old()`      | 直前のリクエストの入力値を取得（バリデーションエラー時など）                |
| `redirect()` | リダイレクトレスポンスを返す。`redirect('login')`                          |
| `request()`  | 現在のリクエストインスタンスを取得                                         |
| `response()` | レスポンスインスタンスを生成                                               |
| `session()`  | セッション操作。`session(['key' => 'value'])`                              |
| `url()`      | 現在のURLや指定ルートのURLを取得                                            |
| `abort()`    | 指定ステータスで即時終了。`abort(404)`                                     |
| `bcrypt()`   | パスワードをハッシュ化                                                     |
| `collect()`  | コレクション（便利な配列ラッパー）を生成                                   |
| `dd()`       | 変数の中身をダンプして処理停止（デバッグ用）                               |
| `dump()`     | 変数の中身をダンプ（処理は継続）                                           |
| `__()`       | 多言語翻訳文字列を取得                                                    |

---

## 使い方の例

```php
$user = auth()->user();
$name = config('app.name');
return redirect()->route('dashboard');
$now = now();
$imgUrl = asset('img/logo.png');
```

