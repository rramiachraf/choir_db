import { db } from './index';
import { ArtistInfo } from './types';

const getArtists = (): ArtistInfo[] => {
  const artists = db.prepare('SELECT * FROM artists').all();
  return artists;
};

export default getArtists;