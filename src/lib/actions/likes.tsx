'use server';

import { redirect } from 'next/navigation';
import { getUser } from '@/lib/session';
import { Post } from '../database/post';

export async function likePost(postId: string) {
    const user = await getUser();
    if (!user) redirect('/');

    await Post.findByIdAndUpdate(
      postId,
      { $addToSet: { likedBy: user._id } }
    );
}

export async function unlikePost(postId: string) {
    const user = await getUser();
    if (!user) redirect('/');

    await Post.findByIdAndUpdate(
      postId,
      { $pull: { likedBy: user._id } }
    );
}
