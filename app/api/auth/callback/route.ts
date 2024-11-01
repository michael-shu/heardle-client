// pages/api/auth/callback.ts
import { NextRequest, NextResponse } from 'next/server';
import { getIronSession } from 'iron-session';
import { cookies } from 'next/headers';

export interface Data {
  state?: string
  access_token?: string
  expires_in: Date
  refresh_token?: string
}


export const GET = async (req: NextRequest) => {
  //console.log(req.nextUrl.searchParams);
  let code = req.nextUrl.searchParams.get('code');


  const state = req.nextUrl.searchParams.get('state');

  const cookieStore = cookies();
  const storedState = cookieStore.get('spotify_auth_state')?.value;

  if (storedState !== state) {
    return NextResponse.json({ error: 'State mismatch' }, { status: 400 });
  }

  if (!code) {
    return NextResponse.json({ error: 'Auth code is missing' }, { status: 500 });
  }

  const bodyData = new URLSearchParams({
    code: code,
    redirect_uri: `${process.env.BASE_URL}api/auth/callback`,
    grant_type: 'authorization_code',
  }).toString();


  try {
    const response = await fetch('https://accounts.spotify.com/api/token', {
      method: 'POST',
      headers: {
        Authorization: 'Basic ' + Buffer.from(`${process.env.SPOTIFY_CLIENT_ID}:${process.env.SPOTIFY_CLIENT_SECRET}`).toString('base64'),
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: bodyData.toString(), // Pass URL-encoded data as body
    });

    if (response.ok) {
      const data = await response.json();
      console.log('Token data:', data);

      const session = await getIronSession<Data>(cookies(),
        {
          password: process.env.SESSION_SECRET || "test",
          cookieName: "cookie.sid",
          cookieOptions: {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production', // true in production, false in development
            maxAge: 3600, // Expire cookie before the session expires.
          }
        });

      session.access_token = data.access_token;
      session.refresh_token = data.refresh_token;
      session.expires_in = new Date(Date.now() + (3600 * 1000));

      await session.save();

      console.info("session", session);

      return NextResponse.redirect(process.env.BASE_URL + "home");

    } else {
      console.error('Failed to fetch token:', response.statusText);
      throw new Error(`Error: ${response.status}`);
    }
  } catch (error) {
    console.error('Token exchange error:', error);
    throw error;
  }


}