import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import React, { useEffect, useState } from 'react';
import Post from '@/Components/post/Post';

export default function UserPage({ auth }) {
    const [userPosts, setUserPosts] = useState([]);
    const userId = window.location.pathname.split('/').pop();
    const [user, setUser] = useState();

    useEffect(() => {
        getUser();
        getPostsForUser();
    }, []);

    async function getPostsForUser() {
        let result = await fetch(`/api/user/${userId}/posts`);
        result = await result.json();
        setUserPosts(result);
    }

    async function getUser() {
        let result = await fetch(`/api/user/${userId}`);
        result = await result.json();
        setUser(result);
    }

    const username = userPosts[0]?.username || 'User';
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">User: {username}</h2>}
        >
            <Head title="User" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <h2 className="feed-heading">
                        {username}'s posts:
                    </h2>
                    {userPosts.map((post) => <Post
                        key={post.id}
                        username={post.username}
                        content={post.content}
                        userId={post.user_id}
                        postId={post.id}
                    />)}
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
