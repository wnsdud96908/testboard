const { board } = require('../models');

exports.afterUploadImage = (req, res) => {
    console.log(req.file);
    res.json({url: `/img/${req.file.filename}`});
};
exports.uploadPost = async(req,res,next) => {

    const { title, store_name, star, nick, content, url} = req.body;
    console.log("1111111111", req.body);
    try{
        const po = await board.create({
            title,
            store_name,
            star,
            nick,
            content,
            img: url,

        });
        res.redirect('/');
    }catch (error){
        console.error(error);
        next(error);
    }
}