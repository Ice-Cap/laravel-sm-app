import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import React, { useEffect, useState } from 'react';
import Post from '@/Components/post/Post';
import ErrorModal from '@/Components/ErrorModal';

export default function UserPage({ auth }) {
    const [errorMessage, setErrorMessage] = useState(null);
    const [userPosts, setUserPosts] = useState([]);
    const userId = window.location.pathname.split('/').pop();
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState(null);

    useEffect(() => {
        getUser();
    }, []);

    function getUser() {
        axios.get(`/api/user/${userId}`)
            .then((response) => {
                setUser(response.data);

                getPostsForUser();
            })
            .catch((error) => {
                setErrorMessage('An error occurred while fetching user');
            });

        setLoading(false);
    }

    function getPostsForUser() {
        axios.get(`/api/user/${userId}/posts`)
            .then((response) => {
                setUserPosts(response.data);
            })
            .catch((error) => {
                setErrorMessage('An error occurred while fetching user posts');
            });

        setLoading(false);
    }


    if (!user) {
        return <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">User</h2>}
        >
                <Head title="Not found" />
                {!user && <div className='not-found'>User not found</div>}
        </AuthenticatedLayout>
    }

    const username = user.name;
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">{username}</h2>}
        >
            <Head title="User" />

            <div className="py-6">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <h2 className="feed-heading">
                        {username}'s posts:
                    </h2>
                    {loading && <div className='loading'>Loading...</div>}

                    {!loading && userPosts.map((post) => {
                        post.userId = post.user_id;
                        post.postId = post.id;
                        return <Post
                            key={post.id}
                            post={post}
                            auth={auth}
                            refresh={getPostsForUser}
                            showCommentLink={true}
                        />
                    })}
                </div>
            </div>

            <ErrorModal
                message={errorMessage}
                show={errorMessage}
                close={() => setErrorMessage(null)}
                timeout={false}
            />
        </AuthenticatedLayout>
    );
}
