<?php

namespace App\Http\Controllers;

use App\Models\Post;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PostController extends Controller
{
    // 投稿一覧表示
    public function index()
    {
        $posts = Post::with(['user', 'image'])->latest()->get();
        return Inertia::render('Post/Index', [
            'posts' => $posts,
        ]);
    }
}
