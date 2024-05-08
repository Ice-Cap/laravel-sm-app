<?php

namespace App\Http\Controllers;

use App\Models\CommentLike;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Gate;

class CommentLikeController extends Controller
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
        $commentId = $request->input('commentId');

        if (!$userId || !$commentId) {
            return response()->json([
                'success' => false
            ]);
        }

        $like = new CommentLike();
        $like->user_id = $userId;
        $like->comment_id = $commentId;

        $result = $like->save();

        return response()->json([
            'success' => $result
        ]);
    }

    /**
     * Display the specified resource.
     */
    public function show(CommentLike $commentLike)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, CommentLike $commentLike)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(CommentLike $commentLike)
    {
        Gate::authorize('user-owns-resource', $commentLike);

        $result = $commentLike->delete();
        return response()->json([
            'success' => $result
        ]);
    }
}
