/**
 * Created by tdoret on 15/01/2018.
 */
import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import {GameService} from './game.service';
import { Game } from './interfaces/game.interface';
import {ApiUseTags} from '@nestjs/swagger';
import {CreateGameDto} from './dto/create-game.dto';
import {PlatformType} from '../Platform/interfaces/platform.interface';
import {create} from 'domain';

@ApiUseTags('Game')
@Controller('game')
export class GameController {
    constructor(private readonly gameService: GameService) {}

    @Get()
    async findAll(): Promise<Game[]> {
        return this.gameService.findAll();
    }

    @Get('getGameById/:id')
    async findById(@Param('id') id: string): Promise<Game> {
        return this.gameService.findById(id);
    }

    @Get('GetGameByPlatformType/:type')
    async findByPlatform(@Param('type') type: PlatformType): Promise<Game[]> {
        return this.gameService.findByPlatformType(type);
    }

    @Post()
    async create(@Body() createGameDto: CreateGameDto) {
        return this.gameService.create(createGameDto);
    }
}