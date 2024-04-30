<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Controller;
use App\Http\Controllers\PostController;
use App\Models\Post;
use App\Models\User;
use App\Models\Comment;

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
Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});
Route::get('user/{user}', function (User $user) {

    return response()->json($user);
})->middleware('auth:sanctum');

/**
 * Post routes.

 */
Route::get('post/{post}', function (Post $post) {
    $post->username = $post->user->name;
    $post->comments = $post->comments->all();

    foreach ($post->comments as $comment) {
        $comment->username = $comment->user->name;
    }

    return response()->json($post);
});
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
    }

    return response()->json($posts);
});

/**
 * Routes that use PostController.
 */
Route::controller(PostController::class)->group(function () {
    Route::get('/posts', 'all');
    Route::get('/posts/first', 'getFirstPost');

    Route::post('/posts', 'create');

    Route::delete('/post/{post}', 'delete');
})->middleware('auth:sanctum');

/**
 * Comment routes.

 */
Route::delete('/comment/{comment}', function (Comment $comment) {
    $comment->delete();

    return response()->json($comment);
})->middleware('auth:sanctum');
Route::post('/comment', function (Request $request) {
    $comment = new Comment();
    $comment->content = $request->content;
    $comment->user_id = $request->userId;
    $comment->post_id = $request->postId;
    $comment->save();

    return response()->json($comment);
})->middleware('auth:sanctum');

