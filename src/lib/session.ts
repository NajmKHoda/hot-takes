import {jwtVerify, SignJWT} from 'jose';
import {cookies} from 'next/headers';
import {IUser, Session, User} from './database';
import {isObjectIdOrHexString} from 'mongoose';

// These constants would need to be accessible from both files
const SESSION_ISSUER = process.env.SESSION_ISSUER!;
const SESSION_DURATION = Number(process.env.SESSION_DURATION!);
const SESSION_SECRET = Uint8Array.from(process.env.SESSION_SECRET!);

interface SessionPayload {
    sessionId?: string;
}

export async function createSession(userId: string) {
    // Check if user exists
    const user = await User.exists({_id: userId});
    if (!user) return false;

    // Create new session
    const session = await Session.create({user: userId});

    // Generate random token
    const token = await new SignJWT({sessionId: session._id.toString()})
        .setProtectedHeader({alg: 'HS256'})
        .setIssuedAt()
        .setIssuer(SESSION_ISSUER)
        .setExpirationTime(`${SESSION_DURATION}s`)
        .sign(SESSION_SECRET);

    const cookieStore = await cookies();
    cookieStore.set('session', token, {
        httpOnly: true,
        sameSite: 'strict',
        maxAge: SESSION_DURATION,
    });
}

export async function getUser(): Promise<IUser | null> {
    try {
        const cookieStore = await cookies();
        const sessionCookie = cookieStore.get('session');
        if (!sessionCookie) return null;

        // Verify payload
        const {payload} = await jwtVerify(
            sessionCookie.value,
            SESSION_SECRET,
            {issuer: SESSION_ISSUER, algorithms: ['HS256']}
        );

        const {sessionId} = payload as SessionPayload;
        if (!isObjectIdOrHexString(sessionId)) return null;

        // Find the session
        const session = await Session
            .findById(sessionId)
            .populate('user')
            .lean() as any;
        return (session?.user || null) as IUser | null;
    } catch (e) {
        console.error(e);
        return null;
    }
}
