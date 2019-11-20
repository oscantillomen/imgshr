const path = require("path");
const { randomNumber } = require("../helpers/libs");
const fs = require("fs-extra");
const md5 = require("md5");

const { Image, Comment } = require("../models");

const ctrl = {};

ctrl.index = async (req, res) => {  
  const image = await Image.findOne({ filename: { $regex: req.params.image_id }});
  const comments = await Comment.find({ image_id: image._id });
  res.render("image", { image, comments });
};

ctrl.images = async (req, res) => {
  res.json({ msg: "Image uploaded!" });
};

ctrl.create = (req, res) => {
  const saveImage = async () => {
    const imgUrl = randomNumber();
    const images = await Image.find({ filename: imgUrl });
    if (images.length > 0) saveImage();
    else {
      const imageTempPath = req.file.path;
      const ext = path.extname(req.file.originalname).toLowerCase();
      const targetPath = path.resolve(`src/public/upload/${imgUrl}${ext}`);
      if (
        ext === ".png" ||
        ext === ".jpg" ||
        ext === ".jpeg" ||
        ext === ".gif"
      ) {
        try {
          await fs.rename(imageTempPath, targetPath);
          const newImg = new Image({
            title: req.body.title,
            filename: imgUrl + ext,
            description: req.body.description
          });
          const imageSaved = await newImg.save();
          res.redirect("/images/" + imgUrl);
        } catch (error) {
          await fs.unlink(imageTempPath);
          res.send(error);
        }
      } else {
        await fs.unlink(imageTempPath);
        res.status(500).json({ error: "Only images are allowed" });
      }
    }
  };
  saveImage();
};

ctrl.like = (req, res) => {
  res.send("Index page");
};

ctrl.comment = async (req, res) => {
  const image = await Image.findOne({
    filename: { $regex: req.params.image_id }
  });
  if (image) {

    const newComment = new Comment(req.body);
    newComment.gravatar = md5(newComment.email);
    newComment.image_id = image._id;
    await newComment.save();
    res.redirect("/images/" + image.uniqueId);
  }
};

ctrl.remove = (req, res) => {
  res.send("Index page");
};

module.exports = ctrl;
