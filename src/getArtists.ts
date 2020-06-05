import db from './index';
import { GET_ARTISTS } from './SCHEMA';
import { ArtistInfo } from './types';

const getArtists = (): ArtistInfo[] => {
  const artists = db.prepare(GET_ARTISTS).all();
  return artists;
};

export default getArtists;
