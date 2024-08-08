import React from 'react'
import Link from 'next/link';

//const spotifyAuthUrl = "https://heardle.herokuapp.com/auth/login"
//const spotifyAuthUrl = 'http://localhost:5000/auth/login';

const spotifyAuthURL = process.env.AUTH_URL || '/fallback-url';

const page = () => {

  return (
    <div>
        <Link href={spotifyAuthURL}>Login with Spotify</Link> 
    </div>
  )
}

export default page;