<?php

use App\Http\Controllers\PostController;
use Illuminate\Support\Facades\Route;

//新規投稿
Route::get('/posts/create', [PostController::class, 'create'])->name('posts.create');

//投稿保存
Route::post('/posts', [PostController::class, 'store'])->name('posts.store');