// pages/api/auth/login.ts
import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers'
import { getIronSession } from 'iron-session';


// Helper function to generate a random state string
function generateRandomString(length: number): string {
  let text = '';
  const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  for (let i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
}

export interface Data {
  state?: string
}

export const GET = async (req: NextRequest) => {
  try {
    //expires in an hour

    const state = generateRandomString(16);

    const session = await getIronSession<Data>(cookies(), 
    { password: process.env.SESSION_SECRET || "test", 
      cookieName: "cookie.sid",
    cookieOptions: {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production', // true in production, false in development
      sameSite: "lax",
      maxAge: 3600, // Expire cookie before the session expires.
    } });

    session.state = state;

    const response = NextResponse.redirect(
      `https://accounts.spotify.com/authorize/?${new URLSearchParams({
        response_type: 'code',
        client_id: process.env.SPOTIFY_CLIENT_ID as string,
        scope: 'user-read-private user-read-email user-top-read',
        redirect_uri: `${process.env.NEXT_PUBLIC_BASE_URL}/api/auth/callback`,
        state,
        show_dialog: 'true',
      }).toString()}`
    );

    response.cookies.set('spotify_auth_state', state, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 3600,
    path: '/',
  });

    await session.save();
  
    return response;

  } catch {
    return NextResponse.json({ error: 'Internal Server Error' }, {status:500});
  }
}