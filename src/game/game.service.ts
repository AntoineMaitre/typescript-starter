/**
 * Created by tdoret on 15/01/2018.
 */
import {Model} from 'mongoose';
import {Component, Inject} from '@nestjs/common';
import {IGame} from './interfaces/game.interface';
import {PlatformType} from '../platform/interfaces/platform.interface';
import {CreateGameDto} from './dto/create-game.dto';

@Component()
export class GameService {
    constructor(@Inject('GameModelToken') private readonly gameModel: Model<IGame>) {
    }

    async findAll(): Promise<IGame[]> {
        return await this.gameModel.find().exec();
    }

    async findById(id: string): Promise<IGame> {
        return await this.gameModel.findById(id).exec();
    }

    async findByPlatformType(platformType: PlatformType): Promise<IGame[]> {
        return await this.gameModel.find({platform_type: platformType}).exec();
    }

    async create(createGameDto: CreateGameDto): Promise<IGame> {
        const createdGame = new this.gameModel(createGameDto);
        return await createdGame.save();
    }
}