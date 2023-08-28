const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: false,
  },
  email: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    // required: true,
  },
  password: {
    type: String,
    required: true,
    private: true,
  },

  likeSongs: [{
    type: mongoose.Types.ObjectId,
    ref: "Song",
  }],
  likedPlaylists: {
    type: Array,
    default: [],
  },
  subscribedArtists: {
    type: Array,
    default: [],
  },
  token: {
    type: String,
  },
});

const UserModel = mongoose.model("User", userSchema);
module.exports = UserModel;