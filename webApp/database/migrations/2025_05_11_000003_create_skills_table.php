<?php
// database/migrations/2025_05_11_000003_create_skills_table.php
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateSkillsTable extends Migration {
    public function up() {
        Schema::create('skills', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->foreignId('user_id')->constrained()->onDelete('cascade'); // ユーザーに紐づく！
            $table->string('name'); // スキル名
            $table->integer('level')->nullable(); // レベル（任意）
            $table->text('note')->nullable(); // 自由記述
            $table->timestamps();
        });
    }
    public function down() {
        Schema::dropIfExists('skills');
    }
}

return new CreateSkillsTable();
