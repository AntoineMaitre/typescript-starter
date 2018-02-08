import {Controller, Get, HttpException, HttpStatus, Next, Req, Res} from "@nestjs/common";
import {TwitchService} from "./twitch.service";

@Controller('twitch')
export class TwitchController {
    constructor(private readonly twitchService: TwitchService) {
    }

    @Get('auth')
    auth(@Req() req, @Res() res, @Next() next): any {
        return this.twitchService.auth(req, res, next)
    }

    @Get('auth/callback')
    authCallback(@Req() req, @Res() res, @Next() next): any {
        return this.twitchService.authCallback(req, res, next);
    }

    @Get('auth/result')
    resultTwitch(@Req() req, @Res() res): any {
        return this.twitchService
            .authResult(req, res)
            .catch(ex => {
                if (ex.status != HttpStatus.OK)
                    throw new HttpException({
                        status: ex.status,
                        error: ex.message.error,
                    }, ex.status)
            });
    }
}