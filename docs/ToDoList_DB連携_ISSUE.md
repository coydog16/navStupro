# ToDo: ToDoリストをデータベース連携する

## 概要

現在、ToDoリストはlocalStorageで端末ごとに保存されていますが、
端末間で同期できるようにデータベース（DB）連携を実装したいです。

---

## やること

- `todos`テーブルの作成（user_id, content, is_done, timestamps など）
- Todoモデル作成
- TodoController/APIルート作成（CRUD: 取得・追加・削除・完了）
- React側でAPI経由でToDoリストを取得・追加・削除・完了できるように
- 認証ユーザーごとにToDoを管理
- バリデーション・エラーハンドリング
- サーバー側で認可（自分のToDoしか操作できないように）

---

## 参考資料

- [docs/ToDoList_DB連携まとめ.md](./docs/ToDoList_DB連携まとめ.md)
  - マイグレーション・モデル・API設計・React連携の手順を詳しく記載

---

## 備考
- SPAの場合はInertia.jsやaxiosでAPI連携
- 実装例やサンプルコードが必要な場合は[docs/ToDoList_DB連携まとめ.md]参照

---

### 担当者
- （アサインしてください）

### 進捗・質問
- このIssueにコメントでやりとりお願いします！

---

> 参考: 2025-05-13時点の要件・設計まとめ
