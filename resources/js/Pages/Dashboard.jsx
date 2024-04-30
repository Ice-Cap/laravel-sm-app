import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import React, { useEffect, useState } from 'react';
import Post from '@/Components/post/Post';

export default function Dashboard({ auth }) {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        fetchAllPosts();
    }, []);

    async function fetchAllPosts() {
        let result = await fetch('/api/posts');
        result = await result.json();
        setPosts(result);
    }

    async function handleSubmit(event) {
        event.preventDefault();
        const formData = new FormData(event.target);
        await fetch('/api/posts', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': `Bearer ${auth.user.token}`
            },
            body: JSON.stringify({
                content: formData.get('content'),
                userId: auth.user.id
            })
        });
        fetchAllPosts();
    }

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Dashboard</h2>}
        >
            <Head title="Dashboard" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="heading">Add post</div>
                        <form onSubmit={handleSubmit} className="add-post-form">
                            <textarea name="content" id="content" placeholder="Content" />
                            <input type="submit" value="Submit"></input>
                        </form>
                    </div>
                </div>
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <h2 className="feed-heading">
                        Feed:
                    </h2>
                    {posts.map((post) => <Post
                        key={post.id}
                        username={post.name}
                        content={post.content}
                        userId={post.user_id}
                        postId={post.id}
                    />)}
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
