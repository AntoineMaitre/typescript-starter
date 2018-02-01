/**
 * Created by tdoret on 26/01/2018.
 */
import {Component, HttpException, HttpStatus, NotFoundException, UnauthorizedException} from '@nestjs/common';
import * as passport from 'passport';
import * as passportAuth from 'passport-oauth';
import * as config from 'config';
import "isomorphic-fetch";
import {RegisterTokenService} from "../user/register-token.service";

const TWITCH_CLIENT_ID = process.env.TWITCH_CLIENT_ID,
      TWITCH_SECRET    = process.env.TWITCH_CLIENT_SECRET,
      TWITCH_API_URL   = config.server.twitch.TWITCH_API_URL,
      CALLBACK_URL     = config.server.twitch.TWITCH_CALLBACK_URL;

const OAuth2Strategy = passportAuth.OAuth2Strategy;
const twitchStrategy = new OAuth2Strategy({
        authorizationURL: 'https://api.twitch.tv/kraken/oauth2/authorize',
        tokenURL: 'https://api.twitch.tv/kraken/oauth2/token',
        clientID: TWITCH_CLIENT_ID,
        clientSecret: TWITCH_SECRET,
        callbackURL: CALLBACK_URL
    },function(accessToken, refreshToken, profile, done) {
        profile.accessToken = accessToken;
        profile.refreshToken = refreshToken;
        done(null, profile);
    });

@Component()
export class TwitchService {
    constructor(private readonly registerTokenService: RegisterTokenService) {
        passport.serializeUser(function(user, done) {
            done(null, user);
        });

        passport.deserializeUser(function(user, done) {
            done(null, user);
        });

        passport.use("twitch", twitchStrategy);
    }

    async auth(req, res, next) {
        let registerToken = await this.registerTokenService.createRegisterToken();
        passport.authenticate('twitch', {
            scope: ['user_read', 'channel_subscriptions'],
            state: registerToken.register_request_token
        })(req, res, next);
    }

    async authCallback(req, res, next) {
        let isAuthorized = await this.registerTokenService.handleRegisterToken(req.query.state);
        if(isAuthorized)
            passport.authenticate('twitch', {
                successRedirect: '/twitch/auth/result?state='+req.query.state,
                failureRedirect: '/twitch/auth/'
            })(req, res, next);
        else {
            throw new UnauthorizedException();
        }

    }

    async authResult(req, res) {
        let isAuthorized = await this.registerTokenService.handleRegisterToken(req.query.state);
        if(isAuthorized) {
            let accessToken = req.user ? req.user.accessToken: undefined;
            let refreshToken = req.user ? req.user.refreshToken: undefined;

            let user = await this.getTwitchUser(accessToken);

            if (user) {
                user.accessToken = accessToken;
                user.refreshToken = refreshToken;

                res.status(200).send(JSON.stringify({
                    twitch_user: user,
                    register_token: req.query.state
                } || {}, null, 2));
            } else {
                throw new NotFoundException();
            }
        } else {
            throw new UnauthorizedException();
        }

    }

    async getTwitchUser(accessToken) : Promise<any> {
        let options = {
            url: TWITCH_API_URL + 'user',
            method: 'GET',
            headers: {
                'Client-ID': TWITCH_CLIENT_ID,
                'Accept': 'application/vnd.twitchtv.v5+json',
                'Authorization': 'OAuth ' + accessToken
            }
        };
        return await this.twitchApiRequest(options);
    }

    async getChannelFollowers(userTwitchId, userTwitchAccessToken) : Promise<any> {
        const options = {
            method: 'GET',
            url: TWITCH_API_URL + 'channels/'+userTwitchId+'/follows',
            headers: {
                'Accept': 'application/vnd.twitchtv.v5+json',
                'Client-ID': TWITCH_CLIENT_ID,
                'Authorization': 'OAuth '+ userTwitchAccessToken
            }
        };
        return await this.twitchApiRequest(options);
    };

    async getChannelSubscriptions(userTwitchId, userTwitchAccessToken): Promise<any> {
        const options = {
            method: 'GET',
            url: TWITCH_API_URL + 'channels/'+userTwitchId+'/subscriptions',
            headers: {
                'Accept': 'application/vnd.twitchtv.v5+json',
                'Client-ID': TWITCH_CLIENT_ID,
                'Authorization': 'OAuth '+ userTwitchAccessToken
            }
        };
        return await this.twitchApiRequest(options);
    };

    async twitchApiRequest(options): Promise<any> {
        return await fetch(options.url, options)
            .then(response => {
                if (response.ok) return response.json().catch(_ => { });
                else throw { status: response.status, statusText: response.statusText }
            });
    }


}