'use server';

import { User } from '../database';
import { getUser } from '../session';

export default async function updateUser(username: string, email: string, bio: string) {
    const user = await getUser();
    if (!user) return;

    await User.updateOne({ _id: user._id }, { username, email, bio });
}