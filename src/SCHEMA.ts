export default `
CREATE TABLE IF NOT EXISTS tracks (
  trackId INTEGER PRIMARY KEY,
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