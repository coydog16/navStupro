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
            'user' => $user,
        ]);
    }

    // 新規投稿(modal)
    // public function create()
    // {
    //     return Inertia::render('Post/Create');
    // }

    // 投稿保存
    public function store(Request $request)
    {
        // カスタムメッセージを設定して、バリデーション実行
        $validator = \Validator::make($request->all(), [
            'content' => 'required|string',
        ], [
            'content.required' => '投稿内容を入力してください',
            'content.string' => '正しい形式で入力してください'
        ]);
        
        // バリデーション失敗時は、エラーをJSONで返す（Inertia対応）
        if ($validator->fails()) {
            // withErrorsだとリダイレクトが発生するので、リクエストがXHR/Inertiaの場合は
            // JSONレスポンスを返す
            if ($request->wantsJson() || $request->header('X-Inertia')) {
                return response()->json([
                    'errors' => $validator->errors(),
                    'message' => '入力内容に問題があります'
                ], 422);
            }
            return back()->withErrors($validator);
        }

        $post = new Post();
        $post->user_id = auth()->check() ? auth()->id() : 1; // 仮にuser_id=1をデフォルトに（未ログイン時の保険）
        $post->content = $request->input('content');
        $post->save();

        // Inertiaリクエストの場合は成功レスポンスを返す
        if ($request->wantsJson() || $request->header('X-Inertia')) {
            return response()->json(['success' => true]);
        }
        
        // 通常のリクエストの場合はダッシュボードにリダイレクト
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
