import { cookies } from 'next/headers';
import crypto from 'crypto';

export function generateSessionId() {
    return crypto.randomBytes(32).toString('hex');
}

export async function setSessionCookie(sessiondId: string) {
    (await cookies()).set('sessionId', sessiondId, {
        httpOnly: true,
        secure: false,
        sameSite: 'lax',
        path: '/',
        maxAge: 60 * 60 * 24 * 7, // 1 week
    });
}

export async function clearSessionCookie() {
    (await cookies()).set('sessionId', '', {
        httpOnly: true,
        path: '/',
        maxAge: 0,
    });
}