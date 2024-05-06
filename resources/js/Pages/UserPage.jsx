import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import React, { useEffect, useState } from 'react';
import Post from '@/Components/post/Post';

export default function UserPage({ auth }) {
    const [userPosts, setUserPosts] = useState([]);
    const userId = window.location.pathname.split('/').pop();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getPostsForUser();
    }, []);

    async function getPostsForUser() {
        let result = await fetch(`/api/user/${userId}/posts`);
        if (result.ok) {
            result = await result.json();
        } else {
            result = [];
        }

        setUserPosts(result);

        setLoading(false);
    }

    const username = userPosts[0]?.username || 'User';
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">User: {username}</h2>}
        >
            <Head title="User" />

            <div className="py-6">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <h2 className="feed-heading">
                        {username}'s posts:
                    </h2>
                    {loading && <div className='loading'>Loading...</div>}

                    {!loading && userPosts.map((post) => {
                        post.userId = post.user_id;
                        post.postId = post.id;
                        return <Post
                            key={post.id}
                            post={post}
                            auth={auth}
                        />
                    })}
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
