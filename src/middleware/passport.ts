import passport from "passport";
import { BasicStrategy } from "passport-http";
import { User } from "../models/user";

passport.use(
  new BasicStrategy(async function (username, password, done) {
    const user = await User.findOne({ name: username });
    if (!user) {
      return done(null, false);
    }

    if (user.token !== password) {
      return done(null, false);
    }

    return done(null, user);
  })
);

const authenticate = passport.authenticate("basic", { session: false });
export default authenticate;
