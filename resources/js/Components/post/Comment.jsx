import React, { useState, useEffect } from 'react';
import { Link } from '@inertiajs/react';

function Comment(props) {
    const ownsComment = props?.auth?.user?.id === props.comment?.user_id;

    async function handleDelete() {
        if (!ownsComment) {
            return;
        }

        axios.delete(`/api/comments/${props.comment.id}`).then(() => {
            props.getPost();
        });
    }

    return (
        <div key={props.comment.id} className="comment">
            <div className="user">
                <Link href={`/user/${props.comment.user_id}`}>{props.comment?.username}</Link>
            </div>
            <div className="content">
                {props.comment.content}
            </div>
            <div className="post-links">
                {ownsComment && <button onClick={handleDelete}>Delete comment</button>}
            </div>
        </div>
    );
}

export default Comment;