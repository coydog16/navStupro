<?php

use App\Http\Controllers\PostController;
use Illuminate\Support\Facades\Route;

// 自分の投稿一覧
Route::get('/dashboard', [PostController::class, 'myPosts'])->name('dashboard');

// 投稿一覧表示（全員分）
Route::get('/posts', [PostController::class, 'index'])->name('posts.index');

// 新規投稿
Route::get('/posts/create', [PostController::class, 'create'])->name('posts.create');

// 投稿保存
Route::post('/posts', [PostController::class, 'store'])->name('posts.store');