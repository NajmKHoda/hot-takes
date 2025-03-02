'use server';

import bcrypt from 'bcrypt'
import { User } from './database';
import { createSession } from './session';
import { redirect } from 'next/navigation';

const PWD_SALT_ROUNDS = Number(process.env.PWD_SALT_ROUNDS!);

export async function handleLogin(username: string, password: string) {
    try {
        const user = await User
            .findOne({ username })
            .select('password')
            .lean() as any;
        if (!user) return 'invalid-credentials';
        
        const passwordsMatch = await bcrypt.compare(password, user.password);
        if (!passwordsMatch) return 'invalid-credentials';
        
        await createSession(user._id.toString());
    } catch(e) {
        console.error(e);
        return 'server-error';
    }

    redirect('/home');
}

export async function handleSignup(username: string, password: string, email: string) {
    try {
        const existingUsername = await User.exists({ username });
        if (existingUsername) return 'username-taken';

        const existingEmail = await User.exists({ email });
        if (existingEmail) return 'email-taken';
        
        // Hash the password
        const hashedPassword = await bcrypt.hash(password, PWD_SALT_ROUNDS);
        
        // Create new user
        const newUser = await User.create({
            username,
            password: hashedPassword,
            email
        });
        
        // Create session for new user
        await createSession(newUser._id.toString());
    } catch(e) {
        console.error(e);
        return 'server-error';
    }

    redirect('/home');
}