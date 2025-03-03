'use server';

import { redirect } from 'next/navigation';
import { IPost, Post } from '../database/post';
import { getUser } from '../session';
import { isObjectIdOrHexString } from 'mongoose';
import { Faster_One } from 'next/font/google';

export async function createDebate(title: string, summary: string, firstMessage: string) {
    const user = await getUser();
    if (!user) redirect('/');

    // Create a new Post with title, summary and the first message
    const post = await Post.create({
        title,
        summary,
        messages: [{
            senderId: user._id,
            contents: firstMessage,
            timestamp: new Date(),
            side: 'defense'
        }]
    });

    redirect(`/debate/${post._id}`)
}

export interface PopulatedDebate {
    _id: string;
    title: string;
    summary: string;
    messages: {
        senderId: {
            username: string;
        };
        contents: string;
        timestamp: Date;
        side: 'offense' | 'defense';
    }[];
    likedBy: string[];
    createdAt: Date;
    didLike: boolean;
}

export async function getDebateById(id: string) {
    if (!isObjectIdOrHexString(id)) return null;

    const postData: PopulatedDebate = await Post
        .findById(id)
        .populate({
            path: 'messages',
            populate: {
                path: 'senderId',
                select: 'username'
            }
        })
        .lean() as any;
    postData.didLike = false;

    const user = await getUser();
    if (user) {
        postData.didLike = postData.likedBy.some(x => user._id.equals(x));
    }

    return JSON.stringify(postData);
}

export async function loadDebates() {
    const posts = (await Post
        .find()
        .lean()) as unknown as (IPost & { didLike: boolean })[];
    
    const user = await getUser();
    
    // Add didLike property to each post
    const postsWithLikeInfo = posts.map(post => {
        const postWithLike = {
            ...post,
            didLike: false
        };
        
        if (user) {
            postWithLike.didLike = post.likedBy.some(id => user._id.equals(id));
        }
        
        return postWithLike;
    });

    return JSON.stringify(postsWithLikeInfo);
}