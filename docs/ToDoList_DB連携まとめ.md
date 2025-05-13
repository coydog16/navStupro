# ToDoリストをデータベースと連携する方法（Laravel + React）

## 1. テーブル設計・マイグレーション作成

- `todos` テーブルを新規作成（user_id, content, is_done, timestamps など）

```bash
php artisan make:migration create_todos_table --create=todos
```

例：
```php
Schema::create('todos', function (Blueprint $table) {
    $table->id();
    $table->foreignId('user_id')->constrained()->onDelete('cascade');
    $table->string('content');
    $table->boolean('is_done')->default(false);
    $table->timestamps();
});
```

---

## 2. モデル作成

```bash
php artisan make:model Todo
```

---

## 3. コントローラー/APIルート作成

- ToDoのCRUD用API（例：`TodoController`）
- ルーティングは`routes/api.php`や`routes/web.php`で設定

例：
```php
Route::middleware('auth')->group(function () {
    Route::get('/todos', [TodoController::class, 'index']);
    Route::post('/todos', [TodoController::class, 'store']);
    Route::put('/todos/{todo}', [TodoController::class, 'update']);
    Route::delete('/todos/{todo}', [TodoController::class, 'destroy']);
});
```

---

## 4. React側でAPI連携

- useEffectで初回ロード時に`/todos`をfetchし、stateにセット
- 追加・削除・完了時はAPI経由でDBを更新し、stateも更新
- 例：axiosやfetchでAPIリクエスト

```js
// 取得
axios.get('/todos').then(res => setTodos(res.data));
// 追加
axios.post('/todos', { content: newTodo });
// 削除
axios.delete(`/todos/${id}`);
// 完了
axios.put(`/todos/${id}`, { is_done: true });
```

---

## 5. 認証・ユーザー紐付け

- Laravelの認証（Auth）を利用し、APIはログインユーザーのみアクセス可に
- コントローラーで`auth()->id()`を使ってユーザーごとにToDoを管理

---

## 6. 注意点

- SPAの場合はInertia.jsやaxiosでAPI連携
- バリデーション・エラーハンドリングも忘れずに
- サーバー側で認可（自分のToDoしか操作できないように）

---

## まとめ
1. マイグレーション・モデル・APIコントローラーを作成
2. ReactからAPI経由でToDoを取得・追加・削除・更新
3. 認証ユーザーごとにToDoを管理

---
