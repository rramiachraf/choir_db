export const SCHEMA = `
CREATE TABLE IF NOT EXISTS tracks (
  trackId INTEGER PRIMARY KEY,
  trackNo INTEGER,
  trackPath TEXT UNIQUE,
  trackArtist INTEGER,
  trackTitle TEXT,
  trackGenres TEXT,
  trackYear INTEGER,
  trackArtwork TEXT,
  trackAlbum INTEGER,
  trackBitrate INTEGER,
  trackDuration INTEGER,
  trackFormat TEXT,
  FOREIGN KEY (trackAlbum) REFERENCES albums (albumId),
  FOREIGN KEY (trackArtist) REFERENCES artists (artistId)
);
CREATE TABLE IF NOT EXISTS artists (
  artistId INTEGER PRIMARY KEY,
  artistName TEXT UNIQUE
);
CREATE TABLE IF NOT EXISTS albums (
  albumId INTEGER PRIMARY KEY,
  albumName TEXT,
  albumArtist INTEGER,
  albumArtwork TEXT,
  albumYear INT,
  FOREIGN KEY (albumArtist) REFERENCES artists (artistId)
);
INSERT OR IGNORE INTO artists (artistName) VALUES ('Unknown');
INSERT OR REPLACE INTO albums (albumName, albumArtist)
VALUES(
  'Unknown',
  (SELECT artistId FROM artists WHERE artistName = 'Unknown')
  )
`;

export const GET_ALBUM_ARTWORK =
  'SELECT albumArtwork FROM albums WHERE albumId = @id';

export const GET_TRACKS = `
  SELECT 
  trackId AS id, 
  trackPath AS path,
  trackNo as no, 
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
  ORDER BY tracks.trackNo
  `;

export const GET_ALBUMS = `
  SELECT DISTINCT
  albumName,
  albumId,
  albumArtwork, 
  albumYear,
  artistName
  FROM albums 
  LEFT JOIN 
  artists ON albums.albumArtist = artists.artistId
  ORDER BY albumName
`;

export const GET_ARTISTS = 'SELECT * FROM artists';
