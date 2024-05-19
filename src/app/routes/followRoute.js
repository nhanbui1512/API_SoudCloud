const express = require('express');
const FollowController = require('../controllers/FollowController');
const isLoginMiddleware = require('../middlewares/isLoginMiddleware');
const enCodedToken = require('../middlewares/encodedToken');

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Follow
 *   description: Follow APIs
 */

/**
 * @swagger

 * /api/follow:
 *   get:
 *     summary: get number of user's followers by user id
 *     tags: [Follow]
 *     parameters:
 *      - in: query
 *        name: idUser
 *        schema:
 *          type: string
 *          default: 1
 *        required: true
 *        description: user id
 *     requestBody:
 *       required: false
 *       content:
 *         application/x-www-form-urlencoded:
 *     responses:
 *       '200':
 *          description: Successful
 *       '404':
 *          description: Not Found Data
 */

// đếm số người đang theo dõi bằng IdUser
router.get('/', enCodedToken, FollowController.getCountFollowByIdUser);

/**
 * @swagger

 * /api/follow/following:
 *   get:
 *     summary: get following users
 *     tags: [Follow]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: false
 *       content:
 *         application/x-www-form-urlencoded:
 *     responses:
 *       '200':
 *          description: Successful
 *       '404':
 *          description: Not Found Data
 */

// những người mình đang theo dõi
router.get('/following', isLoginMiddleware, FollowController.getMyFollowing);

/**
 * @swagger

 * /api/follow/followers:
 *   get:
 *     summary: get followers
 *     tags: [Follow]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: false
 *       content:
 *         application/x-www-form-urlencoded:
 *     responses:
 *       '200':
 *          description: Successful
 *       '404':
 *          description: Not Found Data
 */
// những người theo dõi mình
router.get('/followers', isLoginMiddleware, FollowController.getMyFollowers);

/**
 * @swagger

 * /api/follow/playlists:
 *   get:
 *     summary: get following playlists
 *     tags: [Follow]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: false
 *       content:
 *         application/x-www-form-urlencoded:
 *     responses:
 *       '200':
 *          description: Successful
 *       '404':
 *          description: Not Found Data
 */
router.get('/playlists', isLoginMiddleware, FollowController.MyPlaylists);

/**
 * @swagger

 * /api/follow/playlists:
 *   post:
 *     summary: Follow a playlist
 *     tags: [Follow]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *      - in: query
 *        name: idPlaylist
 *        schema:
 *          type: string
 *          default: 1
 *        required: true
 *        description: playlist id
 *     requestBody:
 *       required: false
 *       content:
 *         application/x-www-form-urlencoded:
 *     responses:
 *       '200':
 *          description: Successful
 *       '404':
 *          description: Not Found Data
 */
router.post('/playlists', isLoginMiddleware, FollowController.followPlaylist);

/**
 * @swagger

 * /api/follow/playlists:
 *   delete:
 *     summary: Unfollow a playlist
 *     tags: [Follow]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *      - in: query
 *        name: idPlaylist
 *        schema:
 *          type: string
 *          default: 1
 *        required: true
 *        description: playlist id
 *     requestBody:
 *       required: false
 *       content:
 *         application/x-www-form-urlencoded:
 *     responses:
 *       '200':
 *          description: Successful
 *       '404':
 *          description: Not Found Data
 */
router.delete('/playlists', isLoginMiddleware, FollowController.Unfollowplaylist);

/**
 * @swagger

 * /api/follow:
 *   delete:
 *     summary: Unfollow a user
 *     tags: [Follow]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *      - in: query
 *        name: user_id
 *        schema:
 *          type: string
 *          default: 1
 *        required: true
 *        description: user id
 *     requestBody:
 *       required: false
 *       content:
 *         application/x-www-form-urlencoded:
 *     responses:
 *       '200':
 *          description: Successful
 *       '404':
 *          description: Not Found Data
 */

router.delete('/', isLoginMiddleware, FollowController.unFollowUser);

/**
 * @swagger

 * /api/follow:
 *   post:
 *     summary: Follow a user
 *     tags: [Follow]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *      - in: query
 *        name: user_id
 *        schema:
 *          type: string
 *          default: 1
 *        required: true
 *        description: user id
 *     requestBody:
 *       required: false
 *       content:
 *         application/x-www-form-urlencoded:
 *     responses:
 *       '200':
 *          description: Successful
 *       '404':
 *          description: Not Found Data
 */

router.post('/', isLoginMiddleware, FollowController.followUser);
module.exports = router;
