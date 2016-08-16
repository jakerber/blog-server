import mongoose, { Schema } from 'mongoose';
import bcrypt from 'bcrypt-nodejs';

// credit to Tim Tregubov and the HW5 part 2 walk through
// hosted at http://cs52.me/assignments/hw5p2/

// adapted from http://mongoosejs.com/docs/guide.html
// create a schema for a user with a field
// user contains an email, password, and username
const UsersSchema = new Schema({
  email: { type: String, unique: true, lowercase: true },
  password: String,
  username: String,
});

UsersSchema.set('toJSON', {
  virtuals: true,
});

UsersSchema.pre('save', function beforeyYourModelSave(next) {
  // this is a reference to our model
  // the function runs in some other context so DO NOT bind it
  const model = this;

  // only hash the password if it has been modified (or is new)
  if (!model.isModified('password')) return next();

  // generate a salt then run callback
  bcrypt.genSalt(10, (err, salt) => {
    if (err) { return next(err); }

    // hash (encrypt) our password using the salt
    bcrypt.hash(model.password, salt, null, (err, hash) => {
      if (err) { return next(err); }
      // overwrite plain text password with encrypted password
      model.password = hash;
      return next();
    });
  });
});

// note use of named function rather than arrow notation
//  this arrow notation is lexically scoped and prevents binding scope, which mongoose relies on
UsersSchema.methods.comparePassword = function comparePassword(candidatePassword, callback) {
  bcrypt.compare(candidatePassword, this.password, (err, isMatch) => {
    if (err) { return callback(err); }
    callback(null, isMatch);
  });
};

// create model class
const UsersModel = mongoose.model('Users', UsersSchema);

export default UsersModel;
