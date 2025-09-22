const {
  getAlluser,
  deleteuser,
  updateUser,
} = require("../../controllerRoute/user/admin.controller");
const {
  getinfo,
  updateAvatar,
  getSingleUserbyId,
  updatePassword,
  updateUserInfo,
  followunfollow,
  getFollowers,
  addRemoveToBookmark,
  sugggestFrinend,
  sendFriendRequest,
  getpendingFriends,
  cancelFriendRequest,
  acceptFriendRequest,
  addStory,
  getStory,
} = require("../../controllerRoute/user/common.Controller");
const RoleCheck = require("../../middleware/isAdmin");
const isAdmin = require("../../middleware/isAdmin");
const upload = require("../../middleware/multer");
const avatarUpload = require("../../middleware/uploadavatar");
const verifyToken = require("../../middleware/verifyuser");

const Router = require("express").Router();
Router.use(verifyToken);

Router.get("/suggestUser", sugggestFrinend);
Router.get("/sendFriendreq/:id", sendFriendRequest);

Router.get("/getpendingfriend", getpendingFriends);
Router.get("/cencelreq/:id", cancelFriendRequest);
Router.get("/acceptreq/:id", acceptFriendRequest);
Router.post("/addstory", upload.array("media", 4), addStory);
Router.get("/getstory", getStory);
// Router.get("/userinfo", getinfo);
// Router.get("/find/:id", getSingleUserbyId);
// Router.get("/follow-unfolllow/:id", followunfollow);
// Router.get("/followers", getFollowers);
// Router.get("/addtobookmark/:id", addRemoveToBookmark);

// Router.put("/update-avatar", avatarUpload, updateAvatar);
// Router.put("/changePass", updatePassword);
// Router.put("/updateInfo", updateUserInfo);
// Router.use(RoleCheck("Admin"));
// Router.get("/users", getAlluser);
// Router.delete("/delete/:id", deleteuser);
// Router.put("/updaterole/:id", updateUser);
//api/user/suggestUser
module.exports = Router;
