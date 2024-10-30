import React from 'react';
import Navbar from './Navbar';
import Link from 'next/link';
import { cookies } from 'next/headers';

const spotifyAuthURL = process.env.AUTH_URL || 'http://localhost:5000/';


const page = async () => {
  console.log("These are the user cookies, ", cookies().toString());
  /*
  console.log("This is the url we're headed to " + spotifyAuthURL + "test-session")

  
  const test = await fetch(spotifyAuthURL + "test-session", {
    cache: 'no-cache',
    headers: { Cookie: cookies().toString() },
    credentials: 'include'
  });
  const data = await test.json();
  console.log("Heres the data");
  console.log(data);*/

  console.log("This is the url we're headed to " + spotifyAuthURL + "test-cookie")

  
  const test = await fetch(spotifyAuthURL + "test-cookie", {
    headers: { Cookie: cookies().toString() },
    credentials: 'include'
  });
  const data = await test.json();
  console.log("Heres the data");
  console.log(data);
  console.log("heres the user cookies");
  console.log(cookies().toString());

  return (
    <div className="min-h-screen bg-gradient-to-r from-green-400 to-blue-500 text-white">
      <Navbar />

      <div className="container mx-auto px-4 py-12">
        <section className="text-center mb-16">
          Heres the user cookies:
          {cookies.toString()}
          <h1 className="text-4xl font-bold mb-4">Welcome to Heardle</h1>
          <p className="text-lg">
            Discover your favorite tunes, track your listening habits, and dive deep into the world of music with Heardle.
          </p>
        </section>

        <section className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <div className="bg-white bg-opacity-20 p-6 rounded-lg shadow-lg hover:bg-opacity-30 transition">
            <h2 className="text-2xl font-semibold mb-2">Explore Your Music</h2>
            <p className="mb-4">
              View your top artists, songs, and more. Customize your experience with personalized playlists.
            </p>
            <Link className="bg-emerald-600 hover:bg-emerald-800 text-white py-2 px-4 rounded-full transition" href="/home/user">
                View Your Profile
            </Link>
          </div>

          <div className="bg-white bg-opacity-20 p-6 rounded-lg shadow-lg hover:bg-opacity-30 transition">
            <h2 className="text-2xl font-semibold mb-2">Play a Game</h2>
            <p className="mb-4">
              How well do you know your own tastes
            </p>
            <Link className="bg-blue-600 hover:bg-blue-800 text-white py-2 px-4 rounded-full transition" href="/home/play">
                Start Playing
            </Link>
          </div>

          <div className="bg-white bg-opacity-20 p-6 rounded-lg shadow-lg hover:bg-opacity-30 transition">
            <h2 className="text-2xl font-semibold mb-2">Learn More About Us</h2>
            <p className="mb-4">
              Curious about the people behind Heardle? Get to know our story and what drives us.
            </p>
            <Link className="bg-purple-600 hover:bg-purple-800 text-white py-2 px-4 rounded-full transition" href="/home/about">
                About Us
            </Link>
          </div>
        </section>
      </div>

      <footer className="text-center py-6">
        <p className="text-sm">&copy; 2024 Heardle. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default page;
