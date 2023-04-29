const { board } = require('../models');
//페이지네이션 및 게시판 목록 구현
exports.renderBoard = async (req, res, next) => {
    try {
        const PAGE_SIZE = 5;
        const page = req.query.page ? parseInt(req.query.page, 10) : 1;
        const offset = (page - 1) * PAGE_SIZE;
        const total = await board.count();
        const totalPages = Math.ceil(total / PAGE_SIZE);

        const boards = await board.findAll({
            nest: true,
            raw : true,
            order: [
                ["board_no", "DESC"],

            ],
            offset,
            limit: PAGE_SIZE,
        });
        // console.log("자료확인--", twits[0]);
        // console.log('iiiiiiiiiiii->', boards);
        // const imgObject = {}; // 변환할 객체
        //
        // let imgurl = boards.map(board =>{
        //
        //     JSON.parse(board.img).forEach((value, index, array) => {
        //         if (index % 2 === 0) { // 키는 짝수 인덱스에 있음
        //             imgObject[value] = array[index + 1]; // 키-값 쌍을 객체에 추가
        //         }
        //     });
        //     console.log("jjjjjjjj->", typeof imgObject, imgObject);
        // })
        //
        // let car ={
        //     color: 'red',
        //     type: 'station wagon',
        //     registration: 'Sat Mar 03 2018 01:00:00 GMT+0100 (GMT+01:00)',
        //     capacity: 5
        //   };
        //



        console.log(boards.length);
        for(let i =0; i < boards.length; i++){
          // for(const files in upload[i]) {
            console.log(boards[i].files);
            for( let j=0 ; j< boards[i].img.length;j++){
              console.log(boards[i].img[j].url);
            }
          // }
        }
        // console.log("1111111->", boards[0].files[0].url);


        console.log("iiiiii->", boards);

        return res.render("list", {
            boards,
            // imgObject,
            title: "커뮤니티",
            totalPages,
            currentPage: page,
        });
    } catch (err) {
        console.error(err);
        next(err);
    }


};


//이미지 구현

exports.afterUploadImage = (req, res) => {
    console.log("============",req.files); // req.files 는 업로드된 파일들의 배열입니다.
    const urls = req.files.map((file) => `/img/${file.filename}`);
    res.status(200).json({ url: urls });
};