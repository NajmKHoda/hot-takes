'use server';

import {redirect} from 'next/navigation';
import {Post} from '../database/post';
import {getUser} from '../session';

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

export async function loadDebates() {
    return JSON.stringify(await Post.find().lean() as Post[]);
}

export async function loadDebate(id: string) {
    if (!id || id.length != 24) return null;
    return JSON.stringify(await Post.findById(id).lean() as Post);
}