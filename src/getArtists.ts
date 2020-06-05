import db from './index';
import { GET_ARTISTS } from './SCHEMA';
import { ArtistInfo } from './type';

const getArtists = (): ArtistInfo[] => {
  const artists = db.prepare(GET_ARTISTS).all();
  return artists;
};

export default getArtists;
