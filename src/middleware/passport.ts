import passport from "passport";
import { BasicStrategy } from "passport-http";
import { User, IUser } from "../models/user";
import { MongooseError } from "mongoose";

passport.use(
  new BasicStrategy(function (username, password, done) {
    User.findOne(
      { name: username },
      function (err: MongooseError, user: IUser) {
        if (err) {
          return done(err);
        }
        if (!user) {
          return done(null, false);
        }
        if (user.token !== password) {
          return done(null, false);
        }

        return done(null, user);
      }
    );
  })
);

const authenticate = passport.authenticate("basic", { session: false });
export default authenticate;
