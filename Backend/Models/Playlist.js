const mongoose = require("mongoose");

const playlistSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  thumbnail: {
    type: String,
    required: true,
  },
  songs: [
    {
      type: mongoose.Types.ObjectId,
      ref: "Song",
    },
  ],
  owner: {
    type: mongoose.Types.ObjectId,
    ref: "User",
  },
  collaborators: [
    {
      type: mongoose.Types.ObjectId,
      ref: "Song",
    },
  ],
});

const PlaylistModel = mongoose.model("Playlist", playlistSchema);
module.exports = PlaylistModel;
