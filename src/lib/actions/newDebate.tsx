'use server';

import { redirect } from 'next/navigation';
import { Post } from '../database/post';
import { getUser } from '../session';

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
            timestamp: new Date()
        }]
    });

    redirect(`/debate/${post._id}`)
}