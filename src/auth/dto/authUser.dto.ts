import {IsString} from 'class-validator';
import {ApiModelProperty} from '@nestjs/swagger';

export class AuthUserDto {
    @ApiModelProperty({type: String})
    @IsString()
    readonly username;

    @ApiModelProperty({type: String})
    @IsString()
    readonly password;
}