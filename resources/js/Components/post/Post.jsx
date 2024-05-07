import React from 'react';
import { Link } from '@inertiajs/react';

function Post(props) {
    const post = props.post ?? null;
    if (!post) {
        return <div>No post found</div>;
    }
    const ownsPost = props?.auth?.user?.id === post?.userId;

    function handleDelete() {
        if (!ownsPost) {
            return;
        }

        axios.delete(`/api/posts/${post?.postId}`).then(() => {
            props.refresh();
        });
    }

    function likePost() {
        axios.post(`/api/post-likes`, {postId: post.postId}).then((response) => {
            props.refresh();
        });
    }

    function unlikePost() {
        const likeId = post.likes.find(like => like.user_id === props.auth.user.id).id;
        axios.delete('/api/post-likes/' + likeId).then((response) => {
            props.refresh();
        });
    }

    const hasLikedPost = post.likes.find(like => like.user_id === props.auth.user.id);
    return (
        <div className="post">
            <div className="user">
                <Link href={`/user/${post.userId}`}>{post.username}</Link>
            </div>
            <div className="content">
                <div>{post.content}</div>
            </div>
            <div className="likes">
                {post.likes.length} likes
            </div>
            <div className="post-links">
                {!hasLikedPost && <button onClick={likePost}>Like</button>}
                {hasLikedPost && <button onClick={unlikePost}>Unlike</button>}
                {!post.comments && <Link href={`/post/${post?.postId}`}>View comments</Link>}
            </div>
            {ownsPost && <button onClick={handleDelete} className="delete-post">Delete post</button>}
        </div>
    );
}

export default Post;