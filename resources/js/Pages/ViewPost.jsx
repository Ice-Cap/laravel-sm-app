import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import React, { useEffect, useState } from 'react';
import Post from '@/Components/post/Post';

export default function ViewPost({ auth }) {
    const postId = window.location.pathname.split('/').pop();
    const [post, setPost] = useState();

    useEffect(() => {
        getPost();
    }, []);

    async function getPost() {
        let result = await fetch(`/api/post/${postId}`);
        result = await result.json();
        setPost(result);
    }

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Individual Post</h2>}
        >
            <Head title="View Post" />

            <div className="py-12">
                <Post
                    comments={post?.comments}
                    key={post?.id}
                    username={post?.username}
                    content={post?.content}
                    userId={post?.user_id}
                    postId={post?.id}
                    auth={auth}
                    getPost={getPost}
                />
            </div>
        </AuthenticatedLayout>
    );
}
