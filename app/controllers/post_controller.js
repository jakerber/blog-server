import Post from '../models/post_model';
// referenced the following for this post controller
// http://stackoverflow.com/questions/4932928/remove-by-id-in-mongodb-console
// http://www.tutorialspoint.com/mongodb/mongodb_delete_document.htm
// and mostly docs at http://mongoosejs.com/docs/queries.html

// credit to Tim Tregubov and the HW5 part 2 walk through
// hosted at http://cs52.me/assignments/hw5p2/

// adapted from http://cs52.me/assignments/hw5p1/
// this cleans the posts because we use id instead of dangling _id
// and we purposefully don't return content here either
// new parameter added to clean a signle post if need be
export const cleanPosts = (posts, single) => {
  console.log('CLEAN called');
  if (single === true) {
    console.log(`author read as ${posts.postAuthor}`);
    return { id: posts._id, title: posts.title, tags: posts.tags, content: posts.content, author: posts.postAuthor };
  } else {
    return posts.map(post => {
      return { id: post._id, title: post.title, tags: post.tags, content: posts.content, author: posts.postAuthor };
    });
  }
};

// adapted from docs at http://mongoosejs.com/docs/queries.html
// method to create a single post with a title, tags, and content
export const createPost = (req, res) => {
  console.log('CREATE called');
  // initialize post
  const postNew = new Post();
  // get fields from request
  postNew.title = req.body.title;
  postNew.tags = req.body.tags;
  postNew.content = req.body.content;
  console.log(`auth -- read ${req.user.username}`);
  postNew.postAuthor = req.user.username;
  // add it
  postNew.save()
  .then(result => {
    res.json('post created');
  })
  .catch(error => {
    res.json({ error });
  });
};

// adapted from docs at http://mongoosejs.com/docs/queries.html
// method to get all posts from the server
export const getPosts = (req, res) => {
  console.log('GET ALL called');
  Post.find()
    .then(posts => {
      res.json(cleanPosts(posts, false)); // with false (not single)
    })
    .catch(error => {
      res.json({ error });
    });
};

// adapted from docs at http://mongoosejs.com/docs/queries.html
// method to get a single post from the server
export const getPost = (req, res) => {
  console.log('GET ONE called');
  // find post with id from request parameter // /posts/:someID
  Post.findById({ _id: req.params.someID })
    .then(post => {
      res.json(cleanPosts(post, true));     // with true (single post)
    })
    .catch(error => {
      res.json({ error });
    });
};

// adapted from docs at http://mongoosejs.com/docs/queries.html
// method to get a single post from the server
export const deletePost = (req, res) => {
  console.log('DELETE called');
  // remove post with id from request parameter // /posts/:someID
  Post.remove({ _id: req.params.someID })
    .then(() => {
      res.json('post deleted');
    })
    .catch(error => {
      res.json({ error });
    });
};

// adapted from docs at http://mongoosejs.com/docs/queries.html
// method to get a single post from the server
export const updatePost = (req, res) => {
  console.log('UPDATE called');
  // update post with id from request parameter // /posts/:someID
  Post.update({ _id: req.params.someID }, { title: req.body.title, tags: req.body.tags, content: req.body.content,
  }).then(() => {
    res.send('post updated');
  })
  .catch(error => {
    res.json({ error });
  });
};
