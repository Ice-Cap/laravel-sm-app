<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\PostController;
use App\Models\User;
use App\Http\Controllers\CommentController;
use App\Http\Controllers\PostLikeController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

/**
 * User routes.
 */
Route::get('user/{user}', function (User $user) {
    return response()->json($user);
})->middleware('auth:sanctum');

/**
 * Get all posts for a user.
 */
Route::get('user/{user}/posts', function (User $user) {
    $posts = $user
        ->posts()
        ->orderBy('created_at', 'desc')
        ->get()
        ->all();

    foreach ($posts as $post) {
        $post->username = $user->name;
        $post->likes = $post->likes->all();
    }

    return response()->json($posts);
});

/**
 * Posts.
 */
Route::apiResource('posts', PostController::class)
    ->middleware('auth:sanctum');

/**
 * Comments.
 */
Route::apiResource('comments', CommentController::class)
    ->middleware('auth:sanctum');

/**
 * Post Likes.
 */
Route::apiResource('post-likes', PostLikeController::class)
    ->middleware('auth:sanctum');
