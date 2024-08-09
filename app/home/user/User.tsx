import React from 'react';
import Image from 'next/image';

interface userProfile {
    display_name: string;
    external_urls: {
      spotify: string;
    };
    href: string;
    id: string;
    images: Array<{ url: string; height?: number; width?: number }>;
    type: string;
    uri: string;
    followers: {
      href: string | null;
      total: number;
    };
    country: string;
    product: string;
    explicit_content: {
      filter_enabled: boolean;
      filter_locked: boolean;
    };
    email: string;
}

interface userArtists {
    external_urls: { spotify: string };
    followers: { href: string | null; total: number };
    genres: string[];
    href: string;
    id: string;
    images: { height: number; url: string; width: number }[];
    name: string;
    popularity: number;
    type: string;
    uri: string;
}

interface userTracks {
    name: string;
    album: {
        artists: {
            external_urls: {
              spotify: string;
            };
            href: string;
            id: string;
            name: string;
            type: string;
            uri: string;
          };
    images: {
      height: number;
      url: string;
      width: number;
    }[];
    name: string;
    };
    external_urls: {
      spotify: string;
    };
}

//const spotifyAuthUrl = 'http://localhost:5000/';

const spotifyAuthURL = process.env.AUTH_URL || '/fallback-url';
const api = spotifyAuthURL + "auth/token";


const User: React.FC = async () => {

  
    const res = await fetch(api);
    const res_data = await res.json();
    const token = res_data.access_token;

    
    // Fetch user data using the token
    const userRes = await fetch('https://api.spotify.com/v1/me', {
        headers: {
        Authorization: `Bearer ${token}`,
        },
    });
    const profileData: userProfile = await userRes.json();

    //Fetch top artists for user
    const artistsRes = await fetch('https://api.spotify.com/v1/me/top/artists?time_range=short_term&limit=10', {
        headers: {
        Authorization: `Bearer ${token}`,
        },
    });
    const topArtists = await artistsRes.json();

    //Fetch top tracks for user
    const tracksRes = await fetch('https://api.spotify.com/v1/me/top/tracks?time_range=short_term&limit=10', {
        headers: {
        Authorization: `Bearer ${token}`,
        },
    });
    const topTracks = await tracksRes.json();


    return (
      <div className="bg-slate-900 p-6 min-h-screen flex flex-col items-center">
      
      <div className="bg-white rounded-2xl p-6 shadow-lg mb-8 w-full max-w-4xl flex flex-col md:flex-row items-center">
        <Image
          className="rounded-full shadow-md"
          src={profileData.images && profileData.images.length > 0 ? profileData.images[0].url : '/default_user_icon.jpg'}
          alt={profileData.display_name}
          width={200}
          height={200}
        />
        <div className="flex flex-col text-center md:text-left md:ml-6 mt-4 md:mt-0">
          <p className="md:text-4xl text-2xl font-semibold text-gray-800">{profileData.display_name}</p>
          <p className="text-gray-600 mt-2">Followers: {profileData.followers.total.toLocaleString()}</p>
          <a
            href={profileData.external_urls.spotify}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 hover:underline mt-3 text-lg"
          >
            View on Spotify
          </a>
        </div>
      </div>

      <div className="flex flex-col md:flex-row justify-center w-full max-w-5xl gap-8">
        
        <div className="bg-slate-700 rounded-2xl p-6 w-full md:w-1/2 shadow-lg">
          <h2 className="text-3xl text-indigo-200 font-bold mb-4 border-b-4 border-indigo-400 pb-2 text-center">Top Artists</h2>
          <table className="w-full">
            <tbody>
              {topArtists.items.map((artist: userArtists, index: number) => (
                <tr key={index} className="text-white hover:bg-slate-800 transition">
                  <td className="p-2">
                    <Image
                      className="rounded-full"
                      src={artist.images.length > 0 ? artist.images[2].url : '/default_user_icon.jpg'}
                      alt={artist.name}
                      width={50}
                      height={50}
                    />
                  </td>
                  <td className="p-2">
                    <a
                      href={artist.external_urls.spotify}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-blue-400"
                    >
                      {artist.name}
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="bg-slate-700 rounded-2xl p-6 w-full md:w-1/2 shadow-lg">
          <h2 className="text-3xl text-indigo-200 font-bold mb-4 border-b-4 border-indigo-400 pb-2 text-center">Top Songs</h2>
          <table className="w-full">
            <tbody>
              {topTracks.items.map((track: userTracks, index: number) => (
                <tr key={index} className="text-white hover:bg-slate-800 transition">
                  <td className="p-2">
                    <Image
                      className="rounded-md"
                      src={track.album.images.length > 0 ? track.album.images[0].url : '/default_user_icon.jpg'}
                      alt={track.album.artists.name}
                      width={50}
                      height={50}
                    />
                  </td>
                  <td className="p-2">
                    <a
                      href={track.external_urls.spotify}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-blue-400"
                    >
                      {track.name}
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

      </div>

    </div>
    );
}


export default User;