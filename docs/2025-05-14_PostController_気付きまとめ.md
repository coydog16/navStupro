# PostControllerの学び・気付きまとめ（2025-05-14）

## PostControllerの主な役割
- 投稿一覧表示（index）
- 新規投稿（store）
- 自分の投稿一覧（myPosts）
- ※createはモーダル運用のためコメントアウト中

---

## storeメソッドの流れ
1. `store(Request $request)` でリクエストを受け取る
2. `$request->validate(['content' => 'required|string'])` でバリデーション
3. 新しい `Post` モデルを作成し、`user_id` と `content` をセット
4. `$post->save()` でDBに保存
5. 保存後は `dashboard` にリダイレクト

---

## Request $request のポイント
- ユーザーが送信したデータ（フォーム内容など）が全部入っている
- `$request->input('content')` で値を取得
- バリデーションも一行で書ける
- 変数で直接受け取る方法もあるが、LaravelではRequest推奨

---

## ルーティングとの関係
- `/posts` へのPOSTリクエストは `store` メソッドに届く（routes/post.phpで定義）
- URLに「store」は出てこないが、ルート定義で結びついている
- ルート名（`posts.store`）をつけておくと、コード内で`route('posts.store')`でURL生成できる

---

## モーダル投稿とcreateメソッド
- 投稿フォームをモーダルで実装している場合、createメソッドは不要
- 別ページで投稿画面を作る場合のみcreateメソッドが必要
- 今回はモーダル運用なのでコメントアウトでOK

---

## 気付き・メモ
- コントローラーは「交通整理役」：リクエストを受けて、モデルを操作し、レスポンスを返す
- storeメソッドの流れを理解すると、他のCRUD操作も応用しやすい
- 分からないことは一つずつ整理していけば大丈夫！

---

### これからも「分からない」を大事に、Laravelのコントローラー設計を深めていこう！
