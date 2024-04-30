import React, { useState, useEffect } from 'react';
import { Link } from '@inertiajs/react';
import Comment from '@/Components/post/Comment';

function Post(props) {

    async function handleSubmit(event) {
        event.preventDefault();
        const formData = new FormData(event.target);
        await fetch('/api/comment', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': `Bearer ${props?.auth.user.token}`
            },
            body: JSON.stringify({
                content: formData.get('content'),
                userId: props?.auth.user.id,
                postId: props?.postId
            })
        });

        props.getPost();
    }

    return (
        <>
            <div className="post">
                <div className="user">
                    <Link href={`/user/${props?.userId}`}>{props.username}</Link>
                </div>
                <div className="content">
                    <div>{props.content}</div>
                </div>
                <div className="post-links">
                    {!props.comments && <Link href={`/post/${props?.postId}`}>View comments</Link>}
                </div>
            </div>
            {props.comments && <div className="comments p-6">
                <div className="py-2">Comments:</div>
                {props.comments.map((comment) => <Comment comment={comment} key={comment.id} />)}
                <form onSubmit={handleSubmit} className="add-post-form">
                    <textarea name="content" id="content" placeholder="Add comment" />
                    <input type="submit" value="Submit"></input>
                </form>
            </div>}
        </>
    );
}

export default Post;