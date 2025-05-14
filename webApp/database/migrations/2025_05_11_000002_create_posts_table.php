<?php
// database/migrations/2025_05_11_000002_create_posts_table.php
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreatePostsTable extends Migration {
    public function up() {
        Schema::create('posts', function (Blueprint $table) {
            $table->bigIncrements('id'); // 投稿ID
            $table->foreignId('user_id')->constrained()->onDelete('cascade'); // ユーザーに紐づく！
            $table->longText('content'); // メモ内容
            $table->json('tags')->nullable(); // タグもOK
            $table->timestamps(); // created_at, updated_at
        });
    }
    public function down() {
        Schema::dropIfExists('posts');
    }
}

return new CreatePostsTable();
