'use server';

import { isObjectIdOrHexString } from 'mongoose';
import { Post } from '../database';
import { getUser } from '../session';

export async function createMessage(contents: string, postId: string, side: 'offense' | 'defense') {
    if (!isObjectIdOrHexString(postId)) return;

    const user = await getUser();
    if (!user) return;

    await Post.findByIdAndUpdate(postId, {
        $push: {
            messages: {
                senderId: user._id,
                contents,
                timestamp: new Date(),
                side
            }
        }
    });
}