"use client"
import React from 'react';
import ProfilePhoto from './shared/ProfilePhoto';
import { useUser } from '@clerk/nextjs';
import { Button } from './ui/button';
import { Trash2 } from 'lucide-react';
import { Badge } from './ui/badge';
import PostContent from './PostContent';
import SocialOptions from './SocialOptions';
import ReactTimeago from "react-timeago";
import { IPostDocument } from '@/models/post.model';
import { deletePostAction } from '@/lib/serveractions';

const Post = ({ post }: { post: IPostDocument }) => {
    const { user } = useUser();
    const fullName = post?.user?.firstName + " " + post?.user?.lastName;
    const loggedInUser = user?.id === post?.user?.userId;

    const handleDeletePost = () => {
        if (typeof post._id === 'string') {
            deletePostAction(post._id);
        } else {
            console.error("Post ID is not a string:", post._id);
        }
    };

    return (
        <div className='bg-white my-2 mx-2 md:mx-0 rounded-lg border border-gray-300'>
            <div className='flex gap-2 p-4'>
                <ProfilePhoto src={post?.user?.profilePhoto!} />
                <div className='flex items-center justify-between w-full'>
                    <div>
                        <h1 className='text-sm font-bold'>{fullName}<Badge variant={'secondary'} className='ml-2'>You</Badge></h1>
                        <p className='text-xs text-gray-500'>@{user ? user?.username : "username"}</p>
                        <p className='text-xs text-gray-500'>
                            <ReactTimeago date={new Date(post.createdAt)} />
                        </p>
                    </div>
                    <div>
                        {loggedInUser && (
                            <Button onClick={handleDeletePost} size={'icon'} className='rounded-full' variant={'outline'}>
                                <Trash2 />
                            </Button>
                        )}
                    </div>
                </div>
            </div>
            <PostContent post={post} />
            <SocialOptions post={post} />
        </div>
    );
}

export default Post;
