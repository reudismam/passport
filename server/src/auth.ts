import passport from 'passport';
import passportJWT from 'passport-jwt';
import users from './fakedatabse';
import {jwtSecret, jwtSession} from './config';

const ExtractJwt = passportJWT.ExtractJwt;
var Strategy = passportJWT.Strategy;

var params = {
    secretOrKey: jwtSecret,
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
}

const auth = () => {
    const strategy = new Strategy(params, (payload, done) => {
        //var user = users.find(u => u.id == payload.user);
        var user = payload.user;
        if (user) {
            return done(null, {user: user});
        }
        else {
            return done(new Error("User not fount"), null);
        }
    });
    passport.use(strategy);
    return {
        initialize: () => {
            return passport.initialize();
        },
        authenticate: () => {
            return passport.authenticate("jwt", jwtSession);
        }
    }
}

const a = auth().initialize;
export const {
    initialize, authenticate

} = auth();