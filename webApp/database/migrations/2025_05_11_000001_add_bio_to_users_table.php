<?php
// database/migrations/2025_05_11_000001_add_bio_to_users_table.php
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddBioToUsersTable extends Migration {
    public function up() {
        Schema::table('users', function (Blueprint $table) {
            $table->text('bio')->nullable()->after('password'); // 自己紹介欄
            $table->string('avatar_url')->nullable()->after('bio'); // アバター画像URL
            $table->foreignId('image_id')->nullable()->constrained('images')->onDelete('set null')->after('avatar_url'); // 画像テーブルへの外部キー
        });
    }
    public function down() {
        Schema::table('users', function (Blueprint $table) {
            $table->dropForeign(['image_id']);
            $table->dropColumn(['bio', 'avatar_url', 'image_id']);
        });
    }
}

return new AddBioToUsersTable();
