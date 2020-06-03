"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTracks = exports.getArtists = exports.getAllAlbums = exports.setTrackToDB = exports.db = void 0;
var Database = require("better-sqlite3");
var SCHEMA_1 = __importDefault(require("./SCHEMA"));
var file = "config.db";
exports.db = new Database(file);
exports.setTrackToDB = function (_a) {
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
        var preArtist = exports.db.prepare("INSERT OR IGNORE INTO artists (artistName) VALUES (@artist)");
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
                year: year,
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
        format: format,
    });
};
exports.getAllAlbums = function () {
    var statement = "\n    SELECT\n    albumId, \n    albumName,\n    albumArtwork, \n    albumYear,\n    artistName\n    FROM albums \n    LEFT JOIN \n    artists ON albums.albumArtist = artists.artistId\n  ";
    var albums = exports.db.prepare(statement).all();
    return albums;
};
exports.getArtists = function () {
    var artists = exports.db.prepare("SELECT * FROM artists").all();
    return artists;
};
exports.getTracks = function (id) {
    var tracks = exports.db
        .prepare("\n    SELECT \n    trackId AS id, \n    trackPath AS path, \n    trackTitle AS title, \n    trackGenres AS genres, \n    trackArtwork AS artwork,\n    trackBitrate AS bitrate,\n    trackYear AS year,\n    trackDuration AS duration,\n    trackFormat AS format,\n    albumName AS album,\n    artistName AS artist\n    FROM tracks \n    LEFT JOIN albums \n      ON tracks.trackAlbum = albums.albumId \n    LEFT JOIN artists ON \n      tracks.trackArtist = artists.artistId\n    WHERE albums.albumId = @id\n    ")
        .all({ id: id });
    return tracks;
};
