import express from "express";
import {
  addPost,
  deletePost,
  getPost,
  getPosts,
  updatePost,
  getPaginationPosts,
} from "../controllers/post.js";

const router = express.Router();

router.get("/", getPosts);   // show all post
router.get("/pagination", getPaginationPosts);   // show all post
router.get("/:id", getPost);  // show all post
router.post("/", addPost);  // show all post
router.delete("/:id", deletePost);  // show delete post 
router.put("/:id", updatePost); // show delete post 

export default router;