import prisma from "../config/db.config.js";
import axios from "axios";

class PostController {
  static async index(req, res) {
    try {
      const posts = await prisma.post.findMany({});

      // Not an optimized way of doing this

      // let postWithUsers = await Promise.all(
      //   posts.map(async (post) => {
      //     const res = await axios.get(
      //       `${process.env.AUTH_URL}/api/getuser/${post.userId}`,
      //     );
      //     console.log("res", res);
      //     return {
      //       ...post,
      //       ...res.data,
      //     };
      //   }),
      // );

      const usersIds = [];
      posts.forEach((item) => {
        usersIds.push(item.userId);
      });

      // Better way of doing it where we do not have to send a GET req every time
      const response = await axios.post(
        `${process.env.AUTH_URL}/api/getUsers`,
        usersIds,
      );

      // const users = response.data.users;

      // let postWithUsers = await Promise.all(
      //   posts.map((post) => {
      //     const user = users.find((item) => item.id == post.userId);
      //     return {
      //       ...post,
      //       user,
      //     };
      //   }),
      // );

      // Even better where we are not running 2 loops (one for map and one for find)

      const users = {};
      response.data.users.forEach((item) => {
        users[item.id] = item;
      });

      let postWithUsers = await Promise.all(
        posts.map((post) => {
          const user = users[post.userId];

          return {
            ...post,
            user,
          };
        }),
      );

      return res.json({ postWithUsers });
    } catch (error) {
      return res.status(500).json({ message: "Something went wrong" });
    }
  }

  static async store(req, res) {
    try {
      const authUser = req.user;
      const { title, content } = req.body;

      const post = await prisma.post.create({
        data: {
          userId: authUser.id,
          title,
          content,
        },
      });

      return res.json({ message: "Post created", post });
    } catch (error) {
      return res.status(500).json({ message: "Something went wrong" });
    }
  }
}

export default PostController;
