import jwt from 'jwt-simple';
// for mongo query
import UsersModel from '../models/user_model';
import dotenv from 'dotenv';
dotenv.config({ silent: true });

// credit to Tim Tregubov and the HW5 part 2 walk through
// hosted at http://cs52.me/assignments/hw5p2/

// return token upon sign in
export const signin = (req, res, next) => {
  res.send({ token: tokenForUser(req.user) });
};

// sign up a user from their email username and password
export const signup = (req, res, next) => {
  console.log('here');
  const email = req.body.email;
  const password = req.body.password;
  const username = req.body.username;

  // make sure user has entered all fields
  if (!email || !password || !username) {
    return res.status(422).send('You must provide email, username, and password.');
  }

  // 🚀 TODO:
  // here you should do a mongo query to find if a user already exists with this email.
  // modeled after localLogin in services/passport.js
  UsersModel.findOne({ email }, (err, user) => {
    if (err) {
      // bad error
      res.status(400).send(err);
    } else if (!user) {
      // if the user doesn't exist, create a new user.
      const newUser = new UsersModel();
      newUser.email = email;
      newUser.password = password;
      newUser.username = username;
      // Save the new User object
      // this is similar to how you created a Post
      newUser.save()
      .then(result => {
        // and then return a token same as you did in in signin
        res.send({ token: tokenForUser(newUser) });
      })
      .catch(err => {
        // bad error
        res.status(400).send(err);
      });
    } else {
      // if user exists then return an error.
      res.status(422).send('It appears a user with this email already exists in our database.');
    }
  });
};

// encodes a new token for a user object
function tokenForUser(user) {
  const timestamp = new Date().getTime();
  return jwt.encode({ sub: user.id, iat: timestamp }, process.env.API_SECRET);
}
