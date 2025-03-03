'use server';

import { redirect } from 'next/navigation';
import { Post } from '../database/post';
import { getUser } from '../session';
import { isObjectIdOrHexString } from 'mongoose';

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
            side: 'offense'
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
}

export async function getDebateById(id: string) {
    if (!isObjectIdOrHexString(id)) return null;

    return JSON.stringify(await Post
        .findById(id)
        .populate({
            path: 'messages',
            select: 'senderId contents timestamp side',
            populate: {
                path: 'senderId',
                select: 'username'
            }
        })
        .lean());
}