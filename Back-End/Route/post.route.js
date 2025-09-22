
const {
  createpost,
  update,
  deletepost,
  getAllPost,
  getpostByid,
  getPosts,
  releatedpost,
  likeOrUnlikePost,
  addcomment,
  addReplyComment,
  addlikeComment,
} = require("../controllerRoute/post/AuthorAdmin.controller");
const fileUpload = require("../middleware/file upload/fileupload");
const upload = require("../middleware/multer");
const verifyToken = require("../middleware/verifyuser");
///api/post/
const Router = require("express").Router();
// Router.get("/posts", getPosts);
Router.use(verifyToken);
Router.post("/add", upload.array("Images",5), createpost);
// Router.put("/update/:id", fileUpload, update);
// Router.delete("/delete/:id", deletepost);
Router.get("/allpost", getAllPost);
// Router.get("/getbyId/:id", getpostByid);
// Router.get("/getrelated/:id", releatedpost);
Router.get("/likeunlike/:id", likeOrUnlikePost);
Router.post("/addcomment/:id", addcomment);
Router.post("/addreply/:id",addReplyComment );
Router.post("/addlikecommnet/:id",addlikeComment );

module.exports = Router;
