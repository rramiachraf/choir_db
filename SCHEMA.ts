export default `
CREATE TABLE IF NOT EXISTS tracks (
  trackId INTEGER PRIMARY KEY,
  trackPath TEXT UNIQUE,
  trackArtist INTEGER DEFAULT -1,
  trackTitle TEXT,
  trackGenres TEXT,
  trackYear INTEGER,
  trackArtwork TEXT,
  trackAlbum INTEGER DEFAULT -1,
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
);`;
