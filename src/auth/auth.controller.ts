import {Body, Controller, Get, HttpCode, HttpStatus, Post} from '@nestjs/common';
import {AuthService} from './auth.service';
import {ApiBearerAuth, ApiResponse, ApiUseTags} from '@nestjs/swagger';

interface AuthUserDto {
}

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {
    }

    @Post('')
    @ApiResponse({status: 200, description: 'The user has been successfully authenticated.'})
    @ApiResponse({status: 404, description: 'User not found.'})
    @ApiResponse({status: 400, description: 'Bad parameter.'})
    @HttpCode(HttpStatus.OK)
    @ApiBearerAuth()
    @ApiUseTags('Security')
    public async authenticate(@Body() createCatDto: AuthUserDto) {
        return await this.authService.createToken();
    }

    @Get('authorized')
    public async authorized() {
        console.log('Authorized route');
    }
}