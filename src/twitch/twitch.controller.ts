import {ApiUseTags} from "@nestjs/swagger";
import {Controller, Get} from "@nestjs/common";
import {TwitchService} from "./twitch.service";

@ApiUseTags('Twitch')
@Controller('twitch')
export class TwitchController {
    constructor(private readonly twitchService: TwitchService) {
    }

    @Get('auth')
    async auth(): Promise<any> {
        return {};
    }

}