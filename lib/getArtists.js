"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var index_1 = require("./index");
var getArtists = function () {
    var artists = index_1.db.prepare('SELECT * FROM artists').all();
    return artists;
};
exports.default = getArtists;
