const express = require("express");
const router = express.Router();

const home = require("../controllers/home");
const image = require("../controllers/image");
const user = require("../controllers/user");

module.exports = app => {
  app.get("/", home.index);

  app.get('/users', user.users);
  app.post('/users', user.create);

  app.get("/images", image.images);
  app.get("/images/:image_id", image.index);
  app.post("/images", image.create);
  app.post("/images/:image_id/like", image.like);
  app.post("/images/:image_id/comment", image.comment);
  app.delete("/images/:image_id", image.remove);

  app.use(router);
};
