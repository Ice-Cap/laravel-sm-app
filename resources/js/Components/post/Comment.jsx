import React, { useState, useEffect } from 'react';
import { Link } from '@inertiajs/react';

function Comment(props) {
    const comment = props.comment;

    const ownsComment = props?.auth?.user?.id === props.comment?.user_id;

    function handleDelete() {
        if (!ownsComment) {
            return;
        }

        axios.delete(`/api/comments/${props.comment.id}`).then(() => {
            props.refresh();
        });
    }

    function likeComment() {
        axios.post(`/api/comment-likes`, {commentId: props.comment.id}).then((response) => {
            props.refresh();
        });
    }

    function unlikeComment() {
        const likeId = props.comment.likes.find(like => like.user_id === props.auth.user.id).id;
        axios.delete('/api/comment-likes/' + likeId).then((response) => {
            props.refresh();
        });
    }

    const hasLikedComment = comment?.likes?.find(like => like.user_id === props.auth.user.id);
    return (
        <div key={props.comment.id} className="comment">
            <div className="user">
                <Link href={`/user/${props.comment.user_id}`}>{props.comment?.username}</Link>
            </div>
            <div className="content">
                {props.comment.content}
            </div>
            <div className="likes">
                {comment.likes.length} likes
            </div>
            <div className="post-links">
                {!hasLikedComment && <button onClick={likeComment}>Like</button>}
                {hasLikedComment && <button onClick={unlikeComment}>Unlike</button>}
            </div>
            {ownsComment && <button className="delete-post" onClick={handleDelete}>Delete comment</button>}
        </div>
    );
}

export default Comment;