import { createCookieSessionStorage } from '@remix-run/node';

const sessionSecret: string | undefined = process.env.SESSION_SECRET;
if (sessionSecret === undefined) {
  throw new Error('`SESSION_SECRET` is required.');
}

export const sessionStorage = createCookieSessionStorage({
  cookie: {
    name: 'remix_sample_session',
    sameSite: 'lax',
    path: '/',
    httpOnly: true,
    secrets: [sessionSecret],
    secure: process.env.NODE_ENV === 'production',
    maxAge: 60 * 60 * 24,
  },
});

export const { getSession, commitSession, destroySession } = sessionStorage;
