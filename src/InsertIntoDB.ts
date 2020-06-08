import setTrackToDB from './setTrackToDB';
import globby = require('globby');
import * as mm from 'music-metadata';
import { join, extname, parse } from 'path';
import { promises } from 'fs';
import { homedir } from 'os';
import { v4 as uuid } from 'uuid';
import { SongMetadata } from './type';

const fs = promises;

const InsertIntoDB = async (directory: string) => {
  // create the artworks directory to store album pictures
  try {
    await fs.mkdir(join(homedir(), '.cache', 'choir', 'thumbnails'), {
      recursive: true
    });
  } catch (e) {
    console.log(e);
  }
  // walking through the music directory
  try {
    const paths = await globby(directory);
    // iterate over song paths
    paths.forEach((path) => {
      parseAndSetToDB(path);
    });
  } catch (e) {
    console.log(e);
  }
};

const parseAndSetToDB = async (path: string) => {
  try {
    // parse song metadata
    const { format, common } = await mm.parseFile(path);
    // metadata object destructuring
    const { artist, albumartist, genre: genres } = common;
    const { title, picture, year, album, track } = common;
    const { bitrate, duration } = format;
    const { no } = track;
    // artwork path
    const artwork = getArtworkPath(album, year, picture![0].format);
    // store the artwork on the file system
    await fs.writeFile(artwork, picture![0].data);
    setTrackToDB({
      no,
      path,
      artist: albumartist || artist || 'Unknown',
      title: title || parse(path).name,
      genres,
      year,
      album: album || 'Unknown',
      duration: parseInt(duration!.toFixed(0), 10),
      bitrate: parseInt(bitrate!.toFixed(0), 10) / 1000,
      artwork,
      format: extname(path).slice(1).toUpperCase()
    });
  } catch (e) {
    console.log(e);
  }
};

const getArtworkPath = (
  album: SongMetadata['album'],
  year: SongMetadata['year'],
  format: string
): string => {
  // set artwork file name
  const image = `${album ? album.replace(/\W/g, '') : uuid()}-${year || ''}.${
    format && format.substr(format.lastIndexOf('/') + 1)
  }`;
  return join(__dirname, 'album_art', image);
};

export default InsertIntoDB;
