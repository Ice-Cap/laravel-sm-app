<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Models\Comment;
use Illuminate\Http\Request;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::get('/user/{id}', function ($id) {
    return Inertia::render('UserPage', ['userId' => $id]);
})->middleware(['auth', 'verified'])->name('user');

Route::get('/post/{id}', function ($id) {
    return Inertia::render('ViewPost', ['postId' => $id]);
})->middleware(['auth', 'verified'])->name('post');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

Route::post('/comment', function (Request $request) {
    $comment = new Comment();
    $comment->content = $request->content;
    $comment->user_id = $request->userId;
    $comment->post_id = $request->postId;
    $comment->save();

    return success($comment);
})->middleware('auth');


function success(mixed $data, $code = 200, array $headers = []) {
    $headers['X-Inertia'] = 'true';

    return response()->json($data, $code, $headers);
}

function error(mixed $data, $code = 500, array $headers = []) {
    $headers['X-Inertia'] = 'true';

    return response()->json($data, $code, $headers);
}

require __DIR__.'/auth.php';
