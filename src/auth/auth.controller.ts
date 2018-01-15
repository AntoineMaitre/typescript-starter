import {Controller, Get, HttpCode, HttpStatus, Post} from '@nestjs/common';
import {AuthService} from './auth.service';
import {ApiResponse} from '@nestjs/swagger';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {
    }

    @Post('token')
    @ApiResponse({status: 201, description: 'The record has been successfully created.'})
    @ApiResponse({status: 403, description: 'Forbidden.'})
    @HttpCode(HttpStatus.OK)
    public async getToken() {
        return await this.authService.createToken();
    }

    @Get('authorized')
    public async authorized() {
        console.log('Authorized route');
    }
}