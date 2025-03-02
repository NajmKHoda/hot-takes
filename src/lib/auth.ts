'use server';

import bcrypt from 'bcrypt'
import { User } from './database';
import { createSession, getUser } from './session';

const PWD_SALT_ROUNDS = Number(process.env.PWD_SALT_ROUNDS!);

export async function handleLogin(username: string, password: string) {
    const user = await User
        .findOne({ username })
        .select('password')
        .lean();
    if (!user) return;
    
    const passwordsMatch = await bcrypt.compare(password, user.password);
    if (!passwordsMatch) return;
    
    await createSession(user._id.toString());
}

export async function handleSignup(username: string, password: string, email: string) {
    const existingUser = await User.exists({ 
        $or: [{ username }, { email }]
    });
    if (existingUser) return;
    
    // Hash the password
    const hashedPassword = await bcrypt.hash(password, PWD_SALT_ROUNDS);
    
    // Create new user
    const newUser = await User.create({
        username,
        password: hashedPassword,
        email,
    });
    
    // Create session for new user
    await createSession(newUser._id.toString());
}

