import {Body, Controller, HttpCode, HttpStatus, Post, UnauthorizedException} from '@nestjs/common';
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
    @ApiResponse({status: 200, description: 'The user has been successfully authenticated.'})
    @ApiResponse({status: 400, description: 'Bad parameter.'})
    @ApiResponse({status: 401, description: 'Invalid credentials.'})
    @ApiResponse({status: 404, description: 'User not found.'})
    @HttpCode(HttpStatus.OK)
    public async authenticate(@Body() userAuthDto: UserAuthDto) {
        try {
            let user = await this.authService.authenticateUser(userAuthDto);
            return this.authService.updateToken(user);
        } catch (e) {
            throw new UnauthorizedException(e);
        }
    }
}