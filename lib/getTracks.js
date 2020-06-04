"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var index_1 = require("./index");
var SCHEMA_1 = require("./SCHEMA");
var getTracks = function (id) {
    var tracks = index_1.db.prepare(SCHEMA_1.GET_TRACKS).all({ id: id });
    return tracks;
};
exports.default = getTracks;
