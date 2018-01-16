/**
 * Created by tdoret on 15/01/2018.
 */
import {Module} from '@nestjs/common';
import {MongooseModule} from '@nestjs/mongoose';
import {GameController} from './game.controller';
import {GameService} from './game.service';
import {GameSchema} from './schemas/game.schema';

@Module({
    imports: [MongooseModule.forFeature([{ name: 'Game', schema: GameSchema }])],
    controllers: [GameController],
    components: [GameService],
})

export class GameModule {}