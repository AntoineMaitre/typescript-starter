/**
 * Created by tdoret on 15/01/2018.
 */
import { Model } from 'mongoose';
import { Component } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import {GameSchema} from './schemas/game.schema';
import {Game} from './interfaces/game.interface';
import {PlatformType} from '../Platform/interfaces/platform.interface';
import {CreateGameDto} from './dto/create-game.dto';
import * as moment from 'moment';

@Component()
export class GameService {
    constructor(@InjectModel(GameSchema) private readonly gameModel: Model<Game>) {}

    async findAll(): Promise<Game[]> {
        return await this.gameModel.find().exec();
    }

    async findById(id: string): Promise<Game> {
        return await this.gameModel.findById(id).exec();
    }

    async findByPlatformType(platformType: PlatformType): Promise<Game[]> {
        return await this.gameModel.find({platform_type: platformType}).exec();
    }

    create(createGameDto: CreateGameDto) {
        const game: Game = {
            name: createGameDto.name,
            platform_type: Number(createGameDto.platform_type),
            releaseDate: moment(createGameDto.releaseDate, 'DD/MM/YYYY', 'fr').toDate(),
            multiPlayer: createGameDto.multiPlayer,
            description: createGameDto.description,
            editor: createGameDto.editor,
            active: true,
            created_at: new Date(),
            updated_at: new Date(),
        };
        return this.gameModel.create(game);
    }
}