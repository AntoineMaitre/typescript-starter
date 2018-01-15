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

    @ApiResponse({ status: 201, description: 'The record has been successfully created.'})
    @ApiResponse({ status: 403, description: 'Forbidden.'})
    @Get()
    async findAll(): Promise<User[]> {
        return this.userService.findAll();
    }
}