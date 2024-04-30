import React, { useState, useEffect } from 'react';
import { Link } from '@inertiajs/react';

function Comment(props) {

    return (
        <div key={props.comment.id} className="comment">
            <div className="user">
                <Link href={`/user/${props.comment.user_id}`}>{props.comment?.username}</Link>
            </div>
            <div className="content">
                {props.comment.content}
            </div>
        </div>
    );
}

export default Comment;