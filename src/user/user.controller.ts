/**
 * Created by tdoret on 15/01/2018.
 */
import {Body, Controller, Get, HttpCode, HttpException, HttpStatus, Post, Query} from '@nestjs/common';
import {UserService} from './user.service';
import {IUser} from './interfaces/user.interface';
import {ApiBearerAuth, ApiOperation, ApiResponse, ApiUseTags} from '@nestjs/swagger';
import {CreateUserDto} from './dto/create-user.dto';
import {Param} from '@nestjs/common/utils/decorators/route-params.decorator';
import {getLogger} from "log4js";

const logger = getLogger('controller.user');

@ApiUseTags('User')
@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) {
    }

    @Post('')
    @ApiOperation({title: 'Create a new user', description: 'Insert a new user record in the db'})
    @ApiResponse({status: 201, description: 'The user has been successfully created.'})
    @ApiResponse({status: 400, description: 'Bad parameters provided.'})
    @ApiResponse({status: 403, description: 'Access forbidden.'})
    @HttpCode(HttpStatus.CREATED)
    async create(@Body() createUserDto: CreateUserDto, @Query('state') state: string) {
        return await this.userService
            .create(createUserDto, state)
            .catch(ex => {
                logger.log(ex);
                if (ex.status != HttpStatus.OK)
                    throw new HttpException(ex, ex.status)
            });
    }

    @Get()
    @ApiBearerAuth()
    @ApiResponse({status: 200, description: 'List of users successfully retrieved'})
    @ApiResponse({status: 403, description: 'Access forbidden.'})
    @ApiOperation({
        title: 'Get users',
        description: 'Get all users from the db. \nReturns an empty array if no user was found',
    })
    @HttpCode(HttpStatus.OK)
    async findAll(): Promise<IUser[]> {
        return await this.userService.findAll();
    }


    @Get('getUserById/:id')
    @ApiBearerAuth()
    @ApiResponse({status: 200, description: 'User successfully retrieved'})
    @ApiResponse({status: 400, description: 'Bad parameter provided.'})
    @ApiResponse({status: 403, description: 'Access forbidden.'})
    @ApiResponse({status: 404, description: 'Resource not found'})
    @ApiOperation({
        title: 'Get user by ID',
        description: 'Get corresponding user from the db based on its ObjectID. \nReturns a 404 exception if no user was found',
    })
    @HttpCode(HttpStatus.OK)
    async findById(@Param('id') id: string): Promise<IUser> {
        return this.userService.findById(id);
    }

    @Get('getUserByUsername/:username')
    @ApiBearerAuth()
    @ApiResponse({status: 200, description: 'User successfully retrieved'})
    @ApiResponse({status: 400, description: 'Bad parameter provided.'})
    @ApiResponse({status: 403, description: 'Access forbidden.'})
    @ApiOperation({
        title: 'Get user by username',
        description: 'Get corresponding users from the db based on their username. \nReturns an empty array if no user was found',
    })
    @HttpCode(HttpStatus.OK)
    async findByUsername(@Param('username') username: string): Promise<IUser[]> {
        return this.userService.findByUsername(username);
    }
}