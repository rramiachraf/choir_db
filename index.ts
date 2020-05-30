import Database from "better-sqlite3";
import { SongMetadata } from "./types";

export default (metadata: SongMetadata): void => {
  const db = new Database("config.db");

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
  } = metadata;

  /* -------------------------------------------------------------------------- */
  /*                                   GENRES                                   */
  /* -------------------------------------------------------------------------- */

  if (genres.length > 0) {
    const pre_genres = db.prepare(
      "INSERT OR IGNORE INTO genres (genre_name) VALUES (@genre)"
    );

    genres.forEach((genre) => {
      pre_genres.run({ genre: genre.toLowerCase() });
    });
  }

  /* -------------------------------------------------------------------------- */
  /*                                   ARTIST                                   */
  /* -------------------------------------------------------------------------- */

  if (artist) {
    const pre_artist = db.prepare(
      "INSERT OR IGNORE INTO artists (artist_name) VALUES (@artist)"
    );

    pre_artist.run({ artist });
  }

  /* -------------------------------------------------------------------------- */
  /*                                    ALBUM                                   */
  /* -------------------------------------------------------------------------- */

  if (album) {
    const pre_album = db.prepare(
      `
    INSERT INTO albums (album_name, album_artist, album_artwork)
    VALUES(
      @album,
      (SELECT artist_id FROM artists WHERE artist_name = @artist),
      @artwork
      )`
    );

    pre_album.run({ album, artist, artwork });
  }

  /* -------------------------------------------------------------------------- */
  /*                                    TRACK                                   */
  /* -------------------------------------------------------------------------- */

  const pre_track = db.prepare(`
    INSERT INTO tracks (track_path, track_artist, track_title,
      track_year, track_artwork, track_album, track_bitrate,
      track_duration, track_format )
    VALUES (
      @path,
      (SELECT artist_id FROM artists WHERE artist_name = @artist),
      @title,
      ${/* TODO find a way to reference genres*/ ""}
      @year,
      @artwork,
      (SELECT album_id FROM albums WHERE album_name = @album),
      @bitrate,
      @duration,
      @format
    )
  `);

  pre_track.run({
    path,
    artist,
    title,
    year,
    artwork,
    album,
    bitrate,
    duration,
    format,
  });
};
