const express = require('express');
const SongController = require('../controllers/SongController');
const multer = require('multer');
const isLoginMiddleWare = require('../middlewares/isLoginMiddleware');
const enCodedToken = require('../middlewares/encodedToken');

// cấu hình lưu trữ file và kiểm tra loại file gửi lên
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    // Chọn thư mục lưu trữ
    if (file.fieldname === 'thumbNail' && file.mimetype.includes('image')) {
      cb(null, './src/Public/Uploads/Images');
    } else if (file.fieldname === 'song' && file.mimetype === 'audio/mpeg') {
      cb(null, './src/Public/Uploads/Audios');
    } else {
      cb(new Error('Invalid field name'), null);
    }
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now());
  },
});

var upload = multer({ storage: storage });

const router = express.Router();

router.post(
  '/create',
  isLoginMiddleWare,
  upload.fields([
    { name: 'song', maxCount: 1 },
    { name: 'thumbNail', maxCount: 1 },
  ]),
  SongController.createSong,
);

router.get('/get-songs', enCodedToken, SongController.getSongs);
router.get('/getsong', enCodedToken, SongController.getSongById);
router.get('/search', SongController.SearchSong);
router.get('/recommend', enCodedToken, SongController.RecommendSongs);
router.get('/liked', isLoginMiddleWare, SongController.getSongsLiked);

router.post('/like', isLoginMiddleWare, SongController.LikeSong);

router.delete('/unlike', isLoginMiddleWare, SongController.UnlikeSong);
router.delete('/', isLoginMiddleWare, SongController.deleteSong);
module.exports = router;
