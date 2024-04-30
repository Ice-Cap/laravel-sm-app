import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm } from '@inertiajs/react';
import React, { useEffect, useState } from 'react';
import Post from '@/Components/post/Post';
import Comment from '@/Components/post/Comment';

export default function ViewPost({ auth }) {
    const postId = window.location.pathname.split('/').pop();
    const [post, setPost] = useState();
    const { data, setData } = useForm({
        content: '',
        postId: postId,
        userId: auth?.user?.id
    });

    useEffect(() => {
        getPost();
    }, []);

    async function getPost() {
        let result = await fetch(`/api/post/${postId}`);
        result = await result.json();
        setPost(result);
    }

    async function addComment(event) {
        event.preventDefault();

        axios.post('/api/comment', data).then(() => {
            setData('content', '');
            getPost();
        });
    }

    if (post) {
        post.postId = post.id;
    }
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Individual Post</h2>}
        >
            <Head title="View Post" />

            <div className="py-12">
                <Post
                    post={post}
                    auth={auth}
                    getPost={getPost}
                />
                {post?.comments && <div className="comments p-6">
                <div className="py-2">Comments:</div>
                {post?.comments.map((comment) => <Comment comment={comment} key={comment.id} />)}
                <form onSubmit={addComment} className="add-post-form">
                    <textarea
                        name="content"
                        id="content"
                        placeholder="Add comment"
                        value={data.content}
                        onChange={(e) => setData('content', e.target.value)}
                    />
                    <input type="submit" value="Submit"></input>
                </form>
            </div>}
            </div>
        </AuthenticatedLayout>
    );
}
