/**
 * Created by tdoret on 15/01/2018.
 */
import {Body, Controller, Get, HttpCode, HttpStatus, Post} from '@nestjs/common';
import {UserService} from './user.service';
import {User} from './interfaces/user.interface';
import {ApiBearerAuth, ApiOperation, ApiResponse, ApiUseTags} from '@nestjs/swagger';
import {CreateUserDto} from './dto/create-user.dto';

@ApiUseTags('User')
@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) {
    }

    @Post('')
    @ApiBearerAuth()
    @ApiOperation({title: 'Create a new user', description: 'Insert a new user record in the db'})
    @ApiResponse({status: 201, description: 'The user has been successfully created.'})
    @ApiResponse({status: 400, description: 'Bad parameter.'})
    @ApiResponse({status: 404, description: 'User not found.'})
    @ApiResponse({status: 403, description: 'Access forbidden.'})
    @HttpCode(HttpStatus.CREATED)
    async create(@Body() createUserDto: CreateUserDto) {
        return await this.userService.create(createUserDto);
    }

    @Get()
    @ApiBearerAuth()
    @ApiResponse({status: 200, description: 'List of users successfully retrieved'})
    @ApiResponse({status: 400, description: 'Bad parameter.'})
    @ApiResponse({status: 403, description: 'Access forbidden.'})
    @ApiOperation({
        title: 'Get users',
        description: 'Get all users from the db. \nReturns an empty array if no user was found',
    })
    @HttpCode(HttpStatus.OK)
    async findAll(): Promise<User[]> {
        return await this.userService.findAll();
    }
}