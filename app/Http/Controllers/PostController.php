<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Post;
use App\Models\User;
use Illuminate\Support\Facades\DB;

class PostController extends Controller
{
    public function getFirstPost()
    {
        $post = Post::first();
        return response()->json($post);
    }

    public function all()
    {
        $posts = DB::table('users')
            ->join('posts','posts.user_id','=','users.id')
            ->select('posts.*', 'users.name')
            ->orderBy('posts.created_at', 'desc')
            ->get();

        return response()->json( $posts );
    }

    public function create(Request $request)
    {
        $userId = $request->userId;
        $user = User::find($userId);

        $post = new Post();
        $post->content = $request->content;
        $post->user_id = $userId;
        $post->save();

        return response()->json($post);
    }
}
