<?php

namespace App\Http\Controllers;

use App\Models\PostLike;
use Illuminate\Http\Request;

class PostLikeController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $userId = $request->user()->id;
        $postId = $request->input('postId');

        if (!$userId || !$postId) {
            return response()->json([
                'success' => false
            ]);
        }

        $like = new PostLike();
        $like->user_id = $userId;
        $like->post_id = $postId;

        $result = $like->save();

        return response()->json([
            'success' => $result
        ]);
    }

    /**
     * Display the specified resource.
     */
    public function show(PostLike $postLike)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, PostLike $postLike)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(PostLike $postLike)
    {
        $result = $postLike->delete();

        return response()->json([
            'success' => $result
        ]);
    }
}
