const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const {board} = require('../models');

const {afterUploadImage, uploadPost} = require('../controllers/board');

const router = express.Router();
router.get('/', function (req, res, next) {
    res.render('board');
});

router.get('/list', async function (req, res, next) {

    const boards = await board.findAll({});

    console.log("4444444444444->");

    res.render('list', {boards});
});

try {
    fs.readdirSync('uploads');
} catch (error) {
    console.error('uploads 폴더가 없어 uploads 폴더를 생성합니다.');
    fs.mkdirSync('uploads');
}


const upload = multer({
    storage:multer.diskStorage({

        destination: function (req, file, cb) {
            cb(null, 'uploads/')
        },
        filename: function (req, file, cb) {
            const ext = path.extname(file.originalname);  // 파일 확장자
            cb(null, path.basename(file.originalname, ext) + Date.now() + ext); // 새 파일명(기존 파일명 + 시간 + 확장자)} else
        },
    }),
    limits: {filesize: 5 * 1024 * 1024}, // 30KB
})

router.post('/img', upload.single("img"), afterUploadImage);

const upload2 = multer();
router.post('/list', upload2.none(), uploadPost);

module.exports = router;
