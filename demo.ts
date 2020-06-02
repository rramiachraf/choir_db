import { getTracks } from './index';

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

console.log(getTracks(metadata.album));
