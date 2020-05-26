import Database from "better-sqlite3"

const db = new Database("file.db")

const metadata = {
  path: "/home/achraf/Music/Wesley's Theory.mp3",
  artist: "Kendrick Lamar",
  title: "Wesley's Theory",
  genres: ["Hip Hop", "raP"],
  year: 2014,
  artwork: "/home/achraf/Music/.thumbnails/12365-aasa.png",
  album: "To Pimp A Butterfly",
  bitrate: 320000,
  duration: 420.3,
  format: "MP3",
}

const {
  artist,
  genres,
  album,
  title,
  path,
  year,
  artwork,
  bitrate,
  duration,
  format,
} = metadata

/* -------------------------------------------------------------------------- */
/*                                   GENRES                                   */
/* -------------------------------------------------------------------------- */

// const pre_genres = db.prepare(
//   "INSERT OR IGNORE INTO genres (genre_name) VALUES (@genre)"
// )

// genres.length > 0 &&
//   genres.forEach((genre) => {
//     pre_genres.run({ genre: genre.toLowerCase() })
//   })

/* -------------------------------------------------------------------------- */
/*                                   ARTIST                                   */
/* -------------------------------------------------------------------------- */

// const pre_artist = db.prepare(
//   "INSERT OR IGNORE INTO artists (artist_name) VALUES (@artist)"
// )

// artist && pre_artist.run({ artist })

/* -------------------------------------------------------------------------- */
/*                                    ALBUM                                   */
/* -------------------------------------------------------------------------- */

const pre_albums = db.prepare(
  `
  INSERT INTO albums (album_name, album_artist, album_artwork) 
  VALUES(
    @album, 
    (SELECT artist_id FROM artists WHERE artist_name = @artist), 
    @artwork
    )`
)

// console.log(pre_albums)

// album && pre_albums.run({ album, artist, artwork })