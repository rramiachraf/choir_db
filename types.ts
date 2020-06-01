export interface SongMetadata {
  path: string;
  artist: string | undefined;
  title: string;
  genres: string[];
  year: number;
  artwork: string;
  album: string | undefined;
  bitrate: number;
  duration: number;
  format: string;
}

export interface AlbumInfo {
  albumId: number;
  albumName: string;
  albumArtwork: string;
  albumYear: number;
  artistName: string;
}

export interface ArtistInfo {
  artistId: number;
  artistName: string;
}
