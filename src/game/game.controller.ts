/**
 * Created by tdoret on 15/01/2018.
 */
import {Body, Controller, Get, Param, Post} from '@nestjs/common';
import {GameService} from './game.service';
import {IGame} from './interfaces/game.interface';
import {ApiUseTags} from '@nestjs/swagger';
import {CreateGameDto} from './dto/create-game.dto';
import {PlatformType} from '../platform/interfaces/platform.interface';

@ApiUseTags('Game')
@Controller('game')
export class GameController {
    constructor(private readonly gameService: GameService) {}

    @Get()
    async findAll(): Promise<IGame[]> {
        return this.gameService.findAll();
    }

    @Get('getGameById/:id')
    async findById(@Param('id') id: string): Promise<IGame> {
        return this.gameService.findById(id);
    }

    @Get('GetGameByPlatformType/:type')
    async findByPlatform(@Param('type') type: PlatformType): Promise<IGame[]> {
        return this.gameService.findByPlatformType(type);
    }

    @Post()
    async create(@Body() createGameDto: CreateGameDto): Promise<IGame> {
        return this.gameService.create(createGameDto);
    }
}