<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('project_detail_block_media', function (Blueprint $table) {
            $table->id();
            $table->foreignId('project_detail_block_id')->constrained('project_detail_blocks')->onDelete('cascade');
            $table->integer('group_id')->comment('ID группы для связи элементов');
            $table->enum('group_type', ['single', 'double'])->default('single')->comment('Тип группы');
            $table->string('file_path')->comment('Путь к файлу');
            $table->enum('file_type', ['image', 'video'])->comment('Тип файла');
            $table->string('alt_text')->nullable()->comment('Альтернативный текст');
            $table->text('caption')->nullable()->comment('Подпись к медиа');
            $table->string('poster_path')->nullable()->comment('Путь к постеру для видео');
            $table->integer('order')->default(0)->comment('Порядок внутри группы');
            $table->integer('group_order')->default(0)->comment('Порядок группы в блоке');
            $table->boolean('is_active')->default(true)->comment('Активность медиа');
            $table->timestamps();

            // Индексы для оптимизации запросов
            $table->index(['project_detail_block_id', 'is_active']);
            $table->index(['project_detail_block_id', 'group_id']);
            $table->index(['project_detail_block_id', 'group_order', 'order']);
            $table->index(['file_type', 'is_active']);
            $table->index(['group_type', 'is_active']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('project_detail_block_media');
    }
};