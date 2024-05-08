import React from 'react';

function LikeButton(props) {
    const { hasLiked, like, unlike } = props;

    return (
        <>
            {hasLiked ? (
                <button onClick={unlike}>Unlike</button>
            ) : (
                <button onClick={like}>Like</button>
            )}
        </>
    );
}

export default LikeButton;