import React from 'react'
import Link from 'next/link';
import path from 'path';
//const spotifyAuthUrl = 'http://localhost:5000/auth/login';
const spotifyAuthURL = process.env.AUTH_URL || '/fallback-url';


const spotifyLogin = path.join(spotifyAuthURL, "auth/login");

const page = () => {

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-green-400 to-blue-500">
      <div className="bg-white p-10 rounded-lg shadow-lg max-w-md w-full text-center">
        <h1 className="text-4xl font-bold mb-6 text-gray-800">Welcome to Heardle</h1>
        <p className="text-gray-600 mb-6">Sign in with Spotify to start your journey.</p>
        <Link href={spotifyLogin}>
          <a className="bg-green-500 text-white py-3 px-6 rounded-full shadow-md hover:bg-green-600 transition duration-300">
            Login with Spotify
          </a>
        </Link>
      </div>
    </div>
  )
}

export default page;