import React from 'react';
import { Link } from '@inertiajs/react';

function Post(props) {
    const post = props.post ?? null;
    if (!post) {
        return <div>No post found</div>;
    }
    const ownsPost = props?.auth?.user?.id === post?.userId;

    async function handleDelete() {
        if (!ownsPost) {
            return;
        }

        axios.delete(`/api/posts/${post?.postId}`).then(() => {
            props.refresh();
        });
    }

    async function likePost() {
        axios.post(`/api/post-likes`, {postId: post.postId}).then((response) => {
            props.refresh();
        });
    }

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
                {!post.comments && <Link href={`/post/${post?.postId}`}>View comments</Link>}
                <button onClick={likePost}>Like</button>
                {ownsPost && <button onClick={handleDelete}>Delete post</button>}
            </div>
        </div>
    );
}

export default Post;