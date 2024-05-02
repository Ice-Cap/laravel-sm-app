<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Post;
use App\Models\User;
use Illuminate\Support\Facades\DB;

class PostController extends Controller
{
    /**
     * Get all posts.
     */
    public function index(Request $request)
    {
        $posts = DB::table('users')
            ->join('posts','posts.user_id','=','users.id')
            ->select('posts.*', 'users.name AS username')
            ->orderBy('posts.created_at', 'desc')
            ->get();

        return response()->json( $posts );
    }

    /**
     * Get post by id.
     */
    public function show(Post $post)
    {
        $post->username = $post->user->name;
        $post->comments = $post->comments->all();

        foreach ($post->comments as $comment) {
            $comment->username = $comment->user->name;
        }

        return response()->json($post);
    }

    /**
     * Update post content.
     */
    public function update(Request $request, Post $post)
    {
        $post->content = $request->content;
        $post->save();

        return response()->json($post);
    }

    /**
     * Save new post.
     */
    public function store(Request $request)
    {
        $userId = $request->userId;
        $user = User::find($userId);

        $post = new Post();
        $post->content = $request->content;
        $post->user_id = $userId;
        $post->save();

        return response()->json($post);
    }

    /**
     * Delete post.
     */
    public function destroy(Post $post)
    {
        $post->delete();

        return response()->json($post);
    }
}
