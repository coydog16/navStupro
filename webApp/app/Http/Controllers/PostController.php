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
        $user = auth()->user();
        $posts = Post::with(['user'])->latest()->get();
        return Inertia::render('Post/Index', [
            'posts' => $posts,
            'user' => $user,
        ]);
    }
    // 新規投稿
    public function create()
    {
        return Inertia::render('Post/Create');
    }
    // 投稿保存
    public function store(Request $request)
    {
        $request->validate([
            'content' => 'required|string',
        ], [
            'content.required' => '何も書かれてないよ！',
            'content.string' => '正しい形式で入力してください'
        ]);

        $post = new Post();
        $post->user_id = auth()->check() ? auth()->id() : 1; // 仮にuser_id=1をデフォルトに（未ログイン時の保険）
        $post->content = $request->input('content');
        $post->save();

        // 投稿後はdashboardにリダイレクト（または同じページに留まる）
        return redirect()->route('dashboard')->with('success', 'Post created successfully.');
    }
    // 自分の投稿一覧
    public function myPosts()
    {
        $user = auth()->user();
        if (!$user) {
            // 未ログイン時はリダイレクト（または空配列返却）
            return redirect()->route('login');
        }
        $posts = Post::where('user_id', $user->id)->latest()->get();
        return Inertia::render('Dashboard/Index', [
            'posts' => $posts,
            'user' => $user,
        ]);
    }
}
