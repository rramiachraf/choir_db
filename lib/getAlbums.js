"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var index_1 = require("./index");
var SCHEMA_1 = require("./SCHEMA");
var getAllAlbums = function () {
    var albums = index_1.db.prepare(SCHEMA_1.GET_ALBUMS).all();
    return albums;
};
exports.default = getAllAlbums;
