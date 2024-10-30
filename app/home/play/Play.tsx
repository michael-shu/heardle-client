'use client';
import React, { useState } from 'react';

const Play = async () => {
    const genres: Record<string, string> = {
        "Pop": "pop",
        "Hip Hop": "hip-hop",
        "Rock": "rock",
        "R&B": "r-n-b",
        "EDM": "edm",
        "Dance": "dance",
        "Latin": "latin",
        "K-Pop": "k-pop",
        "Indie Pop": "indie-pop",
        "Reggaeton": "reggaeton",
        "Jazz": "jazz",
        "Country": "country",
        "House": "house",
        "Reggae": "reggae",
        "Disco": "disco",
        "Soul": "soul",
        "Hard Rock": "hard-rock",
        "Alternative": "alternative",
        "Indie": "indie",
        "Techno": "techno",
        "Punk Rock": "punk-rock",
        "Trance": "trance",
        "Metal": "metal",
        "Pop Film": "pop-film",
        "Electronic": "electronic",
        "Dubstep": "dubstep",
        "Alt Rock": "alt-rock",
        "Dancehall": "dancehall",
        "Deep House": "deep-house",
        "Chill": "chill",
        "Emo": "emo",
        "Blues": "blues",
        "Classical": "classical",
        "Folk": "folk",
        "Anime": "anime",
        "Electro": "electro",
        "Brazil": "brazil",
        "Forró": "forro",
        "Bossa Nova": "bossanova",
        "Black Metal": "black-metal",
        "Club": "club",
        "Drum and Bass": "drum-and-bass",
        "Grunge": "grunge",
        "French": "french",
        "Garage": "garage",
        "Detroit Techno": "detroit-techno",
        "Acoustic": "acoustic",
        "Afrobeat": "afrobeat",
        "Death Metal": "death-metal",
        "Disney": "disney",
        "British": "british",
        "Cantopop": "cantopop",
        "Comedy": "comedy",
        "Chicago House": "chicago-house",
        "Bluegrass": "bluegrass",
        "J-Pop": "j-pop",
        "Heavy Metal": "heavy-metal",
        "Funk": "funk",
        "Hardcore": "hardcore",
        "Gospel": "gospel",
        "Goth": "goth",
        "Hardstyle": "hardstyle",
        "Dub": "dub",
        "Groove": "groove",
        "IDM": "idm",
        "German": "german",
        "Guitar": "guitar",
        "Ambient": "ambient",
        "Holidays": "holidays",
        "Happy": "happy",
        "Children": "children",
        "Grindcore": "grindcore",
        "Breakbeat": "breakbeat",
        "Latino": "latino",
        "J-Rock": "j-rock",
        "Mandopop": "mandopop",
        "Metalcore": "metalcore",
        "Punk": "punk",
        "Movies": "movies",
        "J-Idol": "j-idol",
        "Indian": "indian",
        "Industrial": "industrial",
        "Minimal Techno": "minimal-techno",
        "Metal Misc": "metal-misc",
        "J-Dance": "j-dance",
        "Kids": "kids",
        "Party": "party",
        "Progressive House": "progressive-house",
        "Rock 'n' Roll": "rock-n-roll",
        "New Release": "new-release",
        "Power Pop": "power-pop",
        "Psych Rock": "psych-rock",
        "MPB": "mpb",
        "Pagode": "pagode",
        "Philippines OPM": "philippines-opm",
        "Post Dubstep": "post-dubstep",
        "Synth Pop": "synth-pop",
        "Salsa": "salsa",
        "Samba": "samba",
        "Singer-Songwriter": "singer-songwriter",
        "Soundtracks": "soundtracks",
        "Work Out": "work-out",
        "World Music": "world-music",
        "Spanish": "spanish",
        "Ska": "ska",
        "Piano": "piano",
        "New Age": "new-age",
        "Opera": "opera",
        "Romance": "romance",
        "Rainy Day": "rainy-day",
        "Road Trip": "road-trip",
        "Rockabilly": "rockabilly",
        "Honky-Tonk": "honky-tonk",
        "Iranian": "iranian",
        "Malay": "malay",
        "Sertanejo": "sertanejo",
        "Summer": "summer",
        "Study": "study",
        "Show Tunes": "show-tunes",
        "Sleep": "sleep",
        "Swedish": "swedish",
        "Sad": "sad",
        "Songwriter": "songwriter",
        "Turkish": "turkish",
        "Tango": "tango",
        "Trip Hop": "trip-hop"
    };


    const [visibleGenres, setVisibleGenres] = useState(12); // Show 12 genres initially

    

    // Show More/Show All button handler
    const handleShowMore = () => {
        if (visibleGenres === 12) {
            setVisibleGenres(visibleGenres + 24); // Show 4 more rows (24 genres)
        } else {
            setVisibleGenres(Object.keys(genres).length); // Show all genres
        }
    };

    //const colors = ['#E0E1DD', '#778DA9', '#415A77', '#1B263B', '#0D1B2A'];
    const colors = ['#C0C1BD', '#778DA9', '#415A77', '#1B263B', '#0D1B2A'];

    // Convert hashmap keys into an array of genre names
    const genreKeys = Object.keys(genres);

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Select a Genre</h1>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
                {genreKeys.slice(0, visibleGenres).map((genre, index) => (
                    <div
                        key={index}
                        onClick={() => console.log(`Selected genre: ${genres[genre]}`)}
                        className="p-4 rounded-lg cursor-pointer flex items-center justify-center hover:opacity-80 transition-opacity text-white"
                        style={{
                            height: '100px',
                            backgroundColor: colors[index % colors.length], // Random color for panels
                        }}
                    >
                        {genre}
                    </div>
                ))}
            </div>

            <div className="mt-4 text-center">
                {visibleGenres < genreKeys.length && (
                    <button
                        onClick={handleShowMore}
                        className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-700 transition-colors"
                    >
                        {visibleGenres === 12 ? 'Show More' : 'Show All'}
                    </button>
                )}
            </div>
        </div>

    );
}

export default Play;
