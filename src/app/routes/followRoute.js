const express = require('express');
const FollowController = require('../controllers/FollowController');
const isLoginMiddleware = require('../middlewares/isLoginMiddleware');

const router = express.Router();

// đến số người đang theo dõi bằng IdUser
router.get('/', isLoginMiddleware, FollowController.getCountFollowByIdUser);
// những người mình đang theo dõi
router.get('/following', isLoginMiddleware, FollowController.getMyFollowing);
// những người theo dõi mình
router.get('/followers', isLoginMiddleware, FollowController.getMyFollowers);
router.get('/playlists', isLoginMiddleware, FollowController.MyPlaylists);

router.post('/playlists', isLoginMiddleware, FollowController.followPlaylist);
router.delete('/playlists', isLoginMiddleware, FollowController.Unfollowplaylist);

router.delete('/', isLoginMiddleware, FollowController.unFollowUser);
router.post('/', isLoginMiddleware, FollowController.followUser);
module.exports = router;
