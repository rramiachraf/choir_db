import Database = require('better-sqlite3');
import getAlbumArtwork from './getAlbumArtwork';
import getTracks from './getTracks';
import getArtists from './getArtists';
import getAlbums from './getAlbums';
import setTrackToDB from './setTrackToDB';
import InsertIntoDB from './InsertIntoDB';

const file = 'config.db';
const db = new Database(file);

export {
  InsertIntoDB,
  setTrackToDB,
  getAlbumArtwork,
  getTracks,
  getArtists,
  getAlbums,
  db as default
};
