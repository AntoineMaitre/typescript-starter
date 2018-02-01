/**
 * Created by tdoret on 15/01/2018.
 */
import {Module} from '@nestjs/common';
import {UserController} from './user.controller';
import {UserService} from './user.service';
import {DatabaseModule} from "../database/database.module";
import {userProviders} from "./user.providers";
import {TwitchService} from "../twitch/twitch.service";
import {RegisterTokenService} from "./register-token.service";

@Module({
    imports: [DatabaseModule],
    controllers: [UserController],
    components: [UserService, ...userProviders, RegisterTokenService, TwitchService]
})

export class UserModule {
}