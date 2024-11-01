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
    // Initialize the session to check for an access token
    const session = await getIronSession<Data>(cookies(),
        {
            password: process.env.SESSION_SECRET || "test",
            cookieName: "cookie.sid"
        });

    if (!session.access_token) {
        return NextResponse.json({ error: 'User not authenticated' }, { status: 401 });
    }

    // Define the base URL for the Spotify API and initialize the endpoint URL
    const baseUrl = 'https://api.spotify.com/v1';
    let endpointUrl;

    // Determine the Spotify API endpoint based on the `type` query parameter
    const type = req.nextUrl.searchParams.get('type');

    switch (type) {
        case 'user_profile':
            endpointUrl = `${baseUrl}/me`;
            break;
        case 'top_artists':
            endpointUrl = `${baseUrl}/me/top/artists?time_range=short_term&limit=10`;
            break;
        case 'top_tracks':
            endpointUrl = `${baseUrl}/me/top/tracks?time_range=short_term&limit=10`;
            break;
        case 'recommendation_genres':
            endpointUrl = `${baseUrl}/recommendations/available-genre-seeds`;
            break;
        default:
            return NextResponse.json({ error: 'Invalid type parameter' }, { status: 400 });
    }

    // Make the request to the Spotify API using fetch
    const response = await fetch(endpointUrl, {
        method: 'GET',
        headers: {
            Authorization: `Bearer ${session.access_token}`,
        },
    });

    try {
        // Check if the response status is OK
        if (!response.ok) {
            const errorData = await response.json();
            console.error(`Error from Spotify API:`, errorData);
            return NextResponse.json({ error: errorData}, {status: response.status});
        }

        // Parse the response data
        const data = await response.json();
        console.log(data);

        // Customize the response for specific types, if necessary
        const responseData = type === 'recommendation_genres' ? data.genres : data;
        return NextResponse.json(responseData);
    } catch (error) {
        console.error(`Error fetching ${type} data:`, error);
        return NextResponse.json({ error: 'Internal Server Error'}, {status: 500});
    }

}