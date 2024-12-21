const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/User');

// Passport Local Strategy
module.exports = function(passport) {
    // Serialize user (store user id in session)
    passport.serializeUser(function(user, done) {
        done(null, user.id);
    });

    // Deserialize user (find user in DB by user id)
    passport.deserializeUser(function(id, done) {
        User.findById(id, function(err, user) {
            done(err, user);
        });
    });

    // Local Strategy for login
    passport.use(new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password'
    }, async (email, password, done) => {
        try {
            // Find user by email
            const user = await User.findOne({ email: email });

            if (!user) {
                return done(null, false, { message: 'No user found with that email' });
            }

            // Compare password
            const isMatch = await user.comparePassword(password);

            if (!isMatch) {
                return done(null, false, { message: 'Incorrect password' });
            }

            // If the user is valid
            return done(null, user);
        } catch (err) {
            return done(err);
        }
    }));
};
