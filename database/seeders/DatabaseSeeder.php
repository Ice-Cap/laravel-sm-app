<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\User;
use App\Models\Post;
use App\Models\Comment;
use App\Models\PostLike;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $users = User::factory()
            ->count(5)
            ->hasPosts(3)
            ->create();

        /**
         * Iterating through all users and creating comments/likes for each post
         * with a random owner.
         */
        for ($i = 0; $i < count($users); $i++) {
            $user = $users[$i];

            foreach ($user->posts as $post) {
                $randomUser = $users[rand(0, count($users) - 1)];

                Comment::factory()
                    ->count(1)
                    ->for($post)
                    ->for($randomUser)
                    ->create();

                $randomPost = $user->posts[rand(0, 2)];
                PostLike::factory()
                    ->count(1)
                    ->for($randomPost)
                    ->for($randomUser)
                    ->create();
            }
        }
    }
}
