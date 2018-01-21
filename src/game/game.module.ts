/**
 * Created by tdoret on 15/01/2018.
 */
import {Module} from '@nestjs/common';
import {GameController} from './game.controller';
import {GameService} from './game.service';
import {DatabaseModule} from "../database/database.module";
import {gameProviders} from "./game.providers";

@Module({
    imports: [DatabaseModule],
    controllers: [GameController],
    components: [GameService, ...gameProviders],
})

export class GameModule {
}