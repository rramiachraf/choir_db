import db from './index';
import { GET_ALBUM_ARTWORK } from './SCHEMA';

const getAlbumArtwork = (id: number) => {
  const { albumArtwork } = db.prepare(GET_ALBUM_ARTWORK).get({ id });
  return albumArtwork;
};

export default getAlbumArtwork;
