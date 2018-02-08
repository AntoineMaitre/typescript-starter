/**
 * Created by tdoret on 15/01/2018.
 */
import {Controller, Get, HttpCode, HttpStatus, Param} from '@nestjs/common';
import {GameService} from './game.service';
import {IGame} from './interfaces/game.interface';
import {ApiBearerAuth, ApiOperation, ApiResponse, ApiUseTags,} from '@nestjs/swagger';
import {PlatformType} from '../platform/interfaces/platform.interface';

@ApiUseTags('Game')
@Controller('game')
export class GameController {
    constructor(private readonly gameService: GameService) {
    }

    @Get()
    @ApiBearerAuth()
    @ApiResponse({status: 200, description: 'List of games successfully retrieved'})
    @ApiResponse({status: 403, description: 'Access forbidden.'})
    @ApiOperation({
        title: 'Get games',
        description: 'Get all games from the db. \nReturns an empty array if no game was found',
    })
    @HttpCode(HttpStatus.OK)
    async findAll(): Promise<IGame[]> {
        return this.gameService.findAll();
    }

    @Get('getGameById/:id')
    @ApiBearerAuth()
    @ApiResponse({status: 200, description: 'Game successfully retrieved'})
    @ApiResponse({status: 400, description: 'Bad parameter provided.'})
    @ApiResponse({status: 403, description: 'Access forbidden.'})
    @ApiResponse({status: 404, description: 'Resource not found.'})
    @ApiOperation({
        title: 'Get game by ID',
        description: 'Get corresponding game from the db based on its ObjectID. \nReturns a 404 exception if no game was found',
    })
    @HttpCode(HttpStatus.OK)
    async findById(@Param('id') id: string): Promise<IGame> {
        return this.gameService.findById(id);
    }

    @Get('getGameByPlatformType/:type')
    @ApiBearerAuth()
    @ApiResponse({status: 200, description: 'game successfully retrieved'})
    @ApiResponse({status: 400, description: 'Bad parameter provided.'})
    @ApiResponse({status: 403, description: 'Access forbidden.'})
    @ApiOperation({
        title: 'Get game by platform',
        description: 'Get corresponding games from the db based on their platform. \nReturns an empty array if no game was found',
    })
    @HttpCode(HttpStatus.OK)
    async findByPlatform(@Param('type') type: PlatformType): Promise<IGame[]> {
        return this.gameService.findByPlatformType(type);
    }

    /*@Post()
    @ApiBearerAuth()
    @ApiOperation({title: 'Create a new game', description: 'Insert a new game record in the db'})
    @ApiResponse({status: 201, description: 'The game has been successfully created.'})
    @ApiResponse({status: 400, description: 'Bad parameters provided.'})
    @ApiResponse({status: 403, description: 'Access forbidden.'})
    @HttpCode(HttpStatus.CREATED)
    async create(@Body() createGameDto: CreateGameDto): Promise<IGame> {
        return this.gameService.create(createGameDto);
    }*/
}