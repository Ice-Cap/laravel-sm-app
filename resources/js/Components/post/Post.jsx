import React, { useState, useEffect } from 'react';
import { Link, useForm } from '@inertiajs/react';
import Comment from '@/Components/post/Comment';

function Post(props) {
    const { data, setData } = useForm({
        content: '',
        postId: props?.postId,
        userId: props?.auth?.user?.id
    });

    async function handleSubmit(event) {
        event.preventDefault();

        axios.post('/api/comment', data).then(() => {
            setData('content', '');
            props.getPost();
        });
    }

    async function handleDelete() {
        axios.delete(`/api/post/${props?.postId}`).then(() => {
            window.location.reload()
        });
    }

    const ownsPost = props?.auth?.user?.id === props?.userId;
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
                    {ownsPost && <button onClick={handleDelete}>Delete post</button>}
                </div>
            </div>
            {props.comments && <div className="comments p-6">
                <div className="py-2">Comments:</div>
                {props.comments.map((comment) => <Comment comment={comment} key={comment.id} />)}
                <form onSubmit={handleSubmit} className="add-post-form">
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
        </>
    );
}

export default Post;