const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const {board} = require('../models');

const {afterUploadImage, uploadPost, renderBoard, renderUpdate} = require('../controllers/board');

const router = express.Router();

router.get('/', (req,res) => {
    res.render('board');
})
router.get('/detail/:board_no', async (req, res) => {
    const board_no = req.params.board_no;
    console.log("22222222222", req.params.board_no);
    const boards = await board.findOne({
        where: {board_no}
    })
     res.render("detail",{boards});


})

router.get('/list', renderBoard);

router.post('/delete/:board_no', async (req, res) => {
    const boardNo = req.params.board_no;
    await board.destroy({
        where: { board_no: boardNo }
    });
    res.redirect('/board/list');
});


try {
    fs.readdirSync('uploads');
} catch (error) {
    console.error('uploads 폴더가 없어 uploads 폴더를 생성합니다.');
    fs.mkdirSync('uploads');
}

const upload = multer({
    storage: multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, 'uploads/');
        },
        filename(req, file, done) {
            const ext = path.extname(file.originalname);
            const fileName = `${path.basename(
                file.originalname,
                ext
            )}_${Date.now()}${ext}`;
            done(null, fileName);
        }
    }),
    fileFilter : (req, file, cb) => {
        const typeArray = file.mimetype.split('/');
        const fileType = typeArray[1];

        if (fileType == 'jpg' || fileType == 'png' || fileType == 'jpeg' || fileType == 'gif' || fileType == 'webp') {
            req.fileValidationError = null;
            cb(null, true);
        } else {
            req.fileValidationError = "jpg,jpeg,png,gif,webp 파일만 업로드 가능합니다.";
            cb(null, false)
        }
    },
    limits : { fileSize: 5 * 1024 * 1024 },
});


router.post("/multiple-upload", upload.array('files'), async(req, res) => {
    const {title, store_name, star, nick, content} = req.body;
    console.log("444444444", req.files);

    try{
        const files = [];
        for(const file of req.files){
            files.push({ filename: file.filename, url: `/img/${file.filename}` });
        }
        const upload = await board.create({
            title,
            store_name,
            star,
            nick,
            content,
            img:files,
        })
        console.log("555555555555555", upload);
        if(upload === null){
            console.log("게시물 등록 에러!");
            res.status(400).json({"msg":"uploadError"});
        }else{
            console.log("게시물 등록!");
            res.status(200).json({"msg":"uploadSuccess"});
        }
    }catch (error){
        console.error(error);
        res.status(500).json({"msg":error});
    }
});






module.exports = router;
