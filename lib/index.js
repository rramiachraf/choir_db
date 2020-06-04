"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAlbums = exports.getArtists = exports.getTracks = exports.getAlbumArtwork = exports.setTrackToDB = exports.db = void 0;
var Database = require("better-sqlite3");
var SCHEMA_1 = __importDefault(require("./SCHEMA"));
var getAlbumArtwork_1 = __importDefault(require("./getAlbumArtwork"));
exports.getAlbumArtwork = getAlbumArtwork_1.default;
var getTracks_1 = __importDefault(require("./getTracks"));
exports.getTracks = getTracks_1.default;
var getArtists_1 = __importDefault(require("./getArtists"));
exports.getArtists = getArtists_1.default;
var getAlbums_1 = __importDefault(require("./getAlbums"));
exports.getAlbums = getAlbums_1.default;
var file = 'config.db';
exports.db = new Database(file);
var setTrackToDB = function (_a) {
    var artist = _a.artist, genres = _a.genres, album = _a.album, title = _a.title, path = _a.path, year = _a.year, artwork = _a.artwork, bitrate = _a.bitrate, duration = _a.duration, format = _a.format;
    var checkTables = exports.db
        .prepare("SELECT name FROM sqlite_master WHERE type='table' AND name='albums'")
        .get();
    !checkTables && exports.db.exec(SCHEMA_1.default);
    /* -------------------------------------------------------------------------- */
    /*                                   GENRES                                   */
    /* -------------------------------------------------------------------------- */
    // if (genres.length > 0) {
    //   const pre_genres = db.prepare(
    //     "INSERT OR IGNORE INTO genres (genre_name) VALUES (@genre)"
    //   );
    //   genres.forEach((genre) => {
    //     pre_genres.run({ genre: genre.toLowerCase() });
    //   });
    // }
    /* -------------------------------------------------------------------------- */
    /*                                   ARTIST                                   */
    /* -------------------------------------------------------------------------- */
    if (artist) {
        var preArtist = exports.db.prepare('INSERT OR IGNORE INTO artists (artistName) VALUES (@artist)');
        preArtist.run({ artist: artist });
    }
    /* -------------------------------------------------------------------------- */
    /*                                    ALBUM                                   */
    /* -------------------------------------------------------------------------- */
    if (album) {
        var check = exports.db
            .prepare("\n    SELECT albumName, artistName FROM albums \n    LEFT JOIN artists ON albums.albumArtist = artists.artistId \n    WHERE albumName = @album AND artistName = @artist")
            .get({ album: album, artist: artist });
        var preAlbum = exports.db.prepare("\n    INSERT INTO albums (albumName, albumArtist, albumArtwork, albumYear)\n    VALUES(\n      @album,\n      (SELECT artistId FROM artists WHERE artistName = @artist),\n      @artwork,\n      @year\n      )");
        if (check === undefined) {
            preAlbum.run({
                album: album,
                artist: artist,
                artwork: artwork,
                year: year
            });
        }
    }
    /* -------------------------------------------------------------------------- */
    /*                                    TRACK                                   */
    /* -------------------------------------------------------------------------- */
    var preTrack = exports.db.prepare("\n    INSERT OR IGNORE INTO tracks (trackPath, trackArtist, trackTitle,\n      trackGenres, trackYear, trackArtwork, trackAlbum, \n      trackBitrate, trackDuration, trackFormat )\n    VALUES (\n      @path,\n      (SELECT artistId FROM artists WHERE artistName = @artist),\n      @title,\n      @genres,\n      @year,\n      @artwork,\n      (SELECT albumId FROM albums WHERE albumName = @album),\n      @bitrate,\n      @duration,\n      @format\n    )\n  ");
    preTrack.run({
        path: path,
        artist: artist,
        title: title,
        genres: JSON.stringify(genres),
        year: year,
        artwork: artwork,
        album: album,
        bitrate: bitrate,
        duration: duration,
        format: format
    });
};
exports.setTrackToDB = setTrackToDB;
