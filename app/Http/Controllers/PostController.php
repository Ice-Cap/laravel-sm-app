<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Post;
use App\Models\User;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Gate;

class PostController extends Controller
{
    /**
     * Get all posts.
     */
    public function index(Request $request)
    {
        $posts = Post::all()->sortByDesc('created_at');
        foreach ($posts as $post)
        {
            $post->likes = $post->likes->all();
            $post->username = $post->user->name;
        }

        $postsArr = $posts->toArray();
        $result = array_values($postsArr);

        return response()->json($result);
    }

    /**
     * Get post by id.
     */
    public function show(Post $post)
    {
        $post->username = $post->user->name;
        $post->comments = $post->comments->all();
        $post->likes = $post->likes->all();

        foreach ($post->comments as $comment) {
            $comment->username = $comment->user->name;
            $comment->likes = $comment->likes->all();
        }

        foreach ( $post->likes as $like ) {
            $like->username = $like->user->name;
        }

        return response()->json($post);
    }

    /**
     * Update post content.
     */
    public function update(Request $request, Post $post)
    {
        Gate::authorize('user-post', $post);

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
        Gate::authorize('user-post', $post);

        $post->delete();

        return response()->json($post);
    }
}
