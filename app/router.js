import { Router } from 'express';
import * as Posts from './controllers/post_controller';

// credit to Tim Tregubov and the HW5 part 1 walk through
// hosted at http://cs52.me/assignments/hw5p1/

const router = Router();

router.get('/', (req, res) => {
  res.json({ message: 'welcome to our blog api!' });
});

// /your routes will go here
// example!
// on routes that end in /posts
// ----------------------------------------------------
router.route('/posts/:someID')  // these methods require a post ID
  .put(Posts.updatePost)            // update a post using its ID
  .get(Posts.getPost)               // get a post using its ID
  .delete(Posts.deletePost);        // delete a post using its ID
router.route('/posts/')         // these methods do not require a post ID
  .get(Posts.getPosts)              // get all posts
  .post(Posts.createPost);          // create a post

export default router;
