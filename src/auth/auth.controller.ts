import {Body, Controller, Get, HttpCode, HttpStatus, Post} from '@nestjs/common';
import {AuthService} from './auth.service';
import {ApiBearerAuth, ApiOperation, ApiResponse, ApiUseTags} from '@nestjs/swagger';
import {UserAuthDto} from "./dto/user-auth.dto";

@ApiUseTags('Security')
@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {
    }

    @Post('')
    @ApiOperation({title: 'Authenticates a user', description: 'Authenticates user credentials against db'})
    @ApiBearerAuth()
    @ApiResponse({status: 200, description: 'The user has been successfully authenticated.'})
    @ApiResponse({status: 404, description: 'User not found.'})
    @ApiResponse({status: 400, description: 'Bad parameter.'})
    @HttpCode(HttpStatus.OK)
    public async authenticate(@Body() createCatDto: UserAuthDto) {
        return await this.authService.createToken();
    }

    @Get('authorized')
    @ApiBearerAuth()
    @ApiResponse({status: 200, description: 'The user has been successfully authorized.'})
    @ApiResponse({status: 404, description: 'User not found.'})
    @ApiResponse({status: 400, description: 'Bad parameter.'})
    @HttpCode(HttpStatus.OK)
    public async authorized() {
        console.log('Authorized route');
    }
}