"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var index_1 = require("./index");
var SCHEMA_1 = require("./SCHEMA");
var getAlbumArtwork = function (id) {
    var albumArtwork = index_1.db.prepare(SCHEMA_1.GET_ALBUM_ARTWORK).get({ id: id }).albumArtwork;
    return albumArtwork;
};
exports.default = getAlbumArtwork;
