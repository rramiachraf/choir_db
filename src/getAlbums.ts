import db from './index';
import { GET_ALBUMS } from './SCHEMA';
import { AlbumInfo } from './type';

const getAllAlbums = (): AlbumInfo[] => {
  const albums = db.prepare(GET_ALBUMS).all();
  return albums;
};

export default getAllAlbums;
