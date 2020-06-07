export interface SongMetadata {
  no: number;
  path: string;
  artist: string | undefined;
  title: string | undefined;
  genres: string[] | undefined;
  year: number | undefined;
  artwork: string | undefined;
  album: string | undefined;
  bitrate: number | undefined;
  duration: number | undefined;
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
