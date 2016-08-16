import { Router } from 'express';
import * as Posts from './controllers/post_controller';
// our imports as usual
import * as UserController from './controllers/user_controller';
import { requireAuth, requireSignin } from './services/passport';

// credit to Tim Tregubov and the HW5 part 2 walk through
// hosted at http://cs52.me/assignments/hw5p2/

const router = Router();

router.get('/', (req, res) => {
  res.json({ message: 'welcome to our blog api!' });
});

// /your routes will go here
// example!
// on routes that end in /posts
// ----------------------------------------------------
router.route('/posts/:someID')  // these methods require a post ID
  .put(requireAuth, Posts.updatePost)            // update a post using its ID
  .get(Posts.getPost)               // get a post using its ID
  .delete(requireAuth, Posts.deletePost);        // delete a post using its ID
router.route('/posts/')         // these methods do not require a post ID
  .get(Posts.getPosts)              // get all posts
  .post(requireAuth, Posts.createPost);          // create a post
router.post('/signin', requireSignin, UserController.signin); // new post for part 2
router.post('/signup', UserController.signup);  // new post for part 2

export default router;
