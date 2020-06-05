import { setTrackToDB, getAlbums } from './src/index';

const metadata = {
  path: '/home/achraf/Music/Superman.mp3',
  artist: 'Eminem',
  title: 'Superman',
  genres: ['Hip Hop', 'rap'],
  year: 2002,
  artwork: '/home/achraf/Music/.thumbnails/12365-aasa.png',
  album: 'The Eminem Show',
  bitrate: 320000,
  duration: 420.3,
  format: 'MP3'
};

const id = 2;

for (let i = 0; i < 20; i += 1) {
  setTrackToDB(metadata);
}

// console.log(getAlbums());
