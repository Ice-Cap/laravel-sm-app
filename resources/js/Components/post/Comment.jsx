import React, { useState } from 'react';
import { Link } from '@inertiajs/react';
import ErrorModal from '@/Components/ErrorModal';
import LikeButton from '@/Components/post/LikeButton';
import Likes from '@/Components/post/Likes';

function Comment(props) {
    const [errorMessage, setErrorMessage] = useState(null);

    const comment = props.comment;
    const ownsComment = props?.auth?.user?.id === comment?.user_id;

    function deleteComment() {
        if (!ownsComment) {
            return;
        }

        axios.delete(`/api/comments/${comment.id}`)
            .then(() => {
                props.refresh();
            })
            .catch((error) => {
                error = error?.response?.data?.message || 'An error occurred';
                setErrorMessage(error);
            });
    }

    function likeComment() {
        axios.post(`/api/comment-likes`, {commentId: comment.id})
            .then((response) => {
                props.refresh();
            })
            .catch((error) => {
                error = error?.response?.data?.message || 'An error occurred';
                setErrorMessage(error);
            });
    }

    function unlikeComment() {
        const likeId = comment?.likes?.find(like => like.user_id === props.auth.user.id).id;
        axios.delete('/api/comment-likes/' + likeId)
            .then((response) => {
                props.refresh();
            })
            .catch((error) => {
                error = error?.response?.data?.message || 'An error occurred';
                setErrorMessage(error);
            });
    }

    const hasLikedComment = comment?.likes?.find(like => like.user_id === props.auth.user.id);
    return (
        <div key={comment.id} className="comment">
            <div className="user">
                <Link href={`/user/${comment.user_id}`}>{comment?.username}</Link>
            </div>
            <div className="content">
                {comment.content}
            </div>
            <Likes likes={comment?.likes} />
            <div className="post-links">
                <LikeButton
                    hasLiked={hasLikedComment}
                    like={likeComment}
                    unlike={unlikeComment}
                />
            </div>
            {ownsComment && <button className="delete-post" onClick={deleteComment}>Delete comment</button>}

            <ErrorModal show={errorMessage} message={errorMessage} close={() => setErrorMessage(null)} />
        </div>
    );
}

export default Comment;