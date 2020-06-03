import Database = require('better-sqlite3');
import SCHEMA from './SCHEMA';
import { SongMetadata, AlbumInfo, ArtistInfo } from './types';

const file = 'config.db';
export const db = new Database(file);

export const setTrackToDB = ({
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
  db.exec(SCHEMA);

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
    INSERT OR IGNORE INTO tracks (trackPath, trackArtist, trackTitle,
      trackGenres, trackYear, trackArtwork, trackAlbum, 
      trackBitrate, trackDuration, trackFormat )
    VALUES (
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

export const getAllAlbums = (): AlbumInfo[] => {
  const statement = `
    SELECT
    albumId, 
    albumName,
    albumArtwork, 
    albumYear,
    artistName
    FROM albums 
    LEFT JOIN 
    artists ON albums.albumArtist = artists.artistId
  `;
  const albums = db.prepare(statement).all();

  return albums;
};

export const getArtists = (): ArtistInfo[] => {
  const artists = db.prepare('SELECT * FROM artists').all();
  return artists;
};

export const getTracks = (id: number): SongMetadata[] => {
  const tracks = db
    .prepare(
      `
    SELECT 
    trackId AS id, 
    trackPath AS path, 
    trackTitle AS title, 
    trackGenres AS genres, 
    trackArtwork AS artwork,
    trackBitrate AS bitrate,
    trackYear AS year,
    trackDuration AS duration,
    trackFormat AS format,
    albumName AS album,
    artistName AS artist
    FROM tracks 
    LEFT JOIN albums 
      ON tracks.trackAlbum = albums.albumId 
    LEFT JOIN artists ON 
      tracks.trackArtist = artists.artistId
    WHERE albums.albumId = @id
    `
    )
    .all({ id });
  return tracks;
};
