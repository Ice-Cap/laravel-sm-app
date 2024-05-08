import React from 'react';

function Likes({ likes } ) {
    const likeCount = likes?.length ?? 0;
    return (
        <div className="likes">
            {likeCount} likes
        </div>
    );
}

export default Likes;