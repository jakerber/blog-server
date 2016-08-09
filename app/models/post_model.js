import mongoose, { Schema } from 'mongoose';

// credit to Tim Tregubov and the HW5 part 1 walk through
// hosted at http://cs52.me/assignments/hw5p1/

// adapted from http://mongoosejs.com/docs/guide.html
// create a schema for posts with a field
// blog post contains a title, tags, and content
const PostSchema = new Schema({
  title: String,
  tags: String,
  content: String,
});

// create model class
const PostModel = mongoose.model('Post', PostSchema);

export default PostModel;
