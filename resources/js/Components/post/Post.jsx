import React, { useState } from 'react';
import { Link } from '@inertiajs/react';
import ErrorModal from '@/Components/ErrorModal';
import LikeButton from '@/Components/post/LikeButton';

function Post(props) {
    const [errorMessage, setErrorMessage] = useState(null);

    const post = props.post ?? null;
    if (!post) {
        return <div className="not-found">No post found</div>;
    }

    const ownsPost = props?.auth?.user?.id === post?.userId;

    function deletePost() {
        if (!ownsPost) {
            return;
        }

        axios.delete(`/api/posts/${post?.postId}`)
            .then((response) => {
                props.refresh();
            })
            .catch((error) => {
                error = error?.response?.data?.message || 'An error occurred';
                setErrorMessage(error);
            });
    }

    function likePost() {
        axios.post(`/api/post-likes`, {postId: post.postId})
            .then((response) => {
                props.refresh();
            })
            .catch((error) => {
                error = error?.response?.data?.message || 'An error occurred';
                setErrorMessage(error);
            });
    }

    function unlikePost() {
        const likeId = post.likes.find(like => like.user_id === props.auth.user.id).id;
        axios.delete('/api/post-likes/' + likeId)
            .then((response) => {
                props.refresh();
            })
            .catch((error) => {
                error = error?.response?.data?.message || 'An error occurred';
                setErrorMessage(error);
            });
    }

    const hasLikedPost = post?.likes?.find(like => like.user_id === props.auth.user.id);
    return (
        <div className="post">
            <div className="user">
                <Link href={`/user/${post.userId}`}>{post.username}</Link>
            </div>
            <div className="content">
                <div>{post.content}</div>
            </div>
            <div className="likes">
                {post?.likes?.length} likes
            </div>
            <div className="post-links">
                <LikeButton
                    hasLiked={hasLikedPost}
                    like={likePost}
                    unlike={unlikePost}
                />
                {!post.comments && <Link href={`/post/${post?.postId}`}>View comments</Link>}
            </div>
            {ownsPost && <button onClick={deletePost} className="delete-post">Delete post</button>}
            <ErrorModal show={errorMessage} message={errorMessage} close={() => setErrorMessage(null)} />
        </div>
    );
}

export default Post;