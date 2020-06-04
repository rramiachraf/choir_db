import { db } from './index';
import { AlbumInfo } from './types';
import { GET_ALBUMS } from './SCHEMA';

const getAllAlbums = (): AlbumInfo[] => {
  const albums = db.prepare(GET_ALBUMS).all();
  return albums;
};

export default getAllAlbums;
