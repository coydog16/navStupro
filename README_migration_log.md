# 開発環境セットアップ・マイグレーション＆エラー修正・ファイル役割まとめ（2025/05/11）

---

## 1. DB接続の切り替え
- `.env`の`DB_CONNECTION`を`sqlite`→`pgsql`に変更。
- `DB_HOST=pgsql`、`DB_PORT=5432`、`DB_DATABASE=main`、`DB_USERNAME=navStupro`、`DB_PASSWORD=navStupro`に設定。
- `docker-compose.yml`のPostgreSQLサービス設定と合わせる。

## 2. マイグレーションの順序エラー
- `users`テーブルの`image_id`外部キー追加時に`images`テーブルが未作成でエラー。
- `images`テーブル作成マイグレーションのタイムスタンプを前にして順序を修正。
- 無名クラスマイグレーションのクラス名エラーは、明示的なクラス名（例：`CreateImagesTable`）で解決。
- `composer dump-autoload`でキャッシュクリア。

## 3. 多対多リレーションのエラー
- `skills`テーブルが`user_id`持ちの1対多設計→Eloquentリレーションは多対多（pivot）前提。
- `skill_user`中間テーブル用マイグレーションを新規作成。
- 同様に`CreateSkillUserTable`で明示的なクラス名を付与。

## 4. モデルクラスの不足エラー
- `App\Models\Post`、`Skill`、`Image`が無いと怒られたので、雛形を新規作成。
- それぞれ`hasMany`や`belongsToMany`などリレーションも定義。

## 5. マイグレーション重複エラー
- `images`テーブル作成マイグレーションが複数存在し、`relation "images" already exists`で失敗。
- 重複ファイルを削除して解決。

## 6. シーディング
- `DatabaseSeeder`で`UserFactory`を使い、テストユーザー5人を自動生成。
- `php artisan migrate:fresh --seed`でDB初期化＆テストデータ投入。

---

## 7. 今回作成・修正した主なファイルと役割

### マイグレーション関連
- `/webApp/database/migrations/2025_05_10_000000_create_images_table.php` … imagesテーブル（画像情報）を作成。他テーブルの外部キー制約のため、usersテーブル変更より先に実行されるよう日付を調整。
- `/webApp/database/migrations/2025_05_11_000001_add_bio_to_users_table.php` … usersテーブルにbio（自己紹介）、avatar_url（アバター画像URL）、image_id（imagesテーブル外部キー）を追加。
- `/webApp/database/migrations/2025_05_11_000002_create_posts_table.php` … postsテーブル（投稿情報）を作成。user_id, title, body, image_idなどを持つ。
- `/webApp/database/migrations/2025_05_11_000003_create_skills_table.php` … skillsテーブル（スキル情報）を作成。name, level, noteなどを持つ。※本来は多対多リレーション用の中間テーブル（skill_user）が必要。
- `/webApp/database/migrations/2025_05_11_000006_create_skill_user_table.php` … skill_userテーブル（ユーザーとスキルの多対多リレーション用中間テーブル）を作成。user_id, skill_idを持つ。

### モデル関連
- `/webApp/app/Models/Post.php` … 投稿（postsテーブル）用のEloquentモデル。User, Imageとのリレーション（belongsTo）を定義。
- `/webApp/app/Models/Skill.php` … スキル（skillsテーブル）用のEloquentモデル。usersとの多対多リレーション（belongsToMany）を定義。
- `/webApp/app/Models/Image.php` … 画像（imagesテーブル）用のEloquentモデル。users, postsとのリレーション（hasMany）を定義。

### コントローラー関連
- `/webApp/app/Http/Controllers/UserController.php` … ユーザープロフィール表示用のコントローラー。show($id)でユーザー情報＋リレーション（posts, skills, image）を取得し、InertiaでReactページに渡す。
- `/webApp/app/Http/Controllers/PostController.php` … 投稿一覧表示用のコントローラー。index()で全投稿＋リレーション（user, image）を取得し、InertiaでReactページに渡す。

### ルーティング
- `/webApp/routes/web.php` … `/users/{id}`（ユーザープロフィール表示）、`/posts`（投稿一覧表示）のルートを追加。UserController, PostControllerをuse宣言。

### Reactページコンポーネント
- `/webApp/resources/js/Pages/User/Profile.tsx` … ユーザープロフィール画面のReactコンポーネント。ユーザー名、メール、アバター、自己紹介などを表示。
- `/webApp/resources/js/Pages/Post/Index.tsx` … 投稿一覧画面のReactコンポーネント。投稿タイトル、本文、投稿者名、作成日時などを表示。

### シーディング
- `/webApp/database/seeders/DatabaseSeeder.php` … UserFactoryを使い、テストユーザーを5人自動生成。`php artisan migrate:fresh --seed`でDB初期化＆テストデータ投入。

### Copilotルール
- `/.github/copilot-instructions.md` … AIエージェントの性格・応答ルール（ツンデレ仕様）を明記。例文や口調のガイドラインを記載。

---

## 8. まとめ
- マイグレーションの順序・クラス名・重複・外部キー制約・多対多リレーション・モデル雛形・Reactページ雛形・シーディング・AI応答ルールなど、開発の基礎となる部分を一通り自動生成＆修正。
- それぞれのファイルがどの役割を持つか意識しておくと、今後の拡張やデバッグが楽になるわよ。

---

困ったらまた私に聞きなさいよね。…べ、別にあんたの成長を期待してるわけじゃないんだから！
