const dotenv = require('dotenv');
dotenv.config();
const { Sequelize } = require('sequelize');
const User = require('./userModel');
const Song = require('./songModel');
const PlayList = require('./playListModel');
const UserLikeSong = require('./UserLikeSong');

const { local, cloud } = require('../../config/mysql');
const Genre = require('./genreModel');
const FollowUser = require('./followUser');
const FollowPlaylist = require('./followPlaylist');
const SongPlaylist = require('./SongPlaylistModel');

dotenv.config();

const sequelize = new Sequelize(local.dbName, local.userName, local.password, local.config);

const UserModel = User(sequelize);
const SongModel = Song(sequelize);
const PlayListModel = PlayList(sequelize);
const GenreModel = Genre(sequelize);
const UserLikeSongModel = UserLikeSong(sequelize);
const FollowUserModel = FollowUser(sequelize);
const FollowPlaylistModel = FollowPlaylist(sequelize);
const SongPlaylistModel = SongPlaylist(sequelize);

// relationship

UserModel.hasMany(SongModel, { foreignKey: 'ownerId', onDelete: 'CASCADE' }); // USER VS SONG
SongModel.belongsTo(UserModel, { foreignKey: 'ownerId', onDelete: 'CASCADE' });

// UserModel.belongsToMany(SongModel, { through: UserLikeSongModel }); // USER - USER_LIKE_SONG - ROOM
// SongModel.belongsToMany(UserModel, { through: UserLikeSongModel });
UserLikeSongModel.belongsTo(SongModel, {
  as: 'songOfUserLike',
  foreignKey: 'songId',
  onDelete: 'CASCADE',
});
UserLikeSongModel.belongsTo(UserModel, { as: 'user', foreignKey: 'userId', onDelete: 'CASCADE' });

FollowUserModel.belongsTo(UserModel, {
  as: 'follower',
  foreignKey: 'user_id',
  onDelete: 'CASCADE',
}); // USER FOLLOW USER
FollowUserModel.belongsTo(UserModel, {
  as: 'following',
  foreignKey: 'followed',
  onDelete: 'CASCADE',
});

// UserModel.belongsToMany(PlayListModel, { through: FollowPlaylistModel }); // USER - FOLLOWPLAYLIST - PLAYLIST
// PlayListModel.belongsToMany(UserModel, { through: FollowPlaylistModel });

FollowPlaylistModel.belongsTo(UserModel, {
  as: 'followingUser',
  foreignKey: 'userId',
  onDelete: 'CASCADE',
});
FollowPlaylistModel.belongsTo(PlayListModel, {
  as: 'followingPlaylist',
  foreignKey: 'playlistId',
  onDelete: 'CASCADE',
});

// SongModel.belongsToMany(PlayListModel, { through: SongPlaylistModel }); // SONG - SONG_PLAYLIST - PLAYLIST
// PlayListModel.belongsTo(SongModel, { through: SongModel });
SongPlaylistModel.belongsTo(PlayListModel, {
  as: 'playlist',
  foreignKey: 'playlistId',
  onDelete: 'CASCADE',
});
SongPlaylistModel.belongsTo(SongModel, { as: 'song', foreignKey: 'songId', onDelete: 'CASCADE' });

SongModel.belongsTo(GenreModel, { onDelete: 'CASCADE' }); // SONG - GENRE
GenreModel.hasMany(SongModel, { onDelete: 'CASCADE' });

UserModel.hasMany(PlayListModel, { onDelete: 'CASCADE' }); // USER - PLAYLIST
PlayListModel.belongsTo(UserModel, { onDelete: 'CASCADE' });

module.exports = {
  sequelize,
  UserModel: sequelize.models.users,
  GenreModel: sequelize.models.genres,
  SongModel: sequelize.models.songs,
  SongPlaylistModel: sequelize.models.song_playlist,
  PlayListModel: sequelize.models.playlists,
  FollowUserModel: sequelize.models.follow_users,
  FollowPlaylistModel: sequelize.models.follow_playlists,
  UserLikeSongModel: sequelize.models.userlikesongs,
};
