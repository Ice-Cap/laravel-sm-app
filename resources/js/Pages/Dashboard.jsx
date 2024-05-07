import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm } from '@inertiajs/react';
import React, { useEffect, useState } from 'react';
import Post from '@/Components/post/Post';

export default function Dashboard({ auth }) {
    const [posts, setPosts] = useState([]);
    const { data, setData } = useForm({
        content: '',
        userId: auth?.user?.id
    });

    function addPost(event) {
        event.preventDefault();

        if (!data.content) {
            return;
        }

        axios.post('/api/posts', data)
            .then(() => {
                setData('content', '');
                fetchAllPosts();
            });
    }

    useEffect(() => {
        fetchAllPosts();
    }, []);

    async function fetchAllPosts() {
        let result = await fetch('/api/posts');
        result = await result.json();
        setPosts(result);
    }

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Dashboard</h2>}
        >
            <Head title="Dashboard" />

            <div className="py-8">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="post-form-container overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="heading">Add post</div>
                        <form onSubmit={addPost} className="add-post-form">
                            <textarea
                                name="content"
                                id="content"
                                placeholder="Content"
                                value={data.content}
                                onChange={(e) => setData('content', e.target.value)}
                            />
                            <input type="submit" value="Submit"></input>
                        </form>
                    </div>
                </div>
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <h2 className="feed-heading">
                        Feed:
                    </h2>
                    {posts.map((post) => {
                        post.userId = post.user_id;
                        post.postId = post.id;
                        return <Post
                            key={post.id}
                            post={post}
                            auth={auth}
                            refresh={fetchAllPosts}
                        />
                    }
                    )}
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
