import {Controller, Get, Next, Req, Res} from "@nestjs/common";
import {TwitchService} from "./twitch.service";

@Controller('twitch')
export class TwitchController {
    constructor(private readonly twitchService: TwitchService) {}

    @Get('auth')
    auth(@Req() req, @Res() res, @Next() next): any {
        this.twitchService.auth(req, res, next)
    }

    @Get('auth/callback')
    authCallback(@Req() req, @Res() res, @Next() next): any {
        this.twitchService.authCallback(req, res, next);
    }

    @Get('auth/result')
    resultTwitch(@Req() req, @Res() res): any {
        return this.twitchService.authResult(req, res)
    }
}