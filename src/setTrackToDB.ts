import db from './index';
import { SCHEMA } from './SCHEMA';
import { SongMetadata } from './type';

const setTrackToDB = ({
  no,
  artist,
  genres,
  album,
  title,
  path,
  year,
  artwork,
  bitrate,
  duration,
  format
}: SongMetadata): void => {
  const checkTables = db
    .prepare(
      "SELECT name FROM sqlite_master WHERE type='table' AND name='albums'"
    )
    .get();

  !checkTables && db.exec(SCHEMA);

  /* -------------------------------------------------------------------------- */
  /*                                   GENRES                                   */
  /* -------------------------------------------------------------------------- */

  // if (genres.length > 0) {
  //   const pre_genres = db.prepare(
  //     "INSERT OR IGNORE INTO genres (genre_name) VALUES (@genre)"
  //   );

  //   genres.forEach((genre) => {
  //     pre_genres.run({ genre: genre.toLowerCase() });
  //   });
  // }

  /* -------------------------------------------------------------------------- */
  /*                                   ARTIST                                   */
  /* -------------------------------------------------------------------------- */

  if (artist) {
    const preArtist = db.prepare(
      'INSERT OR IGNORE INTO artists (artistName) VALUES (@artist)'
    );

    preArtist.run({ artist });
  }

  /* -------------------------------------------------------------------------- */
  /*                                    ALBUM                                   */
  /* -------------------------------------------------------------------------- */

  if (album) {
    const check = db
      .prepare(
        `
      SELECT albumName, artistName FROM albums 
      LEFT JOIN artists ON albums.albumArtist = artists.artistId 
      WHERE albumName = @album AND artistName = @artist`
      )
      .get({ album, artist });
    const preAlbum = db.prepare(
      `
      INSERT INTO albums (albumName, albumArtist, albumArtwork, albumYear)
      VALUES(
        @album,
        (SELECT artistId FROM artists WHERE artistName = @artist),
        @artwork,
        @year
        )`
    );

    if (check === undefined) {
      preAlbum.run({
        album,
        artist,
        artwork,
        year
      });
    }
  }

  /* -------------------------------------------------------------------------- */
  /*                                    TRACK                                   */
  /* -------------------------------------------------------------------------- */

  const preTrack = db.prepare(`
      INSERT OR IGNORE INTO tracks (trackNo, trackPath, trackArtist, trackTitle,
        trackGenres, trackYear, trackArtwork, trackAlbum, 
        trackBitrate, trackDuration, trackFormat )
      VALUES (
        @no,
        @path,
        (SELECT artistId FROM artists WHERE artistName = @artist),
        @title,
        @genres,
        @year,
        @artwork,
        (SELECT albumId FROM albums WHERE albumName = @album),
        @bitrate,
        @duration,
        @format
      )
    `);

  preTrack.run({
    no,
    path,
    artist,
    title,
    genres: JSON.stringify(genres),
    year,
    artwork,
    album,
    bitrate,
    duration,
    format
  });
};

export default setTrackToDB;
