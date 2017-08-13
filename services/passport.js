const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const keys = require('../config/keys');
const mongoose = require('mongoose');
const User = mongoose.model('users');

passport.use(
    new GoogleStrategy(
        {
            clientID: keys.googleClientID,
            clientSecret: keys.googleClientSecret,
            callbackURL: '/auth/google/callback'
        },
        (accessToken, refreshToken, profile, done) => {
            // console.log('accessToken', accessToken);
            // console.log('refreshToken', refreshToken);
            // console.log('profile', profile);
            User.findOne({googleId: profile.id}).then((existingUser) => {
                "use strict";
                if (existingUser) {
                    // we already have a record with the given profile ID
                    done(null, existingUser)
                } else {
                    // make a new record
                    new User({googleId: profile.id}).save();
                }
            })


        }
    )
);
