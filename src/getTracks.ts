import db from './index';
import { SongMetadata } from './types';
import { GET_TRACKS } from './SCHEMA';

const getTracks = (id: number): SongMetadata[] => {
  const tracks = db.prepare(GET_TRACKS).all({ id });
  return tracks;
};

export default getTracks;
