/**
 * Created by tdoret on 15/01/2018.
 */
import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './interfaces/user.interface';
import {ApiResponse, ApiUseTags} from '@nestjs/swagger';

@ApiUseTags('User')
@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) {}

    /*@Post()
    async create(@Body() createCatDto: CreateCatDto) {
        this.catsService.create(createCatDto);
    }*/

    @Get()
    async findAll(): Promise<User[]> {
        return this.userService.findAll();
    }
    @Get('getUserById/:id')
    async findById(@Param('id') id: string): Promise<User> {
        return this.userService.findById(id);
    }

    @Get('GetUserByUsername/:username')
    async findByPlatform(@Param('username') username: string): Promise<User[]> {
        return this.userService.findByUsername(username);
    }
}