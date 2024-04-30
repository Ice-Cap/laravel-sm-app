import React, { useState, useEffect } from 'react';
import { Link } from '@inertiajs/react';
import Comment from '@/Components/post/Comment';

function Post(props) {
    const post = props.post ?? null;
    if (!post) {
        return <div>No post found</div>;
    }

    async function handleDelete() {
        axios.delete(`/api/post/${post?.postId}`).then(() => {
            window.location.reload()
        });
    }

    const ownsPost = props?.auth?.user?.id === post?.userId;
    return (
        <div className="post">
            <div className="user">
                <Link href={`/user/${post.userId}`}>{post.username}</Link>
            </div>
            <div className="content">
                <div>{post.content}</div>
            </div>
            <div className="post-links">
                {!post.comments && <Link href={`/post/${post?.postId}`}>View comments</Link>}
                {ownsPost && <button onClick={handleDelete}>Delete post</button>}
            </div>
        </div>
    );
}

export default Post;